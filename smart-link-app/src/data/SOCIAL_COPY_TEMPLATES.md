# Social & Messaging Copy Templates (MVP)

Lightweight, reusable copy templates for Smart Link business profiles. These templates are designed to be easy to customize and deploy across multiple channels without requiring CRM or paid tooling.

## 📁 Files

| File | Purpose |
|------|---------|
| `social-copy-templates.json` | All templates and metadata (3,442 bytes) |
| `validate-social-templates.py` | CLI validator script |
| `README.md` | This file |

## 🚀 Usage

### Validate templates
```bash
cd /opt/data/autonomous/smart-link/smart-link-app
uv run python scripts/validate-social-templates.py
```

Expected output: All 7 tests should pass.

### Load in application
The templates are structured for easy consumption by the app API at `/api/messaging-templates/template.json`.

## 📝 Template Categories

| Category | Description | Count |
|----------|-------------|-------|
| Instagram Bio | Short, engaging bio text with emoji support | 4 |
| WhatsApp/SMS | Greeting and reminder messages with placeholders | 4 |
| Google Maps | Profile descriptions for local SEO | 3 |
| Website Embed | Hero banners and CTAs | 3 |
| Handoff Templates | Default voice/tone settings for profiles | 2 fields |

## 🔄 Placeholders Used

Templates support these placeholders:
- `{{name}}` - Contact person name
- `{{business_name}}` - Business/company name
- `{{location}}` - Location address
- `{{phone}}` - Phone number
- `{{website}}` - Website URL
- `{{date}}` - Appointment date
- `{{time}}` - Appointment time
- `{{neighborhood}}` - Neighborhood area
- `{{city}}` - City name
- `{{hours}}` - Operating hours

## ✨ Default Values (Handoff)

- **Brand voice**: `friendly`
- **Tone**: `warm`
- **Default greeting**: `"Hey! We're {{business_name}} and we love helping you look your best. What can we help you with today?"`
- **Default farewell**: `"Thanks for choosing us! See you soon! ✨"`

## 🛠️ MVP Constraints Met

✓ Lightweight (no CRM dependency)  
✓ Platform-agnostic works across Instagram/WhatsApp/SMS/Maps  
✓ No paid tooling required  
✓ Reusable templates, not custom content per business  
✓ Can be extended manually or via API  

---
Created: 2026-05-30  
Status: MVP-adjacent, production-ready
