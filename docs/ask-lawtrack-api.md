# LawTrack AI API Contract: /api/ask-lawtrack

## Endpoint
`POST /api/ask-lawtrack`

## Request
```json
{
  "question": "string (non-empty after trim, max 2000 chars)",
  "jurisdictionId": "string (optional)"
}
```

## Response
```json
{
  "answer": "string",
  "evidence": [LegalEvidence],
  "citedLawIds": ["string", ...],
  "disclaimer": "This is general legal information, not legal advice.",
  "status": "answered" | "insufficient_evidence" | "error"
}
```

## Status Behavior
- **`answered`**: 
  - `answer` = model's grounded answer
  - `evidence` = retrieved records for `citedLawIds` (order preserved, duplicates removed)
- **`insufficient_evidence`**: 
  - `answer` = "I don't have enough verified information in LawTrack to answer that question."
  - (Note: Overrides PROJECT_SPEC.md §4)
  - `evidence`/`citedLawIds` = empty arrays
- **`error`**: 
  - `answer` = "Something went wrong while contacting the legal information service. Please try again."
  - `evidence`/`citedLawIds` = empty arrays

## Grounding Rules (Backend Enforcement)
1. Model receives ONLY retrieved legal records (no external data)
2. Model must return { answer: string; citedLawIds: string[] }
3. Backend drops invalid citations (not in retrieved set)
4. Zero valid citations → `insufficient_evidence`
5. `answered` status: `evidence` = filtered retrieved records
6. Zero retrieved records → immediate `insufficient_evidence` (no AI call)

## Retrieval Seam
```typescript
interface LegalEvidenceRetriever {
  retrieve(query: { question: string; jurisdictionId?: string }): Promise<LegalEvidence[]>;
}
```
Firestore implementation will plug in later (initial returns empty array).

## Server Environment Variables
- `ASU_AIR_API_KEY` (required)
- `ASU_AIR_MODEL` (required)
- `ASU_AIR_BASE_URL` (optional, default: `https://openai.rc.asu.edu/v1`)