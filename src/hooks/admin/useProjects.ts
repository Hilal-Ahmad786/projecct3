'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

// Types
export interface ProjectTranslation {
  id?: string;
  locale: string;
  name: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: Record<string, unknown>[];
  content?: Record<string, unknown>;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  client?: string;
  category?: string;
  industry?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  thumbnail?: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  images?: string[];
  results?: { metric: string; value: string }[];
  duration?: string;
  teamSize?: string;
  content?: Record<string, unknown>;
  technologies?: string[];
  completedDate?: string;
  projectUrl?: string;
  translations?: ProjectTranslation[];
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

interface UseProjectsOptions {
  page?: number;
  limit?: number;
  status?: Project['status'];
  category?: string;
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

// Hook for fetching projects list
export function useProjects(options: UseProjectsOptions = {}) {
  const { page = 1, limit = 10, status, category, featured, search, sortBy, sortOrder } = options;

  const url = buildUrl('/api/admin/content/projects', {
    page,
    limit,
    status,
    category,
    featured,
    search,
    sortBy,
    sortOrder,
  });

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Project>>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 120000,
      dedupingInterval: 5000,
    }
  );

  return {
    projects: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for fetching a single project
export function useProject(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Project }>(
    id ? `/api/admin/content/projects/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    project: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

// Hook for project mutations (create, update, delete)
export function useProjectMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProject = useCallback(async (data: Partial<Project>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/content/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create project');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update project');
      }

      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/content/projects/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to delete project');
      }

      return true;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProjectTranslations = useCallback(async (id: string, translations: ProjectTranslation[]) => {
    setIsLoading(true);
    setError(null);

    try {
      for (const translation of translations) {
        const res = await fetch(`/api/admin/content/projects/${id}/translations`, {
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
    createProject,
    updateProject,
    deleteProject,
    saveProjectTranslations,
    isLoading,
    error,
  };
}
