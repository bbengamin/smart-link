-- Smart Link Database Migration v1
-- Run against Supabase PostgreSQL

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  phone VARCHAR(20),
  email VARCHAR(200),
  website TEXT,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  category VARCHAR(100) NOT NULL DEFAULT 'barbershop',
  hours JSONB,
  logo_url TEXT,
  photos JSONB,
  services JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supabase_id TEXT NOT NULL UNIQUE,
  email VARCHAR(200) NOT NULL,
  full_name VARCHAR(200),
  business_id UUID REFERENCES businesses(id),
  role VARCHAR(20) DEFAULT 'owner',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(20),
  customer_email VARCHAR(200),
  service_name VARCHAR(200) NOT NULL,
  service_price INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id),
  customer_name VARCHAR(200),
  rating INTEGER NOT NULL,
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_is_active ON businesses(is_active);
CREATE INDEX IF NOT EXISTS idx_services_business_id ON services(business_id);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_business_id ON bookings(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON reviews(business_id);

-- Row Level Security (for Supabase)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read businesses
CREATE POLICY "Public can read active businesses"
  ON businesses FOR SELECT
  USING (is_active = true);

-- Business owners can manage their own data
CREATE POLICY "Business owners can manage their business"
  ON businesses FOR ALL
  USING (auth.uid() IN (SELECT supabase_id FROM users WHERE business_id = businesses.id));

CREATE POLICY "Business owners can manage their services"
  ON services FOR ALL
  USING (auth.uid() IN (SELECT supabase_id FROM users WHERE business_id = services.business_id));

CREATE POLICY "Business owners can manage their bookings"
  ON bookings FOR ALL
  USING (auth.uid() IN (SELECT supabase_id FROM users WHERE business_id = bookings.business_id));

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Business owners can manage their reviews"
  ON reviews FOR ALL
  USING (auth.uid() IN (SELECT supabase_id FROM users WHERE business_id = reviews.business_id));
