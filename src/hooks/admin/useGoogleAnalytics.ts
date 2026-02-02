'use client';

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

export interface GAMetrics {
  users: number;
  newUsers: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  pageviews: number;
}

export interface GAPageData {
  page: string;
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

export interface GASourceData {
  source: string;
  medium: string;
  users: number;
  sessions: number;
  bounceRate: number;
}

export interface GADeviceData {
  device: string;
  users: number;
  sessions: number;
  percentage: number;
}

export interface GACountryData {
  country: string;
  users: number;
  sessions: number;
  newUsers: number;
}

export interface GARealtimeData {
  activeUsers: number;
  pageviews: number;
  topPages: Array<{ page: string; activeUsers: number }>;
  topCountries: Array<{ country: string; activeUsers: number }>;
}

interface UseGoogleAnalyticsOptions {
  propertyId?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useGoogleAnalytics(options: UseGoogleAnalyticsOptions = {}) {
  const { dateRange = { startDate: '30daysAgo', endDate: 'today' } } = options;

  // Calculate days from dateRange
  let days = 30;
  if (dateRange.startDate && dateRange.startDate !== '30daysAgo') {
    const start = new Date(dateRange.startDate);
    const end = dateRange.endDate === 'today' ? new Date() : new Date(dateRange.endDate);
    days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/analytics/summary?days=${days}`,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 60000 }
  );

  return {
    isLoading,
    error,
    metrics: (data?.metrics as GAMetrics) ?? null,
    topPages: (data?.topPages as GAPageData[]) ?? [],
    sources: (data?.sources as GASourceData[]) ?? [],
    devices: (data?.devices as GADeviceData[]) ?? [],
    countries: (data?.countries as GACountryData[]) ?? [],
    refresh: mutate,
  };
}

// Real-time analytics hook - queries recent events from DB
export function useRealtimeAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeData, setRealtimeData] = useState<GARealtimeData | null>(null);

  useEffect(() => {
    const fetchRealtime = async () => {
      try {
        const res = await fetch('/api/admin/analytics/summary?days=1');
        if (res.ok) {
          const data = await res.json();
          setRealtimeData({
            activeUsers: data.metrics?.users ?? 0,
            pageviews: data.metrics?.pageviews ?? 0,
            topPages: (data.topPages || []).slice(0, 5).map((p: GAPageData) => ({
              page: p.page,
              activeUsers: p.pageviews,
            })),
            topCountries: (data.countries || []).slice(0, 5).map((c: GACountryData) => ({
              country: c.country,
              activeUsers: c.users,
            })),
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching realtime analytics:', error);
        setIsLoading(false);
      }
    };

    fetchRealtime();
    const interval = setInterval(fetchRealtime, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    isLoading,
    realtimeData,
  };
}

// Hook for tracking custom events
export function useAnalyticsEvents() {
  const trackEvent = useCallback((
    eventName: string,
    eventParams: Record<string, string | number | boolean> = {}
  ) => {
    // Track with Google Analytics
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, eventParams);
    }

    // Also track internally
    fetch('/api/admin/analytics/pageviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: eventName,
        page: window.location.pathname,
        metadata: eventParams,
      }),
    }).catch(() => {
      // Silently fail
    });
  }, []);

  const trackPageView = useCallback((page: string) => {
    trackEvent('page_view', { page_path: page });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType: string, value?: number) => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      value: value || 0,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  };
}
