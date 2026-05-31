#!/usr/bin/env python3
"""
Social Copy Templates Validator
Validates template structure, placeholders, and basic completeness
"""

import json
import sys
from pathlib import Path

# Get absolute path based on where script is located
SCRIPT_DIR = Path(__file__).parent.resolve()
TEMPLATES_PATH = SCRIPT_DIR.parent / "src/data/social-copy-templates.json"

def load_templates():
    """Load templates from JSON file"""
    try:
        with open(TEMPLATES_PATH) as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: Templates file not found at {TEMPLATES_PATH}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in templates file: {e}")
        return None

def validate_templates(templates):
    """Validate template structure and content"""
    results = []
    
    # Test 1: All required sections exist
    required_sections = ['instagram_bio', 'whatsapp_sms', 'google_maps', 'website_embed', 'handoff_templates']
    has_all_sections = all(section in templates for section in required_sections)
    results.append({
        'name': 'All required template sections exist',
        'status': 'PASS' if has_all_sections else 'FAIL',
        'details': f"Found: {list(templates.keys())}" if not has_all_sections else "✓ All sections present"
    })
    
    # Test 2: Instagram bio templates
    instagram = templates.get('instagram_bio', {})
    instgram_templates = instagram.get('templates', [])
    test_name = 'Instagram bio templates'
    status = 'PASS' if len(instgram_templates) >= 4 else 'FAIL'
    results.append({
        'name': test_name,
        'status': status,
        'details': f"Found {len(instgram_templates)} templates (expected ≥4)"
    })
    
    # Test 3: WhatsApp/SMS templates
    whatsapp = templates.get('whatsapp_sms', {})
    wa_templates = whatsapp.get('templates', [])
    test_name = 'WhatsApp/SMS templates'
    status = 'PASS' if len(wa_templates) >= 4 else 'FAIL'
    results.append({
        'name': test_name,
        'status': status,
        'details': f"Found {len(wa_templates)} templates (expected ≥4)"
    })
    
    # Test 4: Google Maps templates
    maps = templates.get('google_maps', {})
    maps_templates = maps.get('templates', [])
    test_name = 'Google Maps templates'
    status = 'PASS' if len(maps_templates) >= 3 else 'FAIL'
    results.append({
        'name': test_name,
        'status': status,
        'details': f"Found {len(maps_templates)} templates (expected ≥3)"
    })
    
    # Test 5: Website embed templates
    embed = templates.get('website_embed', {})
    embed_templates = embed.get('templates', [])
    test_name = 'Website embed templates'
    status = 'PASS' if len(embed_templates) >= 3 else 'FAIL'
    results.append({
        'name': test_name,
        'status': status,
        'details': f"Found {len(embed_templates)} templates (expected ≥3)"
    })
    
    # Test 6: Handoff fields structure
    handoff = templates.get('handoff_templates', {})
    fields = handoff.get('fields', [])
    has_brand_voice = any(f['name'] == 'brand_voice' for f in fields)
    has_tone = any(f['name'] == 'tone' for f in fields)
    test_name = 'Handoff templates structure'
    status = 'PASS' if has_brand_voice and has_tone else 'FAIL'
    results.append({
        'name': test_name,
        'status': status,
        'details': f"brand_voice: {has_brand_voice}, tone: {has_tone}"
    })
    
    # Test 7: All sections have descriptions
    has_descriptions = all(
        isinstance(data.get('description'), str) and len(data['description']) > 0
        for data in templates.values()
    )
    results.append({
        'name': 'All sections have description metadata',
        'status': 'PASS' if has_descriptions else 'FAIL',
        'details': '✓ All descriptions present' if has_descriptions else '✗ Missing some descriptions'
    })
    
    return results

def main():
    print("=" * 60)
    print("Social Copy Templates Validator")
    print("=" * 60)
    print()
    
    templates = load_templates()
    if not templates:
        return 1
    
    results = validate_templates(templates)
    
    # Print results
    passed = sum(1 for r in results if r['status'] == 'PASS')
    failed = len(results) - passed
    
    print(f"Total tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print()
    
    for result in results:
        status_icon = "✓" if result['status'] == 'PASS' else "✗"
        print(f"{status_icon} {result['name']}")
        print(f"  {result['details']}")
        print()
    
    # Summary
    print("=" * 60)
    if failed == 0:
        print("✅ All tests passed! Templates are ready for use.")
        return 0
    else:
        print(f"❌ {failed} test(s) failed. Review and fix issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
