/**
 * LawTrack AI API Contract (Server-Side)
 * 
 * Grounding Rules (Backend Enforcement):
 * 1. Model receives ONLY retrieved LawTrack records (no general knowledge/web access)
 * 2. Model response must be { answer: string; citedLawIds: string[] }
 * 3. Backend validates all citedLawIds exist in retrieved records (drops invalid)
 * 4. Zero valid citations → status "insufficient_evidence"
 * 5. "answered" status: evidence = retrieved records for citedLawIds (order preserved, duplicates removed)
 * 6. Zero retrieved records → immediate "insufficient_evidence" (no AI call)
 * 
 * Security: ASU AIR credentials from server env vars only (no client-side keys)
 * Note: insufficient_evidence answer overrides PROJECT_SPEC.md §4
 */

export type AskLawTrackRequest = {
  question: string;
  jurisdictionId?: string;
};

export type LegalEvidence = {
  lawId: string;
  title: string;
  citation: string;
  excerpt: string;
  sourceUrl: string;
  publisher: string;
  jurisdictionId: string;
  lastVerified: string; // ISO 8601
};

export type AskLawTrackStatus = "answered" | "insufficient_evidence" | "error";

export type AskLawTrackResponse = {
  answer: string;
  evidence: LegalEvidence[];
  citedLawIds: string[];
  disclaimer: string;
  status: AskLawTrackStatus;
};

export type LegalEvidenceQuery = {
  question: string;
  jurisdictionId?: string;
};

export interface LegalEvidenceRetriever {
  retrieve(query: LegalEvidenceQuery): Promise<LegalEvidence[]>;
}

export const DISCLAIMER = "This is general legal information, not legal advice.";
export const INSUFFICIENT_EVIDENCE_ANSWER = "I don't have enough verified information in LawTrack to answer that question.";
export const ERROR_ANSWER = "Something went wrong while contacting the legal information service. Please try again.";