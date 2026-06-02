# Telegram owner alerts

This is the minimum honest setup for Nearspoke booking alerts. No magic, no fake "integrated" checkbox nonsense.

## What this does today

- Live bookings can send a Telegram message to the owner after the booking row is created.
- Demo mode never calls Telegram.
- Missing Telegram env vars are treated as a clean no-op, not a booking failure.
- SMS/email can still fail independently without blocking the booking itself.

## Required env vars for live Telegram alerts

Put these in `smart-link-app/.env.local` or feed them through `scripts/sync_env.py` from the higher-level env:

- `TELEGRAM_BOT_TOKEN` — bot token from `@BotFather`
- `TELEGRAM_CHAT_ID` — destination chat id for the owner, team group, or ops group
- `TELEGRAM_THREAD_ID` — optional forum topic/thread id if the destination is a Telegram group topic

## Setup steps

1. Create the bot in Telegram with `@BotFather`.
2. Copy the bot token into `TELEGRAM_BOT_TOKEN`.
3. Add the bot to the destination chat.
4. Send the bot at least one message first. Telegram is annoying about this.
5. Capture the destination `TELEGRAM_CHAT_ID`.
6. If using a forum-style Telegram group topic, also capture `TELEGRAM_THREAD_ID`.
7. Restart the app or redeploy after the env vars are present.

## Demo / missing-env behavior

- If `NEXT_PUBLIC_SUPABASE_URL` is empty/placeholder/demo, Nearspoke stays in demo mode and skips Telegram delivery.
- If `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` is missing in live mode, the booking still succeeds and the server logs a skip message.
- If Telegram rejects the request, the booking still succeeds and the server logs a non-fatal warning.

## What is still needed for real-world signoff

This repo can now build cleanly and the booking path is wired for optional Telegram delivery, but real production verification still needs actual values for:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

If the owner wants topic-based delivery inside a Telegram forum/group, it also needs:

- `TELEGRAM_THREAD_ID`
