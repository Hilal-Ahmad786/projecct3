'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'uploading' | 'complete' | 'error';
  progress: number;
  error?: string;
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  label?: string;
  hint?: string;
}

const DEFAULT_ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];

export default function FileUpload({
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  label = 'Upload Files',
  hint = 'PDF, DOC, DOCX, PNG, JPG up to 10MB each',
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList) return;

      const newFiles: UploadedFile[] = [];
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        // Check if max files reached
        if (files.length + newFiles.length >= maxFiles) {
          break;
        }

        // Validate file type
        if (!acceptedTypes.includes(file.type)) {
          newFiles.push({
            id: `${Date.now()}-${i}`,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'error',
            progress: 0,
            error: 'File type not supported',
          });
          continue;
        }

        // Validate file size
        if (file.size > maxSizeBytes) {
          newFiles.push({
            id: `${Date.now()}-${i}`,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'error',
            progress: 0,
            error: `File exceeds ${maxSizeMB}MB limit`,
          });
          continue;
        }

        // Add file for upload
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${i}`,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          progress: 0,
        };

        newFiles.push(uploadedFile);

        // Simulate upload (in production, this would be a real upload to S3/Cloudinary)
        simulateUpload(uploadedFile, file);
      }

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [files, maxFiles, maxSizeMB, acceptedTypes, onFilesChange]
  );

  const simulateUpload = async (uploadedFile: UploadedFile, file: File) => {
    // In production, replace this with actual upload logic
    // Example: const url = await uploadToS3(file);

    // Simulate progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? { ...f, progress, status: progress === 100 ? 'complete' : 'uploading' }
            : f
        )
      );
    }

    // Create a local URL for preview (in production, use the uploaded URL)
    const url = URL.createObjectURL(file);
    setFiles((prev) =>
      prev.map((f) =>
        f.id === uploadedFile.id ? { ...f, url, status: 'complete' } : f
      )
    );
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === 'application/pdf') {
      return (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragging
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={files.length >= maxFiles}
        />

        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="text-gray-600 mb-1">
          <span className="font-medium text-gray-900">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">{hint}</p>
        <p className="text-xs text-gray-400 mt-2">
          {files.length}/{maxFiles} files uploaded
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  file.status === 'error'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* File Icon */}
                <div className="flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className={`text-xs ${file.status === 'error' ? 'text-red-500' : 'text-gray-500'}`}>
                    {file.status === 'error'
                      ? file.error
                      : file.status === 'uploading'
                      ? `Uploading... ${file.progress}%`
                      : formatFileSize(file.size)}
                  </p>

                  {/* Progress Bar */}
                  {file.status === 'uploading' && (
                    <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
