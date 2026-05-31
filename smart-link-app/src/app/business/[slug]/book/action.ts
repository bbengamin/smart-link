/**
 * Booking server action.
 * In demo mode: stores bookings in localStorage + console.
 * In live mode: stores to Supabase + sends SMS/email via Resend/Twilio.
 */

"use server";

import { revalidatePath } from "next/cache";

export interface BookingFormData {
  businessSlug: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:MM
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

export async function submitBooking(
  data: BookingFormData
): Promise<BookingResult> {
  // Validate
  if (!data.businessSlug || !data.serviceId || !data.date || !data.time) {
    return { success: false, error: "Missing required fields" };
  }
  if (!data.customerName.trim()) {
    return { success: false, error: "Name is required" };
  }

  const isDemo =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("demo");

  if (isDemo) {
    // Demo mode: store in localStorage for visibility
    try {
      const existing = JSON.parse(localStorage.getItem("smart_link_bookings") || "[]");
      const booking = {
        id: crypto.randomUUID(),
        ...data,
        status: "pending" as const,
        created_at: new Date().toISOString(),
      };
      existing.push(booking);
      localStorage.setItem("smart_link_bookings", JSON.stringify(existing));
      console.log("[Demo] Booking saved:", booking);
    } catch (e) {
      console.error("[Demo] Failed to save booking:", e);
    }
    return { success: true, bookingId: "demo-" + crypto.randomUUID() };
  }

  // Live mode: insert into Supabase
  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: business, error: bizErr } = await supabase
      .from("businesses")
      .select("id")
      .eq("slug", data.businessSlug)
      .single();

    if (bizErr || !business) {
      return { success: false, error: "Business not found" };
    }

    const { data: booking, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        business_id: business.id,
        customer_name: data.customerName.trim(),
        customer_phone: data.customerPhone || null,
        customer_email: data.customerEmail || null,
        service_name: data.serviceName,
        service_price: data.servicePrice,
        date: new Date(`${data.date}T${data.time}:00`),
        notes: data.notes || null,
        status: "pending",
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Booking insert error:", insertErr);
      return { success: false, error: "Failed to create booking" };
    }

    // Send confirmation SMS via Twilio
    if (data.customerPhone) {
      try {
        const twilioAccountSid = process.env.TWILIO_API_ACCOUNT_SID || undefined;
        // Supports either classic AC... account auth or SK... API key auth + derived real account SID.
        const twilio = require("twilio")(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN,
          twilioAccountSid ? { accountSid: twilioAccountSid } : undefined
        );
        await twilio.messages.create({
          body: `Thanks ${data.customerName}! Your booking at ${data.serviceName} on ${data.date} at ${data.time} is confirmed. Reply to cancel.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: data.customerPhone,
        });
      } catch (smsErr) {
        console.warn("SMS send failed (non-fatal):", smsErr);
      }
    }

    // Send email via Resend
    if (data.customerEmail) {
      try {
        const { Resend } = require("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        // Use verified sender until domain is verified; fall back to onboarding@resend.dev
        const from = process.env.RESEND_SENDER_FROM || "onboarding@resend.dev";
        await resend.emails.send({
          from: `"Bookings" <${from}>`,
          to: data.customerEmail,
          subject: `Booking Confirmed — ${data.serviceName}`,
          html: `
            <h2>Booking Confirmed!</h2>
            <p>Hi ${data.customerName},</p>
            <p>Your booking has been received:</p>
            <ul>
              <li><strong>Service:</strong> ${data.serviceName}</li>
              <li><strong>Date:</strong> ${data.date}</li>
              <li><strong>Time:</strong> ${data.time}</li>
              <li><strong>Price:</strong> $${(data.servicePrice / 100).toFixed(2)}</li>
            </ul>
            <p>We'll send a reminder 24 hours before your appointment.</p>
          `,
        });
      } catch (emailErr) {
        console.warn("Email send failed (non-fatal):", emailErr);
      }
    }

    revalidatePath(`/business/${data.businessSlug}/book`);
    return { success: true, bookingId: booking.id };
  } catch (err) {
    console.error("Booking error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
