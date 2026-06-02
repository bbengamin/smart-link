/**
 * Client-side tracking for the booking page.
 */

"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

interface BookingTrackerProps {
  slug: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export function BookingTracker({
  slug,
  utm_source,
  utm_medium,
  utm_campaign,
}: BookingTrackerProps) {
  useEffect(() => {
    track("booking_start", {
      slug,
      utm_source,
      utm_medium,
      utm_campaign,
    });
  }, [slug, utm_source, utm_medium, utm_campaign]);

  return null;
}
