/**
 * LawTrack Ask-LawTrack AI server.
 *
 * Local Node HTTP server (built-in http module only, zero dependencies).
 * Implements docs/ask-lawtrack-api.md exactly:
 * - GET  /api/health        => {"ok":true}
 * - POST /api/ask-lawtrack  => grounded, citation-validated answers
 * - anything else           => 404 error envelope
 *
 * SECURITY: no secrets are ever logged; provider failures surface as a fixed
 * message; request bodies are never logged.
 */

import http from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { aiConfigured } from './config.ts';
import { chatCompletion } from './openaiClient.ts';
import { buildGroundedPrompt } from './prompt.ts';
import { legalEvidenceRetriever } from './retrieval/retriever.ts';
import { DISCLAIMER, ERROR_ANSWER, INSUFFICIENT_EVIDENCE_ANSWER } from './types.ts';
import type { AskLawTrackRequest, AskLawTrackResponse } from './types.ts';
import { parseModelJson, validateCitations } from './validate.ts';

const PORT = (() => {
  const parsed = Number.parseInt(process.env.PORT ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 5175;
})();

const MAX_BODY_BYTES = 64 * 1024;
const MAX_QUESTION_LENGTH = 2000;

function sendJson(res: ServerResponse, statusCode: number, body: unknown): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function errorResponse(): AskLawTrackResponse {
  return {
    answer: ERROR_ANSWER,
    evidence: [],
    citedLawIds: [],
    disclaimer: DISCLAIMER,
    status: 'error',
  };
}

function insufficientEvidenceResponse(): AskLawTrackResponse {
  return {
    answer: INSUFFICIENT_EVIDENCE_ANSWER,
    evidence: [],
    citedLawIds: [],
    disclaimer: DISCLAIMER,
    status: 'insufficient_evidence',
  };
}

type ReadBodyResult = { ok: true; value: unknown } | { ok: false };

function readJsonBody(req: IncomingMessage): Promise<ReadBodyResult> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    let failed = false;

    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        failed = true;
        resolve({ ok: false });
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (failed) {
        return;
      }
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (raw.trim().length === 0) {
          resolve({ ok: false });
          return;
        }
        resolve({ ok: true, value: JSON.parse(raw) as unknown });
      } catch {
        resolve({ ok: false });
      }
    });

    req.on('error', () => {
      resolve({ ok: false });
    });
  });
}

function extractQuestion(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) {
    return null;
  }
  const candidate = (body as Record<string, unknown>).question;
  if (typeof candidate !== 'string') {
    return null;
  }
  const question = candidate.trim();
  if (question.length === 0 || question.length > MAX_QUESTION_LENGTH) {
    return null;
  }
  return question;
}

function extractJurisdictionId(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined;
  }
  const candidate = (body as Record<string, unknown>).jurisdictionId;
  return typeof candidate === 'string' && candidate.trim().length > 0
    ? candidate.trim()
    : undefined;
}

async function handleAskLawTrack(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const bodyResult = await readJsonBody(req);
  if (!bodyResult.ok) {
    sendJson(res, 400, errorResponse());
    return;
  }

  const question = extractQuestion(bodyResult.value);
  if (question === null) {
    sendJson(res, 400, errorResponse());
    return;
  }
  const jurisdictionId = extractJurisdictionId(bodyResult.value);

  const request: AskLawTrackRequest = jurisdictionId === undefined
    ? { question }
    : { question, jurisdictionId };

  // Zero retrieved records => immediate insufficient_evidence, no AI call.
  const records = await legalEvidenceRetriever.retrieve({
    question: request.question,
    jurisdictionId: request.jurisdictionId,
  });
  if (records.length === 0) {
    sendJson(res, 200, insufficientEvidenceResponse());
    return;
  }

  if (!aiConfigured()) {
    sendJson(res, 503, errorResponse());
    return;
  }

  const messages = buildGroundedPrompt(records, request.question);

  let rawModelOutput: string;
  try {
    rawModelOutput = await chatCompletion(messages);
  } catch {
    // chatCompletion only ever throws the fixed sanitized error.
    sendJson(res, 502, errorResponse());
    return;
  }

  const parsedModel = parseModelJson(rawModelOutput);
  if (parsedModel === null) {
    sendJson(res, 502, errorResponse());
    return;
  }

  const validated = validateCitations(parsedModel, records);
  const response: AskLawTrackResponse = {
    answer: validated.answer,
    evidence: validated.evidence,
    citedLawIds: validated.citedLawIds,
    disclaimer: DISCLAIMER,
    status: validated.status,
  };
  sendJson(res, 200, response);
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;

    if (req.method === 'GET' && pathname === '/api/health') {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/ask-lawtrack') {
      await handleAskLawTrack(req, res);
      return;
    }

    sendJson(res, 404, errorResponse());
  } catch {
    // Unexpected error: respond with the standard error envelope and log a
    // sanitized message only (never request bodies, keys, or provider details).
    console.error('Ask LawTrack server: unhandled error (details withheld)');
    if (!res.headersSent) {
      sendJson(res, 500, errorResponse());
    } else {
      res.end();
    }
  }
}

const server = http.createServer((req, res) => {
  void handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`Ask LawTrack AI server on port ${PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  // Sanitized: log only the errno-style code (e.g. EADDRINUSE), never details.
  console.error(`Ask LawTrack server failed to start (${error.code ?? 'UNKNOWN'})`);
  process.exitCode = 1;
});
