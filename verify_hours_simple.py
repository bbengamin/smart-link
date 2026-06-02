#!/usr/bin/env python3
import urllib.request, json, re, sys

print("=" * 60)
print("QA: Structured Hours Verification - Production")
print("=" * 60)
print()

def get_hours(url):
    r = urllib.request.urlopen(url)
    status = r.status
    body = r.read().decode()
    # Find JSON-LD hours array
    match = re.search(r'(?s)"openingHoursSpecification"\s*:\s*\[(.*?)\]', body, re.DOTALL)
    if match:
        return json.loads('{' + match.group(1) + '}').get('openingHoursSpecification', [])
    return None

# Check API endpoint
print("--- /api/ai/cuts-barbershop ---")
hours = get_hours('https://smart-link-mu.vercel.app/api/ai/cuts-barbershop')
if hours:
    from collections import Counter
    days = Counter(h['dayOfWeek'] for h in hours)
    print(f"Status: {days}")
    print("Expected: each weekday appears once")
    if 'Monday' in days and days['Monday'] > 1:
        print("FAIL: Too many Monday entries - day mapping broken!")
        for h in hours[:3]:
            print(f"  - {h['dayOfWeek']}: {h['opens']}-{h['closes']}")
else:
    print("No openingHoursSpecification found")

print()
print("--- /business/cuts-barbershop ---")
hours = get_hours('https://smart-link-mu.vercel.app/business/cuts-barbershop')
if hours:
    from collections import Counter
    days = Counter(h['dayOfWeek'] for h in hours)
    print(f"Status: {days}")
    if 'Monday' in days and days['Monday'] > 1:
        print("FAIL: Too many Monday entries - day mapping broken!")
else:
    print("No openingHoursSpecification found")

print()
print("=" * 60)
