#!/usr/bin/env python3
import urllib.request, json, re, sys

def verify_endpoint(url, description):
    try:
        r = urllib.request.urlopen(url)
        status = r.status
        content_type = r.headers.get('content-type', '')
        body = r.read().decode()
        
        # Extract JSON-LD from HTML if needed
        match = re.search(r'"@context":"[^"]*"([^}]*"openingHoursSpecification":\[(.*?)\])"(?=\}|$|</script>|</body>', body, re.DOTALL)
        
        return {
            'url': url,
            'status': status,
            'content_type': content_type,
            'headers': dict(r.headers),
            'success': match is not None or '"@context"' in body[:100],
            'hours_data': json.loads(match.group(1)) if match else None
        }
    except Exception as e:
        return {'error': str(e)}

api_result = verify_endpoint('https://smart-link-mu.vercel.app/api/ai/cuts-barbershop', '/api/ai/cuts-barbershop')
print("=== API ENDPOINT ===")
print(f"URL: {api_result['url']}")
print(f"Status: {api_result['status']}")
print(f"Content-Type: {api_result.get('content_type', 'N/A')}")
print()

if 'hours_data' in api_result and api_result['hours_data']:
    hours = api_result['hours_data']
    from collections import Counter
    days = Counter(h['dayOfWeek'] for h in hours)
    print(f"Total openingHoursSpecification entries: {len(hours)}")
    print("Entries per weekday:")
    for day, count in sorted(days.items()):
        status = "✓" if count == 1 else "✗ DUPLICATE"
        print(f"  {day}: {count} entry{'' if count==1 else 's'} - {status}")

print()
print("=" * 60)
print("=== BUSINESS PROFILE ENDPOINT ===")
biz_result = verify_endpoint('https://smart-link-mu.vercel.app/business/cuts-barbershop', '/business/cuts-barbershop')
print(f"URL: {biz_result['url']}")
print(f"Status: {biz_result['status']}")
print(f"Content-Type: {biz_result.get('content_type', 'N/A')}")
print()

if 'hours_data' in biz_result and biz_result['hours_data']:
    hours = biz_result['hours_data']
    from collections import Counter
    days = Counter(h['dayOfWeek'] for h in hours)
    print(f"Total openingHoursSpecification entries: {len(hours)}")
    print("Entries per weekday:")
    for day, count in sorted(days.items()):
        status = "✓" if count == 1 else "✗ DUPLICATE"
        print(f"  {day}: {count} entry{'' if count==1 else 's'} - {status}")

else:
    print("⚠️ JSON-LD not found in business profile")
