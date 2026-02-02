'use client';

import { useState } from 'react';
import { CheckIcon, TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import type { MediaItem } from '@/hooks/admin/useMedia';

interface MediaGridProps {
  items: MediaItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onView?: (item: MediaItem) => void;
  onEdit?: (item: MediaItem) => void;
  onDelete?: (item: MediaItem) => void;
  selectionMode?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(type: string): boolean {
  return type.startsWith('image/');
}

export default function MediaGrid({
  items,
  selectedIds,
  onSelect,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
  selectionMode = false,
}: MediaGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No media files found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => {
        const selected = selectedIds.includes(item.id);
        const hovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className={`
              group relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer
              ${selected ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'}
            `}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => selectionMode ? onToggleSelect(item.id) : onSelect(item.id)}
          >
            {/* Thumbnail */}
            <div className="aspect-square bg-gray-100 relative">
              {isImage(item.type) ? (
                <img
                  src={item.url}
                  alt={item.alt || item.filename}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl">🎬</div>
                    <p className="text-xs text-gray-500 mt-1">{item.type.split('/')[1]?.toUpperCase()}</p>
                  </div>
                </div>
              )}

              {/* Selection checkbox */}
              {(selectionMode || hovered) && (
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleSelect(item.id); }}
                  className={`
                    absolute top-2 left-2 w-6 h-6 rounded flex items-center justify-center transition-all
                    ${selected ? 'bg-emerald-500 text-white' : 'bg-white/80 border border-gray-300 hover:bg-white'}
                  `}
                >
                  {selected && <CheckIcon className="w-4 h-4" />}
                </button>
              )}

              {/* Hover actions */}
              {hovered && !selectionMode && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex justify-end gap-1">
                  {onView && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onView(item); }}
                      className="p-1.5 bg-white/90 rounded hover:bg-white transition-colors"
                    >
                      <EyeIcon className="w-3.5 h-3.5 text-gray-700" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                      className="p-1.5 bg-white/90 rounded hover:bg-white transition-colors"
                    >
                      <PencilIcon className="w-3.5 h-3.5 text-gray-700" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                      className="p-1.5 bg-white/90 rounded hover:bg-white transition-colors"
                    >
                      <TrashIcon className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* File info */}
            <div className="p-2">
              <p className="text-xs font-medium text-gray-700 truncate" title={item.filename}>
                {item.filename}
              </p>
              <p className="text-xs text-gray-400">{formatSize(item.size)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
