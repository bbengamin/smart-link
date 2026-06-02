/**
 * Business Analytics Dashboard — MVP Funnel View
 * 
 * Owner-facing dashboard to read funnel metrics for their smart link.
 * Works in demo mode (localStorage) and live mode (fetches from analytics endpoint).
 */

"use client";

import { useState, useEffect } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import {
  CONTACT_CLICK_EVENT_LABELS,
  CONTACT_CLICK_EVENT_TYPES,
  formatAttributionSource,
  getStoredEvents,
  getAnalyticsMode,
} from "@/lib/analytics";

interface FunnelMetrics {
  total_page_views: number;
  unique_visitors: number;
  bookings_started: number;
  funnel_date_selected: number;
  funnel_service_selected: number;
  funnel_details_entered: number;
  bookings_complete: number;
  conversion_rate: string;
  sources: Array<{ name: string; count: number }>;
  contact_actions: Array<{ event_type: string; label: string; count: number }>;
  contact_sources: Array<{ name: string; count: number }>;
}

interface DemoAnalyticsDashboardProps {
  businessSlug?: string;
}

export function DemoAnalyticsDashboard({ businessSlug }: DemoAnalyticsDashboardProps) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [sources, setSources] = useState<Array<{ name: string; count: number }>>([]);

  useEffect(() => {
    try {
      const demoMode = getAnalyticsMode();
      const stored = getStoredEvents();
      const shouldUseStoredEvents = demoMode || stored.length > 0;
      
      if (shouldUseStoredEvents) {
        setEvents(stored);
        
        const pageViews = stored.filter(e => e.event_type === 'page_view');
        const bookingsStarted = stored.filter(e => e.event_type === 'booking_start');
        const dateSelected = stored.filter(e => e.event_type === 'funnel_date_selected');
        const serviceSelected = stored.filter(e => e.event_type === 'funnel_service_selected');
        const detailsEntered = stored.filter(e => e.event_type === 'funnel_details_entered');
        const bookingsComplete = stored.filter(
          e => e.event_type === 'booking_complete' && (e.properties as any)?.success === true
        );
        const contactClicks = stored.filter((e) =>
          CONTACT_CLICK_EVENT_TYPES.includes(e.event_type as (typeof CONTACT_CLICK_EVENT_TYPES)[number]),
        );

        const uniqueVisitors = new Set(pageViews.map(e => (e.properties as any).user_id || e.id)).size;

        // Prioritize UTM sources over referrer for traffic source attribution
        const sourceMap = new Map<string, number>();
        pageViews.forEach(e => {
          const sourceName = formatAttributionSource((e.properties as any) || {});
          sourceMap.set(sourceName, (sourceMap.get(sourceName) || 0) + 1);
        });

        const contactSourceMap = new Map<string, number>();
        contactClicks.forEach((e) => {
          const sourceName = formatAttributionSource((e.properties as any) || {});
          contactSourceMap.set(sourceName, (contactSourceMap.get(sourceName) || 0) + 1);
        });

        const contactActions = CONTACT_CLICK_EVENT_TYPES.map((eventType) => ({
          event_type: eventType,
          label: CONTACT_CLICK_EVENT_LABELS[eventType],
          count: contactClicks.filter((e) => e.event_type === eventType).length,
        }));
        
        setMetrics({
          total_page_views: pageViews.length,
          unique_visitors: uniqueVisitors,
          bookings_started: bookingsStarted.length,
          funnel_date_selected: dateSelected.length,
          funnel_service_selected: serviceSelected.length,
          funnel_details_entered: detailsEntered.length,
          bookings_complete: bookingsComplete.length,
          conversion_rate: pageViews.length > 0
            ? ((bookingsComplete.length / pageViews.length) * 100).toFixed(1)
            : '0.0',
          sources: Array.from(sourceMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count),
          contact_actions: contactActions,
          contact_sources: Array.from(contactSourceMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count),
        });
        
        setSources(Array.from(sourceMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count));
      } else if (businessSlug && process.env.ANALYTICS_ENDPOINT) {
        fetch(`${process.env.ANALYTICS_ENDPOINT}/analytics?action=funnel&business_slug=${encodeURIComponent(businessSlug)}`)
          .then(res => res.json())
          .then(data => {
            setMetrics(data);
            setSources(data.sources || []);
          })
          .catch(err => console.warn('Failed to fetch analytics:', err));
      }
    } catch (e) {
      console.error('Failed to load analytics:', e);
    }
  }, [businessSlug]);

  const renderFunnelSteps = (): React.JSX.Element | null => {
    if (!metrics) return null;

    const steps = [
      { label: 'Page Views', count: metrics.total_page_views, color: 'bg-blue-500' },
      { label: 'Started Booking', count: metrics.bookings_started, color: 'bg-indigo-500' },
      { label: 'Date Selected', count: metrics.funnel_date_selected, color: 'bg-purple-500' },
      { label: 'Service Selected', count: metrics.funnel_service_selected, color: 'bg-pink-500' },
      { label: 'Details Entered', count: metrics.funnel_details_entered, color: 'bg-rose-500' },
      { label: 'Booking Complete', count: metrics.bookings_complete, color: 'bg-green-500' },
    ];

    const maxCount = Math.max(...steps.map(s => s.count), 1);

    return (
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-24 text-xs font-medium text-gray-600 ${idx === 0 ? 'text-left' : 'text-right'} flex-1`}>
              {step.label}
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-full ${step.color} transition-all duration-500 ease-out`} style={{ width: `${(step.count / maxCount) * 100}%` }} />
            </div>
            <div className="w-12 text-right font-semibold text-gray-900">{step.count}</div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold text-blue-600">{metrics.conversion_rate}%</div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.bookings_complete} completions out of {metrics.total_page_views} page views
          </div>
        </div>
      </div>
    );
  };

  const renderSources = (): React.JSX.Element | null => {
    if (sources.length === 0) return null;

    const maxCount = Math.max(...sources.map(s => s.count), 1);

    return (
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Traffic Sources</h3>
        <div className="space-y-2">
          {sources.slice(0, 5).map((source, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 truncate flex-1 mr-2">{source.name}</span>
              <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-400 h-full" style={{ width: `${(source.count / maxCount) * 100}%` }} />
              </div>
              <span className="w-10 text-right font-medium text-gray-900">{source.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactActions = (): React.JSX.Element | null => {
    if (!metrics) return null;

    return (
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Contact Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.contact_actions.map((action) => (
            <div key={action.event_type} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="text-xs text-gray-500">{action.label}</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{action.count}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContactSources = (): React.JSX.Element | null => {
    if (!metrics || metrics.contact_sources.length === 0) return null;

    const maxCount = Math.max(...metrics.contact_sources.map((source) => source.count), 1);

    return (
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Contact Sources</h3>
        <div className="space-y-2">
          {metrics.contact_sources.slice(0, 5).map((source, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 truncate flex-1 mr-2">{source.name}</span>
              <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${(source.count / maxCount) * 100}%` }} />
              </div>
              <span className="w-10 text-right font-medium text-gray-900">{source.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Funnel Analytics
      </h3>

      {metrics && metrics.total_page_views > 0 ? (
        <div className="space-y-6">
          {renderFunnelSteps()}
          {renderContactActions()}
          {renderSources()}
          {renderContactSources()}
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
            <button 
              onClick={() => window.open(`/analytics?business_slug=${encodeURIComponent(businessSlug || '')}`, '_blank')}
              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View Full Report
            </button>
            {typeof window !== 'undefined' && (
              <button 
                onClick={() => {
                  localStorage.removeItem('sl_events');
                  localStorage.removeItem('sl_event_id');
                  setEvents([]);
                  setMetrics(null);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Data
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {metrics ? "No activity yet — funnel will appear as visitors arrive." : 
           typeof window === 'undefined' || !process.env.ANALYTICS_ENDPOINT && !localStorage.getItem('sl_events')
            ? "Analytics not available — check environment or data collection."
            : "Loading analytics..."}
        </div>
      )}

      <div className="mt-4 p-2 bg-amber-50 text-xs text-amber-800 rounded-lg">
        Demo mode — localStorage tracking. No paid vendor required.
      </div>
    </div>
  );
}

export default DemoAnalyticsDashboard;
