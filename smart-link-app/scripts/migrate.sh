#!/usr/bin/env bash
# Smart Link — One-Click Supabase Migration
# Run this after creating a Supabase project and setting env vars.
# It runs all SQL migrations and seeds demo data.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC} $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }
step()  { echo -e "${CYAN}[STEP]${NC} $*"; }

# ─── Pre-flight checks ───

if [ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" ]; then
  error "NEXT_PUBLIC_SUPABASE_URL not set. Add to .env.local first."
  echo "  export NEXT_PUBLIC_SUPABASE_URL=\"https://your-project.supabase.co\""
  exit 1
fi

if [ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
  error "SUPABASE_SERVICE_ROLE_KEY not set. Add to .env.local first."
  echo "  export SUPABASE_SERVICE_ROLE_KEY=\"your-service-role-key\""
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ]; then
  error "DATABASE_URL not set. Add to .env.local first."
  echo "  export DATABASE_URL=\"postgresql://postgres.your-project:***@db.your-project.supabase.co:5432/postgres\""
  exit 1
fi

# Parse DATABASE_URL
DB_USER=$(echo "$DATABASE_URL" | sed -n 's|postgresql://\([^:@]*\):.*|\1|p')
DB_PASS=$(echo "$DATABASE_URL" | sed -n 's|postgresql://[^:]*:\([^@]*\)@.*|\1|p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:]*\):.*|\1|p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:[0-9]*\/.*|\n|p' | head -1)
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:\([0-9]*\)\/.*|\1|p')
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's|.*\/\([a-zA-Z0-9_-]*\)$|\1|p')

DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-postgres}"

step "Connecting to: $DB_HOST:$DB_PORT/$DB_NAME as $DB_USER"
echo ""

# ─── Run migrations ───

MIGRATIONS_DIR="$PROJECT_ROOT/migrations"
if [ ! -d "$MIGRATIONS_DIR" ]; then
  error "Migrations directory not found: $MIGRATIONS_DIR"
  exit 1
fi

MIGRATION_FILES=$(find "$MIGRATIONS_DIR" -name "*.sql" -type f | sort)

if [ -z "$MIGRATION_FILES" ]; then
  error "No .sql migration files found in $MIGRATIONS_DIR"
  exit 1
fi

info "Found $(echo "$MIGRATION_FILES" | wc -l | tr -d ' ') migration(s):"
echo "$MIGRATION_FILES" | while read -r f; do
  echo "  -> $(basename "$f")"
done
echo ""

# Run each migration
export PGPASSWORD="$DB_PASS"
for migration_file in $MIGRATION_FILES; do
  migration_name=$(basename "$migration_file")
  step "Applying: $migration_name"
  
  if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$migration_file" 2>&1; then
    info "  ✓ $migration_name applied"
  else
    error "  ✗ Failed to apply $migration_name"
    exit 1
  fi
done
unset PGPASSWORD

echo ""
echo "========================================="
info "  All migrations applied successfully!"
echo "========================================="
echo ""
info "Next steps to go live:"
info "  1. Add email/SMS keys to .env.local:"
info "     RESEND_API_KEY=re_your_key"
info "     TWILIO_ACCOUNT_SID=AC_your_sid"
info "     TWILIO_AUTH_TOKEN=your_token"
info "     TWILIO_PHONE_NUMBER=+1234567890"
info "  2. Deploy to Vercel:"
info "     npx vercel deploy --prod"
info "  3. Add all env vars in Vercel dashboard"
info "  4. Visit /business/cuts-barbershop for demo"
echo ""
