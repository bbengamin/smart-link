import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nearspoke — Smart Business Links",
  description:
    "Give your business a smart link that books customers, manages clients, and indexes itself to AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nearspoke",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
