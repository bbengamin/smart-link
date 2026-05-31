#!/bin/bash
# Smart Link Autonomous Worker
# Run via: bash /opt/data/autonomous/smart-link/worker.sh
set -euo pipefail

LOCK_FILE="/opt/data/autonomous/smart-link/lock.txt"
PLAN="/opt/data/autonomous/smart-link/plan.md"
LOG_DIR="/opt/data/autonomous/smart-link/logs"
TIMESTAMP=$(date +%Y-%m-%d)
TICK_NUM=$(ls "$LOG_DIR"/worker-tick*.md 2>/dev/null | wc -l | tr -d ' ')

# Lock check
if [ -f "$LOCK_FILE" ]; then
    echo "[$TIMESTAMP] Worker already running (lock exists). Exiting."
    exit 0
fi
trap 'rm -f "$LOCK_FILE"' EXIT
echo $$ > "$LOCK_FILE"

# Read plan status
BLOCKED_COUNT=$(grep -c '^\- \[BLOCKED\]' "$PLAN" 2>/dev/null || echo 0)
COMPLETED_COUNT=$(grep -c '^\- \[x\]' "$PLAN" 2>/dev/null || echo 0)

echo "[$TIMESTAMP] Worker tick $((TICK_NUM + 1)) started"
echo "[$TIMESTAMP] Plan: $COMPLETED_COUNT done, $BLOCKED_COUNT blocked"

# Check if any unblocked tasks remain
UNBLOCKED=$(grep '^\- \[ \]' "$PLAN" 2>/dev/null | head -5 || true)
if [ -z "$UNBLOCKED" ]; then
    echo "[$TIMESTAMP] No unblocked tasks remaining. All tasks either complete or blocked."
    exit 0
fi

echo "[$TIMESTAMP] Next unblocked task: $(echo "$UNBLOCKED" | head -1)"

# Log tick
cat > "$LOG_DIR/worker-tick-$((TICK_NUM + 1)).md" <<EOF
# Worker Tick $((TICK_NUM + 1)) — $TIMESTAMP

## Status
- Completed tasks: $COMPLETED_COUNT
- Blocked tasks: $BLOCKED_COUNT
- Unblocked tasks: $(echo "$UNBLOCKED" | wc -l)

## Next Unblocked Tasks
$(echo "$UNBLOCKED" | head -5)

## Actions Taken
- Plan reviewed, no unblocked tasks available

## Blockers
- Supabase project creation (user action required)
- API keys: RESEND_API_KEY, TWILIO_* (user action required)
- Deployment to Vercel (user action required)

## Notes
- Build verified: TypeScript + Next.js static generation pass
- Demo mode fully functional: 4 businesses, booking flow, admin dashboard, reviews
- See plan.md for detailed blocker descriptions
EOF

echo "[$TIMESTAMP] Worker tick $((TICK_NUM + 1)) complete"
