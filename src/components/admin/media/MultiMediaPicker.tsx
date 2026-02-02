'use client';

import { useState, useCallback } from 'react';
import { PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useMediaMutations, type MediaItem } from '@/hooks/admin/useMedia';
import MediaLibraryModal from './MediaLibraryModal';

interface MultiMediaPickerProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  placeholder?: string;
}

export default function MultiMediaPicker({
  value,
  onChange,
  label,
  placeholder = 'No images selected',
}: MultiMediaPickerProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const { upload, isUploading } = useMediaMutations();

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleLibrarySelect = useCallback((item: MediaItem) => {
    onChange([...value, item.url]);
    setShowLibrary(false);
  }, [value, onChange]);

  const handleMultiSelect = useCallback((items: MediaItem[]) => {
    onChange([...value, ...items.map(i => i.url)]);
    setShowLibrary(false);
  }, [value, onChange]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUrls: string[] = [];
    for (const file of files) {
      try {
        const media = await upload(file);
        newUrls.push(media.url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    if (newUrls.length) onChange([...value, ...newUrls]);
  }, [upload, value, onChange]);

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {/* Image grid */}
      {value.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
          {value.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group">
              <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white shadow-sm transition-opacity"
              >
                <XMarkIcon className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
          <PhotoIcon className="w-5 h-5" />
          {placeholder}
        </div>
      )}

      {/* Add buttons */}
      <div className="flex flex-wrap gap-2">
        <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <PlusIcon className="w-3.5 h-3.5" />
          {isUploading ? 'Uploading...' : 'Upload Images'}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Browse Library
        </button>
      </div>

      <MediaLibraryModal
        open={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
        multiple
        onSelectMultiple={handleMultiSelect}
      />
    </div>
  );
}
