import type { MetadataRoute } from "next";
import { getAllDemoBusinesses } from "@/data/demo";
import { supabase } from "@/lib/supabase";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";

function isLiveMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!(url && !url.includes("placeholder") && !url.includes("demo"));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  entries.push(
    {
      url: APP_URL,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${APP_URL}/pricing`,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${APP_URL}/blog`,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  );

  // Business profile pages
  if (isLiveMode()) {
    // In live mode, fetch from Supabase
    try {
      const { data: businesses } = await supabase
        .from("businesses")
        .select("slug,updated_at")
        .eq("is_active", true)
        .order("updated_at", { ascending: false });

      if (businesses) {
        businesses.forEach((biz) => {
          entries.push({
            url: `${APP_URL}/business/${biz.slug}`,
            lastModified: biz.updated_at
              ? new Date(biz.updated_at)
              : new Date("2026-05-29"),
            changeFrequency: "daily",
            priority: 0.8,
          });
          entries.push({
            url: `${APP_URL}/api/ai/${biz.slug}`,
            lastModified: biz.updated_at
              ? new Date(biz.updated_at)
              : new Date("2026-05-29"),
            changeFrequency: "weekly",
            priority: 0.4,
          });
        });
      }
    } catch {
      // Fall through to demo data if Supabase is unreachable
    }
  }

  // Always include demo businesses for development/local testing
  const demoBusinesses = getAllDemoBusinesses();
  demoBusinesses.forEach((biz) => {
    // Only add if not already in the list (live mode may have overlap)
    const slugExists = entries.some(
      (e) => e.url === `${APP_URL}/business/${biz.slug}`,
    );
    if (!slugExists) {
      entries.push({
        url: `${APP_URL}/business/${biz.slug}`,
        lastModified: new Date("2026-05-29"),
        changeFrequency: "daily",
        priority: 0.8,
      });
      entries.push({
        url: `${APP_URL}/api/ai/${biz.slug}`,
        lastModified: new Date("2026-05-29"),
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  });

  return entries;
}
