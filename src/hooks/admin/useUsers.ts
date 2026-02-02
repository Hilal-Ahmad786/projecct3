'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export function useAdminUsers() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/users',
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    users: data?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useAdminUserMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(
    async (userData: { email: string; name: string; password: string; role?: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to create user');
        return json.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create user';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateUser = useCallback(
    async (id: string, userData: Record<string, unknown>) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to update user');
        return json.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update user';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to delete user');
      return json.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createUser,
    updateUser,
    deleteUser,
    isLoading,
    error,
  };
}
