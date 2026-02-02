'use client';

import useSWR from 'swr';

// Types
export interface AnalyticsOverview {
  overview: {
    totalLeads: number;
    newLeads: number;
    projectRequests: number;
    contactMessages: number;
    pageViews: number;
    uniqueVisitors: number;
  };
  trends: {
    pageViews: number;
    uniqueVisitors: number;
  };
  charts: {
    pageViews: Array<{ page: string; timestamp: Date }>;
    visitorStats: { uniqueVisitors: number; totalSessions: number };
  };
  period: string;
}

export interface PageViewData {
  total: number;
  chartData: Array<{ date: string; count: number }>;
  topPages: Array<{ page: string; count: number }>;
  period: string;
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// Build URL with query params
function buildUrl(base: string, params: Record<string, string | number | undefined>) {
  const url = new URL(base, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

// Hook for analytics overview
export function useAnalyticsOverview(period: string = '7d') {
  const url = buildUrl('/api/admin/analytics/overview', { period });

  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: AnalyticsOverview }>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every minute
    }
  );

  return {
    overview: data?.data?.overview,
    trends: data?.data?.trends,
    charts: data?.data?.charts,
    period: data?.data?.period,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for page views
export function usePageViews(period: string = '7d', page?: string) {
  const url = buildUrl('/api/admin/analytics/pageviews', { period, page });

  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: PageViewData }>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    total: data?.data?.total ?? 0,
    chartData: data?.data?.chartData ?? [],
    topPages: data?.data?.topPages ?? [],
    period: data?.data?.period,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for tracking page views (client-side)
export function usePageViewTracker() {
  const trackPageView = async (page: string, referrer?: string) => {
    try {
      await fetch('/api/admin/analytics/pageviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          referrer,
          userAgent: navigator.userAgent,
          sessionId: getSessionId(),
        }),
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  return { trackPageView };
}

// Helper to get/create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analyticsSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analyticsSessionId', sessionId);
  }
  return sessionId;
}

// Hook for traffic sources
export function useTrafficSources(period: string = '7d') {
  const url = buildUrl('/api/admin/analytics/sources', { period });

  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: unknown }>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every 60 seconds
    }
  );

  return {
    sources: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for realtime analytics (active visitors)
export function useRealtimeAnalytics() {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: unknown }>(
    '/api/admin/analytics/realtime',
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 5000, // Refresh every 5 seconds
    }
  );

  return {
    visitors: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for analytics metrics
export function useAnalyticsMetrics(period: string = '7d') {
  const url = buildUrl('/api/admin/analytics/overview', { period, metrics: 'true' });

  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: unknown }>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every 60 seconds
    }
  );

  return {
    metrics: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
