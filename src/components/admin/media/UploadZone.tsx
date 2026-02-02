'use client';

import { useCallback, useState, useRef } from 'react';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
  isUploading?: boolean;
  progress?: number;
  accept?: string;
  maxFiles?: number;
}

export default function UploadZone({
  onUpload,
  isUploading = false,
  progress = 0,
  accept = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm',
  maxFiles = 10,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items?.length) setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).slice(0, maxFiles);
    if (files.length > 0) onUpload(files);
  }, [maxFiles, onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, maxFiles);
    if (files.length > 0) onUpload(files);
    if (inputRef.current) inputRef.current.value = '';
  }, [maxFiles, onUpload]);

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !isUploading && inputRef.current?.click()}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
        ${isDragging
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
        }
        ${isUploading ? 'pointer-events-none opacity-75' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      <ArrowUpTrayIcon className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-emerald-500' : 'text-gray-400'}`} />

      {isUploading ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Uploading...</p>
          <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{progress}%</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            Images (JPG, PNG, GIF, WebP, SVG) up to 10MB | Videos (MP4, WebM) up to 50MB
          </p>
        </>
      )}
    </div>
  );
}
