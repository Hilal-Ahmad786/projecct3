'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface PricingPackage {
  id: string;
  serviceId: string;
  tier?: string;
  name: string;
  price: number;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  billingPeriod?: string;
  yearlyPrice?: string;
  ctaText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePricingPackageInput {
  serviceId: string;
  tier?: string;
  name: string;
  price: number;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  billingPeriod?: string;
  yearlyPrice?: string;
  ctaText?: string;
}

export interface UpdatePricingPackageInput {
  tier?: string;
  name?: string;
  price?: number;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  billingPeriod?: string;
  yearlyPrice?: string;
  ctaText?: string;
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// Hook for fetching pricing packages
export function usePricingPackages(serviceId?: string) {
  const url = serviceId
    ? `/api/admin/content/pricing?serviceId=${encodeURIComponent(serviceId)}`
    : '/api/admin/content/pricing';

  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: PricingPackage[] }>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
      dedupingInterval: 5000,
    }
  );

  return {
    packages: data?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for pricing mutations (create, update, delete)
export function usePricingMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPackage = useCallback(async (data: CreatePricingPackageInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/content/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create pricing package');
      }

      return result.data as PricingPackage;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePackage = useCallback(async (id: string, data: UpdatePricingPackageInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/pricing/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update pricing package');
      }

      return result.data as PricingPackage;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePackage = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/pricing/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to delete pricing package');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const duplicatePackage = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/pricing/${id}/duplicate`, {
        method: 'POST',
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to duplicate pricing package');
      }

      return result.data as PricingPackage;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPackage,
    updatePackage,
    deletePackage,
    duplicatePackage,
    isLoading,
    error,
  };
}
