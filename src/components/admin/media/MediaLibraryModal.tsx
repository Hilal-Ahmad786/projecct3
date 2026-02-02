'use client';

import { useState, useCallback } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMedia, useMediaMutations, type MediaItem } from '@/hooks/admin/useMedia';
import UploadZone from './UploadZone';
import MediaGrid from './MediaGrid';

interface MediaLibraryModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
  multiple?: boolean;
  onSelectMultiple?: (items: MediaItem[]) => void;
}

export default function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  multiple = false,
  onSelectMultiple,
}: MediaLibraryModalProps) {
  const [tab, setTab] = useState<'library' | 'upload'>('library');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { items, total, totalPages, isLoading, mutate } = useMedia({ page, search, limit: 24 });
  const { upload, isUploading, uploadProgress } = useMediaMutations();

  const handleUpload = useCallback(async (files: File[]) => {
    for (const file of files) {
      try {
        const uploaded = await upload(file);
        // If single select mode, auto-select the uploaded item
        if (!multiple) {
          onSelect(uploaded);
          onClose();
          return;
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    await mutate();
    setTab('library');
  }, [upload, mutate, multiple, onSelect, onClose]);

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelect = useCallback((id: string) => {
    const item = items.find(i => i.id === id);
    if (item && !multiple) {
      onSelect(item);
      onClose();
    } else {
      handleToggleSelect(id);
    }
  }, [items, multiple, onSelect, onClose, handleToggleSelect]);

  const handleInsertSelected = () => {
    if (onSelectMultiple) {
      const selected = items.filter(i => selectedIds.includes(i.id));
      onSelectMultiple(selected);
    }
    setSelectedIds([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-[90vw] max-w-5xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Media Library</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200">
          <div className="flex gap-1">
            <button
              onClick={() => setTab('library')}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                tab === 'library' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setTab('upload')}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                tab === 'upload' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upload
            </button>
          </div>

          {tab === 'library' && (
            <div className="flex-1 relative max-w-xs">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search media..."
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'upload' ? (
            <UploadZone onUpload={handleUpload} isUploading={isUploading} progress={uploadProgress} />
          ) : isLoading ? (
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
              selectionMode={multiple}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {total} file{total !== 1 ? 's' : ''}
            {selectedIds.length > 0 && ` · ${selectedIds.length} selected`}
          </div>
          <div className="flex gap-2">
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-1 mr-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1.5 text-sm text-gray-600">{page}/{totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}

            <button onClick={onClose} className="px-4 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            {multiple && selectedIds.length > 0 && (
              <button
                onClick={handleInsertSelected}
                className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Insert {selectedIds.length} file{selectedIds.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
