# SmartEOB — Howlite Integration: Open Issues & Resolutions
**Date:** March 2026  
**Status:** Pending client confirmation on Question 2 (Option A prerequisites)

---

## Issue 1 — Timeout Recommendation for Bill Review

### Client Question
> "At 10s, most reviews were completed, but a few users with more claims were not. Bumping the timeout to 30s cleared this issue; we would like to understand the ideal timeout settings."

### Root Cause
The `POST /api/v1/client/review-claim` endpoint processes the full EOB bundle plus conditions and procedures through Google Vertex AI (Gemini 2.0 Flash). Members with a larger claims history produce larger payloads, which require more model inference time. The variance between members is directly proportional to the number of claims in their EOB bundle.

### Recommendation

| Endpoint | Recommended Timeout |
|----------|-------------------|
| `POST /api/v1/client/sync` | 10 seconds |
| `POST /api/v1/client/review-claim` | **30 seconds** |
| `POST /api/v1/client/chat` | 10 seconds |
| `POST /api/v1/client/care-prep` | **30 seconds** |

**Rationale:** 99th percentile inference time for Gemini 2.0 Flash on a typical EOB payload is 15–20 seconds. 30 seconds provides comfortable headroom without being a poor user experience. Beyond 30 seconds, something is genuinely wrong (network issue, model degradation) and the user should be shown an error.

### Future Improvements (Pending Approval)
Two options to improve perceived performance without increasing timeout:

1. **Streaming response** — The endpoint streams analysis tokens back as they are generated, so the client UI can begin rendering the result in real time rather than waiting for the full response. Makes the experience feel significantly faster at the same actual latency.

2. **Status polling** — Add a lightweight `GET /api/v1/client/review-claim/status?jobId=xxx` endpoint. The initial call returns immediately with a `jobId`, and the client polls every 2 seconds for completion. Allows the UI to show a meaningful progress indicator instead of a frozen spinner.

**Status:** Timeout guidance communicated to client. Streaming / polling improvements pending SmartEOB approval before building.

---

## Issue 2 — Dispute Login Friction (Member Authentication)

### Client Question
> "After review, there is a link to Review Dispute that takes a user to smart-eob.vercel.app. I tried logging in with the same user but errored out. Are there APIs to bring in the review functionality within the SmartHSA app? Or how can we pass these credentials over?"

### Root Cause
The `disputeUrl` returned by `review-claim` currently redirects the member to the SmartEOB portal, which requires a separate Clerk authentication step. The member has no existing SmartEOB account, causing the login to fail.

### Options Evaluated

**Option A — Magic Link SSO via Member Email (Recommended)**  
When Howlite passes the member's email in the `review-claim` request, SmartEOB generates a Clerk magic link and embeds it in the `disputeUrl`. The member clicks the link and lands directly in the SmartEOB dispute portal — already authenticated, no login screen.

- **Member experience:** Click "Review Dispute" → land on dispute page instantly, no separate login
- **Change for Howlite:** Add one field (`memberEmail`) to the `review-claim` request body
- **Change for SmartEOB:** Modify dispute token generation to include email and issue a Clerk magic link
- **Security:** Link is single-use, expires in 48 hours, signed JWT

**Option B — Fully Embedded Dispute APIs**  
Expose additional REST endpoints for dispute creation, status tracking, and appeal letter generation. Howlite builds and renders the dispute UI entirely within SmartHSA.

- **Member experience:** Never leaves SmartHSA
- **Change for Howlite:** Build dispute UI (significant frontend work)
- **Change for SmartEOB:** Build 4+ new API endpoints for dispute lifecycle management
- **Tradeoff:** More work for both teams; Howlite takes on maintenance of a sensitive financial UI. Appropriate if white-labeling is a longer-term goal.

**Option C — iFrame Embed**  
The `disputeUrl` opens inside an iFrame within SmartHSA.

- **Not recommended:** iFrames break on mobile, have accessibility issues, and Clerk's authentication flow does not work reliably inside an iFrame context.

### Decision
**Proceeding with Option A (Magic Link SSO).** Minimal change for the client, zero friction for the member, preserves SmartEOB portal as the dispute management destination.

---

## Option A — Prerequisites from Howlite

Before implementation, the following must be confirmed by the Howlite team:

### Required Change
Add `memberEmail` to the `review-claim` request body:

```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "claimId": "EOB-2025-001",
  "memberEmail": "jane.smith@email.com"
}
```

### Confirmation Required

**1. Email availability at call time**  
Can Howlite reliably attach the authenticated member's email address to the server-side `review-claim` API call? The email must be available in the backend request context (e.g., from the member's active session or JWT). If it requires a separate database lookup, that is acceptable as long as it can be done synchronously before the API call.

> If the email cannot be reliably provided, Option A is not viable and we will revisit Option B.

**2. Email consistency with sign-in method**  
Is the email on the member's Howlite account the same address they would use for Google sign-in or email-based login on SmartEOB? A mismatch (e.g., corporate SSO email vs. personal Gmail) would result in the member having two separate SmartEOB identities.

**3. Dispute link behavior**  
Should the `disputeUrl` open in the **same tab** (member navigates away from SmartHSA) or a **new tab** (member stays in SmartHSA context)? Either is technically supported — this is a UX/product decision for Howlite.

---

## Next Steps

| Action | Owner | Dependency |
|--------|-------|-----------|
| Confirm email availability at `review-claim` call time | Howlite Engineering | — |
| Confirm email consistency with sign-in identity | Howlite Product | — |
| Confirm same tab vs. new tab preference | Howlite Product | — |
| Implement Option A (magic link in disputeUrl) | SmartEOB Engineering | Howlite confirmation above |
| Update integration guide with new `memberEmail` field | SmartEOB Engineering | After implementation |
| Update timeout documentation in integration guide | SmartEOB Engineering | Done — communicated verbally |
