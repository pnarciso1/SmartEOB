# SmartEOB — Production Architecture & Build Plan
**Version:** 1.0  
**Date:** March 2026  
**Status:** Approved — Ready to Build

---

## 1. Executive Summary

SmartEOB is transitioning from a demo TPA portal to a production two-layer platform:

- **Layer 1 — Embedded API:** Three lightweight endpoints called directly from a client's existing portal (e.g., Howlite Healthcare). The client renders responses in their own UI. No redirect, no friction.
- **Layer 2 — SmartEOB Portal:** Full authenticated experience for disputes, claim history, spending analytics, and proactive health optimization. Members are handed off here from Layer 1 when action is required.

---

## 2. Client Integration Context

### Client: Howlite Healthcare
Howlite has an existing member portal and wants to add three AI-powered buttons:

| Button | What it does | What SmartEOB returns |
|--------|-------------|----------------------|
| Review My Bill | Analyze EOB for discrepancies | Verdict + discrepancy details + dispute URL (if flagged) |
| Ask a Question | RAG chat over full health record | Answer rendered inline in Howlite's UI |
| Prepare for My Visit | Generate appointment prep package | Structured prep guide rendered inline |

### Client Data Format
Howlite sends structured FHIR R4 data from three sources:

| # | File | FHIR Resource | Source |
|---|------|--------------|--------|
| 01 | healthcare-claims-eob.json | ExplanationOfBenefit | CMS Blue Button + Aetna |
| 02 | coverage-info.json | Coverage (Bundle) | CMS Blue Button 2.0 |
| 03 | patient-info.json | Patient (Bundle) | CMS Blue Button 2.0 |
| 04 | conditions.json | Condition | Epic FHIR |
| 05 | medications.json | MedicationRequest | Epic FHIR |
| 06 | allergies.json | AllergyIntolerance | Epic FHIR |
| 07 | encounters.json | Encounter | Epic FHIR |
| 08 | procedures.json | Procedure | Epic FHIR |
| 09 | immunizations.json | Immunization | Epic FHIR |
| 10 | diagnostic-reports.json | DiagnosticReport | Epic FHIR |
| 11 | goals.json | Goal | Epic FHIR |

All data is FHIR R4 / CARIN Blue Button compliant. Member identity is tracked by `hsaUserId` (MongoDB ObjectId from Howlite's data lake).

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOWLITE HEALTHCARE PORTAL                     │
│                                                                   │
│  [Review My Bill]   [Ask a Question]   [Prepare for My Visit]    │
│        │                  │                      │               │
└────────┼──────────────────┼──────────────────────┼───────────────┘
         │                  │                      │
         │  X-SmartEOB-Key: <api_key>              │
         ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 1: SmartEOB Client API                   │
│                                                                   │
│  POST /api/v1/client/review-claim                                │
│  POST /api/v1/client/chat                                        │
│  POST /api/v1/client/care-prep                                   │
│  POST /api/v1/client/sync  (called on login/refresh)            │
│                                                                   │
│              ┌──────────────────────────┐                        │
│              │     Vercel KV (Redis)     │                        │
│              │  FHIR context cache       │                        │
│              │  Key: hsaUserId           │                        │
│              │  TTL: 24 hours            │                        │
│              └──────────────────────────┘                        │
│                                                                   │
│              ┌──────────────────────────┐                        │
│              │   Google Vertex AI        │                        │
│              │   Gemini 2.0 Flash        │                        │
│              │   text-embedding-004      │                        │
│              └──────────────────────────┘                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                  Discrepancy found →
                  Response includes
                  signed disputeUrl
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  LAYER 2: SmartEOB Portal                        │
│                                                                   │
│  GET /api/v1/dispute/initiate?token=<jwt>                        │
│  ├── Validate signed token                                       │
│  ├── Pull FHIR context from KV using fhirCacheKey                │
│  ├── Create Member record (hsaUserId as externalId)              │
│  ├── Persist EOB claim data to PostgreSQL                        │
│  ├── Create Dispute record (status: OPEN)                        │
│  └── Redirect → /member/dispute/<disputeId>                      │
│                                                                   │
│  Authenticated Portal Pages (Clerk-protected):                   │
│  /member/disputes          → Dispute tracker                     │
│  /member/spending          → Claim history + spending dashboard  │
│  /member/optimize          → Health optimization insights        │
│  /admin/[tenantId]         → TPA command center (existing)       │
│                                                                   │
│              ┌──────────────────────────┐                        │
│              │   Neon PostgreSQL         │                        │
│              │   + pgvector extension    │                        │
│              │                          │                        │
│              │  Tables:                 │                        │
│              │  - Tenant                │                        │
│              │  - EmployerGroup         │                        │
│              │  - Member (externalId)   │                        │
│              │  - MedicalEvent          │                        │
│              │  - Claim                 │                        │
│              │  - Document              │                        │
│              └──────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Data Flow: The Two Critical Paths

### Path A — Sync (called on Howlite login/data refresh)
```
1. Howlite POST /api/v1/client/sync
   Body: { hsaUserId, resources: { eob, coverage, patient, conditions, ... } }
   Header: X-SmartEOB-Key: <api_key>

2. SmartEOB validates API key

3. Stores full FHIR bundle in Vercel KV:
   Key: "fhir:{hsaUserId}"
   Value: { eob, coverage, patient, conditions, medications, allergies,
            encounters, procedures, immunizations, diagnosticReports, goals }
   TTL: 86400 seconds (24 hours, refreshed on each sync)

4. Returns: { success: true, syncedAt: "2026-03-27T..." }
```

### Path B — Dispute Handoff (the Layer 1 → Layer 2 transition)
```
1. Howlite POST /api/v1/client/review-claim
   Body: { hsaUserId, claimId }

2. SmartEOB retrieves FHIR context from KV

3. Gemini analyzes EOB:
   - Cross-references CPT codes against Procedure records
   - Validates diagnosis codes against Condition list
   - Checks coordination of benefits (Medicare + Aetna)
   - Computes expected allowed amount vs billed amount

4a. No discrepancy found:
    Returns: { verdict: "CLEAN", recommendation: "...", claimId }

4b. Discrepancy found:
    - Generates signed JWT token (48hr expiry):
      { hsaUserId, claimId, discrepancyAmount, fhirCacheKey, issuedAt }
    - Returns: {
        verdict: "DISCREPANCY_FOUND",
        discrepancy: { billed, allowed, difference, reason },
        recommendation: "...",
        disputeUrl: "https://smart-eob.vercel.app/dispute/initiate?token=..."
      }

5. Howlite renders "Review Dispute" button with the disputeUrl

6. Member clicks → SmartEOB portal:
   GET /api/v1/dispute/initiate?token=<jwt>
   - Validate token signature + expiry
   - Pull FHIR context from KV using fhirCacheKey
   - Upsert Member record (hsaUserId → externalId)
   - Persist Claim record to PostgreSQL
   - Create Dispute record (status: OPEN)
   - Create Clerk magic link session for the member
   - Redirect → /member/disputes/<disputeId>
```

---

## 5. API Specifications

### Authentication
All Layer 1 endpoints require:
```
Header: X-SmartEOB-Key: <client_api_key>
```
Keys are stored as Vercel environment variables. One key per client.

### POST /api/v1/client/sync
**Purpose:** Cache all 11 FHIR resources for a member. Called on login/refresh.

Request:
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "resources": {
    "eob": { /* FHIR ExplanationOfBenefit Bundle */ },
    "coverage": { /* FHIR Coverage Bundle */ },
    "patient": { /* FHIR Patient Bundle */ },
    "conditions": [ /* FHIR Condition[] */ ],
    "medications": [ /* FHIR MedicationRequest[] */ ],
    "allergies": [ /* FHIR AllergyIntolerance[] */ ],
    "encounters": [ /* FHIR Encounter[] */ ],
    "procedures": [ /* FHIR Procedure[] */ ],
    "immunizations": [ /* FHIR Immunization[] */ ],
    "diagnosticReports": [ /* FHIR DiagnosticReport[] */ ],
    "goals": [ /* FHIR Goal[] */ ]
  }
}
```

Response `200`:
```json
{ "success": true, "syncedAt": "2026-03-27T10:00:00Z" }
```

---

### POST /api/v1/client/review-claim
**Purpose:** Analyze a specific EOB claim for discrepancies.

Request:
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "claimId": "EOB-2025-001"
}
```

Response `200` (clean):
```json
{
  "verdict": "CLEAN",
  "claimId": "EOB-2025-001",
  "recommendation": "This claim appears accurate. The billed amount of $240.00 aligns with your plan's allowed amount."
}
```

Response `200` (discrepancy found):
```json
{
  "verdict": "DISCREPANCY_FOUND",
  "claimId": "EOB-2025-001",
  "discrepancy": {
    "billed": 1240.00,
    "allowed": 890.00,
    "difference": 350.00,
    "reason": "CPT code 99214 billed at facility rate; your plan allows office rate only.",
    "severity": "HIGH"
  },
  "recommendation": "We found a potential overbilling of $350.00. This claim should be disputed.",
  "disputeUrl": "https://smart-eob.vercel.app/dispute/initiate?token=eyJhbGciOiJIUzI1NiJ9..."
}
```

---

### POST /api/v1/client/chat
**Purpose:** Answer member questions using full FHIR context as RAG source.

Request:
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "message": "Is my metformin covered under Part D?",
  "conversationHistory": []
}
```

Response `200`:
```json
{
  "reply": "Yes, metformin is covered under your Medicare Part D plan (Aetna Medicare Rx). It is on the preferred generic formulary (Tier 1), meaning your copay should be $0–$5 for a 30-day supply at a preferred pharmacy.",
  "sources": ["coverage-info.json (Part D)", "medications.json (MedicationRequest #med-001)"],
  "conversationHistory": [ /* updated for next turn */ ]
}
```

---

### POST /api/v1/client/care-prep
**Purpose:** Generate a comprehensive appointment preparation package.

Request:
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "appointmentType": "Primary Care Follow-up",
  "appointmentDate": "2026-04-15",
  "providerName": "Dr. Sarah Chen"
}
```

Response `200`:
```json
{
  "prepPackage": {
    "summary": "You have a follow-up with Dr. Chen on April 15. Here's what to bring and discuss.",
    "keyConditions": ["Type 2 Diabetes (E11.9)", "Hypertension (I10)"],
    "medicationsToReview": ["Metformin 500mg", "Lisinopril 10mg"],
    "outstandingGoals": ["HbA1c target < 7.0% — last checked 4 months ago"],
    "questionsToAsk": [
      "My HbA1c hasn't been checked in 4 months — should we order labs today?",
      "Are there any prior authorizations needed for my upcoming cardiology referral?"
    ],
    "estimatedCopay": "$25 (specialist copay per your Aetna plan)",
    "priorAuthRequired": false
  }
}
```

---

## 6. SmartEOB Portal — New Pages

### /member/disputes
- List of all open and resolved disputes for the authenticated member
- Each dispute shows: claim ID, date, discrepancy amount, current status, last action
- Link to view/download the AI-drafted appeal letter
- Status timeline: `OPEN → APPEAL_DRAFTED → SUBMITTED → RESOLVED`

### /member/spending
- Year-to-date out-of-pocket spending by month
- Deductible progress bar (from Coverage data)
- Claims by provider, by category (primary care, specialist, pharmacy, lab)
- Flags for any paid claims that were potentially overbilled
- Computed from: cached FHIR EOB data + stored Dispute records

### /member/optimize
- Reactive insight cards surfaced at login from the cached FHIR context
- Examples:
  - "Your plan covers 1 annual wellness visit at $0 copay — not yet used this year"
  - "You're on brand-name Lipitor. The generic (atorvastatin) is on your plan's Tier 1 — estimated savings: $840/year"
  - "Your HbA1c care plan goal has had no related encounter in 6 months"
  - "You have $1,200 remaining in your HSA — use it before year-end"

---

## 7. Infrastructure Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 App Router | Full-stack web application |
| Database | Neon PostgreSQL (serverless) | Persistent storage (disputes, members, claims) |
| ORM | Prisma 5 | Database access + schema management |
| Vector Store | pgvector (on Neon) | Embeddings for RAG |
| Cache | Vercel KV (Upstash Redis) | FHIR context cache keyed by hsaUserId |
| AI Models | Google Vertex AI (Gemini 2.0 Flash) | Analysis, chat, drafting |
| Embeddings | text-embedding-004 (Vertex AI) | RAG embeddings |
| Auth | Clerk | Member + admin authentication, magic links |
| Deployment | Vercel | Hosting + serverless functions |
| Token Signing | jsonwebtoken (JWT) | Signed dispute handoff URLs |

---

## 8. Environment Variables (Production)

```env
# Database
DATABASE_URL=                    # Neon PostgreSQL connection string

# Vercel KV
KV_URL=                          # Auto-set by Vercel KV dashboard
KV_REST_API_URL=                 # Auto-set by Vercel KV dashboard
KV_REST_API_TOKEN=               # Auto-set by Vercel KV dashboard

# AI
VERTEX_PROJECT_ID=smarteob-multi-tenant
GOOGLE_CREDENTIALS_JSON=         # GCP service account JSON (existing)

# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# API Security
SMARTEOB_API_KEY_HOWLITE=        # API key issued to Howlite Healthcare

# Dispute Token
DISPUTE_TOKEN_SECRET=            # 32+ char random string for JWT signing
```

---

## 9. Sequential Build Phases

### Phase 1 — Database Migration to Neon ✅ GATE
**Estimated time:** 2 hours  
**Outcome:** Existing app works on Neon, GCP dependency removed.

- [ ] Create Neon project at neon.tech
- [ ] Enable `pgvector` extension on Neon
- [ ] Run `npx prisma migrate deploy` against Neon connection string
- [ ] Run seed script against Neon to restore demo data
- [ ] Update `DATABASE_URL` in Vercel dashboard
- [ ] Smoke test: admin dashboard loads, member portal loads, claims ingest works
- [ ] **GATE: Do not proceed until all existing features verified on Neon**

---

### Phase 2 — Authentication with Clerk ✅ GATE
**Estimated time:** 3 hours  
**Outcome:** Member and admin portals are auth-protected. Magic link handoff works.

- [ ] Install `@clerk/nextjs`
- [ ] Configure Clerk middleware — protect `/member/` and `/admin/` routes
- [ ] Add `<ClerkProvider>` to root layout
- [ ] Add sign-in page at `/sign-in`
- [ ] Update seed: demo member gets a Clerk user account
- [ ] Build `GET /api/v1/dispute/initiate?token=...` — validate JWT, create session
- [ ] **GATE: Login/logout cycle works; unauthenticated access redirects to sign-in**

---

### Phase 3 — Vercel KV + Sync Endpoint ✅ GATE
**Estimated time:** 2 hours  
**Outcome:** Client can sync FHIR data; SmartEOB caches and retrieves it.

- [ ] Add Vercel KV storage in Vercel dashboard
- [ ] Install `@vercel/kv`
- [ ] Build API key middleware (`src/lib/api-key-middleware.ts`)
- [ ] Build `POST /api/v1/client/sync` — validate key, store FHIR in KV
- [ ] Test: POST sync with Howlite sample data, verify KV retrieval
- [ ] **GATE: Sync stores data; retrieve by hsaUserId works**

---

### Phase 4 — Three Client API Endpoints ✅ GATE
**Estimated time:** 1 day  
**Outcome:** All three Howlite buttons have working backend endpoints.

- [ ] `POST /api/v1/client/review-claim` — Gemini EOB analysis, verdict + disputeUrl
- [ ] `POST /api/v1/client/chat` — RAG chat over full FHIR context
- [ ] `POST /api/v1/client/care-prep` — appointment prep from goals/conditions/medications
- [ ] Complete dispute initiation flow (token → DB write → portal redirect)
- [ ] Test all three endpoints with Howlite sample FHIR data
- [ ] **GATE: All endpoints return correct structured JSON; dispute handoff redirects correctly**

---

### Phase 5 — SmartEOB Portal Updates ✅ GATE
**Estimated time:** 1.5 days  
**Outcome:** Member can track disputes, view spending, and see optimization insights.

- [ ] `/member/disputes` — dispute list + status timeline + appeal letter view
- [ ] `/member/spending` — spending dashboard computed from FHIR cache + DB
- [ ] `/member/optimize` — reactive health optimization insight cards
- [ ] Update TPA admin view to show disputes from client portal members
- [ ] End-to-end test: sync → review-claim → dispute → portal → track → view appeal
- [ ] **GATE: Full flow works end-to-end**

---

## 10. What Howlite Gets After Phase 4

A production integration package:

```
Base URL: https://smart-eob.vercel.app
Auth: X-SmartEOB-Key: <your_api_key>

Endpoints:
  POST /api/v1/client/sync
  POST /api/v1/client/review-claim
  POST /api/v1/client/chat
  POST /api/v1/client/care-prep

Dispute Handoff:
  If review-claim returns verdict: "DISCREPANCY_FOUND",
  render a button with href = response.disputeUrl
  Member clicks → opens SmartEOB portal with active session
```

---

## 11. Out of Scope (Phase 1 Production)

These are explicitly deferred to a later phase:

- Proactive/scheduled optimization notifications (email, push)
- Multi-claim batch analysis
- Direct payer submission (auto-submit dispute to insurance)
- Multi-tenant isolation for client portal members (single tenant for Phase 1)
- OAuth / OIDC (API key auth is sufficient for Phase 1)
- Mobile app
- HIPAA BAA (legal, not technical — needs to be addressed in parallel)
