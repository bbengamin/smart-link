/**
 * Demo Analytics Viewer — Shows funnel metrics in demo mode
 * Business owners can read this to see how visitors are converting
 */

import { useState, useEffect } from "react";
import {
  CONTACT_CLICK_EVENT_LABELS,
  CONTACT_CLICK_EVENT_TYPES,
  formatAttributionSource,
  getStoredEvents,
  type AnalyticsEvent,
} from "@/lib/analytics";

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

export default function DemoAnalyticsViewer() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    try {
      const stored = getStoredEvents();
      // Sort by newest first
      setEvents([...stored].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (e) {
      console.error("Failed to load events:", e);
    }
  }, []);

  const funnelMetrics = {
    pageViews: events.filter(e => e.event_type === "page_view").length,
    bookingStarts: events.filter(e => e.event_type === "booking_start").length,
    dateSelected: events.filter(e => e.event_type === "funnel_date_selected").length,
    serviceSelected: events.filter(e => e.event_type === "funnel_service_selected").length,
    detailsEntered: events.filter(e => e.event_type === "funnel_details_entered").length,
    bookingsCompleted: events.filter(
      (event) => event.event_type === "booking_complete" && Boolean(event.properties?.success),
    ).length,
  };

  const contactCounts = CONTACT_CLICK_EVENT_TYPES.map((eventType) => ({
    eventType,
    label: CONTACT_CLICK_EVENT_LABELS[eventType],
    count: events.filter((event) => event.event_type === eventType).length,
  }));

  const contactSourceMap = new Map<string, number>();
  events
    .filter((event) => CONTACT_CLICK_EVENT_TYPES.includes(event.event_type as (typeof CONTACT_CLICK_EVENT_TYPES)[number]))
    .forEach((event) => {
      const sourceName = formatAttributionSource(event.properties || {});
      contactSourceMap.set(sourceName, (contactSourceMap.get(sourceName) || 0) + 1);
    });

  const contactSources = Array.from(contactSourceMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-4">
      {/* Funnel Summary */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Funnel Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Page Views</div>
            <div className="font-bold text-blue-600">{funnelMetrics.pageViews}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Booking Starts</div>
            <div className="font-bold text-green-600">{funnelMetrics.bookingStarts}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Date Selected</div>
            <div className="font-bold text-green-600">{funnelMetrics.dateSelected}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Service Selected</div>
            <div className="font-bold text-green-600">{funnelMetrics.serviceSelected}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Form Complete</div>
            <div className="font-bold text-green-600">{funnelMetrics.detailsEntered}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500">Booked</div>
            <div className="font-bold text-green-600">{funnelMetrics.bookingsCompleted}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Contact Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {contactCounts.map((contact) => (
            <div key={contact.eventType} className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-500">{contact.label}</div>
              <div className="font-bold text-emerald-600">{contact.count}</div>
            </div>
          ))}
        </div>
        {contactSources.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Top contact sources</div>
            <div className="space-y-2 text-sm">
              {contactSources.slice(0, 5).map((source) => (
                <div key={source.name} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2">
                  <span className="truncate text-gray-600">{source.name}</span>
                  <span className="font-semibold text-gray-900">{source.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Raw Events Log */}
      <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 shadow-sm font-mono text-xs overflow-x-auto">
        <h3 className="font-semibold text-gray-300 mb-2">Recent Events</h3>
        {events.length === 0 ? (
          <div className="text-gray-500 py-2">No events recorded yet. Visit a business page to start tracking.</div>
        ) : (
          events.slice(-50).map((event) => (
            <div key={event.id} className="border-b border-gray-800 last:border-0 py-1">
              <span className="text-gray-500">[{formatTime(event.timestamp)}]</span>{' '}
              <span className="text-blue-400">{event.event_type}</span>
              {event.properties && (
                <span className="text-gray-400 ml-2">
                  {JSON.stringify(event.properties).slice(0, 100)}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Clear button */}
      <button
        onClick={() => {
          localStorage.removeItem("sl_events");
          localStorage.removeItem("sl_event_id");
          setEvents([]);
        }}
        className="text-sm text-red-500 hover:text-red-600 hover:underline"
      >
        Clear demo events
      </button>
    </div>
  );
}
