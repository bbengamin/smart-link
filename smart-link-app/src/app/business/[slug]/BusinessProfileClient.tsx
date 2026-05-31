"use client";

import { useEffect } from "react";
import { onContactClick, onPageView, track } from "@/lib/analytics";
import { buildBusinessMapUrl } from "@/data/business-discovery";

interface Props {
  slug: string;
  isDemo: boolean;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

export default function BusinessProfileClient({
  slug,
  isDemo,
  phone,
  email,
  address,
  city,
  state,
  zip,
}: Props) {
  useEffect(() => {
    onPageView(slug, isDemo ? "demo" : "live");
  }, [slug, isDemo]);

  const sanitizedPhone = phone?.replace(/[^0-9+]/g, "") || "";
  const whatsappPhone = phone?.replace(/[^0-9]/g, "") || "";
  const mapsUrl = buildBusinessMapUrl({ address: address || undefined, city: city || undefined, state: state || undefined, zip: zip || undefined });

  return (
    <>
      <div className="mb-10">
        <a
          href={`/business/${slug}/book`}
          onClick={() => track("contact_click", { slug, method: "book" })}
          className="block w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-sm hover:shadow-md transition-all text-center"
        >
          Book Appointment
        </a>
        {isDemo && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Demo mode — bookings are stored locally
          </p>
        )}
      </div>

      <a
        href={`/qr/${slug}`}
        onClick={() => track("contact_click", { slug, method: "qr" })}
        className="block w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors mb-2"
      >
        📱 Get QR Code
      </a>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
          Contact
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {phone && (
            <a
              href={`tel:${sanitizedPhone}`}
              onClick={() => onContactClick("call")}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              📞 Call
            </a>
          )}
          {phone && (
            <a
              href={`https://wa.me/${whatsappPhone}?text=Hi,%20I%20saw%20your%20smart%20link%20and%20wanted%20to%20book!`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onContactClick("whatsapp")}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-xl text-sm font-medium text-green-700 border border-green-200 transition-colors"
            >
              💬 WhatsApp
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}?subject=Smart%20Link%20Booking%20Inquiry`}
              onClick={() => onContactClick("email")}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              ✉️ Email
            </a>
          )}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onContactClick("directions")}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-100 transition-colors"
            >
              📍 Directions
            </a>
          )}
        </div>

        {(phone || address || city || state || zip || email) && (
          <dl className="mt-4 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            {phone && (
              <div className="flex flex-col gap-1 py-1 sm:flex-row sm:items-start sm:justify-between">
                <dt className="font-medium text-gray-900">Phone</dt>
                <dd>
                  <a
                    href={`tel:${sanitizedPhone}`}
                    onClick={() => onContactClick("call")}
                    className="text-blue-600 hover:underline"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
            )}
            {(address || city || state || zip) && (
              <div className="flex flex-col gap-1 py-1 sm:flex-row sm:items-start sm:justify-between">
                <dt className="font-medium text-gray-900">Address</dt>
                <dd className="sm:max-w-[70%] sm:text-right">
                  {[
                    address,
                    [city, state].filter(Boolean).join(", "),
                    zip,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </dd>
              </div>
            )}
            {email && (
              <div className="flex flex-col gap-1 py-1 sm:flex-row sm:items-start sm:justify-between">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd>
                  <a
                    href={`mailto:${email}?subject=Smart%20Link%20Booking%20Inquiry`}
                    onClick={() => onContactClick("email")}
                    className="text-blue-600 hover:underline"
                  >
                    {email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        )}
      </section>
    </>
  );
}
