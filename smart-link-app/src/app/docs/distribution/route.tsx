import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Distribution Affordances for Nearspoke Links",
    description: "Learn how to share your smart link across major channels including QR codes, social bios, messaging apps, websites, and maps profiles.",
    contents: [
      {
        section: "Distribution Overview",
        content: "Nearspoke links provide a lightweight way for local businesses to be shared across multiple channels. Each distribution surface — from QR codes on receipts to embed widgets on partner sites — serves as an affordance that shows how your business can receive traffic and bookings through a single, portable link."
      },
      {
        section: "QR Codes",
        content: "Print QR codes on receipts, menus, or shop windows. When scanned, they point directly to your business profile at smartlink.app/business/your-slug. This is high-ROI distribution with minimal implementation cost."
      },
      {
        section: "Social Bios",
        content: "Use smartlink.app/business/your-slug as your Instagram, TikTok, or Facebook bio link. It's a single, clean URL that provides access to your full business profile instead of managing multiple links."
      },
      {
        section: "Messaging Apps",
        content: "Nearspoke links work well in WhatsApp Business cards, Telegram channel posts, and SMS messages. Rich previews can be configured to show business information directly in the messaging app."
      },
      {
        section: "Website Embeds",
        content: "Embed smart links on third-party sites like Yelp, Foursquare, or corporate websites. The /api/messaging-templates/template.json endpoint provides copy templates for these integrations."
      },
      {
        section: "Maps Profiles",
        content: "Add your smart link to Google Business Profile, Apple Maps, and Yelp business pages. This appears as the official website URL or a direct link in search results and map cards."
      },
      {
        section: "Implementation Tips",
        content: "Start with low-hanging fruit — social bios and QR codes have the highest ROI. Update those first, then layer in messaging app integrations and website embeds as needed."
      }
    ],
    copyTemplatesEndpoint: "/api/messaging-templates/template.json",
    exampleUrl: "smartlink.app/business/the-coffee-roasters"
  });
}
