/**
 * Legal entity models for LawTrack automated ingestion and live retrieval.
 * 
 * INVARIANT DERIVATION RULES (implementers MUST follow):
 * 1. LEGAL RECORD ID:
 *    id = 'rec-' + first 20 hex of sha256(sourceId + '|' + normalizeText(citation))
 *    - STABLE across versions, NEVER contains the version
 * 2. NORMALIZATION FUNCTION:
 *    normalizeText(s) = replace runs of whitespace with single space, then trim
 * 3. CONTENT HASH:
 *    contentHash = sha256 hex of normalizeText(body)
 * 4. EXCERPT:
 *    - Take first 800 characters of normalized body
 *    - Cut at last sentence boundary within those 800 (if any)
 *    - Otherwise use truncated 800 chars (no trailing cut)
 * 5. VERSIONING INVARIANT:
 *    - Duplicate detection: same id + same contentHash → duplicate no-op
 *    - Version bump: same id + new contentHash → version = prev + 1 with supersedes field
 *    - Old versions are RETAINED, NEVER overwritten or deleted
 * 6. DATES:
 *    - retrievedAt/lastVerifiedDate: ISO 8601 UTC timestamp of fetch/verification
 *    - retrievedBy: e.g. 'ingest:ecfr', 'live:azleg', 'seed:govinfo'
 * 7. AUTHORITY BASIS:
 *    - authority.basis = human-readable provenance (e.g. "US Code text from GovInfo official edition")
 *    - Never assign arbitrary domain suffixes as authority tier
 *
 * Evidence Confidence HARD RULE: The LLM NEVER scores or modifies any confidence component.
 * This logic is 100% server-side, computed before any LLM call.
 */



export type RetrievalMethod =
  | 'ecfr_api'
  | 'govinfo_bulk'
  | 'azleg_html'
  | 'courtlistener_api'
  | 'generic_html';

export type SourceType =
  | 'statute'
  | 'regulation'
  | 'court_opinion'
  | 'agency_rule'
  | 'agency_guidance'
  | 'code'
  | 'repository'
  | 'secondary';

export type VerificationMethod =
  | 'official_primary'
  | 'official_secondary'
  | 'trusted_repository'
  | 'secondary';

export type LegalRecordKind =
  | 'statute'
  | 'regulation'
  | 'court_opinion'
  | 'agency_rule'
  | 'agency_guidance'
  | 'code'
  | 'secondary_explanation';

/**
 * Registry of authoritative and trusted legal sources.
 * Each source defines its retrieval characteristics, trust boundaries, and authority tier.
 */
export type LegalSource = {
  sourceId: string;
  publisher: string;
  jurisdictionId: string;
  sourceType: SourceType;
  baseUrl: string;
  retrievalMethod: RetrievalMethod;
  /**
   * Authority tier definition:
   * 1 = official primary (e.g. U.S. Code, Federal Register)
   * 2 = official secondary (e.g. agency guidance, compilations)
   * 3 = trusted repository (e.g. CourtListener, specialized legal repos)
   * 4 = secondary (e.g. secondary sources, commentary)
   */
  authorityTier: 1 | 2 | 3 | 4;
  enabled: boolean;
  /** ISO 8601 timestamp of last health check */
  lastChecked?: string;
  trust: {
    allowedHosts: string[];
    /** If true, this source may provide live legal answers */
    persistOnLiveLookup: boolean;
    notes?: string;
  };
};

/**
 * A stable, versioned legal record with full provenance and evidence metadata.
 * These records never contain LLM-interpreted legal facts — only raw or sourced content.
 */
export type LegalRecord = {
  id: string;
  version: number;
  contentHash: string;
  title: string;
  citation: string;
  body: string;
  excerpt: string;
  jurisdictionId: string;
  sourceId: string;
  kind: LegalRecordKind;
  authority: {
    tier: 1 | 2 | 3 | 4;
    /** Primary sources are binding precedent (e.g. statutes, regulations) */
    isPrimary: boolean;
    /** Binding authority carries legal force; non-binding does not */
    isBinding: boolean;
    basis: string;
  };
  retrievalMode: 'database' | 'live';
  verificationMethod: VerificationMethod;
  publisher: string;
  sourceUrl: string;
  /** ISO 8601 UTC */
  retrievedAt: string;
  retrievedBy: string;
  effectiveDate?: string;
  status: 'active' | 'repealed' | 'unknown';
  /** ISO 8601 UTC */
  lastVerifiedDate: string;
  /** Previous version pointer when content changes */
  supersedes?: {
    id: string;
    version: number;
  };
  tags: string[];
};

/**
 * Evidence confidence score (0–100) measuring evidence quality.
 * The LLM NEVER scores or modifies any of these components.
 * All five scoring components are computed server-side in strict order BEFORE any LLM call.
 */
export type EvidenceConfidence = {
  total: number;
  band: 'very_strong' | 'strong' | 'moderate' | 'limited';
  /** Max score per component: sourceAuthority 30, jurisdictionMatch 25, retrievalRelevance 20, verificationRecency 15, supportingEvidence 10 */
  components: {
    sourceAuthority: number; // 0-30
    jurisdictionMatch: number; // 0-25
    retrievalRelevance: number; // 0-20
    verificationRecency: number; // 0-15
    supportingEvidence: number; // 0-10
  };
  capsApplied: string[];
  conflicts: string[];
};

/**
 * Jurisdiction resolution result from the broader jurisdiction inference system.
 * Used for confidence calculation and live lookup filtering.
 */
export type JurisdictionResolution = {
  jurisdictionId: string;
  level: 'federal' | 'state' | 'county' | 'city' | 'unresolved';
  confidence: 'exact' | 'inferred' | 'uncertain';
  matches: string[];
};

/**
 * Pre-computed confidence band thresholds.
 * Ranges inclusive, e.g., [90, 100] covers totals 90, 91, ..., 100.
 */
export const CONFIDENCE_BANDS = {
  very_strong: [90, 100],
  strong: [75, 89],
  moderate: [55, 74],
  limited: [0, 54],
} as const;

/**
 * Minimum total evidence score required to generate a legal answer.
 * Below this threshold the API must not produce a legal answer (returns insufficient_evidence).
 */
export const ANSWER_MIN_TOTAL = 45 as const;