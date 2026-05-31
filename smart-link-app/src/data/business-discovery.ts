export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface BusinessDiscoveryProfile {
  neighborhood?: string;
  areaServed?: string[];
  geo?: GeoCoordinates;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
}

const discoveryProfiles: Record<string, BusinessDiscoveryProfile> = {
  "cuts-barbershop": {
    neighborhood: "Downtown Brooklyn",
    areaServed: ["Brooklyn", "Downtown Brooklyn", "Boerum Hill"],
    geo: { "@type": "GeoCoordinates", latitude: 40.6782, longitude: -73.9442 },
    facebook_url: "https://facebook.com/cutsbarbershop",
    instagram_url: "https://instagram.com/cutsbarbershop",
    twitter_url: "https://twitter.com/cutsbarbershop",
  },
  "luxe-salon": {
    neighborhood: "Midtown Manhattan",
    areaServed: ["Manhattan", "Midtown Manhattan", "Flatiron"],
    geo: { "@type": "GeoCoordinates", latitude: 40.7589, longitude: -73.9851 },
    facebook_url: "https://facebook.com/luxesalon",
    instagram_url: "https://instagram.com/luxesalon",
  },
  "fresh-cuts-studio": {
    neighborhood: "Long Island City",
    areaServed: ["Queens", "Long Island City", "Astoria"],
    geo: { "@type": "GeoCoordinates", latitude: 40.7282, longitude: -73.7949 },
    instagram_url: "https://instagram.com/freshcutsstudio",
  },
  "glow-hair-studio": {
    neighborhood: "Midtown East",
    areaServed: ["Manhattan", "Midtown East", "Upper East Side"],
    geo: { "@type": "GeoCoordinates", latitude: 40.758, longitude: -73.9855 },
    facebook_url: "https://facebook.com/glowhairstudio",
    instagram_url: "https://instagram.com/glowhairstudio",
    twitter_url: "https://twitter.com/glowhairstudio",
  },
};

export function getBusinessDiscoveryProfile(slug: string): BusinessDiscoveryProfile | null {
  return discoveryProfiles[slug] || null;
}

export function getBusinessGeo(slug: string): GeoCoordinates | null {
  return discoveryProfiles[slug]?.geo || null;
}

export function getBusinessSocials(slug: string): {
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
} {
  const profile = discoveryProfiles[slug];
  if (!profile) return {};

  return {
    facebook_url: profile.facebook_url,
    instagram_url: profile.instagram_url,
    twitter_url: profile.twitter_url,
  };
}

export function getBusinessAreaServed(slug: string, city?: string, state?: string): string[] {
  const seeded = discoveryProfiles[slug]?.areaServed || [];
  const inferred = [city, state ? `${city}, ${state}` : undefined].filter(Boolean) as string[];
  return Array.from(new Set([...seeded, ...inferred]));
}

export function getBusinessNeighborhood(slug: string): string | undefined {
  return discoveryProfiles[slug]?.neighborhood;
}

export function buildBusinessMapUrl(params: {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}): string | undefined {
  const query = [params.address, params.city, params.state, params.zip]
    .filter(Boolean)
    .join(", ");

  if (!query) return undefined;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildBusinessKeywords(params: {
  name: string;
  category: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  services?: string[];
}): string[] {
  const typeLabel = params.category === "salon" ? "salon" : "barbershop";
  return Array.from(
    new Set(
      [
        params.name,
        `Smart Link ${typeLabel}`,
        typeLabel,
        params.city,
        params.state,
        params.city ? `${typeLabel} in ${params.city}` : undefined,
        params.city && params.state ? `${typeLabel} in ${params.city}, ${params.state}` : undefined,
        params.neighborhood ? `${typeLabel} near ${params.neighborhood}` : undefined,
        ...(params.services || []).slice(0, 4),
      ].filter(Boolean) as string[],
    ),
  );
}
