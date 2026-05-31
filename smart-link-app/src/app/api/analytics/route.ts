import { NextRequest, NextResponse } from 'next/server';

// Analytics data storage (In-memory for demo; would use DB in production)
interface AnalyticsEvent {
  id: string;
  event_type: string;
  timestamp: string;
  properties: Record<string, any>;
  business_slug?: string;
}

// Simple in-memory store (demo mode)
let events: AnalyticsEvent[] = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  
  if (!action) {
    return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 });
  }
  
  const businessSlug = searchParams.get('business_slug');
  
  // Filter events for specific business if slug provided
  let filteredEvents = events;
  if (businessSlug) {
    filteredEvents = events.filter(e => e.business_slug === businessSlug);
  }
  
  switch (action) {
    case 'events':
      // Return recent events (last 100)
      return NextResponse.json({
        events: filteredEvents.slice(-100),
        total: filteredEvents.length,
      });
      
    case 'funnel':
      // Funnel metrics for a specific business
      if (!businessSlug) {
        return NextResponse.json({ error: 'Missing business_slug' }, { status: 400 });
      }
      
      const pageViews = filteredEvents.filter(e => e.event_type === 'page_view');
      const bookingsStarted = filteredEvents.filter(e => e.event_type === 'booking_start');
      const dateSelected = filteredEvents.filter(e => e.event_type === 'funnel_date_selected');
      const serviceSelected = filteredEvents.filter(e => e.event_type === 'funnel_service_selected');
      const detailsEntered = filteredEvents.filter(e => e.event_type === 'funnel_details_entered');
      const bookingsComplete = filteredEvents.filter(e => e.event_type === 'booking_complete' && e.properties?.success === true);
      
      return NextResponse.json({
        business_slug,
        total_page_views: pageViews.length,
        unique_visitors: new Set(pageViews.map(e => (e.properties as any).user_id || e.id)).size,
        bookings_started: bookingsStarted.length,
        funnel_date_selected: dateSelected.length,
        funnel_service_selected: serviceSelected.length,
        funnel_details_entered: detailsEntered.length,
        bookings_complete: bookingsComplete.length,
        conversion_rate: pageViews.length > 0 
          ? ((bookingsComplete.length / pageViews.length) * 100).toFixed(1)
          : '0.0',
        funnel_dropoff: {
          to_date_selection: pageViews.length > 0
            ? ((pageViews.length - dateSelected.length) / pageViews.length * 100).toFixed(1)
            : '0.0',
          to_service_selection: dateSelected.length > 0
            ? ((dateSelected.length - serviceSelected.length) / dateSelected.length * 100).toFixed(1)
            : '0.0',
          to_details: serviceSelected.length > 0
            ? ((serviceSelected.length - detailsEntered.length) / serviceSelected.length * 100).toFixed(1)
            : '0.0',
          to_completion: detailsEntered.length > 0
            ? ((detailsEntered.length - bookingsComplete.length) / detailsEntered.length * 100).toFixed(1)
            : '0.0',
        },
      });
      
    case 'sources':
      // Source breakdown for a business
      if (!businessSlug) {
        return NextResponse.json({ error: 'Missing business_slug' }, { status: 400 });
      }
      
      const sourceMap = new Map<string, number>();
      pageViews.forEach(e => {
        const source = (e.properties as any).referrer || 'direct';
        sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
      });
      
      const sources = Array.from(sourceMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      
      return NextResponse.json({ business_slug, sources });
      
    case 'clear':
      // Clear stored events (admin action)
      if (process.env.ADMIN_API_KEY === request.headers.get('x-admin-api-key')) {
        events = [];
        return NextResponse.json({ success: true, message: 'Events cleared' });
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simple demo storage (would use DB in production)
    const event: AnalyticsEvent = {
      id: `sl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event_type: body.event_type,
      timestamp: body.timestamp || new Date().toISOString(),
      properties: body.properties || {},
      business_slug: body.business_slug || null,
    };
    
    events.push(event);
    
    // Keep in memory under 10k events (would truncate to oldest)
    if (events.length > 10000) {
      events = events.slice(events.length - 10000);
    }
    
    return NextResponse.json({ 
      success: true, 
      id: event.id,
      demo_mode: !process.env.SUPABASE_URL,
    });
  } catch (err) {
    console.error('[Analytics] Event ingestion failed:', err);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
