/**
 * LegalRecord storage seam.
 *
 * Firestore layout (authoritative, implemented in backend phase B1):
 * - Collection `legalRecords`, doc id `${id}@v${version}`, fields = LegalRecord.
 * - Pointer collection `latestRecords`, doc id = record `id`, field `version: number`
 *   (O(1) latest lookup; do NOT use a single map document — Firestore 1MB doc limit).
 * - Upsert = transaction: read pointer → decide stored | duplicate → write versioned doc + pointer.
 * - Suggested composite indexes: (jurisdictionId ASC, status ASC), (sourceId ASC).
 *
 * CONTRACT STUB / ONE-LINE SWAP POINT: backend phase B1 replaces `legalRecordStore`
 * with FirestoreLegalRecordStore (primary) or LocalFileStore (dev fallback when
 * Firebase is unconfigured). Safe state: empty store ⇒ insufficient_evidence, never crash.
 */

import type { JurisdictionResolution, LegalRecord } from './types.ts';

/** A retrieved record plus its deterministic relevance score (0-20). No embeddings, no LLM. */
export type ScoredRecord = {
  record: LegalRecord;
  relevance: number;
};

export type IngestStoreOutcome = {
  status: 'stored' | 'duplicate_unchanged';
  record: LegalRecord;
};

export interface LegalRecordStore {
  getRecord(id: string, version: number): Promise<LegalRecord | null>;
  findLatest(id: string): Promise<LegalRecord | null>;
  /**
   * Versioned write per the derivation invariants in types.ts:
   * same id + same contentHash → duplicate_unchanged; new contentHash → version+1 with supersedes link.
   */
  upsertIngested(record: LegalRecord): Promise<IngestStoreOutcome>;
  /** Deterministic text search (keyword/field overlap, 0-20 relevance), never LLM-based. */
  search(query: { question: string; jurisdiction: JurisdictionResolution }): Promise<ScoredRecord[]>;
}

export const legalRecordStore: LegalRecordStore = {
  getRecord: async () => null,
  findLatest: async () => null,
  upsertIngested: async (record) => ({ status: 'duplicate_unchanged', record }),
  search: async () => [],
};