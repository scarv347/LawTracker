# LawTrack Product Specification

## 1. Product Overview

LawTrack is a U.S. legal-information tracking application that provides **general legal information**, **not legal advice**. It is designed to help users understand laws relevant to their life events and jurisdictions. By combining structured legal data with grounded AI, LawTrack delivers personalized, source-backed legal insights.

### Key Features
- **Life-event onboarding**: Users describe life events (e.g., divorce, starting a business) to tailor content.
- **Nationwide U.S. jurisdiction model**: Supports federal, state, county, and city levels.
- **Personalized law matching/feed**: Curated feed of relevant laws based on user profile and jurisdiction.
- **Law detail pages**: Display statutes with source evidence snippets, citations, and effective dates.
- **Grounded legal-information AI chatbot**: Answers user questions using only verified legal sources.
- **Evidence Confidence scoring**: Backend-calculated 0–100 score reflecting quality of supporting evidence.
- **Court date tracking**: Users can track personal court dates and deadlines.
- **Relevant court-case awareness**: Surface real court cases related to the user's situation (without outcome prediction).

> ⚠️ **Disclaimer**: LawTrack provides general legal information for educational purposes only. It does not constitute legal advice, and no attorney-client relationship is formed. Always consult a licensed attorney for legal guidance.

## 2. Tech Stack

| Component | Technology |
|---------|------------|
| Frontend | React + TypeScript + Vite |
| Backend | Firebase (Cloud Functions, Firestore, Authentication) |
| Hosting | Firebase Hosting |
| Data Storage | Cloud Firestore (structured legal data) |
| Secrets | Stored exclusively in Firebase Cloud Functions environment config; never in frontend or committed files |

All API keys and secrets are managed server-side via Firebase Cloud Functions configuration. No `.env` files or secrets are committed to the repository.

## 3. Nationwide Legal Jurisdiction Model

### Design Principles
- Support **federal**, **state**, **county**, and **city** jurisdictions.
- Minimize code changes when adding new states — logic is reusable; data drives expansion.
- Initial focus: **Arizona** seed data, with nationwide scalability.

### Entity-Level Data Schema

| Entity | Attributes |
|-------|-----------|
| **Jurisdiction** | `type` (federal/state/county/city), `name`, `code` (e.g., AZ), `parent` (reference to parent jurisdiction), `url` (official site) |
| **Statute/LegalSource** | `jurisdiction`, `citation`, `title`, `body`, `effectiveDate`, `status` (active/repealed), `sourceUrl`, `lastVerifiedDate` |
| **Case** | `court`, `citation`, `title`, `summary`, `relevanceScore`, `decisionDate`, `sourceUrl` |
| **CourtEvent** | `userId`, `title`, `date`, `court`, `description`, `relatedLaws[]`, `reminders[]` |
| **User Profile** | `lifeEvents[]`, `jurisdictionsOfInterest[]`, `trackedCourtDates[]`, `preferences` |

## 4. Grounded Legal-Information AI Requirements

- AI responses must be **grounded exclusively** in retrieved legal sources from the LawTrack dataset.
- Every answer must **cite the specific sources** used.
- UI must display **relevant statute/source snippets** beneath AI responses.
- The LLM **must never invent** laws, citations, case names, URLs, or dates.
  - If no sufficient sources exist, the AI must respond: *"I could not find supporting legal sources for this query."*
- AI provides **general legal information only** — never legal advice or outcome predictions.
- **Backend enforcement**:
  - Retrieval occurs in Firebase Cloud Functions.
  - LLM has **no web browsing capability**.
  - Citations are validated against the dataset before display.

## 5. Evidence Confidence Engine

The Evidence Confidence score (0–100) measures **evidence quality**, not legal correctness. It is calculated server-side in Cloud Functions.

### Scoring Components

| Component | Weight | Description |
|--------|--------|-----------|
| **Source Authority** | 0–30 | Official government sources (e.g., .gov, .courts) score highest |
| **Jurisdiction Match** | 0–25 | Exact match (e.g., user in Maricopa County, law applies to Maricopa) |
| **Retrieval Relevance** | 0–20 | Semantic match between query and law text |
| **Verification Recency** | 0–15 | How recently the law was last verified (e.g., <6mo = full score) |
| **Supporting Evidence** | 0–10 | Additional cases or regulations reinforcing the law |

### Confidence Bands
- **90–100**: Very strong
- **75–89**: Strong
- **55–74**: Moderate
- **Below 55**: Limited

## 6. Court Tracking

- Users can **create, edit, and track court dates** (hearings, filings, deadlines).
- System surfaces **relevant court cases** based on user profile and life events.
- **Never predicts court outcomes** or suggests likelihood of success.

## 7. MVP Phase Plan

1. Application shell/navigation
2. Firebase foundation and user profiles
3. Life-event onboarding
4. Nationwide jurisdiction/legal-data schema
5. Verified Arizona seed laws
6. Personalized law matching/feed
7. Law detail/source evidence UI
8. Grounded legal chatbot
9. Evidence Confidence engine
10. Court date tracker
11. Court case integration
12. Nationwide ingestion/expansion tools
13. Polish and deployment

## 8. Explicit Non-Goals and Constraints

- **No legal advice** — only general legal information
- **No outcome prediction** — never guess court results
- **No fabricated content** — no invented laws, citations, or URLs
- **No frontend secrets** — all secrets in Cloud Functions
- **No committed secrets** — never commit `.env`, `secrets.json`, or API keys
- **No framework migrations** — no changes to React/Vite/Firebase without approval