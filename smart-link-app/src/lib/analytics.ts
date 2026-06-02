/**
 * MVP Analytics — Lightweight funnel tracking for Smart Link
 * 
 * Design Principles:
 * - Demo mode: localStorage + console logging (no external deps)
 * - Live mode: POSTs to analytics endpoint (no paid vendor required)
 * - Business owners read metrics from dashboard
 * - Zero-opinionated about production analytics vendor
 */

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  timestamp: string;
  properties: Record<string, any>;
}

export interface UtmContext {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export const CONTACT_CLICK_EVENT_TYPES = [
  'contact_call_clicked',
  'contact_whatsapp_clicked',
  'contact_email_clicked',
  'contact_directions_clicked',
] as const;

export type ContactClickEventType = (typeof CONTACT_CLICK_EVENT_TYPES)[number];

export const CONTACT_CLICK_EVENT_LABELS: Record<ContactClickEventType, string> = {
  contact_call_clicked: 'Calls',
  contact_whatsapp_clicked: 'WhatsApp',
  contact_email_clicked: 'Email',
  contact_directions_clicked: 'Directions',
};

export function formatAttributionSource(properties: Record<string, any> = {}): string {
  if (properties.utm_source) {
    return `${properties.utm_source}${properties.utm_medium ? ` (${properties.utm_medium})` : ''}${properties.utm_campaign ? ` [${properties.utm_campaign}]` : ''}`;
  }

  if (properties.utm_medium) {
    return `${properties.utm_medium}${properties.source ? ` - ${properties.source}` : ''}`;
  }

  if (properties.utm_campaign) {
    return `${properties.utm_campaign}${properties.source ? ` (${properties.source})` : ''}`;
  }

  if (properties.referrer) {
    return properties.referrer.split('/').pop() || properties.referrer.replace(/^https?:\/\//, '');
  }

  return properties.source || 'direct';
}

// Generate unique event IDs
function generateEventId(): string {
  if (typeof window !== 'undefined' && localStorage) {
    const existing = localStorage.getItem('sl_event_id');
    if (existing) return existing;
    const newId = `sl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sl_event_id', newId);
    return newId;
  }
  return 'demo';
}

// Get current analytics mode (demo or live)
export function getAnalyticsMode(): boolean {
  // true = demo mode (client-side only), false = live mode (server collection)
  if (typeof window === 'undefined') return true;
  
  const url = window.location.origin;
  const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  
  return isDemo;
}

// Main event tracking function
export async function track(event_type: string, properties?: Record<string, any>): Promise<void> {
  const demoMode = getAnalyticsMode();
  const eventId = generateEventId();
  
  // Demo mode: log to console + localStorage
  if (demoMode) {
    const event: AnalyticsEvent = {
      id: eventId,
      event_type,
      timestamp: new Date().toISOString(),
      properties: properties || {},
    };
    
    console.log(`[Analytics] ${event_type}:`, properties);
    
    // Store recent events locally (max 100)
    const storedEvents = JSON.parse(localStorage.getItem('sl_events') || '[]');
    const newStored = [...storedEvents, event].slice(-100);
    localStorage.setItem('sl_events', JSON.stringify(newStored));
    
    return;
  }
  
  // Live mode: POST to analytics API endpoint
  if (process.env.ANALYTICS_ENDPOINT) {
    fetch(process.env.ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type,
        timestamp: new Date().toISOString(),
        properties: properties || {},
      }),
    }).catch((err) => {
      console.warn('[Analytics] Server collection failed:', err.message);
    });
  } else {
    console.warn('[Analytics] No ANALYTICS_ENDPOINT configured');
  }
}

// Funnel event handlers (convenience wrappers)
export function onPageView(source?: string, referrer?: string, utm_source?: string, utm_medium?: string, utm_campaign?: string) {
  const props: Record<string, any> = {
    source: source || window.location.href.split('?')[0].split('/').pop() || 'direct',
    referrer: referrer || (typeof document !== 'undefined' ? document.referrer || '-' : '-'),
    slug: typeof window !== 'undefined' ? window.location.pathname.split('/').find(p => p) || '-' : '-',
  };

  Object.assign(props, getUtmContext({ utm_source, utm_medium, utm_campaign }));

  track('page_view', props);
}

export function onBookingStart() {
  track('booking_start', {});
}

export function onDateSelect() {
  track('funnel_date_selected', {});
}

export function onServiceSelected() {
  track('funnel_service_selected', {});
}

export function onDetailsEntered() {
  track('funnel_details_entered', {});
}

export async function onBookingSubmit(success: boolean, data?: any) {
  await track('booking_complete', {
    success,
    total_cents: data?.total_cents || null,
    service: data?.service_name || null,
  });
}

export function getUtmContext(overrides: UtmContext = {}): UtmContext {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const context: UtmContext = {};

  const utmSource = overrides.utm_source || params?.get('utm_source') || undefined;
  const utmMedium = overrides.utm_medium || params?.get('utm_medium') || undefined;
  const utmCampaign = overrides.utm_campaign || params?.get('utm_campaign') || undefined;

  if (utmSource) context.utm_source = utmSource;
  if (utmMedium) context.utm_medium = utmMedium;
  if (utmCampaign) context.utm_campaign = utmCampaign;

  return context;
}

export function onContactClick(
  type: 'call' | 'email' | 'text' | 'whatsapp' | 'directions',
  context: Record<string, any> = {},
) {
  const eventNames: Record<typeof type, string> = {
    call: 'contact_call_clicked',
    email: 'contact_email_clicked',
    text: 'contact_text_clicked',
    whatsapp: 'contact_whatsapp_clicked',
    directions: 'contact_directions_clicked',
  };

  track(eventNames[type], {
    ...context,
    ...getUtmContext(context),
  });
}

export function onFollowUpStatusChanged(status: string) {
  track('owner_follow_up_status', { status });
}

// Get stored demo events (for dashboard inspection in demo mode)
export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('sl_events') || '[]');
  } catch {
    return [];
  }
}

// Clear stored events (e.g., after sync to production)
export function clearStoredEvents(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sl_events');
    const currentId = generateEventId();
    localStorage.setItem('sl_event_id', currentId);
  }
}
