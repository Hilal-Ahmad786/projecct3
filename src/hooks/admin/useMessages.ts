'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
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

interface UseMessagesOptions {
  page?: number;
  limit?: number;
  status?: ContactMessage['status'];
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

// Hook for fetching messages list
export function useMessages(options: UseMessagesOptions = {}) {
  const { page = 1, limit = 10, status, search } = options;

  const url = buildUrl('/api/admin/leads/messages', {
    page,
    limit,
    status,
    search,
  });

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<ContactMessage>>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    messages: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for message mutations
export function useMessageMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateMessageStatus = useCallback(async (
    ids: string[],
    status: ContactMessage['status']
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/leads/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, status }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update messages');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (ids: string[]) => {
    return updateMessageStatus(ids, 'read');
  }, [updateMessageStatus]);

  const markAsReplied = useCallback(async (ids: string[]) => {
    return updateMessageStatus(ids, 'replied');
  }, [updateMessageStatus]);

  const archiveMessages = useCallback(async (ids: string[]) => {
    return updateMessageStatus(ids, 'archived');
  }, [updateMessageStatus]);

  return {
    updateMessageStatus,
    markAsRead,
    markAsReplied,
    archiveMessages,
    isLoading,
    error,
  };
}

// Hook for unread message count
export function useUnreadCount() {
  const { messages, isLoading } = useMessages({ status: 'unread', limit: 1 });

  return {
    count: messages.length > 0 ? messages.length : 0,
    isLoading,
  };
}
