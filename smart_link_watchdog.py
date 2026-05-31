#!/usr/bin/env python3
import os
import re
import sqlite3
import time
import json
from pathlib import Path

PLAN_PATH = Path('/opt/data/autonomous/smart-link/plan.md')
SMART_DB = '/opt/data/kanban/boards/smart-link/kanban.db'
DEFAULT_DB = '/opt/data/kanban.db'
CRON_JOBS_PATH = Path('/opt/data/cron/jobs.json')
NOW = time.time()
STALE_RUNNING_SECONDS = 30 * 60

LEGACY_HINTS = (
    'supabase',
    'drizzle',
    'resend',
    'twilio',
    'vercel',
    'smart-link',
    'smart link',
)


def connect(path: str):
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn


def fetch_all(conn, query: str, params=()):
    return [dict(row) for row in conn.execute(query, params).fetchall()]


def blocked_plan_items():
    text = PLAN_PATH.read_text()
    return [line.strip() for line in text.splitlines() if line.startswith('- [BLOCKED]')]


def legacy_default_tasks(conn):
    rows = fetch_all(
        conn,
        'select id,title,status,body,created_at,started_at,last_heartbeat_at,consecutive_failures,last_failure_error from tasks order by created_at asc',
    )
    out = []
    for row in rows:
        hay = ' '.join(str(row.get(k) or '').lower() for k in ('title', 'body'))
        if any(h in hay for h in LEGACY_HINTS):
            out.append(row)
    return out


def summarize_default_issues(tasks):
    if not tasks:
        return []
    msgs = []
    crashy = [t for t in tasks if t.get('consecutive_failures', 0) > 0 or t.get('status') == 'running']
    if crashy:
        ids = ', '.join(t['id'] for t in crashy[:6])
        msgs.append(f'default-board Smart Link stragglers still active/crashy: {ids}. Recreate only valid work on smart-link, then archive the legacy cards.')
    else:
        ids = ', '.join(t['id'] for t in tasks[:6])
        msgs.append(f'default-board Smart Link cards still exist: {ids}. They should not be the source of truth anymore.')
    return msgs


def summarize_smart_link_board(conn):
    tasks = fetch_all(
        conn,
        'select id,title,status,started_at,last_heartbeat_at from tasks order by created_at asc',
    )
    msgs = []
    non_review = [t for t in tasks if 'align smart link plan and autonomous architecture' not in (t['title'] or '').lower()]
    if not non_review:
        msgs.append('smart-link board has no real execution cards yet; right now it is basically a label with one review card, which is adorable but useless.')

    stale = []
    for task in tasks:
        if task['status'] != 'running':
            continue
        heartbeat = task.get('last_heartbeat_at') or task.get('started_at') or NOW
        if NOW - heartbeat > STALE_RUNNING_SECONDS:
            stale.append(task['id'])
    if stale:
        msgs.append('stale running cards on smart-link: ' + ', '.join(stale))
    return msgs


def summarize_plan_vs_board(blocked_items, smart_tasks):
    titles = ' '.join((t.get('title') or '').lower() for t in smart_tasks)
    msgs = []
    keyword_map = {
        'supabase': 'Supabase / live DB blocker is in the plan but not represented on smart-link.',
        'email': 'Email/Resend blocker is in the plan but not represented on smart-link.',
        'sms': 'SMS/Twilio blocker is in the plan but not represented on smart-link.',
        'telegram': 'Telegram integration blocker is in the plan but not represented on smart-link.',
        'auto-content': 'Auto-content blocker is in the plan but not represented on smart-link.',
    }
    plan_text = ' '.join(blocked_items).lower()
    for key, message in keyword_map.items():
        if key in plan_text and key not in titles:
            msgs.append(message)
    return msgs


def summarize_cron_health():
    if not CRON_JOBS_PATH.exists():
        return []
    try:
        data = json.loads(CRON_JOBS_PATH.read_text())
    except Exception:
        return ['cron/jobs.json is unreadable, which is a cute way to hide process failures.']

    msgs = []
    for job in data.get('jobs', []):
        name = (job.get('name') or '').lower()
        last_error = job.get('last_error') or ''
        if name == 'smart link worker' and 'No Codex credentials stored' in last_error:
            msgs.append('Smart Link Worker is failing on Hermes auth/model access (`No Codex credentials stored`). Fix that first or the reconciler will keep cosplaying as automation.')
    return msgs


def main():
    if not PLAN_PATH.exists():
        print('Smart Link watcher: plan.md is missing. That would be impressive in the bad way.')
        return

    blocked_items = blocked_plan_items()

    smart_conn = connect(SMART_DB)
    default_conn = connect(DEFAULT_DB)
    try:
        smart_tasks = fetch_all(smart_conn, 'select id,title,status,started_at,last_heartbeat_at from tasks order by created_at asc')
        legacy_tasks = legacy_default_tasks(default_conn)

        messages = []
        messages.extend(summarize_smart_link_board(smart_conn))
        messages.extend(summarize_default_issues(legacy_tasks))
        messages.extend(summarize_plan_vs_board(blocked_items, smart_tasks))
        messages.extend(summarize_cron_health())

        deduped = []
        seen = set()
        for msg in messages:
            if msg not in seen:
                seen.add(msg)
                deduped.append(msg)

        if deduped:
            print('\n'.join(f'- {msg}' for msg in deduped))
    finally:
        smart_conn.close()
        default_conn.close()


if __name__ == '__main__':
    main()
