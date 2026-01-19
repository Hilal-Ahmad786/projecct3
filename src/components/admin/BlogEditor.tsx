'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => Promise<void>;
  onCancel: () => void;
  categories?: string[];
}

const defaultPost: BlogPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  status: 'draft',
};

export default function BlogEditor({
  post = defaultPost,
  onSave,
  onCancel,
  categories = ['Technology', 'AI & ML', 'Web Development', 'Mobile', 'Business', 'Tutorial'],
}: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogPost>(post);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [isSaving, setIsSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Generate slug from title
  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Text formatting helpers
  const insertFormatting = (before: string, after: string = before) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText =
      textarea.value.substring(0, start) +
      before +
      selectedText +
      after +
      textarea.value.substring(end);

    setFormData((prev) => ({ ...prev, content: newText }));

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleSave = async (status?: 'draft' | 'published') => {
    setIsSaving(true);
    try {
      await onSave({
        ...formData,
        status: status || formData.status,
        publishedAt: status === 'published' ? new Date().toISOString() : formData.publishedAt,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {post.id ? 'Edit Post' : 'New Blog Post'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isSaving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex px-6">
          {(['content', 'seo', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {showPreview ? (
          // Preview Mode
          <div className="prose max-w-none">
            <h1>{formData.title || 'Untitled Post'}</h1>
            <p className="text-gray-500 italic">{formData.excerpt}</p>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{
                __html: formData.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/`(.*?)`/g, '<code>$1</code>')
                  .replace(/\n/g, '<br />'),
              }}
            />
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {activeTab === 'content' && (
              <>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full px-4 py-3 text-xl border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">/blog/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    rows={2}
                    placeholder="Brief description for search results and social sharing..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 p-2 bg-gray-50 border border-b-0 border-gray-200 rounded-t-lg">
                    <button
                      type="button"
                      onClick={() => insertFormatting('**')}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Bold"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h5a4 4 0 014 4 4 4 0 01-4 4H4a1 1 0 01-1-1V4zm4 5h1a2 2 0 100-4H7v4z" />
                        <path d="M3 12a1 1 0 011-1h6a4 4 0 014 4 4 4 0 01-4 4H4a1 1 0 01-1-1v-6zm4 5h2a2 2 0 100-4H7v4z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('*')}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Italic"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9.667L7.333 16H9a1 1 0 110 2H7a1 1 0 110-2h1.333l2.334-12H9a1 1 0 01-1-1z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('`')}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Code"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <button
                      type="button"
                      onClick={() => insertFormatting('## ', '\n')}
                      className="p-2 hover:bg-gray-200 rounded text-sm font-semibold"
                      title="Heading"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('### ', '\n')}
                      className="p-2 hover:bg-gray-200 rounded text-sm font-semibold"
                      title="Subheading"
                    >
                      H3
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <button
                      type="button"
                      onClick={() => insertFormatting('[', '](url)')}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Link"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('- ', '\n')}
                      className="p-2 hover:bg-gray-200 rounded"
                      title="Bullet List"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    ref={contentRef}
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    placeholder="Write your blog post content here... (Markdown supported)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-b-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono text-sm resize-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'seo' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))
                    }
                    placeholder={formData.title || 'Enter meta title...'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.metaTitle || formData.title).length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))
                    }
                    rows={3}
                    placeholder={formData.excerpt || 'Enter meta description...'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.metaDescription || formData.excerpt).length}/160 characters
                  </p>
                </div>

                {/* SEO Preview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Search Preview</p>
                  <div className="space-y-1">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {formData.metaTitle || formData.title || 'Page Title'}
                    </p>
                    <p className="text-green-700 text-sm">
                      paksoft.com.tr/blog/{formData.slug || 'your-post-url'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {formData.metaDescription || formData.excerpt || 'Your meta description will appear here...'}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.featuredImage ? (
                      <div className="relative">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, featuredImage: undefined }))
                          }
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    placeholder="Author name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
