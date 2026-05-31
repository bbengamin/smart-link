/**
 * Demo data loader for Smart Link.
 * Provides sample business data when no database is connected.
 * Used automatically when NEXT_PUBLIC_SUPABASE_URL is placeholder/empty.
 */

import seedData from "@/data/seed.json";

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

export function getBusinessSocials(slug: string): { facebook?: string; instagram?: string; twitter?: string } {
  const enhancments = socialEnhancements[slug as keyof typeof socialEnhancements];
  return enhancements || {};
}

export function getBusinessGeo(slug: string): GeoCoordinates | null {
  const enhanced = socialEnhancements[slug as keyof typeof socialEnhancements];
  return enhanced?.geo || null;
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

interface SocialEnhancements {
  [slug: string]: {
    geo?: GeoCoordinates;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
  };
}

const socialEnhancements: SocialEnhancements = {
  "cuts-barbershop": {
    lat: 40.6782,
    lng: -73.9442,
    geo: {"@type": "GeoCoordinates", "latitude": 40.6782, "longitude": -73.9442},
    facebook_url: "https://facebook.com/cutsbarbershop",
    instagram_url: "https://instagram.com/cutsbarbershop",
    twitter_url: ""
  },
  "luxe-salon": {
    lat: 40.7589,
    lng: -73.9851,
    geo: {"@type": "GeoCoordinates", "latitude": 40.7589, "longitude": -73.9851},
    facebook_url: "https://facebook.com/luxesalon",
    instagram_url: "https://instagram.com/luxesalon",
    twitter_url: "https://twitter.com/luxesalon"
  },
  "fresh-cuts-studio": {
    lat: 40.7282,
    lng: -73.7949,
    geo: {"@type": "GeoCoordinates", "latitude": 40.7282, "longitude": -73.7949},
    facebook_url: "",
    instagram_url: "https://instagram.com/freshcutsstudio",
    twitter_url: ""
  },
  "glow-hair-studio": {
    lat: 40.7580,
    lng: -73.9855,
    geo: {"@type": "GeoCoordinates", "latitude": 40.7580, "longitude": -73.9855},
    facebook_url: "https://facebook.com/glowhairstudio",
    instagram_url: "https://instagram.com/glowhairstudio",
    twitter_url: ""
  }
};
