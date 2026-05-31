/**
 * Demo data loader for Smart Link.
 * Provides sample business data when no database is connected.
 * Used automatically when NEXT_PUBLIC_SUPABASE_URL is placeholder/empty.
 */

import seedData from "@/data/seed.json";
import {
  type BusinessDiscoveryProfile,
  getBusinessDiscoveryProfile,
  getBusinessGeo as getDiscoveryGeo,
  getBusinessSocials as getDiscoverySocials,
} from "@/data/business-discovery";

export interface DemoBusiness {
  slug: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  category: string;
  hours: Record<string, { open: string; close: string }>;
  logo_url: string;
  is_active: boolean;
}

export interface DemoService {
  name: string;
  description?: string;
  price: number; // in cents
  duration_minutes: number;
}

export function getDemoBusiness(slug: string): DemoBusiness | null {
  const business = seedData.businesses.find((b) => b.slug === slug);
  return business || null;
}

export function getDemoServices(slug: string): DemoService[] {
  const services = seedData.services[slug as keyof typeof seedData.services];
  return services || [];
}

export function getAllDemoBusinesses(): DemoBusiness[] {
  return seedData.businesses;
}

export interface DemoReview {
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export function getDemoReviews(slug: string): DemoReview[] {
  const reviews = seedData.reviews?.[slug as keyof typeof seedData.reviews];
  return reviews || [];
}

export function getAverageRating(slug: string): number {
  const reviews = getDemoReviews(slug);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getBusinessSocials(slug: string): {
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
} {
  return getDiscoverySocials(slug);
}

export function getBusinessGeo(slug: string): GeoCoordinates | null {
  return getDiscoveryGeo(slug);
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export function getBusinessDiscovery(slug: string): BusinessDiscoveryProfile | null {
  return getBusinessDiscoveryProfile(slug);
}
