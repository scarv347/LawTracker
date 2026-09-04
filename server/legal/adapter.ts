/**
 * Source adapter contract.
 *
 * Adapters turn a registry source + target into a raw document; the ingestion
 * pipeline (not adapters) normalizes/validates/stores. Adapter behavior is
 * selected ONLY via getAdapter(method) — no source-specific logic may exist
 * anywhere in the chat path.
 *
 * Method expectations:
 * - ecfr_api: keyless REST, https://www.ecfr.gov/api/versioner/v1 (federal regulations)
 * - govinfo_bulk: https://api.govinfo.gov bulk data (US Code, public laws)
 * - azleg_html: azleg.gov citation → URL template + HTML extraction (A.R.S.)
 * - courtlistener_api: https://www.courtlistener.com/api/rest/v4/, API key from env
 *   COURT_LISTENER_API_KEY; registry must disable the source when the key is absent
 * - generic_html: URL templates + strict trust.allowedHosts enforcement (official
 *   state agencies, courts, local code publishers)
 */

import type { LegalSource, RetrievalMethod } from './types.ts';

export type RawSourceDocument = {
  sourceId: string;
  title?: string;
  citation?: string;
  body: string;
  sourceUrl: string;
  publisher: string;
  /** ISO 8601 UTC of the fetch */
  retrievedAt: string;
  effectiveDate?: string;
  status?: string;
  rawMetadata: Record<string, unknown>;
};

export type SourceTarget =
  | { kind: 'citation'; citation: string }
  | { kind: 'search'; query: string }
  | { kind: 'refresh'; scope?: string };

export interface SourceAdapter {
  method: RetrievalMethod;
  fetch(source: LegalSource, target: SourceTarget): Promise<RawSourceDocument | null>;
}

/**
 * Registry-driven dispatch over adapter implementations.
 * CONTRACT STUB — backend phase B2 replaces the body with the real dispatch table.
 */
export function getAdapter(method: RetrievalMethod): SourceAdapter | null {
  void method;
  return null;
}