# Healthcare Smart EOB Platform - Multi-Tenant Cursor Rules

## 1. Multi-Tenancy Architecture
- EVERY database table must include `tenant_id` (UUID) and `employer_id` (UUID).
- ALWAYS include a WHERE clause for `tenant_id` in all SELECT, UPDATE, and DELETE operations.
- The UI must derive branding (logo, colors) from a `tenant_config` object fetched at session start.

## 2. Technical Stack (GCP-Native)
- LLM: Gemini 1.5 Pro via Vertex AI.
- Database: Cloud SQL PostgreSQL (GCP) with `pgvector` for claim clustering.
- API: Next.js Route Handlers (App Router) architected for API-First consumption.

## 3. Domain Logic
- Distinguish between "Plan Rules" (The contract) and "EOBs" (The transaction).
- Group claims into 'Medical Events' using temporal and diagnostic semantic similarity.
- Logic: If Discrepancy Found -> State = BLOCKED; If Match -> State = VERIFIED.