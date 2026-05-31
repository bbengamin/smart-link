/**
 * Seed database with demo businesses, services, reviews from seed.json
 * Run: npx tsx scripts/seed_database.ts
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

async function insert_or_get_business(slug: string, seedData: any) {
  const businesses = seedData.businesses;
  const biz = businesses.find((b: any) => b.slug === slug);
  if (!biz) throw new Error(`Business ${slug} not found in seed`);
  return biz;
}

async function main(): Promise<void> {
  console.log("Smart Link Database Seeder");
  console.log("===========================");

  // Read env from workspace (or build-time)
  const app_dir = "/opt/data/autonomous/smart-link/smart-link-app";
  const env_content = fs.readFileSync(`${app_dir}/.env.local`, "utf8");

  let supabase_url: string | undefined;
  let service_role_key: string | undefined;

  for (const line of env_content.split("\n")) {
    if (line.startsWith("#")) continue;
    if (line.includes("NEXT_PUBLIC_SUPABASE_URL=")) {
      const parts = line.split("=");
      supabase_url = parts.slice(1).join("=").trim().replace(/["']/g, "");
    }
    if (line.startsWith("SUPABASE_SERVICE_ROLE_KEY")) {
      const parts = line.split("=");
      service_role_key = parts.slice(1).join("=").trim().replace(/["']/g, "");
    }
  }

  if (!supabase_url || !service_role_key) {
    console.warn("Cannot read Supabase credentials from .env.local");
    return;
  }

  const supabase = createClient(supabase_url, service_role_key);

  // Load seed data
  const seed_path = `${app_dir}/src/data/seed.json`;
  if (!fs.existsSync(seed_path)) {
    throw new Error(`Seed file not found: ${seed_path}`);
  }
  const seedData = JSON.parse(fs.readFileSync(seed_path, "utf8"));

  console.log(`Loaded ${seedData.businesses.length} businesses`);
  console.log(`Services for ${Object.keys(seedData.services).length} businesses`);
  console.log(`Reviews to import: ${Object.entries(seedData.reviews).reduce((sum, [_, arr]) => sum + arr.length, 0)}`);

  // Insert businesses
  console.log("\nInserting businesses...");
  const businesses_data = seedData.businesses;
  const { data: biz_data, error: biz_err } = await supabase
    .from("businesses")
    .insert(businesses_data)
    .select()
    .single(); // Just check one exists

  if (biz_err) {
    console.error(`Error inserting businesses: ${biz_err.message}`);
    process.exit(1);
  }
  console.log("✓ Businesses seeded");

  // Insert services grouped by business_id
  console.log("\nInserting services...");
  const service_list: any[] = [];
  const svc_list_entries = Array.from(Object.entries(seedData.services)) as [string, any[]][];
  for (const [slug, services_array] of svc_list_entries) {
    const biz = seedData.businesses.find((b: any) => b.slug === slug);
    if (!biz) throw new Error(`Business ${slug} not found for services`);

    for (const svc of services_array) {
      service_list.push({
        business_id: biz.id,
        name: svc.name,
        description: svc.description,
        price: svc.price, // already in cents
        duration_minutes: svc.duration_minutes,
        category: null,
        is_active: true,
      });
    }
  }

  const { data: svc_data, error: svc_err } = await supabase
    .from("services")
    .insert(service_list)
    .select();

  if (svc_err) {
    console.error(`Error inserting services: ${svc_err.message}`);
    process.exit(1);
  }
  console.log(`✓ Inserted ${svc_data.length} services`);

  // Insert reviews grouped by business_id
  console.log("\nInserting reviews...");
  const review_list_entries = Array.from(Object.entries(seedData.reviews)) as [string, any[]][];
  for (const [slug, review_list] of review_list_entries) {
    const biz = seedData.businesses.find((b: any) => b.slug === slug);
    if (!biz) throw new Error(`Business ${slug} not found for reviews`);

    for (const rev of review_list) {
      await supabase.from("reviews").insert({
        business_id: biz.id,
        customer_name: rev.customer_name,
        rating: rev.rating,
        comment: rev.comment,
        is_verified: false,
      });
    }
  }
  console.log("✓ Reviews seeded");

  console.log("\n✅ Database seed complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
