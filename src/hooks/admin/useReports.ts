'use client';
import useSWR from 'swr';
import { useState, useCallback } from 'react';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export function useRecentReports(type?: string) {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/reports/generate?${params.toString()}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    reports: data?.data?.data ?? [],
    pagination: data?.data ? { total: data.data.total, page: data.data.page, totalPages: data.data.totalPages } : undefined,
    isLoading, isError: !!error, mutate,
  };
}

export function useScheduledReports() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/reports/schedule',
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    scheduledReports: data?.data ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useGenerateReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateReport = useCallback(async (data: {
    name: string; type: string; format?: string;
    dateRangeStart?: string; dateRangeEnd?: string;
  }) => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const createScheduledReport = useCallback(async (data: {
    name: string; type: string; frequency: string; nextRunAt?: string;
  }) => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/reports/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generateReport, createScheduledReport, isGenerating, error };
}
