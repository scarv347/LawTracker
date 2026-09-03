/**
 * Parses the model's raw JSON output and validates citations against the
 * retrieved evidence set (backend grounding enforcement, docs/ask-lawtrack-api.md).
 */

import { INSUFFICIENT_EVIDENCE_ANSWER } from './types.ts';
import type { LegalEvidence } from './types.ts';

export type ParsedModelOutput = {
  answer: string;
  citedLawIds: unknown;
};

export type ValidationResult = {
  status: 'answered' | 'insufficient_evidence';
  answer: string;
  citedLawIds: string[];
  evidence: LegalEvidence[];
};

/**
 * JSON.parse robustly: tolerates surrounding whitespace and one pair of
 * markdown code fences (```json ... ```). Returns null on any failure or
 * when the shape does not match { answer: string; citedLawIds: unknown }.
 */
export function parseModelJson(raw: string): ParsedModelOutput | null {
  let text = raw.trim();

  const fenced = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenced !== null) {
    text = fenced[1].trim();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (typeof record.answer !== 'string' || !Array.isArray(record.citedLawIds)) {
    return null;
  }

  return {
    answer: record.answer,
    citedLawIds: record.citedLawIds,
  };
}

/**
 * Drops citations that are not in the retrieved lawId set, dedupes
 * preserving order. Zero valid citations => insufficient_evidence with the
 * fixed answer text and empty arrays.
 */
export function validateCitations(
  parsed: ParsedModelOutput,
  retrieved: LegalEvidence[],
): ValidationResult {
  const byLawId = new Map(retrieved.map((record) => [record.lawId, record]));

  const validIds: string[] = [];
  if (Array.isArray(parsed.citedLawIds)) {
    for (const id of parsed.citedLawIds) {
      if (typeof id !== 'string' || !byLawId.has(id)) {
        continue;
      }
      if (!validIds.includes(id)) {
        validIds.push(id);
      }
    }
  }

  if (validIds.length === 0 || parsed.answer.trim() === INSUFFICIENT_EVIDENCE_ANSWER) {
    return {
      status: 'insufficient_evidence',
      answer: INSUFFICIENT_EVIDENCE_ANSWER,
      citedLawIds: [],
      evidence: [],
    };
  }

  const evidence: LegalEvidence[] = [];
  for (const id of validIds) {
    const record = byLawId.get(id);
    if (record !== undefined) {
      evidence.push(record);
    }
  }

  return {
    status: 'answered',
    answer: parsed.answer,
    citedLawIds: validIds,
    evidence,
  };
}
