/**
 * No-op legal evidence retriever.
 *
 * Temporary until the teammate's Firestore legal dataset lands; returning no
 * evidence is the correct, safe state, not a bug. With zero retrieved records
 * the /api/ask-lawtrack endpoint short-circuits to "insufficient_evidence"
 * without ever calling the AI provider.
 */

import type { LegalEvidenceRetriever } from '../types.ts';

export const noopRetriever: LegalEvidenceRetriever = {
  retrieve: () => Promise.resolve([]),
};
