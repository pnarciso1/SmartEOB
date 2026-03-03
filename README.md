# SmartEOB

An AI-powered healthcare billing transparency platform for TPAs (Third-Party Administrators) and HSA administrators. SmartEOB automatically catches billing discrepancies between provider invoices, insurance EOBs, and employer plan rules — protecting members from overpaying and giving administrators real-time visibility across their entire book of business.

---

## What It Does

**For Members:**
- Upload a provider bill or insurance EOB directly from the member portal
- AI instantly parses the document and verifies every line item against the employer's plan rules
- Transparent three-way reconciliation: Provider Billed vs. Insurance Allowed vs. Plan Rules (the source of truth)
- One-click Agentic Appeal Drafter — Gemini writes a formal dispute letter for any overcharge
- Pre-service Cost Navigator Chat — ask plain-English questions about coverage before visiting a provider
- Proactive Next Best Action — AI recommends the next care coordination step based on recent medical history

**For TPA / HSA Admins:**
- Plan Setup: upload employer plan documents, AI extracts structured coverage rules, manage member rosters
- Operations Dashboard: real-time aggregate metrics (open events, disputes, dollars saved)
- Discrepancy Resolution Queue: every AI-flagged claim surfaces automatically, deep-links into the member's portal
- Multi-tenant with white-label theming per TPA

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL on Google Cloud SQL with pgvector extension |
| ORM | Prisma 5 |
| AI / LLM | Google Vertex AI — Gemini 2.0 Flash |
| Embeddings | Vertex AI text-embedding-004 (via REST) |
| Styling | Tailwind CSS with CSS variable multi-tenant theming |
| Deployment | Vercel (production) |
| Icons | Lucide React |

---

## Architecture

```
Member uploads bill
        │
        ▼
POST /api/v1/claims/ingest
        │
        ├─ Gemini 2.0 Flash parses PDF/image → structured claim JSON
        ├─ text-embedding-004 generates semantic vector
        ├─ pgvector cosine similarity clusters claim into existing MedicalEvent
        ├─ Employer Plan RAG: Gemini adjudicates planRuleAmount from planRules JSON
        └─ Three-Way Reconciliation: providerBilled vs insuranceAllowed vs planRuleAmount
                │
                ▼
        Claim saved to PostgreSQL (status: DISPUTED / VERIFIED)
                │
        ┌───────┴────────┐
        ▼                ▼
  Member Portal      Admin Queue
  Journey View       auto-populates
  Recon Table
  Appeal Drafter
```

---

## Project Structure

```
src/
├── app/
│   ├── admin/[tenantId]/page.tsx        # TPA Command Center (Operations + Plan Setup tabs)
│   ├── member/[tenantId]/[memberId]/    # Member Portal (upload, journey, recon, appeal, chat)
│   ├── login/page.tsx                   # Demo login / persona selector
│   └── api/v1/
│       ├── events/route.ts              # GET member medical events + claims
│       ├── claims/
│       │   ├── ingest/route.ts          # POST full AI ingestion pipeline
│       │   └── appeal/route.ts          # POST Gemini appeal letter drafter
│       ├── admin/
│       │   ├── dashboard/route.ts       # GET aggregate TPA metrics + dispute queue
│       │   └── plan-setup/route.ts      # GET employer groups + member rosters
│       └── member/
│           ├── chat/route.ts            # POST RAG-powered cost navigator chat
│           └── next-action/route.ts     # GET AI proactive care recommendation
├── components/
│   ├── JourneyView.tsx                  # Timeline visualization of a medical event
│   ├── ReconTable.tsx                   # Three-way financial reconciliation table
│   └── CostNavigatorChat.tsx            # Floating AI chat widget
└── lib/
    ├── prisma.ts                        # Shared PrismaClient singleton
    ├── embeddings.ts                    # Vertex AI text-embedding-004 REST calls
    ├── rag.ts                           # Employer Plan RAG using Gemini
    ├── clustering.ts                    # pgvector cosine similarity event clustering
    └── reconciliation.ts               # Three-way reconciliation engine (pure logic)

prisma/
├── schema.prisma                        # Database schema (Tenant, Employer, Member, Event, Claim)
└── seed.ts                              # Seeds demo tenant, employer (Unity Global Care), member (Dave Duplay)
```

---

## Environment Variables

### Required for all environments

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Cloud SQL) |
| `VERTEX_PROJECT_ID` | GCP project ID (e.g. `smarteob-multi-tenant`) |
| `GOOGLE_CREDENTIALS_JSON` | Full GCP service account key JSON as a single-line string (Vercel / serverless) |

### Local development only

| Variable | Description |
|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to local `gcp-key.json` file (falls back to this if `GOOGLE_CREDENTIALS_JSON` is absent) |

Create a `.env` file in the project root (never commit it):

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
GOOGLE_APPLICATION_CREDENTIALS="./gcp-key.json"
VERTEX_PROJECT_ID="your-gcp-project-id"
```

---

## Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Seed the database (sets up demo tenant, employer, member)
npx ts-node prisma/seed.ts

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

Set the following environment variables in the Vercel dashboard (Settings → Environment Variables):

- `DATABASE_URL`
- `VERTEX_PROJECT_ID`
- `GOOGLE_CREDENTIALS_JSON` — the contents of your GCP service account JSON file as a single-line string

Then deploy:

```bash
vercel --prod
```

---

## Database Schema

| Model | Purpose |
|---|---|
| `Tenant` | TPA organization (slug-based routing, white-label theming) |
| `EmployerGroup` | Employer client of the TPA (holds `planRules` JSON + vector embedding) |
| `Member` | Individual covered under an employer's plan |
| `MedicalEvent` | A grouped cluster of related claims (e.g. "Emergency Fall & Recovery") |
| `Claim` | Single line item: amounts, status (PENDING/VERIFIED/DISPUTED/PAID), pgvector embedding |

---

## Demo URLs

| Role | URL |
|---|---|
| TPA Admin | `https://smart-eob.vercel.app/admin/tpa_a` |
| Member Portal | `https://smart-eob.vercel.app/member/tpa_a/demo-member-id` |

---

## Demo Seed Data

- **Tenant:** Northwest HSA Admin (`tpa_a`)
- **Employer:** Unity Global Care
- **Member:** Dave Duplay (`demo-member-id`)
- **Plan rules:** $1,000 deductible · $800 ER copay · $0 Ambulance · $50 Specialist · $25 PCP · 80% coinsurance
