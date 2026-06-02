/**
 * Booking server action.
 * In demo mode: stores bookings in localStorage + console.
 * In live mode: stores to Supabase + sends SMS/email via Resend/Twilio.
 */

"use server";

import { revalidatePath } from "next/cache";
import { getDemoBusiness } from "@/data/demo";

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

interface TelegramOwnerAlertPayload {
  bookingId: string;
  businessName: string;
  businessSlug: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url.includes("placeholder") || url.includes("demo");
}

function getOptionalEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

async function sendTelegramOwnerAlert(payload: TelegramOwnerAlertPayload): Promise<void> {
  const botToken = getOptionalEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getOptionalEnv("TELEGRAM_CHAT_ID");

  if (!botToken || !chatId) {
    console.info(
      "Telegram owner alert skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured."
    );
    return;
  }

  const threadId = getOptionalEnv("TELEGRAM_THREAD_ID");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartlink.app";
  const bookingUrl = `${appUrl}/business/${payload.businessSlug}/book`;
  const lines = [
    "🔔 New Nearspoke booking",
    `Business: ${payload.businessName}`,
    `Service: ${payload.serviceName} ($${(payload.servicePrice / 100).toFixed(2)})`,
    `When: ${payload.date} at ${payload.time}`,
    `Customer: ${payload.customerName}`,
    payload.customerPhone ? `Phone: ${payload.customerPhone}` : null,
    payload.customerEmail ? `Email: ${payload.customerEmail}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null,
    `Booking ID: ${payload.bookingId}`,
    `Open booking page: ${bookingUrl}`,
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_thread_id: threadId ? Number(threadId) : undefined,
      text: lines.join("\n"),
      disable_web_page_preview: true,
    }),
  });

  let body: { ok?: boolean; description?: string } | null = null;
  try {
    body = (await response.json()) as { ok?: boolean; description?: string };
  } catch {
    body = null;
  }

  if (!response.ok || body?.ok === false) {
    throw new Error(body?.description || `Telegram API returned HTTP ${response.status}`);
  }
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

  const isDemo = isDemoMode();

  if (isDemo) {
    const bookingId = `demo-${crypto.randomUUID()}`;
    console.info(
      "[Demo] Booking accepted without external delivery. Client-side demo storage and owner follow-up are expected."
    );
    return { success: true, bookingId };
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
      .select("id, name")
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

    try {
      await sendTelegramOwnerAlert({
        bookingId: booking.id,
        businessName: business.name || data.businessSlug,
        businessSlug: data.businessSlug,
        serviceName: data.serviceName,
        servicePrice: data.servicePrice,
        date: data.date,
        time: data.time,
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        notes: data.notes,
      });
    } catch (telegramErr) {
      console.warn("Telegram owner alert failed (non-fatal):", telegramErr);
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
