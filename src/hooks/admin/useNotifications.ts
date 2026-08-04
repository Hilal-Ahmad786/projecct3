'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: string;
  priority: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export function useNotifications(options: { page?: number; limit?: number; type?: string } = {}) {
  const { page = 1, limit = 20, type } = options;

  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (type) params.set('type', type);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/notifications?${params.toString()}`,
    fetcher,
    { refreshInterval: 120000, revalidateOnFocus: false }
  );

  return {
    notifications: (data?.data?.notifications ?? []) as Notification[],
    pagination: data?.data?.pagination,
    unreadCount: data?.data?.unreadCount ?? 0,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useNotificationMutations() {
  const [isLoading, setIsLoading] = useState(false);

  const markAsRead = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      return true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { markAsRead, markAllAsRead, deleteNotification, isLoading };
}

// Keep preferences hook but backed by API
export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    soundEnabled: true,
    notifyOnNewLead: true,
    notifyOnNewMessage: true,
    notifyOnNewRequest: true,
    notifyOnStatusChange: false,
  });

  const updatePreferences = useCallback((updates: Partial<typeof preferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  }, []);

  return { preferences, updatePreferences };
}
