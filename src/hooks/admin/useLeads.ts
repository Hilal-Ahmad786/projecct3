'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseLeadsOptions {
  page?: number;
  limit?: number;
  status?: Lead['status'];
  source?: string;
  search?: string;
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
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `${base}?${qs}` : base;
}

// Hook for fetching leads list
export function useLeads(options: UseLeadsOptions = {}) {
  const { page = 1, limit = 10, status, source, search } = options;

  const url = buildUrl('/api/admin/leads/contacts', {
    page,
    limit,
    status,
    source,
    search,
  });

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Lead>>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    leads: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for fetching a single lead
export function useLead(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Lead }>(
    id ? `/api/admin/leads/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    lead: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for lead mutations (create, update, delete)
export function useLeadMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createLead = useCallback(async (data: Partial<Lead>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/leads/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create lead');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLead = useCallback(async (id: string, data: Partial<Lead>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update lead');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLead = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to delete lead');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createLead,
    updateLead,
    deleteLead,
    isLoading,
    error,
  };
}
