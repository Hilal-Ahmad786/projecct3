'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, ClipboardDocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { MediaItem } from '@/hooks/admin/useMedia';

interface MediaDetailPanelProps {
  item: MediaItem | null;
  onClose: () => void;
  onSave: (id: string, data: { alt?: string; title?: string; folder?: string; tags?: string[] }) => Promise<void>;
  onDelete?: (item: MediaItem) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaDetailPanel({ item, onClose, onSave, onDelete }: MediaDetailPanelProps) {
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (item) {
      setAlt(item.alt || '');
      setTitle(item.title || '');
      setFolder(item.folder);
      setTagsInput(item.tags.join(', '));
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(item.id, {
        alt,
        title,
        folder,
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Details</h3>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Preview */}
      <div className="p-4">
        {item.type.startsWith('image/') ? (
          <img src={item.url} alt={item.alt || item.filename} className="w-full rounded-lg bg-gray-100" />
        ) : (
          <video src={item.url} controls className="w-full rounded-lg bg-black" />
        )}
      </div>

      {/* URL copy */}
      <div className="px-4 pb-3">
        <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
        <div className="flex gap-1">
          <input
            type="text"
            readOnly
            value={item.url}
            className="flex-1 text-xs px-2 py-1.5 border border-gray-200 rounded bg-gray-50 text-gray-600 truncate"
          />
          <button
            onClick={copyUrl}
            className="px-2 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            {copied ? 'Copied!' : <ClipboardDocumentIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 pb-3 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between"><span>Filename:</span><span className="text-gray-700 truncate ml-2">{item.filename}</span></div>
        <div className="flex justify-between"><span>Type:</span><span className="text-gray-700">{item.type}</span></div>
        <div className="flex justify-between"><span>Size:</span><span className="text-gray-700">{formatSize(item.size)}</span></div>
        {item.width && item.height && (
          <div className="flex justify-between"><span>Dimensions:</span><span className="text-gray-700">{item.width} x {item.height}</span></div>
        )}
        <div className="flex justify-between"><span>Uploaded:</span><span className="text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</span></div>
      </div>

      {/* Editable fields */}
      <div className="px-4 space-y-3 pb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe this image..."
            className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Folder</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="hero, banner, product"
            className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 mt-auto space-y-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(item)}
            className="w-full py-2 flex items-center justify-center gap-2 text-red-600 text-sm border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
