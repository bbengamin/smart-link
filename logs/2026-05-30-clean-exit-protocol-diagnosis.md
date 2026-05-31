# 2026-05-30 Clean-exit protocol diagnosis (`t_5c00c9cc`)

## Scope
Investigate why `t_82086be9` produced clean worker exits (`rc=0`) without calling `kanban_complete` or `kanban_block`, then identify the smallest process-level guardrail.

## Evidence
Source log: `/opt/data/kanban/boards/smart-link/logs/t_82086be9.log`

### Run 73
- The worker oriented itself and restated the task scope.
- It ended after a plain-language "Let me check..." response with no subsequent tool call and no board handoff.
- Dispatcher recorded: `worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation`.

### Run 74
- The worker attempted `browser_navigate`, hit host Chrome failure (`exit code: 127`), then said it would fall back to workspace inspection.
- It continued with search/read activity, verified the essentials in prose, and again ended without any `kanban_complete` or `kanban_block` call.
- Dispatcher recorded the same clean-exit protocol violation.

### What this rules out
- This is not a product-code failure inside the visibility task itself.
- This is not a board-tool outage: the worker successfully called `kanban_show` at startup.
- This is not a crash-loop caused by long runtime or OOM in the two offending runs; both exits were `rc=0`.

## Root cause
The default worker model can still produce a normal-looking narrative answer that says what it plans to do or what it found, then stop the session without issuing the required board handoff tool call. In short: the agent loop accepted a text-only clean exit from a kanban worker, and the dispatcher only caught the violation after the process was already gone.

The browser failure was a distraction, not the core defect. The real bug is allowing a kanban-task run to end successfully at the process level when the final assistant turn never called `kanban_complete` or `kanban_block`.

## Smallest guardrail
Project-side rule:
- Any Smart Link kanban worker that reaches a conclusion must perform the board handoff in the same turn (`kanban_complete` or `kanban_block`).
- A plain text summary, "I'll check...", or "everything looks implemented" does not count.
- If the worker cannot verify or continue because a tool/bootstrap path is broken, it must block with the exact reason instead of exiting politely.

Platform-side fix worth doing later:
- In Hermes worker runtime, treat a final assistant turn with no `kanban_complete`/`kanban_block` on a claimed kanban task as an immediate retryable protocol failure with an injected corrective reprompt, not a normal successful exit.

## Why a docs patch is justified
This exact failure mode already happened twice on a live task. A one-line operating rule in `plan.md` is cheap, local, and reduces repeat damage even before Hermes runtime gets a harder guardrail.
