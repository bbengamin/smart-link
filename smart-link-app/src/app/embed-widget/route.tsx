import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Nearspoke Embed Widget",
    description: "Embeddable widget code for partner websites, directories, and review platforms.",
    htmlSnippet: `<iframe src="https://smartlink.app/embed/business/YOUR_SLUG" width="400" height="600" style="border:none; border-radius:8px;"></iframe>`,
    instructions: [
      "Replace YOUR_SLUG with your actual business slug (e.g., cuts-barbershop, the-coffee-roasters)",
      "This widget displays your smart link business profile in an iframe",
      "Supported for all public business profiles"
    ],
    exampleUsage: {
      yelp: '<iframe src="https://smartlink.app/embed/business/cuts-barbershop" width="400" height="600"></iframe>',
      foursquare: 'Add to your Foursquare partner page using our embed code'
    },
    limitations: [
      "Embed is intended for third-party websites and directories",
      "Not a full-page route like smartlink.app/business/SLUG",
      "Best used alongside direct profile links"
    ]
  });
}
