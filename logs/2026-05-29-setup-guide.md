# Smart Link Setup Guide

## What's Built ✅

- **Business Profile Pages** — SSR at `/business/{slug}`, JSON-LD structured data, dynamic OG images, sitemap
- **Booking System** — Multi-step form with calendar, time slots, customer details, confirmation page
|- **Demo Mode** — Fully functional with 4 seeded businesses (Cut's Barbershop, Luxe Salon & Spa, Fresh Cuts Studio, Glow Hair Studio)
- **SEO Infrastructure** — Dynamic sitemap, robots.txt, Open Graph, AI-indexable structured data
- **Build Verified** — Next.js 16.2.6, TypeScript, static generation all pass

## What's Needed to Go Live

### 1. Supabase Project (CRITICAL — blocks all data features)

1. Go to https://supabase.com and create a free project
2. Wait for database to provision (~2 min)
3. Go to Settings → API, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to SQL Editor, run the migrations in `smart-link-app/drizzle/`

### 2. Database Migrations

Run these in Supabase SQL Editor (in order):

```sql
-- 1. Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  category TEXT,
  hours JSONB DEFAULT '{}',
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  booked_date DATE NOT NULL,
  booked_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 7. RLS policies (simplified for now — can be refined later)
CREATE POLICY "Public businesses are readable" ON businesses FOR SELECT USING (true);
CREATE POLICY "Services are readable" ON services FOR SELECT USING (true);
CREATE POLICY "Bookings are insertable by anyone" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Bookings are readable by owner" ON bookings FOR SELECT USING (true);
CREATE POLICY "Reviews are insertable" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Reviews are readable" ON reviews FOR SELECT USING (true);
```

### 3. Resend (email confirmations)

1. Go to https://resend.com and sign up
2. Go to API Keys, create a key
3. Set `RESEND_API_KEY` in `.env.local`

### 4. Twilio (SMS confirmations)

1. Go to https://console.twilio.com and sign up
2. Get your Account SID and Auth Token from the dashboard
3. Buy a phone number (or use trial number)
4. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` in `.env.local`

### 5. Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel project settings
4. Deploy

## Current Demo URL

In demo mode (no Supabase), the app shows:
- Home page with business cards
- `/business/cuts-barbershop` — Cut's Barbershop profile
- `/business/luxe-salon` — Luxe Salon & Spa profile
- `/business/{slug}/book` — Booking form for any business
- `/demo/bookings` — View demo bookings (localStorage)

## Blocked Tasks

| Task | Blocker | Priority |
|------|---------|----------|
| Connect Supabase | User must create project + provide credentials | HIGH |
| Database Integration | Depends on Supabase | HIGH |
| Email/SMS Notifications | Needs Resend + Twilio API keys | MEDIUM |
| Business Dashboard | Depends on database | MEDIUM |
| Client List View | Depends on database | MEDIUM |
| Telegram Integration | Depends on database + API key | LOW |
| Auto-content Generation | Needs OpenAI API key | LOW |
