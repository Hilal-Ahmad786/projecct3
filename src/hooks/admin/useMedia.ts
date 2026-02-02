'use client';

import useSWR from 'swr';
import { useCallback, useState } from 'react';

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  title?: string | null;
  folder: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface MediaListResponse {
  items: MediaItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseMediaOptions {
  page?: number;
  limit?: number;
  search?: string;
  folder?: string;
  type?: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useMedia(options: UseMediaOptions = {}) {
  const { page = 1, limit = 24, search = '', folder = '', type = '' } = options;
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (search) params.set('search', search);
  if (folder) params.set('folder', folder);
  if (type) params.set('type', type);

  const { data, error, isLoading, mutate } = useSWR<MediaListResponse>(
    `/api/admin/media?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    mutate,
  };
}

export function useMediaMutations() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const upload = useCallback(async (
    file: File,
    options: { folder?: string; alt?: string; title?: string; tags?: string[] } = {}
  ): Promise<MediaItem> => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    if (options.folder) formData.append('folder', options.folder);
    if (options.alt) formData.append('alt', options.alt);
    if (options.title) formData.append('title', options.title);
    if (options.tags?.length) formData.append('tags', options.tags.join(','));

    try {
      // Simulate progress since fetch doesn't support upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      return await res.json();
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  }, []);

  const update = useCallback(async (
    id: string,
    data: { alt?: string; title?: string; folder?: string; tags?: string[] }
  ): Promise<MediaItem> => {
    const res = await fetch(`/api/admin/media/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
  }, []);

  const bulkDelete = useCallback(async (ids: string[]): Promise<number> => {
    const res = await fetch('/api/admin/media/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error('Bulk delete failed');
    const data = await res.json();
    return data.deleted;
  }, []);

  return { upload, update, remove, bulkDelete, isUploading, uploadProgress };
}
