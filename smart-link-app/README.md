# Nearspoke

A smart business link platform for local companies — booking, CRM, and AI-indexable profiles under the Nearspoke brand.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS + shadcn/ui
- **Backend:** Next.js Server Actions
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **Hosting:** Vercel
- **Email:** Resend | **SMS:** Twilio | **Monitoring:** Sentry

## Getting Started

```bash
# Install dependencies
cd smart-link-app
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
smart-link-app/
├── src/
│   ├── app/
│   │   ├── business/[slug]/    # Dynamic business profile pages
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css          # Global styles
│   └── lib/
│       ├── db.ts                # Drizzle database client
│       └── supabase.ts          # Supabase client
├── drizzle/
│   ├── schema.ts                # Database schema definitions
│   └── migrations/              # Generated migrations
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── drizzle.config.ts            # Drizzle configuration
└── package.json
```

## Database Schema

- **businesses** — Business profiles (slug, name, services, hours, etc.)
- **users** — Auth users linked to businesses
- **services** — Individual services with pricing
- **bookings** — Appointment records
- **reviews** — Customer reviews

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Optional owner alerts: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and optional `TELEGRAM_THREAD_ID`

## Telegram Owner Alerts

Telegram owner alerts are optional and fail soft by design:

- Demo mode never sends Telegram messages.
- Live bookings only attempt Telegram delivery when both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set.
- Missing Telegram env vars do not break booking creation or app builds.

Setup details live in `../docs/telegram-owner-alerts.md`.

## Deployment

1. Push to `main` branch
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

MIT
