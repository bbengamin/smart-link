# Smart Link — Pilot Demo Feedback Loop

Date: 2026-05-31
Scope: first 5 barbershop/salon pilot demos only. Tiny operator loop, not a fake CRM.

## Goal
After every owner demo, capture the same signals in under 10 minutes so Smart Link learns fast instead of collecting mushy vibes:
- current booking pain
- discovery source
- current tools/workflow
- value perception
- price reaction
- must-have blocker
- willingness to try
- next action

This loop starts after the outreach + pilot offer + onboarding/demo script already exist:
- `mvp-pilot-offer.md`
- `docs/pilot-onboarding-handoff.md`
- `docs/pilot-call-notes-template.md`

## Where to record responses
Use both layers:
1. Row-per-demo tracker: `docs/pilot-demo-feedback.csv`
2. Full notes per conversation: `docs/pilot-call-notes/<date>-<business-slug>.md`

The CSV gives a clean five-shop view.
The markdown note keeps raw quotes and weird details worth revisiting.

## When to run it
Run this immediately after:
- the 10–15 minute owner demo in `docs/pilot-onboarding-handoff.md`, or
- any follow-up call where the owner reacts to the pilot offer/pricing.

Do it before memory gets fuzzy. If you wait until later, your notes turn into fiction.

## 7 demo feedback questions
Ask these in plain English, not robot mode.

1. What is the most annoying part of how bookings happen today?
2. Where do most new customers find you right now?
3. What tools are you using now for bookings, messages, or reminders?
4. Looking at this demo, what feels genuinely useful vs. just nice to have?
5. How do you react to the post-pilot pricing in `mvp-pilot-offer.md`?
6. What is the one must-have blocker that would stop you from trying this?
7. If we made that blocker acceptable, would you try the pilot in the next 30 days?

## Required capture fields
For each demo, capture at minimum:
- business name
- segment (`barbershop` or `salon`)
- date
- operator
- current booking pain
- discovery source
- current tools
- value perception
- price reaction
- must-have blocker
- willingness to try
- follow-up status
- next action
- next action due date

## Follow-up status taxonomy
Use one status only after each demo:
- `interested` — wants to keep moving now
- `needs_later_follow_up` — not a no, just bad timing
- `price_objection` — price/value mismatch is the main problem
- `feature_blocker` — missing capability blocks trial
- `not_icp` — wrong shop shape, wrong workflow, or no real fit

## Next action rules
Every row needs exactly one next action. Keep it blunt:
- `send_preview_link`
- `send_pilot_offer`
- `follow_up_48h`
- `follow_up_next_week`
- `collect_missing_assets`
- `close_lost`

## 10-minute operator flow
1. Run the demo using `docs/pilot-onboarding-handoff.md`.
2. Ask the 7 questions above.
3. Add one row to `docs/pilot-demo-feedback.csv` before ending the session.
4. If the owner said anything sharp or useful, create/update the markdown note under `docs/pilot-call-notes/`.
5. Review all 5 rows together after the first wave and look for repeated objections, pricing pain, and blocker patterns.

## What counts as a useful learning signal
Good signal:
- "We already use Fresha, so I would only switch if reminders reduce no-shows."
- "Instagram brings people in, but DMs are chaos on Saturdays."
- "I like the page, but I need staff-specific booking, not one generic contact button."

Bad signal:
- "Seems cool"
- "Maybe later"
- anything with no quote, no blocker, and no next action

## Review cadence for the first 5 shops
After demos 3 and 5, skim the CSV and answer:
- Which pain shows up most?
- Which source channel creates the strongest intent?
- Is price killing momentum, or is product scope killing momentum?
- Which blocker repeats often enough to deserve a product card?

If the same blocker appears 2+ times, that is not random noise anymore.

## Offline usability check
This loop is intentionally usable with zero live app dependencies:
- questions live in markdown
- tracker is a local CSV
- raw notes are local markdown files

If the public app is flaky, you can still run demos and capture learning. That is the whole damn point.
