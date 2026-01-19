'use client';

import useSWR from 'swr';

// Types
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  projectRequests: number;
  pendingRequests: number;
  contactMessages: number;
  unreadMessages: number;
  conversionRate: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: {
    leads: Array<{
      id: string;
      name: string;
      email: string;
      status: string;
      createdAt: string;
    }>;
    projectRequests: Array<{
      id: string;
      name: string;
      projectType: string;
      status: string;
      createdAt: string;
    }>;
    messages: Array<{
      id: string;
      name: string;
      subject: string;
      status: string;
      createdAt: string;
    }>;
  };
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// Hook for dashboard data
export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: DashboardData }>(
    '/api/admin/dashboard',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000, // Refresh every 30 seconds
      dedupingInterval: 10000,
    }
  );

  return {
    stats: data?.data?.stats,
    recentActivity: data?.data?.recentActivity,
    isLoading,
    isError: !!error,
    error,
    mutate,
    refresh: mutate,
  };
}

// Hook for quick stats (lighter version)
export function useQuickStats() {
  const { data, error, isLoading } = useSWR<{ success: boolean; data: DashboardData }>(
    '/api/admin/dashboard',
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
    }
  );

  return {
    totalLeads: data?.data?.stats?.totalLeads ?? 0,
    newLeads: data?.data?.stats?.newLeads ?? 0,
    projectRequests: data?.data?.stats?.projectRequests ?? 0,
    unreadMessages: data?.data?.stats?.unreadMessages ?? 0,
    conversionRate: data?.data?.stats?.conversionRate ?? 0,
    isLoading,
    isError: !!error,
  };
}
