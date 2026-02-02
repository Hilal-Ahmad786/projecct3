'use client';

import { useState, useCallback } from 'react';
import { PhotoIcon, ArrowUpTrayIcon, FolderOpenIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMediaMutations, type MediaItem } from '@/hooks/admin/useMedia';
import MediaLibraryModal from './MediaLibraryModal';

interface MediaPickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function MediaPicker({
  value,
  onChange,
  label,
  placeholder = 'No image selected',
}: MediaPickerProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const { upload, isUploading, uploadProgress } = useMediaMutations();

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const media = await upload(file);
      onChange(media.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [upload, onChange]);

  const handleLibrarySelect = useCallback((item: MediaItem) => {
    onChange(item.url);
    setShowLibrary(false);
  }, [onChange]);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const isImage = value && (value.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) || value.includes('blob.vercel-storage.com'));

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      {/* Preview */}
      {value ? (
        <div className="relative mb-2">
          <div className="relative aspect-video max-w-xs rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            {isImage ? (
              <img src={value} alt="Selected media" className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <PhotoIcon className="w-8 h-8" />
              </div>
            )}
            <button
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 bg-white/90 rounded-full hover:bg-white shadow-sm"
            >
              <XMarkIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{value}</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <PhotoIcon className="w-5 h-5" />
          {placeholder}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <ArrowUpTrayIcon className="w-3.5 h-3.5" />
          {isUploading ? `${uploadProgress}%` : 'Upload'}
          <input
            type="file"
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
          <FolderOpenIcon className="w-3.5 h-3.5" />
          Browse
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          URL
        </button>
      </div>

      {/* URL input */}
      {showUrlInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Set
          </button>
        </div>
      )}

      {/* Library modal */}
      <MediaLibraryModal
        open={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
      />
    </div>
  );
}
