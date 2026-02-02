'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface ServiceTranslation {
  id?: string;
  locale: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  benefits?: string[];
  content?: Record<string, unknown>;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  heroImage?: string;
  icon?: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  order: number;
  color?: string;
  features?: string[];
  benefits?: string[];
  content?: Record<string, unknown>;
  translations?: ServiceTranslation[];
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

interface UseServicesOptions {
  page?: number;
  limit?: number;
  status?: Service['status'];
  featured?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
function buildUrl(base: string, params: Record<string, string | number | boolean | undefined>) {
  const url = new URL(base, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

// Hook for fetching services list
export function useServices(options: UseServicesOptions = {}) {
  const { page = 1, limit = 10, status, featured, search, sortBy, sortOrder } = options;

  const url = buildUrl('/api/admin/content/services', {
    page,
    limit,
    status,
    featured,
    search,
    sortBy,
    sortOrder,
  });

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Service>>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
      dedupingInterval: 5000,
    }
  );

  return {
    services: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for service mutations (create, update, delete)
export function useServiceMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createService = useCallback(async (data: Partial<Service>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/content/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create service');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateService = useCallback(async (id: string, data: Partial<Service>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update service');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteService = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/services/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to delete service');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reorderServices = useCallback(async (orders: { id: string; order: number }[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/content/services/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to reorder services');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveServiceTranslations = useCallback(async (id: string, translations: ServiceTranslation[]) => {
    setIsLoading(true);
    setError(null);

    try {
      for (const translation of translations) {
        const res = await fetch(`/api/admin/content/services/${id}/translations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(translation),
        });

        const result = await res.json();

        if (!result.success) {
          throw new Error(result.message || `Failed to save ${translation.locale} translation`);
        }
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
    createService,
    updateService,
    deleteService,
    reorderServices,
    saveServiceTranslations,
    isLoading,
    error,
  };
}
