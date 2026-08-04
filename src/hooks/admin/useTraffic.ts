'use client';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function periodToDays(period: string): string {
  return period;  // pass through, API handles conversion
}

export function useTrafficLive() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/traffic/live',
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );
  return {
    activeVisitors: data?.data?.activeVisitors ?? 0,
    activePages: data?.data?.activePages ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useTrafficSources(period: string = '7d') {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/traffic/sources?period=${period}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    sources: data?.data ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useTrafficGeographic(period: string = '7d') {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/traffic/geographic?period=${period}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    countries: data?.data ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useTrafficDevices(period: string = '7d') {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/traffic/devices?period=${period}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    devices: data?.data?.devices ?? [],
    browsers: data?.data?.browsers ?? [],
    isLoading, isError: !!error, mutate,
  };
}
