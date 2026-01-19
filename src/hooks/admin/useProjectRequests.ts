'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface ProjectRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  adminNotes?: string;
  leadId?: string;
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

interface UseProjectRequestsOptions {
  page?: number;
  limit?: number;
  status?: ProjectRequest['status'];
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
  const url = new URL(base, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

// Hook for fetching project requests list
export function useProjectRequests(options: UseProjectRequestsOptions = {}) {
  const { page = 1, limit = 10, status, search } = options;

  const url = buildUrl('/api/admin/leads/quotes', {
    page,
    limit,
    status,
    search,
  });

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<ProjectRequest>>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    requests: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for project request mutations
export function useProjectRequestMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateRequestStatus = useCallback(async (
    id: string,
    status: ProjectRequest['status'],
    adminNotes?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/leads/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminNotes }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update request');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsReviewed = useCallback(async (id: string, notes?: string) => {
    return updateRequestStatus(id, 'reviewed', notes);
  }, [updateRequestStatus]);

  const sendQuote = useCallback(async (id: string, notes?: string) => {
    return updateRequestStatus(id, 'quoted', notes);
  }, [updateRequestStatus]);

  const acceptRequest = useCallback(async (id: string, notes?: string) => {
    return updateRequestStatus(id, 'accepted', notes);
  }, [updateRequestStatus]);

  const rejectRequest = useCallback(async (id: string, notes?: string) => {
    return updateRequestStatus(id, 'rejected', notes);
  }, [updateRequestStatus]);

  return {
    updateRequestStatus,
    markAsReviewed,
    sendQuote,
    acceptRequest,
    rejectRequest,
    isLoading,
    error,
  };
}

// Hook for pending request count
export function usePendingRequestCount() {
  const { requests, pagination, isLoading } = useProjectRequests({
    status: 'pending',
    limit: 1
  });

  return {
    count: pagination?.total ?? 0,
    isLoading,
  };
}
