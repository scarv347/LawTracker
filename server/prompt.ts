/**
 * Builds the grounded prompt for the Ask LawTrack AI endpoint.
 *
 * The model receives ONLY retrieved LawTrack legal records. It must answer
 * from those records alone and return strict JSON. This is the primary
 * backend enforcement of the no-fabrication rule (PROJECT_SPEC.md §4).
 */

import type { ChatMessage } from './openaiClient.ts';
import { INSUFFICIENT_EVIDENCE_ANSWER } from './types.ts';
import type { LegalEvidence } from './types.ts';

function formatRecord(record: LegalEvidence): string {
  return `[${record.lawId}] | ${record.title} | ${record.citation} | jurisdiction: ${record.jurisdictionId} | ${record.publisher} | ${record.lastVerified} | excerpt: "${record.excerpt}"`;
}

export function buildGroundedPrompt(
  records: LegalEvidence[],
  question: string,
): ChatMessage[] {
  const systemPrompt = [
    'You are LawTrack\'s legal-information assistant.',
    'You may answer ONLY using the provided verified LawTrack legal records.',
    'You must not use general knowledge, outside sources, or web access.',
    'You must reply with STRICT JSON of shape {"answer": string, "citedLawIds": string[]} where citedLawIds may only contain lawId values from the provided records.',
    `If the records do not contain enough verified information, set answer to exactly "${INSUFFICIENT_EVIDENCE_ANSWER}" and citedLawIds to [].`,
    'Never invent laws, citations, cases, URLs, or dates.',
    'Your output is general legal information, not legal advice.',
    '',
    'Verified LawTrack legal records:',
    ...records.map(formatRecord),
  ].join('\n');

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: question },
  ];
}
