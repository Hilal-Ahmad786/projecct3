'use client';

import { useState, useCallback } from 'react';
import { MagnifyingGlassIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useMedia, useMediaMutations, type MediaItem } from '@/hooks/admin/useMedia';
import UploadZone from '@/components/admin/media/UploadZone';
import MediaGrid from '@/components/admin/media/MediaGrid';
import MediaDetailPanel from '@/components/admin/media/MediaDetailPanel';

export default function MediaPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [folder, setFolder] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailItem, setDetailItem] = useState<MediaItem | null>(null);

  const { items, total, totalPages, isLoading, mutate } = useMedia({
    page,
    search,
    folder,
    type: typeFilter,
  });
  const { upload, update, remove, bulkDelete, isUploading, uploadProgress } = useMediaMutations();

  const handleUpload = useCallback(async (files: File[]) => {
    for (const file of files) {
      try {
        await upload(file, { folder: folder || 'general' });
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    await mutate();
  }, [upload, mutate, folder]);

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelect = useCallback((id: string) => {
    const item = items.find(i => i.id === id);
    if (item) setDetailItem(item);
  }, [items]);

  const handleDelete = useCallback(async (item: MediaItem) => {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    await remove(item.id);
    if (detailItem?.id === item.id) setDetailItem(null);
    await mutate();
  }, [remove, mutate, detailItem]);

  const handleBulkDelete = useCallback(async () => {
    if (!confirm(`Delete ${selectedIds.length} files?`)) return;
    await bulkDelete(selectedIds);
    setSelectedIds([]);
    if (detailItem && selectedIds.includes(detailItem.id)) setDetailItem(null);
    await mutate();
  }, [bulkDelete, selectedIds, mutate, detailItem]);

  const handleSaveDetail = useCallback(async (id: string, data: { alt?: string; title?: string; folder?: string; tags?: string[] }) => {
    await update(id, data);
    await mutate();
  }, [update, mutate]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-500 mt-1">Upload and manage your media files.</p>
      </div>

      {/* Upload Zone */}
      <UploadZone onUpload={handleUpload} isUploading={isUploading} progress={uploadProgress} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
          <input
            type="text"
            value={folder}
            onChange={(e) => { setFolder(e.target.value); setPage(1); }}
            placeholder="Folder filter..."
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 w-40"
          />
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            Delete {selectedIds.length} selected
          </button>
        )}
      </div>

      {/* Content area */}
      <div className="flex gap-0">
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <MediaGrid
              items={items}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onToggleSelect={handleToggleSelect}
              onView={handleSelect}
              onEdit={(item) => setDetailItem(item)}
              onDelete={handleDelete}
              selectionMode={selectedIds.length > 0}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {detailItem && (
          <MediaDetailPanel
            item={detailItem}
            onClose={() => setDetailItem(null)}
            onSave={handleSaveDetail}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
