/**
 * Frontend client for LawTrack AI API
 * 
 * Input validation:
 *   - Trims question, rejects empty after trim
 *   - Rejects questions >2000 chars (throws AskLawTrackValidationError)
 *   - Network errors/4xx-5xx → returns { status: 'error', answer: ERROR_ANSWER }
 * 
 * Never exposes server secrets or provider details
 */

export type LegalEvidence = {
  lawId: string;
  title: string;
  citation: string;
  excerpt: string;
  sourceUrl: string;
  publisher: string;
  jurisdictionId: string;
  lastVerified: string;
};

export type AskLawTrackStatus = "answered" | "insufficient_evidence" | "error";

export type AskLawTrackResponse = {
  answer: string;
  evidence: LegalEvidence[];
  citedLawIds: string[];
  disclaimer: string;
  status: AskLawTrackStatus;
};

export class AskLawTrackValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AskLawTrackValidationError';
  }
}

const DISCLAIMER = "This is general legal information, not legal advice.";
const ERROR_ANSWER = "Something went wrong while contacting the legal information service. Please try again.";

const ERROR_RESPONSE: AskLawTrackResponse = {
  answer: ERROR_ANSWER,
  evidence: [],
  citedLawIds: [],
  disclaimer: DISCLAIMER,
  status: 'error'
};

function isValidAskLawTrackResponse(body: unknown): body is AskLawTrackResponse {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as Record<string, unknown>;
  return typeof b.answer === 'string' &&
    Array.isArray(b.evidence) &&
    Array.isArray(b.citedLawIds) &&
    typeof b.disclaimer === 'string' &&
    (b.status === 'answered' || b.status === 'insufficient_evidence' || b.status === 'error');
}

export async function askLawTrack(
  question: string,
  jurisdictionId?: string
): Promise<AskLawTrackResponse> {
  const trimmed = question.trim();
  if (trimmed.length === 0) {
    throw new AskLawTrackValidationError('Question must not be empty after trimming');
  }
  if (trimmed.length > 2000) {
    throw new AskLawTrackValidationError('Question must be at most 2000 characters');
  }

  try {
    const response = await fetch('/api/ask-lawtrack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: trimmed, jurisdictionId }),
    });
    if (!response.ok) return ERROR_RESPONSE;
    const data = await response.json();
    return isValidAskLawTrackResponse(data) ? data : ERROR_RESPONSE;
  } catch {
    return ERROR_RESPONSE;
  }
}