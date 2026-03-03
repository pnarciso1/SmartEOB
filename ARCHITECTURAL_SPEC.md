Technical Architecture: Multi-Tenant Smart EOB Agent
1. Multi-Tenant Data Model
To prevent re-factoring, the system uses a Shared Database, Isolated Schema approach.

Tenants (TPAs): Top-level entities (e.g., "Northwest HSA Admin").

Groups (Employers): Entities under a Tenant (e.g., "ACME Corp").

Users (Members): Belong to a Group.

Key Database Tables (PostgreSQL):
tenants: id, name, api_key_hash, theme_config (JSON).

employer_groups: id, tenant_id, name, plan_doc_ref.

medical_events: id, tenant_id, member_id, status (Open/Resolved).

claims: id, tenant_id, event_id, raw_json, verification_status.

2. The Ingestion Pipeline (Vertex AI)
Context Loading: System fetches the specific plan_doc_vector associated with the employer_id.

Document Parsing: Gemini 1.5 Pro extracts JSON from the uploaded EOB.

Three-Way Reconciliation: The Agent compares:

Provider Invoice (Extracted).

Payer EOB (Extracted).

Plan Benefit Rule (Retrieved via RAG from the Tenant's Plan Doc).

3. API-First Layer
All logic is served via /api/v1/ routes to allow the Frontend Portal and 3rd-party Fintech partners to use the same engine.

File 3: DESIGN_SYSTEM.md (Revised)
Design System: White-Label Ready UI
1. Dynamic Branding
Use CSS Variables for primary, secondary, and accent colors.

These variables must be populated by the tenant_config API on load.

2. Event-Centric Dashboard
The Journey View: A vertical timeline of a "Medical Event."

Family Filtering: Multi-member support within the same Tenant account.

The "Recon Table": A 4-column layout (Provider | Insurance | Plan Rule | Verdict).