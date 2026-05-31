# Smart Link Board Reconciliation Auth Fallback — 2026-05-29

## Pre-flight checks
- Read `plan.md`.
- Inspected `smart-link` board files/logs under `/opt/data/kanban/boards/smart-link`.
- Inspected legacy default-board Smart Link logs under `/opt/data/kanban/logs`.
- Reviewed recent Smart Link cron output for recurring failures.

## Board state observed
- Visible `smart-link` board artifacts are still thin: `t_fe2f8310`, `t_a28e0cf0`, and reconciler log `t_e7176ff0`.
- Prior reconciliation logs mention blocker/follow-up cards `t_fe2f8310`, `t_fc7de140`, `t_f3773486`, `t_d9162aa0`, `t_d10bdf5b`, `t_50a6d7f3`.
- No visible dedicated `[PROCESS]` card log exists on `smart-link`. The process lane is still a ghost.

## Legacy/default-board drift still present
- `t_f63d67b7` — legacy Supabase card with repeated crashes, auth churn, and provider failures.
- `t_91d91da3` — legacy Resend card; log confirms the supplied `RESEND_API_KEY` was invalid.
- `t_4ff31987` — legacy Twilio card; SID/token were found, but `TWILIO_PHONE_NUMBER` was still missing.
- These copies still need archival after the missing process-owner card exists and board writes actually work.

## Recurring process smells
- Smart Link worker cron output still shows `No Codex credentials stored`.
- Legacy/default-board task logs also show Copilot provider failures (`Personal Access Tokens are not supported for this endpoint`) and repeated crash/protocol-violation churn.
- Result: board reconciliation is partly blind and cannot honestly claim the process lane is handled.

## Plan updates applied
- Added an auth-failure fallback operating rule to `plan.md`: when board writes are blocked by auth/model failure, record the exact intended process card + blocked archival action in the plan and session log.
- Replaced the vague missing-process-card queue item with the concrete title:
  - `[PROCESS] recover Smart Link worker auth + archive legacy default-board cards`

## No product work performed
- This run did board/process hygiene only.
