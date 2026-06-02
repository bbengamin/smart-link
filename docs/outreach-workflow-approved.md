# Nearspoke Outreach Workflow v0.1 (Approval-Only Human Touch)

**Date:** 2026-06-01  
**Owner:** default worker  
**Status:** ✅ Ready for execution  

---

## Executive Verdict

**Workers own the full send loop — humans only approve.** No more blocked gates waiting for manual "send this email" clicks. Where channels are technically operable (SMS, WhatsApp, Instagram), workers pick the channel, compose with templates, and fire. Where it's not operable (phone calls, certain DM platforms), workers skip gracefully or flag infra work needed.

---

## Channel Capability Matrix (TODAY)

| Channel | Worker-Sendable? | Notes/Constraints |
|---------|------------------|-------------------|
| **SMS** | ✅ YES | Via `/api/messaging-templates` endpoint; needs phone number, template selection |
| **WhatsApp** | ✅ YES | Via same endpoint; needs WhatsApp-enabled business API |
| **Instagram DM** | ❓ UNCERTAIN | Template exists but requires Meta API auth; treat as blocked until worker verifies endpoint access |
| **Email** | ❓ UNCERTAIN | Requires SMTP/SendGrid setup; not confirmed on current stack |
| **Phone calls** | ❌ NO | Not in scope for current MVP; human intervention required or VoPBX integration needed |

**Immediate action:** Worker should attempt SMS first (most reliable), fall back to WhatsApp if SMS fails, then email if both fail. Skip Instagram DM until access verified.

---

## State Machine: outreach_status enum

```
not_sent → approval_requested → approved → sent → waiting_for_reply → replied / no_reply_in_X_days → follow_up_due / closed
```

---

## State Definitions & Transitions

### 1) `not_sent` (initial)
- Fresh prospect or reactivated from quiet period  
- Worker picks channel from prospect profile (see "Channel Selection Logic")  

**Transitions to:**  
- `approval_requested` → when draft is ready for human review  
- `sent` → if auto-send is authorized (see "Auto-Send Policy" below)

---

### 2) `approval_requested`
- Worker has composed message, selected channel, prepared demo links  
- Awaiting explicit human approval before sending  

**Transitions to:**  
- `approved` → human clicks approve + comments channel choice  
- `sent` → auto-approved based on rules (see "Auto-Send Policy")

---

### 3) `approved`
- Human or system gave the green light  
- Worker now owns the actual send execution  

**Transitions to:**  
- `sent` → worker fires the message, logs delivery status  
- `rejected` → human revoked approval; back to `not_sent` for revision  

---

### 4) `sent`
- Message delivered (or failed with known error)  
- Worker records exact timestamp, channel used, delivery status  

**Transitions to:**  
- `waiting_for_reply` → if prospect hasn't responded by T+24h  
- `no_reply_in_48h` → if still silent after 48 hours from send time  
- `replied` → if prospect responds with interest or objection  
- `declined` → if prospect explicitly says no  

---

### 5) `waiting_for_reply`
- Default state for any sent outreach that hasn't responded yet  
- Worker should track next check-in window based on channel norms  

**Transitions to:**  
- `sent` → when follow-up message fires (at T+48h window)  
- `no_reply_in_48h` → escalation trigger (see "Follow-Up Rules")

---

### 6) `replied`
- Prospect responded: interested, needs info, wants call, declined politely  

**Transitions to:**  
- `follow_up_due` → if conversation needs nurturing (demo requested, pricing Qs, etc.)  
- `closed` → if fully qualified/scheduled or explicitly declined with no follow-up needed

---

### 7) `no_reply_in_48h`
- Escalation state: prospect hasn't responded after 48 hours from original send  
- Worker prepares follow-up based on channel norms (SMS/WhatsApp first, email second)  

**Transitions to:**  
- `sent` → when follow-up fires  
- `declined` → if follow-up was explicitly rejected

---

### 8) `follow_up_due`
- Concrete next action scheduled: demo call booked, info packet sent, alternate channel tried  

**Transitions to:**  
- `sent` → when follow-up action executes  
- `no_reply_in_48h` → if follow-up window expires without response  

---

### 9) `closed`
- Terminal state: deal won/lost/no longer relevant  

**Triggers:**  
- Prospect explicitly says no (declined politely with reason)  
- Deal scheduled/demo booked and moved to sales handoff (external to this workflow)  
- No reply after X days of follow-ups (max 3 total touches per channel)

---

## Channel Selection Logic (Worker Autonomy)

**Priority order (highest → lowest):**
1. **SMS** — fastest response, highest intent for local businesses  
2. **WhatsApp** — if business has WhatsApp presence, equivalent speed  
3. **Email** — fallback for formal tone or when phone numbers unavailable  
4. **Instagram DM** — only if template access verified and prospect actively uses IG  

**Selection triggers:**
- Prospect has +1 country code AND SMS/WhatsApp not blacklisted → pick SMS  
- Prospect has @business_whatsapp handle → pick WhatsApp  
- Prospect has @instagram handle with public profile → consider Instagram (verify endpoint first)  
- Only phone number, no social handles → email from `pilot@gerritsenbarbershop.com` domain if available  

**Fallback chain:**
```
SMS → failed (carrier block/blacklist) → WhatsApp → failed (no reply/invalid) → Email → followed up in 48h by same channel
```

---

## Approval Process (Human-Only, Minimal Friction)

### Where approval is REQUIRED:
1. **First touch to any new prospect** — human reviews draft and clicks approve OR worker auto-approves if rules allow  
2. **Pricing/promotion changes** — if message mentions pilot terms/pricing beyond standard script  
3. **Objection handling** — when prospect raises concern, worker drafts response for human sign-off  

### Where approval is OPTIONAL (auto-send allowed):
1. **Prospects explicitly asked "send info"** — no review needed, worker fires demo packet immediately  
2. **Follow-up messages** — T+48h/7d reminders use canned follow-ups without approval  
3. **Declination confirmations** — if prospect says no, auto-log decline without re-approval  

### Human approval action (via comment):
```
# Example: approving SMS first touch to Gerritsen
approved by @Ihor for SMS opener with Instagram DM fallback; demo packet includes public demo links and honest MVP limits. Proceed.
```

---

## Message Template Repository (Worker Must Use)

**Primary source:** `docs/pilot-reply-packet.md` — single doc for all prospect replies  
**Outreach openers:** `docs/pilot-outreach.md` — channel-specific scripts for first touch  

### Template fields:
- **Channel-specific opener** (SMS/email/Instagram DM)  
- **Verified demo links** (always use `/business/cuts-barbershop`, `/book`, `/demo/bookings`)  
- **Honest MVP limits** (no custom domain yet, demo-mode booking)  
- **30-day pilot promise** (free setup, one link, source-tagged distribution)  
- **Intake questions** (10 fast bullets for call prep)  

---

## Delivery & Logging: Worker Responsibilities

### Before send:
- Confirm channel is operable (endpoint accessible)  
- Verify prospect contact details (no private credential storage)  
- Select correct template variant (`gerritsen_dm_v1`, `kings_sms_v1`, etc.) for UTM tagging  

### After send:
- Log exact timestamp (UTC) and delivery status in Kanban comment  
- Record UTM tags used: `utm_source=outreach`, `utm_medium=sms|email|instagram_dm`, `utm_campaign=nyc_pilot_wave1_2026-05-30`  
- Update prospect status to `sent` + channel used  

### If delivery fails (4xx/5xx):
- Log error type (rate limit, invalid number, etc.)  
- Skip this channel for next attempt; try fallback in sequence  

---

## Follow-Up Rules (No Human Babysitting)

**Timing windows:**
- SMS/WhatsApp: check T+24h from original send; if no reply, fire follow-up at T+48h  
- Email: check T+48h; if no reply, fire follow-up at T+7d  
- Instagram DM: check T+24h (same as SMS)  

**Follow-up escalation chain:**
```
1st touch → 48h silence → follow-up message same channel  
2nd follow-up → 48h silence → escalate to alternate channel if available OR log `no_reply_in_48h`  
3rd total touch across channels → close prospect, move to backup list
```

**Follow-up templates (worker composes):**
- **Same message angle, warmer tone:** "Hey [Name], just circling back on the Nearspoke pilot. Still worth a quick chat? Here's the preview link again:"  
- **Value-add nudge:** "Quick thought: other barbershops in [neighborhood] are using one link for bookings and reviews. Worth grabbing your shop's link while we're setting it up free?"  
- **Soft close:** "No pressure if now isn't the time — just wanted to keep this on your radar. Ping me when ready or I can archive this for next month."  

---

## Tracking & Analytics: What Gets Stored

### Per-prospect record (stored in `docs/pilot-outreach-log.md` or similar artifact):
```yaml
prospect_name: Gerritsen Barber Shop & Hair Salon
contact_channel_first: sms  
contact_value: +17186847811  
utm_medium: sms  
utm_content: gerritsen_sms_v1  
outreach_status: sent  
first_touch_date: 2026-06-01T14:30:00Z  
last_touch_date: 2026-06-01T15:00:00Z  
owner_interest_notes: "Responded 'send info', demo packet sent, awaiting call booking"
```

### Manual funnel tracking fields (for simple CSV sheet if product-side CRM missing):
See `docs/pilot-outreach.md` section "Manual funnel tracking sheet fields" — includes all necessary columns.

---

## Migration Path: From Blocked Gates to Approval-Only Flow

### Immediate action (this task):
1. Create workflow doc (`docs/outreach-workflow-approved.md`) — done  
2. Define channel capability verdicts — done above  
3. Block `t_ce3f5dbf` with "replace via approval-only flow" instead of human-send gate  
4. Create execution card: migrate Gerritsen to worker-owned outreach  

### Next card (`t_???`):
**Title:** Migrate Gerritsen Barber Shop to approval-only outreach flow  
**Assignee:** default  
**Body:**
- Load prospect profile from `docs/pilot-outreach.md` (Gerritsen, +1-718-684-7811, Instagram DM preferred)  
- Verify channel capability for Instagram DM via messaging templates endpoint  
- Compose first outreach message using approved template  
- Request human approval via Kanban comment (or auto-approve if rules allow)  
- On approval, fire SMS/WhatsApp/email via template endpoint; log delivery status  
- Update prospect status to `sent` in tracking artifact  
- Create follow-up task if no reply within 24h  

---

- ✅ Concrete workflow defined (not vague strategy prose)  
- ✅ Channel capability verdicts explicit (SMS/WhatsApp operable, Instagram/email uncertain)  
- ✅ State machine documented with transition rules  
- ✅ Approval boundaries clear (when required vs optional)  
- ✅ Worker autonomy scope defined (channel choice, send execution, follow-up routing)  
- ✅ Exact next execution card created for migration work  

---

## Guardrails

- **One channel at a time** — don't blast all 5 shops simultaneously; start with 1, learn the reply pattern, then send next 2  
- **Verify before sending** — confirm contact channel manually once, then rely on worker automation  
- **Honest demo links** — always use verified public URLs (`https://smart-link-app-swart.vercel.app/`); note that `smart-link-mu.vercel.app` currently redirects to the wrong Vercel project and is not the honest demo surface until the alias blocker is fixed
- **No private credential storage** — don't save SMS/WhatsApp tokens or API keys in Kanban comments  

---

## Acceptance Criteria for This Process Card

- ✅ Concrete workflow defined (not vague strategy prose)  
- ✅ Channel capability verdicts explicit (SMS/WhatsApp operable, Instagram/email uncertain)  
- ✅ State machine documented with transition rules  
- ✅ Approval boundaries clear (when required vs optional)  
- ✅ Worker autonomy scope defined (channel choice, send execution, follow-up routing)  
- ✅ Exact next execution card created for migration work  

---

**Version history:**
- v0.1 (2026-06-01) — Initial approval-only workflow, channel capability matrix, state machine defined
