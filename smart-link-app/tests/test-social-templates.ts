/**
 * Test suite for social copy templates
 * Verifies template structure, placeholder usage, and basic validation
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templatesPath = join(__dirname, '../src/data/social-copy-templates.json')

let passed = 0
let failed = 0
const results: Array<{ name: string; status: 'pass' | 'fail'; message?: string }> = []

function test(name: string, fn: () => void) {
  try {
    fn()
    results.push({ name, status: 'pass' })
    passed++
  } catch (error) {
    results.push({ name, status: 'fail', message: String(error) })
    failed++
  }
}

function assertEqual(a: unknown, b: unknown, msg = '') {
  if (a !== b) throw new Error(`${msg} Expected "${b}" but got "${a}"`)
}

function assertTrue(value: boolean, msg = '') {
  if (!value) throw new Error(msg || 'Expected true')
}

// Load templates
const templates = JSON.parse(readFileSync(templatesPath, 'utf8'))

// Test: All required sections exist
test('All required template sections exist', () => {
  assertEqual(
    Object.keys(templates).every((k) => 
      ['instagram_bio', 'whatsapp_sms', 'google_maps', 'website_embed', 'handoff_templates'].includes(k)
    ),
    true,
    'Missing required sections'
  )
})

// Test: Instagram bio templates
test('Instagram bio has valid templates', () => {
  const instagram = templates.instagram_bio
  assertEqual(Array.isArray(instagram.templates), true)
  assertEqual(instagram.templates.length, 4, 'Expected 4 Instagram templates')
  
  instagram.templates.forEach((tmpl: any, i: number) => {
    assertTrue(
      tmpl.name && tmpl.text,
      `Template ${i} missing name or text`
    )
  })
})

// Test: WhatsApp/SMS templates
test('WhatsApp/SMS templates are valid', () => {
  const whatsapp = templates.whatsapp_sms
  assertEqual(Array.isArray(whatsapp.templates), true)
  assertEqual(whatsapp.templates.length, 4, 'Expected 4 WhatsApp/SMS templates')

  let templatesWithPlaceholders = 0

  whatsapp.templates.forEach((tmpl: any, i: number) => {
    assertTrue(
      tmpl.name && tmpl.text,
      `Template ${i} missing name or text`
    )

    if (tmpl.text.includes('{{')) {
      templatesWithPlaceholders++
    }
  })

  assertEqual(
    templatesWithPlaceholders,
    3,
    'Expected 3 WhatsApp/SMS templates with placeholders'
  )
})

// Test: Google Maps templates
test('Google Maps templates are valid', () => {
  const maps = templates.google_maps
  assertEqual(Array.isArray(maps.templates), true)
  assertEqual(maps.templates.length, 3, 'Expected 3 Google Maps templates')
  
  maps.templates.forEach((tmpl: any, i: number) => {
    assertTrue(tmpl.name, `Template ${i} missing name`)
  })
})

// Test: Website embed templates
test('Website embed templates are valid', () => {
  const embed = templates.website_embed
  assertEqual(Array.isArray(embed.templates), true)
  assertEqual(embed.templates.length, 3, 'Expected 3 website embed templates')
  
  embed.templates.forEach((tmpl: any, i: number) => {
    assertTrue(
      tmpl.name && tmpl.text,
      `Template ${i} missing name or text`
    )
  })
})

// Test: Handoff templates structure
test('Handoff templates have valid structure', () => {
  const handoff = templates.handoff_templates
  assertEqual(Array.isArray(handoff.fields), true)
  assertEqual(handoff.fields.length, 2, 'Expected 2 handoff fields')
  
  // Check brand_voice field
  const brandVoiceField = handoff.fields.find((f: any) => f.name === 'brand_voice')
  assertTrue(brandVoiceField, 'Missing brand_voice field')
  assertEqual(Array.isArray(brandVoiceField.options), true)
  assertEqual(brandVoiceField.default, 'friendly', 'Wrong default voice')
  
  // Check tone field
  const toneField = handoff.fields.find((f: any) => f.name === 'tone')
  assertTrue(toneField, 'Missing tone field')
  assertEqual(Array.isArray(toneField.options), true)
  assertEqual(toneField.default, 'warm', 'Wrong default tone')
})

// Test: Description fields exist
test('All sections have description metadata', () => {
  Object.entries(templates).forEach(([section, data]: [string, any]) => {
    assertTrue(
      typeof data.description === 'string' && data.description.length > 0,
      `${section} missing description`
    )
  })
})

// Print results
console.log('\n' + '='.repeat(50))
console.log('Social Copy Templates Test Results')
console.log('='.repeat(50))
console.log(`Passed: ${passed}`)
console.log(`Failed: ${failed}`)

if (failed === 0) {
  console.log('\n✅ All tests passed!')
} else {
  console.log('\n❌ Some tests failed:')
  results.filter(r => r.status === 'fail').forEach(r => {
    console.log(`  - ${r.name}${r.message ? ': ' + r.message : ''}`)
  })
}
