#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Dict, List, Tuple
from urllib.parse import urlparse

ROOT_ENV = Path('/opt/data/.env')
APP_ENV = Path('/opt/data/autonomous/smart-link/smart-link-app/.env.local')

REQUIRED_KEYS = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
]

SOURCE_PREFERENCE = {
    'NEXT_PUBLIC_SUPABASE_URL': [
        'SMART_LINK_NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_URL',
    ],
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': [
        'SMART_LINK_NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'SUPABASE_ANON_KEY',
    ],
    'SUPABASE_SERVICE_ROLE_KEY': [
        'SMART_LINK_SUPABASE_SERVICE_ROLE_KEY',
        'SUPABASE_SERVICE_ROLE_KEY',
    ],
    'DATABASE_URL': [
        'SMART_LINK_DATABASE_URL',
        'DATABASE_URL',
    ],
    'RESEND_API_KEY': [
        'SMART_LINK_RESEND_API_KEY',
        'RESEND_API_KEY',
    ],
    'TWILIO_ACCOUNT_SID': [
        'SMART_LINK_TWILIO_ACCOUNT_SID',
        'TWILIO_ACCOUNT_SID',
    ],
    'TWILIO_AUTH_TOKEN': [
        'SMART_LINK_TWILIO_AUTH_TOKEN',
        'TWILIO_AUTH_TOKEN',
    ],
    'TWILIO_API_ACCOUNT_SID': [
        'SMART_LINK_TWILIO_API_ACCOUNT_SID',
        'TWILIO_API_ACCOUNT_SID',
    ],
    'TWILIO_PHONE_NUMBER': [
        'SMART_LINK_TWILIO_PHONE_NUMBER',
        'TWILIO_PHONE_NUMBER',
    ],
}


def parse_env(path: Path) -> Dict[str, str]:
    data: Dict[str, str] = {}
    if not path.exists():
        return data
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data


def env_line(key: str, value: str) -> str:
    if any(ch.isspace() for ch in value) or value == '':
        escaped = value.replace('\\', '\\\\').replace('"', '\\"')
        return f'{key}="{escaped}"'
    return f'{key}={value}'


def fetch_json(url: str, headers: Dict[str, str]) -> Tuple[object | None, str | None]:
    merged_headers = {'User-Agent': 'hermes-smart-link-sync/1.0'}
    merged_headers.update(headers)
    req = urllib.request.Request(url, headers=merged_headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            body = resp.read().decode('utf-8', 'replace')
            try:
                return json.loads(body), None
            except json.JSONDecodeError:
                return body, None
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode('utf-8', 'replace')
        except Exception:
            body = ''
        return None, f'HTTP {e.code} {e.reason}' + (f': {body[:200]}' if body else '')
    except Exception as e:
        return None, str(e)


def merge_sources(path_values: Dict[str, str]) -> Dict[str, str]:
    merged = dict(path_values)
    for key, value in os.environ.items():
        if value:
            merged[key] = value
    return merged


def infer_project_ref(*sources: Dict[str, str]) -> str:
    for source in sources:
        project_ref = source.get('SUPABASE_PROJECT_REF')
        if project_ref:
            return project_ref

    url_keys = [
        'SMART_LINK_NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_URL',
    ]
    for source in sources:
        for key in url_keys:
            raw = source.get(key)
            if not raw:
                continue
            host = urlparse(raw).hostname or ''
            if host.endswith('.supabase.co'):
                return host.split('.supabase.co', 1)[0]
    return ''


def derive_supabase(high: Dict[str, str], resolved: Dict[str, str], report: Dict[str, str]) -> None:
    project_ref = infer_project_ref(high, resolved)
    access_token = high.get('SUPABASE_ACCESS_TOKEN')

    if not resolved.get('NEXT_PUBLIC_SUPABASE_URL') and project_ref:
        resolved['NEXT_PUBLIC_SUPABASE_URL'] = f'https://{project_ref}.supabase.co'
        report['NEXT_PUBLIC_SUPABASE_URL'] = 'derived from SUPABASE_PROJECT_REF'

    if not access_token or not project_ref:
        return

    data, err = fetch_json(
        f'https://api.supabase.com/v1/projects/{project_ref}/api-keys',
        {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json',
        },
    )
    if err:
        for key in ('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'):
            report.setdefault(key, f'unresolved: Supabase API lookup failed ({err})')
        return

    if isinstance(data, list):
        for item in data:
            if not isinstance(item, dict):
                continue
            name = str(item.get('name') or item.get('type') or '').lower()
            key_value = item.get('api_key') or item.get('key') or item.get('value')
            if not key_value:
                continue
            if 'anon' in name and not resolved.get('NEXT_PUBLIC_SUPABASE_ANON_KEY'):
                resolved['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = str(key_value)
                report['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = 'derived from Supabase Management API'
            if ('service_role' in name or 'service role' in name) and not resolved.get('SUPABASE_SERVICE_ROLE_KEY'):
                resolved['SUPABASE_SERVICE_ROLE_KEY'] = str(key_value)
                report['SUPABASE_SERVICE_ROLE_KEY'] = 'derived from Supabase Management API'

    for key in ('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'):
        report.setdefault(key, 'unresolved: not returned by Supabase Management API')


def derive_twilio(high: Dict[str, str], resolved: Dict[str, str], report: Dict[str, str]) -> None:
    sid = resolved.get('TWILIO_ACCOUNT_SID') or high.get('TWILIO_ACCOUNT_SID')
    token = resolved.get('TWILIO_AUTH_TOKEN') or high.get('TWILIO_AUTH_TOKEN')
    if not sid or not token:
        report.setdefault('TWILIO_PHONE_NUMBER', 'unresolved: missing TWILIO creds')
        return
    auth = base64.b64encode(f'{sid}:{token}'.encode()).decode()
    data, err = fetch_json(
        f'https://api.twilio.com/2010-04-01/Accounts/{sid}/IncomingPhoneNumbers.json?PageSize=20',
        {'Authorization': f'Basic {auth}'},
    )
    if err:
        report.setdefault('TWILIO_PHONE_NUMBER', f'unresolved: Twilio lookup failed ({err})')
        return
    if isinstance(data, dict):
        nums = data.get('incoming_phone_numbers') or []
        if nums:
            first = nums[0]
            if isinstance(first, dict):
                account_sid = first.get('account_sid')
                phone_number = first.get('phone_number')
                if account_sid and str(account_sid).startswith('AC') and sid.startswith('SK'):
                    resolved['TWILIO_API_ACCOUNT_SID'] = str(account_sid)
                    report['TWILIO_API_ACCOUNT_SID'] = 'derived from Twilio API via API key credentials'
                if phone_number and not resolved.get('TWILIO_PHONE_NUMBER'):
                    resolved['TWILIO_PHONE_NUMBER'] = str(phone_number)
                    report['TWILIO_PHONE_NUMBER'] = 'derived from Twilio API (first owned number)'
                if resolved.get('TWILIO_PHONE_NUMBER'):
                    return
    report.setdefault('TWILIO_PHONE_NUMBER', 'unresolved: no incoming Twilio phone numbers found')


def build_env(high: Dict[str, str], existing: Dict[str, str]) -> Tuple[Dict[str, str], Dict[str, str]]:
    resolved: Dict[str, str] = {}
    report: Dict[str, str] = {}

    for target_key in REQUIRED_KEYS:
        for source_key in SOURCE_PREFERENCE[target_key]:
            value = high.get(source_key)
            if value:
                resolved[target_key] = value
                report[target_key] = f'copied from {source_key}'
                break
        else:
            if existing.get(target_key):
                resolved[target_key] = existing[target_key]
                report[target_key] = 'kept existing app value'

    derive_supabase(high, resolved, report)
    derive_twilio(high, resolved, report)

    for key in REQUIRED_KEYS:
        report.setdefault(key, 'missing')

    return resolved, report


def write_env(path: Path, values: Dict[str, str]) -> None:
    lines: List[str] = [
        '# Generated by scripts/sync_env.py',
        '# Source of truth: /opt/data/.env',
        '',
        '# --- Supabase ---',
    ]
    for key in [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY',
        'DATABASE_URL',
    ]:
        if values.get(key):
            lines.append(env_line(key, values[key]))
    lines.extend([
        '',
        '# --- Resend ---',
    ])
    if values.get('RESEND_API_KEY'):
        lines.append(env_line('RESEND_API_KEY', values['RESEND_API_KEY']))
    lines.extend([
        '',
        '# --- Twilio ---',
    ])
    for key in ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_API_ACCOUNT_SID', 'TWILIO_PHONE_NUMBER']:
        if values.get(key):
            lines.append(env_line(key, values[key]))
    lines.append('')
    path.write_text('\n'.join(lines))


def main() -> int:
    parser = argparse.ArgumentParser(description='Sync Smart Link app env from high-level creds.')
    parser.add_argument('--source', default=str(ROOT_ENV), help='Source env file')
    parser.add_argument('--target', default=str(APP_ENV), help='Target app env file')
    parser.add_argument('--check', action='store_true', help='Report only; do not write')
    args = parser.parse_args()

    source = Path(args.source)
    target = Path(args.target)
    high = merge_sources(parse_env(source))
    existing = parse_env(target)
    resolved, report = build_env(high, existing)

    missing = [k for k in REQUIRED_KEYS if not resolved.get(k)]

    if not args.check:
        target.parent.mkdir(parents=True, exist_ok=True)
        write_env(target, resolved)

    print('Smart Link env sync report')
    print(f'Source: {source}')
    print(f'Target: {target}')
    print('')
    for key in REQUIRED_KEYS:
        status = 'set' if resolved.get(key) else 'missing'
        print(f'- {key}: {status} — {report.get(key, "")}'.rstrip())

    if missing:
        print('')
        print('Still missing:')
        for key in missing:
            print(f'- {key}')
        return 2

    return 0


if __name__ == '__main__':
    sys.exit(main())
