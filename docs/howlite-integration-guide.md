# SmartEOB Integration Guide
**Client:** Howlite Healthcare  
**Version:** 1.0  
**Date:** March 2026  
**Contact:** SmartEOB Engineering Team

---

## Overview

SmartEOB provides three AI-powered features that embed directly into your existing member portal. Your portal calls SmartEOB's REST API and renders the responses in your own UI.

### How It Works

1. **On member login** — your portal sends the member's FHIR data to SmartEOB once. SmartEOB caches it for 24 hours.
2. **Button clicks** — each of the three buttons makes a lightweight API call referencing the member's ID. SmartEOB retrieves the cached context and returns a structured JSON response for you to render.
3. **If a dispute is found** — the API response includes a `disputeUrl`. When the member clicks it, they are taken to the SmartEOB portal to manage the dispute, track status, and receive AI-drafted appeal letters.

---

## Base URL

```
https://smart-eob.vercel.app
```

---

## Authentication

All requests must include your API key in the request header:

```
X-SmartEOB-Key: hsk_live_howlite_2026_smarteob
```

Requests without this header return `401 Unauthorized`.  
Requests with an invalid key return `403 Forbidden`.

> **Keep this key secret.** Do not expose it in client-side JavaScript. All SmartEOB API calls should be made from your backend/server.

---

## Step 1 — Sync Member Data (On Login)

Call this endpoint once when a member logs into your portal, or whenever their FHIR data is refreshed.

### `POST /api/v1/client/sync`

**Purpose:** Cache the member's complete FHIR health record in SmartEOB. Required before any button call will work.

**Request Headers:**
```
Content-Type: application/json
X-SmartEOB-Key: hsk_live_howlite_2026_smarteob
```

**Request Body:**
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "resources": {
    "eob":              { },
    "coverage":         { },
    "patient":          { },
    "conditions":       [ ],
    "medications":      [ ],
    "allergies":        [ ],
    "encounters":       [ ],
    "procedures":       [ ],
    "immunizations":    [ ],
    "diagnosticReports":[ ],
    "goals":            [ ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `hsaUserId` | `string` | Your internal member identifier (MongoDB ObjectId). This is the key SmartEOB uses to link all subsequent calls for this member. |
| `resources.eob` | FHIR Bundle | `ExplanationOfBenefit` bundle from CMS Blue Button + Aetna |
| `resources.coverage` | FHIR Bundle | `Coverage` bundle from CMS Blue Button 2.0 (Parts A, B, D) |
| `resources.patient` | FHIR Bundle | `Patient` bundle from CMS Blue Button 2.0 |
| `resources.conditions` | FHIR Resource[] | `Condition` array from Epic FHIR |
| `resources.medications` | FHIR Resource[] | `MedicationRequest` array from Epic FHIR |
| `resources.allergies` | FHIR Resource[] | `AllergyIntolerance` array from Epic FHIR |
| `resources.encounters` | FHIR Resource[] | `Encounter` array from Epic FHIR |
| `resources.procedures` | FHIR Resource[] | `Procedure` array from Epic FHIR |
| `resources.immunizations` | FHIR Resource[] | `Immunization` array from Epic FHIR |
| `resources.diagnosticReports` | FHIR Resource[] | `DiagnosticReport` array from Epic FHIR |
| `resources.goals` | FHIR Resource[] | `Goal` array from Epic FHIR |

**Success Response `200`:**
```json
{
  "success": true,
  "syncedAt": "2026-03-27T10:00:00.000Z"
}
```

**Notes:**
- Missing resources will be logged as warnings but will not cause failure
- Cached data expires after **24 hours** — re-sync on each login to keep it fresh
- Syncing the same `hsaUserId` again overwrites the previous cache

---

## Step 2 — Button 1: Review My Bill

### `POST /api/v1/client/review-claim`

**Purpose:** Analyze a specific insurance claim for billing discrepancies, overbilling, or coordination of benefits issues.

**Request Body:**
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "claimId": "EOB-2025-001"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `hsaUserId` | `string` | Member identifier (same as used in `/sync`) |
| `claimId` | `string` | The claim ID from the EOB resource (`ExplanationOfBenefit.id`) |

**Response — No Discrepancy Found `200`:**
```json
{
  "success": true,
  "data": {
    "verdict": "CLEAN",
    "claimId": "EOB-2025-001",
    "providerName": "Metro General Hospital",
    "serviceDate": "2025-11-01",
    "billedAmount": 240.00,
    "allowedAmount": 240.00,
    "discrepancy": null,
    "recommendation": "This claim appears accurate. The billed amount of $240.00 is consistent with your Medicare Part B coverage and the services documented in your medical record."
  }
}
```

**Response — Discrepancy Found `200`:**
```json
{
  "success": true,
  "data": {
    "verdict": "DISCREPANCY_FOUND",
    "claimId": "EOB-2025-001",
    "providerName": "Metro General Hospital",
    "serviceDate": "2025-11-01",
    "billedAmount": 1240.00,
    "allowedAmount": 890.00,
    "discrepancy": {
      "difference": 350.00,
      "reason": "CPT code 99214 billed at facility rate ($1,240); your Medicare Part B plan allows the office visit rate only ($890). Overage of $350 identified.",
      "severity": "HIGH"
    },
    "recommendation": "We found a potential overbilling of $350.00. This claim should be disputed.",
    "disputeUrl": "https://smart-eob.vercel.app/dispute/initiate?token=eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

**Rendering Instructions:**

- If `verdict === "CLEAN"`: Show a green confirmation with `recommendation` text
- If `verdict === "DISCREPANCY_FOUND"`: Show an alert with `discrepancy.reason`, the dollar difference, and a **"Review Dispute"** button that opens `disputeUrl`

> **Important:** The `disputeUrl` is a signed, time-limited link (expires in 48 hours). When the member clicks it, they will be taken to the SmartEOB portal to manage their dispute. You do not need to build any dispute UI — SmartEOB handles it entirely.

---

## Step 3 — Button 2: Ask a Question

### `POST /api/v1/client/chat`

**Purpose:** Answer member questions about their coverage, benefits, medications, and claims using their full health record as context.

**Request Body:**
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "message": "Is my metformin covered under Part D?",
  "conversationHistory": []
}
```

| Field | Type | Description |
|-------|------|-------------|
| `hsaUserId` | `string` | Member identifier |
| `message` | `string` | The member's question |
| `conversationHistory` | `array` | Pass the `conversationHistory` from the previous response to maintain multi-turn conversation. Pass `[]` to start a new conversation. |

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "reply": "Yes, metformin is covered under your Medicare Part D plan (Aetna Medicare Rx). It is on the preferred generic formulary (Tier 1), meaning your copay should be $0–$5 for a 30-day supply at a preferred pharmacy. You are currently prescribed Metformin 500mg twice daily.",
    "conversationHistory": [
      { "role": "user", "parts": [{ "text": "Is my metformin covered under Part D?" }] },
      { "role": "model", "parts": [{ "text": "Yes, metformin is covered..." }] }
    ]
  }
}
```

**Rendering Instructions:**

- Display `reply` as the AI's response in your chat UI
- Save `conversationHistory` in your frontend state and pass it back on the next message for multi-turn conversation
- To start a new conversation, pass `conversationHistory: []`

**Example Questions Members Can Ask:**
- "What is my deductible status?"
- "Do I need a referral to see a cardiologist?"
- "Why was this lab test billed to me?"
- "What is my copay for a specialist visit?"
- "Is Lipitor covered under my plan?"

---

## Step 4 — Button 3: Prepare for My Visit

### `POST /api/v1/client/care-prep`

**Purpose:** Generate a personalized appointment preparation package for an upcoming medical visit.

**Request Body:**
```json
{
  "hsaUserId": "69a9a6edf51ab19231a46b9d",
  "appointmentType": "Primary Care Follow-up",
  "appointmentDate": "2026-04-15",
  "providerName": "Dr. Sarah Chen"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hsaUserId` | `string` | Required | Member identifier |
| `appointmentType` | `string` | Optional | Type of visit (e.g., "Specialist", "Surgery Pre-op", "Annual Physical") |
| `appointmentDate` | `string` | Optional | ISO date string |
| `providerName` | `string` | Optional | Provider's name |

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "prepPackage": {
      "summary": "This follow-up with Dr. Chen is a good opportunity to review your Type 2 Diabetes management and discuss your HbA1c goal, which hasn't been checked in 4 months.",
      "keyConditions": [
        "Type 2 Diabetes (E11.9)",
        "Hypertension (I10)"
      ],
      "medicationsToReview": [
        "Metformin 500mg twice daily",
        "Lisinopril 10mg once daily"
      ],
      "outstandingGoals": [
        "HbA1c target < 7.0% — last measured 4 months ago"
      ],
      "questionsToAsk": [
        "My HbA1c hasn't been checked in 4 months — should we order labs today?",
        "Are there any prior authorizations needed for my upcoming cardiology referral?",
        "Should I adjust my Metformin dosage given my recent kidney function results?"
      ],
      "estimatedCopay": "$25 (primary care copay per your Aetna plan)",
      "priorAuthRequired": false,
      "priorAuthNote": null,
      "thingsToBring": [
        "Photo ID and insurance cards",
        "List of current medications",
        "Any recent lab results from other providers"
      ],
      "recentLabsToDiscuss": [
        "Comprehensive metabolic panel — Oct 2025"
      ]
    }
  }
}
```

**Rendering Instructions:**

- Display `summary` as the intro
- Render `questionsToAsk` as a checklist the member can bring to the appointment
- Show `estimatedCopay` prominently
- If `priorAuthRequired === true`, show a warning with `priorAuthNote`

---

## Error Handling

All endpoints return standard HTTP status codes:

| Status | Meaning | Action |
|--------|---------|--------|
| `200` | Success | Process the response |
| `400` | Bad request | Check request body for missing fields |
| `401` | Missing API key | Add `X-SmartEOB-Key` header |
| `403` | Invalid API key | Verify the key value |
| `404` | Member not found | Call `/sync` first before button calls |
| `500` | Server error | Retry after a short delay; contact SmartEOB support |

**Error Response Format:**
```json
{
  "error": "No FHIR context found for this member. Please call /sync first."
}
```

---

## Integration Flow Summary

```
Member logs in to Howlite portal
          │
          ▼
POST /api/v1/client/sync
(send all 11 FHIR resources)
          │
          ▼
Member navigates to their claims page
          │
    ┌─────┴──────────────────┐
    │                        │
    ▼                        ▼
[Review My Bill]      [Ask a Question]
POST /review-claim    POST /chat
    │                        │
    │ verdict:               │ reply:
    │ DISCREPANCY_FOUND      │ AI answer
    │                        │
    ▼
  Show disputeUrl button
          │
          ▼
  Member clicks → SmartEOB portal
  (dispute tracked, appeal drafted,
   status managed — no work for you)
```

---

## Sample Implementation (JavaScript / Node.js)

```javascript
const SMARTEOB_BASE_URL = 'https://smart-eob.vercel.app';
const SMARTEOB_API_KEY  = process.env.SMARTEOB_API_KEY; // store securely server-side

async function smarteobRequest(endpoint, body) {
  const res = await fetch(`${SMARTEOB_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-SmartEOB-Key': SMARTEOB_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`SmartEOB API error ${res.status}: ${err.error}`);
  }

  return res.json();
}

// 1. On member login — sync FHIR data
async function onMemberLogin(hsaUserId, fhirResources) {
  await smarteobRequest('/api/v1/client/sync', {
    hsaUserId,
    resources: fhirResources,
  });
}

// 2. Button 1 — Review a claim
async function reviewClaim(hsaUserId, claimId) {
  const result = await smarteobRequest('/api/v1/client/review-claim', {
    hsaUserId,
    claimId,
  });
  return result.data;
  // result.data.verdict === 'DISCREPANCY_FOUND' → show result.data.disputeUrl
}

// 3. Button 2 — Chat
async function sendChatMessage(hsaUserId, message, conversationHistory = []) {
  const result = await smarteobRequest('/api/v1/client/chat', {
    hsaUserId,
    message,
    conversationHistory,
  });
  return result.data;
  // result.data.reply → display to user
  // result.data.conversationHistory → save for next turn
}

// 4. Button 3 — Care prep
async function getAppointmentPrep(hsaUserId, appointmentDetails) {
  const result = await smarteobRequest('/api/v1/client/care-prep', {
    hsaUserId,
    ...appointmentDetails,
  });
  return result.data.prepPackage;
}
```

---

## Required FHIR Resource Mapping

The `resources` object in the sync call should map directly from your existing FHIR export files:

| `resources` key | Your file | FHIR Resource Type |
|-----------------|-----------|-------------------|
| `eob` | `01-healthcare-claims-eob.json` | `ExplanationOfBenefit` Bundle |
| `coverage` | `02-coverage-info.json` | `Coverage` Bundle |
| `patient` | `03-patient-info.json` | `Patient` Bundle |
| `conditions` | `04-conditions.json` | `Condition[]` |
| `medications` | `05-medications.json` | `MedicationRequest[]` |
| `allergies` | `06-allergies.json` | `AllergyIntolerance[]` |
| `encounters` | `07-encounters.json` | `Encounter[]` |
| `procedures` | `08-procedures.json` | `Procedure[]` |
| `immunizations` | `09-immunizations.json` | `Immunization[]` |
| `diagnosticReports` | `10-diagnostic-reports.json` | `DiagnosticReport[]` |
| `goals` | `11-goals.json` | `Goal[]` |

---

## Dispute Portal — What Your Members See

When a member clicks a `disputeUrl`, they are redirected to the SmartEOB member portal where they can:

- View the full dispute details and the AI's analysis
- Read and edit an AI-drafted formal appeal letter
- Track dispute status (`Open → Appeal Drafted → Submitted → Resolved`)
- View their full claim history and spending summary
- Access AI-powered health and cost optimization insights

**You do not need to build any of this.** SmartEOB handles the entire dispute lifecycle. The member authenticates with their Google account or email and the dispute is automatically linked to their profile.

---

## Testing

Use these credentials to test the integration in your development environment:

| Setting | Value |
|---------|-------|
| Base URL | `https://smart-eob.vercel.app` |
| API Key | `hsk_live_howlite_2026_smarteob` |
| Test Member ID | `test-member-howlite-001` |

**Recommended test sequence:**
1. Call `/sync` with the sample FHIR data from your sandbox
2. Call `/review-claim` with a claim ID from the synced EOB — verify verdict response
3. Call `/chat` with the question "What medications am I currently taking?" — verify personalized response
4. Call `/care-prep` with any appointment details — verify prep package
5. Take the `disputeUrl` from step 2 (if a discrepancy was found) and open it in a browser — verify the SmartEOB portal dispute flow

---

## Support

For integration questions, issues, or to rotate API keys, contact the SmartEOB engineering team.

All API calls are logged server-side for debugging. Include the `hsaUserId` and approximate timestamp when reporting issues.
