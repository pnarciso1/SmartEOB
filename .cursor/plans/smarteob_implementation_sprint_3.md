# SmartEOB Implementation Plan - Sprint 3: The Persona Split

## Objective
Split the unified dashboard into two distinct, scalable personas: the **TPA/Admin Command Center** (B2B) and the **Member Portal** (B2C). This split demonstrates the multi-tenant architecture and provides a tailored user experience for each audience.

## 1. Routing Restructure (Scalable Foundations)
We will leverage Next.js App Router dynamic routes to enforce isolation by ID from Day 1.
- `/admin/[tenantId]`: The TPA Command Center.
- `/member/[tenantId]/[memberId]`: The Member Portal.

## 2. The TPA Command Center (`/admin/[tenantId]`)
This dashboard aggregates data across the entire Tenant/TPA.
- **Aggregate Metrics:** Total Discrepancies, Total Dollars Saved, Open Events.
- **Discrepancy Queue:** A data table displaying all `DISPUTED` claims that require Human-in-the-Loop review across the entire tenant.
- **Clearinghouse Simulator (Upload):** Move the "Upload Medical Bill" functionality here. The Admin can select a specific Member from a dropdown and upload a PDF to simulate an inbound claim feed.

## 3. The Member Portal (`/member/[tenantId]/[memberId]`)
This dashboard is patient-centric and empathetic.
- **AI Advocate Card:** A summarized, human-readable status of their financial liability (e.g., "We found a $360 discrepancy. You currently owe $0.").
- **Journey View:** The vertical timeline of their `MedicalEvent`.
- **Recon Table:** The transparent breakdown of Provider Billed vs. Insurance vs. Plan Rules.

## 4. API & Data Layer Updates
- Create an API route `/api/v1/admin/dashboard` to securely fetch aggregate tenant statistics and the Discrepancy Queue.
- Update `/api/v1/events` to ensure it continues to serve the isolated Member View accurately.
- Ensure the White-Label CSS variable injection works cleanly across both route segments based on the `tenantId`.

## User Flow
1. **Admin logs in:** Navigates to `/admin/tpa_a`. Sees high-level metrics and an empty queue.
2. **Admin uploads:** Uses the Clearinghouse Simulator to upload an EOB for "John Doe".
3. **Engine processes:** Vertex AI, Text Embeddings, RAG, and Three-Way Reconciliation run in the background.
4. **Queue populates:** The Admin sees the `DISPUTED` claim appear in their queue.
5. **Admin clicks:** Clicks the claim to deep-link into John Doe's Member Portal (`/member/tpa_a/demo-member-id`).
6. **Member views:** The Admin (or Member) sees the empathetic Journey View and Recon Table proving the AI caught the overcharge.