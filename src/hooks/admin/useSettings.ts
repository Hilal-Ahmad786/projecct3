'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function buildUrl(base: string, params: Record<string, string | number | undefined>) {
  const url = new URL(base, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url.toString();
}

export function useSettings(category?: string) {
  const url = buildUrl('/api/admin/settings', { category });

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  return {
    settings: data?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useSettingsMutations() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSetting = useCallback(
    async (key: string, value: string, category: string) => {
      setIsUpdating(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value, category }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to update setting');
        return json.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update setting';
        setError(message);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  const bulkUpdateSettings = useCallback(
    async (settings: { key: string; value: string; category: string }[]) => {
      setIsUpdating(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to bulk update settings');
        return json.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to bulk update settings';
        setError(message);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  return {
    updateSetting,
    bulkUpdateSettings,
    isUpdating,
    error,
  };
}
