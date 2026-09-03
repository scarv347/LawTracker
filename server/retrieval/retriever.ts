/**
 * Retrieval seam for /api/ask-lawtrack.
 */

import type { LegalEvidenceRetriever } from '../types.ts';
import { noopRetriever } from './noopRetriever.ts';

// ONE-LINE SWAP POINT: when the Firestore-backed retriever lands, replace
// noopRetriever here with the Firestore implementation. Nothing else changes.
export const legalEvidenceRetriever: LegalEvidenceRetriever = noopRetriever;
