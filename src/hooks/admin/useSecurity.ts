'use client';
import useSWR from 'swr';
import { useState, useCallback } from 'react';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export function useSecuritySummary() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/security/summary',
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    summary: data?.data ?? null,
    isLoading, isError: !!error, mutate,
  };
}

export function useSecurityThreats(days: number = 30) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/security/threats?days=${days}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    threats: data?.data ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useBlockedIPs() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/security/blocked',
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );
  return {
    blockedIPs: data?.data ?? [],
    isLoading, isError: !!error, mutate,
  };
}

export function useBlockedIPMutations() {
  const [isLoading, setIsLoading] = useState(false);

  const addIP = useCallback(async (ip: string, reason: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/security/blocked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, reason }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } finally { setIsLoading(false); }
  }, []);

  const removeIP = useCallback(async (ip: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/security/blocked', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } finally { setIsLoading(false); }
  }, []);

  return { addIP, removeIP, isLoading };
}
