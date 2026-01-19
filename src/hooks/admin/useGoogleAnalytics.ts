'use client';

import { useState, useEffect, useCallback } from 'react';

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

// Mock data for development (would be replaced with real GA4 API calls)
const mockMetrics: GAMetrics = {
  users: 12458,
  newUsers: 8234,
  sessions: 18765,
  bounceRate: 42.5,
  avgSessionDuration: 185,
  pageviews: 45678,
};

const mockTopPages: GAPageData[] = [
  { page: '/', pageviews: 12500, uniquePageviews: 10200, avgTimeOnPage: 45, bounceRate: 35 },
  { page: '/services', pageviews: 8900, uniquePageviews: 7800, avgTimeOnPage: 120, bounceRate: 28 },
  { page: '/services/ai-solutions', pageviews: 5600, uniquePageviews: 4900, avgTimeOnPage: 180, bounceRate: 22 },
  { page: '/contact', pageviews: 4200, uniquePageviews: 3800, avgTimeOnPage: 90, bounceRate: 45 },
  { page: '/about', pageviews: 3100, uniquePageviews: 2800, avgTimeOnPage: 60, bounceRate: 40 },
];

const mockSources: GASourceData[] = [
  { source: 'google', medium: 'organic', users: 5200, sessions: 7800, bounceRate: 38 },
  { source: 'direct', medium: '(none)', users: 3100, sessions: 4500, bounceRate: 42 },
  { source: 'linkedin', medium: 'social', users: 1800, sessions: 2400, bounceRate: 35 },
  { source: 'twitter', medium: 'social', users: 1200, sessions: 1600, bounceRate: 48 },
  { source: 'referral', medium: 'referral', users: 800, sessions: 1100, bounceRate: 30 },
];

const mockDevices: GADeviceData[] = [
  { device: 'desktop', users: 7500, sessions: 11200, percentage: 60 },
  { device: 'mobile', users: 4200, sessions: 6300, percentage: 34 },
  { device: 'tablet', users: 758, sessions: 1265, percentage: 6 },
];

const mockCountries: GACountryData[] = [
  { country: 'Turkey', users: 4500, sessions: 6800, newUsers: 3200 },
  { country: 'Germany', users: 2100, sessions: 3200, newUsers: 1500 },
  { country: 'United States', users: 1800, sessions: 2700, newUsers: 1200 },
  { country: 'United Kingdom', users: 1200, sessions: 1800, newUsers: 800 },
  { country: 'Pakistan', users: 900, sessions: 1400, newUsers: 600 },
];

export function useGoogleAnalytics(options: UseGoogleAnalyticsOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [metrics, setMetrics] = useState<GAMetrics | null>(null);
  const [topPages, setTopPages] = useState<GAPageData[]>([]);
  const [sources, setSources] = useState<GASourceData[]>([]);
  const [devices, setDevices] = useState<GADeviceData[]>([]);
  const [countries, setCountries] = useState<GACountryData[]>([]);

  const { dateRange = { startDate: '30daysAgo', endDate: 'today' } } = options;

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In production, this would be real API calls to Google Analytics
      // const response = await fetch('/api/admin/analytics/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dateRange }),
      // });
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use mock data for now
      setMetrics(mockMetrics);
      setTopPages(mockTopPages);
      setSources(mockSources);
      setDevices(mockDevices);
      setCountries(mockCountries);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    isLoading,
    error,
    metrics,
    topPages,
    sources,
    devices,
    countries,
    refresh: fetchAnalytics,
  };
}

// Real-time analytics hook
export function useRealtimeAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeData, setRealtimeData] = useState<GARealtimeData | null>(null);

  useEffect(() => {
    const fetchRealtime = async () => {
      try {
        // In production, this would call the GA4 realtime API
        // Simulated data
        setRealtimeData({
          activeUsers: Math.floor(Math.random() * 50) + 10,
          pageviews: Math.floor(Math.random() * 200) + 50,
          topPages: [
            { page: '/', activeUsers: Math.floor(Math.random() * 20) + 5 },
            { page: '/services', activeUsers: Math.floor(Math.random() * 15) + 3 },
            { page: '/contact', activeUsers: Math.floor(Math.random() * 10) + 2 },
          ],
          topCountries: [
            { country: 'Turkey', activeUsers: Math.floor(Math.random() * 15) + 5 },
            { country: 'Germany', activeUsers: Math.floor(Math.random() * 10) + 3 },
            { country: 'United States', activeUsers: Math.floor(Math.random() * 8) + 2 },
          ],
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching realtime analytics:', error);
      }
    };

    // Initial fetch
    fetchRealtime();

    // Refresh every 30 seconds
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
