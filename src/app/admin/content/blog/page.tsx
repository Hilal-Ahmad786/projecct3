'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    ClockIcon,
    DocumentTextIcon,
    PhotoIcon,
    GlobeAltIcon,
    ChartBarIcon,
    ArrowPathIcon,
    LanguageIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Types matching the database schema
interface BlogTranslation {
    id?: string;
    locale: string;
    title: string;
    excerpt?: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
}

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    featuredImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    category: string;
    tags: string[];
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    translations: BlogTranslation[];
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const categories = ['All', 'general', 'web-development', 'ai-ml', 'mobile', 'e-commerce', 'devops', 'analytics', 'design', 'business'];
const locales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

export default function BlogContentPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 10, total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [statusFilter, setStatusFilter] = useState<'all' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [showSeoPreview, setShowSeoPreview] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Form state
    const emptyPost = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'general',
        tags: '',
        status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        featured: false,
        featuredImage: '',
        metaTitle: '',
        metaDescription: '',
        translations: locales.slice(1).map(locale => ({
            locale: locale.code,
            title: '',
            excerpt: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
        })),
    };
    const [formData, setFormData] = useState(emptyPost);
    const [activeTab, setActiveTab] = useState<'content' | 'translations' | 'seo'>('content');
    const [activeTranslationLocale, setActiveTranslationLocale] = useState('tr');

    // Fetch posts from API
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
            });
            if (statusFilter !== 'all') params.set('status', statusFilter);
            if (selectedCategory !== 'All') params.set('category', selectedCategory);
            if (searchTerm) params.set('search', searchTerm);

            const res = await fetch(`/api/admin/blog/posts?${params}`);
            const data = await res.json();

            if (data.success) {
                setPosts(data.data);
                setPagination(data.pagination);
            } else {
                setError(data.message || 'Failed to fetch posts');
            }
        } catch (err) {
            setError('Failed to connect to server');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, statusFilter, selectedCategory, searchTerm]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Stats
    const totalPosts = posts.length;
    const publishedCount = posts.filter(p => p.status === 'PUBLISHED').length;
    const draftCount = posts.filter(p => p.status === 'DRAFT').length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return 'bg-emerald-100 text-emerald-800';
            case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
            case 'ARCHIVED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return <EyeIcon className="w-3 h-3" />;
            case 'DRAFT': return <DocumentTextIcon className="w-3 h-3" />;
            case 'ARCHIVED': return <ClockIcon className="w-3 h-3" />;
            default: return null;
        }
    };

    const toggleFeatured = async (id: string, currentFeatured: boolean) => {
        try {
            const res = await fetch(`/api/admin/blog/posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !currentFeatured }),
            });
            const data = await res.json();
            if (data.success) {
                setPosts(prev => prev.map(p => p.id === id ? { ...p, featured: !currentFeatured } : p));
            }
        } catch (err) {
            console.error('Error toggling featured:', err);
        }
    };

    const openEditModal = (post: BlogPost) => {
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            content: post.content,
            category: post.category,
            tags: post.tags.join(', '),
            status: post.status,
            featured: post.featured,
            featuredImage: post.featuredImage || '',
            metaTitle: post.metaTitle || '',
            metaDescription: post.metaDescription || '',
            translations: locales.slice(1).map(locale => {
                const existing = post.translations.find(t => t.locale === locale.code);
                return {
                    locale: locale.code,
                    title: existing?.title || '',
                    excerpt: existing?.excerpt || '',
                    content: existing?.content || '',
                    metaTitle: existing?.metaTitle || '',
                    metaDescription: existing?.metaDescription || '',
                };
            }),
        });
        setShowEditModal(post.id);
        setActiveTab('content');
    };

    const savePost = async () => {
        if (!formData.title.trim()) return;
        setSaving(true);
        setError(null);

        try {
            const postData = {
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                excerpt: formData.excerpt || undefined,
                content: formData.content,
                category: formData.category,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                status: formData.status,
                featured: formData.featured,
                featuredImage: formData.featuredImage || undefined,
                metaTitle: formData.metaTitle || undefined,
                metaDescription: formData.metaDescription || undefined,
                translations: formData.translations.filter(t => t.title && t.content),
            };

            if (showEditModal) {
                const res = await fetch(`/api/admin/blog/posts/${showEditModal}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData),
                });
                const data = await res.json();
                if (data.success) {
                    await fetchPosts();
                    setShowEditModal(null);
                    setFormData(emptyPost);
                } else {
                    setError(data.message || 'Failed to update post');
                }
            } else {
                const res = await fetch('/api/admin/blog/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData),
                });
                const data = await res.json();
                if (data.success) {
                    await fetchPosts();
                    setShowAddModal(false);
                    setFormData(emptyPost);
                } else {
                    setError(data.message || 'Failed to create post');
                }
            }
        } catch (err) {
            setError('Failed to save post');
            console.error('Error saving post:', err);
        } finally {
            setSaving(false);
        }
    };

    const deletePost = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/blog/posts/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setPosts(prev => prev.filter(p => p.id !== id));
                setShowDeleteModal(null);
            } else {
                setError(data.message || 'Failed to delete post');
            }
        } catch (err) {
            setError('Failed to delete post');
            console.error('Error deleting post:', err);
        }
    };

    const updateTranslation = (locale: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            translations: prev.translations.map(t =>
                t.locale === locale ? { ...t, [field]: value } : t
            ),
        }));
    };

    const PostModal = ({ isEdit = false }: { isEdit?: boolean }) => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h2>
                    <button
                        onClick={() => {
                            isEdit ? setShowEditModal(null) : setShowAddModal(false);
                            setFormData(emptyPost);
                            setActiveTab('content');
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'content'
                                ? 'border-emerald-500 text-emerald-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <DocumentTextIcon className="w-4 h-4" />
                            Content (EN)
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('translations')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'translations'
                                ? 'border-emerald-500 text-emerald-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <LanguageIcon className="w-4 h-4" />
                            Translations
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('seo')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'seo'
                                ? 'border-emerald-500 text-emerald-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <GlobeAltIcon className="w-4 h-4" />
                            SEO Settings
                        </span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'content' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title (English) *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        title: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                                        metaTitle: prev.metaTitle || e.target.value,
                                    }))}
                                    placeholder="Enter post title..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">/blog/</span>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (English)</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        excerpt: e.target.value,
                                        metaDescription: prev.metaDescription || e.target.value.slice(0, 160),
                                    }))}
                                    rows={2}
                                    placeholder="Brief summary of the post..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content (English) *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    rows={10}
                                    placeholder="Write your blog post content here... (Markdown supported)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                            </div>

                            {/* Featured image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                {formData.featuredImage && (
                                    <div className="mt-2 relative aspect-video max-w-xs rounded-lg overflow-hidden bg-gray-100">
                                        <img src={formData.featuredImage} alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    >
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as typeof formData.status }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="ARCHIVED">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                    placeholder="e.g., Next.js, React, Tutorial"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-sm text-gray-700">Featured post</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'translations' && (
                        <div className="space-y-4">
                            {/* Language Tabs */}
                            <div className="flex gap-2 flex-wrap">
                                {locales.slice(1).map(locale => (
                                    <button
                                        key={locale.code}
                                        onClick={() => setActiveTranslationLocale(locale.code)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                            activeTranslationLocale === locale.code
                                                ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                                        }`}
                                    >
                                        <span>{locale.flag}</span>
                                        {locale.name}
                                        {formData.translations.find(t => t.locale === locale.code)?.title && (
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Translation Form */}
                            {locales.slice(1).map(locale => (
                                <div
                                    key={locale.code}
                                    className={activeTranslationLocale === locale.code ? 'space-y-4' : 'hidden'}
                                >
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <span className="text-lg">{locale.flag}</span>
                                        <span>Translating to <strong>{locale.name}</strong></span>
                                        {(locale.code === 'ar' || locale.code === 'ur') && (
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">RTL</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title ({locale.name})</label>
                                        <input
                                            type="text"
                                            value={formData.translations.find(t => t.locale === locale.code)?.title || ''}
                                            onChange={(e) => updateTranslation(locale.code, 'title', e.target.value)}
                                            placeholder={`Enter title in ${locale.name}...`}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt ({locale.name})</label>
                                        <textarea
                                            value={formData.translations.find(t => t.locale === locale.code)?.excerpt || ''}
                                            onChange={(e) => updateTranslation(locale.code, 'excerpt', e.target.value)}
                                            rows={2}
                                            placeholder={`Brief summary in ${locale.name}...`}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                            dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content ({locale.name})</label>
                                        <textarea
                                            value={formData.translations.find(t => t.locale === locale.code)?.content || ''}
                                            onChange={(e) => updateTranslation(locale.code, 'content', e.target.value)}
                                            rows={10}
                                            placeholder={`Write content in ${locale.name}... (Markdown supported)`}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm"
                                            dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title ({locale.name})</label>
                                            <input
                                                type="text"
                                                value={formData.translations.find(t => t.locale === locale.code)?.metaTitle || ''}
                                                onChange={(e) => updateTranslation(locale.code, 'metaTitle', e.target.value)}
                                                placeholder="SEO title"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description ({locale.name})</label>
                                            <input
                                                type="text"
                                                value={formData.translations.find(t => t.locale === locale.code)?.metaDescription || ''}
                                                onChange={(e) => updateTranslation(locale.code, 'metaDescription', e.target.value)}
                                                placeholder="SEO description"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                            />
                                        </div>
                                    </div>

                                    {/* Reference: English content */}
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Reference: English Content</h4>
                                        <div className="text-sm text-gray-600 space-y-2">
                                            <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                                            <p><strong>Excerpt:</strong> {formData.excerpt || 'Not set'}</p>
                                            <details className="cursor-pointer">
                                                <summary className="text-emerald-600 hover:text-emerald-700">View full content</summary>
                                                <pre className="mt-2 p-2 bg-white rounded border text-xs overflow-auto max-h-40">{formData.content || 'Not set'}</pre>
                                            </details>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.metaTitle}
                                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                                    placeholder="SEO title (50-60 characters)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                <p className={`text-xs mt-1 ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {formData.metaTitle.length}/60 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                <textarea
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                    rows={3}
                                    placeholder="SEO description (150-160 characters)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                />
                                <p className={`text-xs mt-1 ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {formData.metaDescription.length}/160 characters
                                </p>
                            </div>

                            {/* SEO Preview */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search Engine Preview</label>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                                        {formData.metaTitle || formData.title || 'Page Title'}
                                    </div>
                                    <div className="text-emerald-700 text-sm truncate">
                                        paksoft.com.tr/blog/{formData.slug || 'page-slug'}
                                    </div>
                                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                        {formData.metaDescription || formData.excerpt || 'Add a meta description to see a preview here...'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        {activeTab === 'translations' && (
                            <span>
                                {formData.translations.filter(t => t.title && t.content).length} of {locales.length - 1} translations complete
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                isEdit ? setShowEditModal(null) : setShowAddModal(false);
                                setFormData(emptyPost);
                                setActiveTab('content');
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={savePost}
                            disabled={!formData.title.trim() || !formData.content.trim() || saving}
                            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                            {isEdit ? 'Save Changes' : 'Create Post'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-500 mt-1">Create and manage multilingual blog posts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchPosts}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        New Post
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                    <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{pagination.total}</div>
                            <div className="text-sm text-gray-500">Total Posts</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">{publishedCount}</div>
                            <div className="text-sm text-gray-500">Published</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <EyeIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
                            <div className="text-sm text-gray-500">Drafts</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                            <DocumentTextIcon className="w-5 h-5 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{locales.length}</div>
                            <div className="text-sm text-gray-500">Languages</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <LanguageIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts, tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('PUBLISHED')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Published
                        </button>
                        <button
                            onClick={() => setStatusFilter('DRAFT')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'DRAFT' ? 'bg-yellow-100 text-yellow-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Drafts
                        </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <ArrowPathIcon className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
            )}

            {/* Posts List View */}
            {!loading && viewMode === 'list' && (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                            <div className="flex">
                                {/* Featured Image */}
                                <div className="w-48 h-40 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-blue-500 relative">
                                    {post.featuredImage ? (
                                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold">
                                            {post.title.charAt(0)}
                                        </div>
                                    )}
                                    {post.featured && (
                                        <div className="absolute top-2 left-2">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900">
                                                <StarIcon className="w-3 h-3" />
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                                                    {getStatusIcon(post.status)}
                                                    {post.status}
                                                </span>
                                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                                    {post.category}
                                                </span>
                                                {/* Translation count */}
                                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600 flex items-center gap-1">
                                                    <LanguageIcon className="w-3 h-3" />
                                                    {post.translations.length + 1} lang
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{post.excerpt}</p>

                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {post.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                                        +{post.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleFeatured(post.id, post.featured)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    post.featured
                                                        ? 'text-yellow-500 hover:bg-yellow-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={post.featured ? 'Remove from featured' : 'Add to featured'}
                                            >
                                                <StarIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setShowSeoPreview(post.id)}
                                                className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="SEO Preview"
                                            >
                                                <GlobeAltIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(post.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Posts Grid View */}
            {!loading && viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                            {/* Featured Image */}
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-blue-500">
                                {post.featuredImage ? (
                                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                                        {post.title.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 flex items-center gap-1">
                                    {post.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900">
                                            <StarIcon className="w-3 h-3" />
                                        </span>
                                    )}
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                                        {getStatusIcon(post.status)}
                                        {post.status}
                                    </span>
                                </div>
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(post)}
                                        className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors">
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(post.id)}
                                        className="p-3 bg-white/20 hover:bg-red-500/50 rounded-full text-white transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                        {post.category}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                                        {post.translations.length + 1} lang
                                    </span>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>

                                <div className="text-xs text-gray-400">
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
                                    <button
                                        onClick={() => toggleFeatured(post.id, post.featured)}
                                        className={`p-1.5 rounded-lg transition-colors ${
                                            post.featured
                                                ? 'text-yellow-500 hover:bg-yellow-50'
                                                : 'text-gray-400 hover:bg-gray-50'
                                        }`}
                                    >
                                        <StarIcon className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setShowSeoPreview(post.id)}
                                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                        >
                                            <GlobeAltIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(post)}
                                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && posts.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || selectedCategory !== 'All' || statusFilter !== 'all'
                            ? 'Try adjusting your filters or search term.'
                            : 'Get started by creating your first blog post.'}
                    </p>
                    {!searchTerm && selectedCategory === 'All' && statusFilter === 'all' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            New Post
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && <PostModal />}
            {showEditModal && <PostModal isEdit />}

            {/* SEO Preview Modal */}
            {showSeoPreview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">SEO Preview</h2>
                            <button
                                onClick={() => setShowSeoPreview(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            {(() => {
                                const post = posts.find(p => p.id === showSeoPreview);
                                if (!post) return null;
                                return (
                                    <>
                                        <div className="mb-6">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Google Search Preview</h3>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                                <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                                                    {post.metaTitle || post.title}
                                                </div>
                                                <div className="text-emerald-700 text-sm truncate">
                                                    paksoft.com.tr/blog/{post.slug}
                                                </div>
                                                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                    {post.metaDescription || post.excerpt}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs text-gray-500">Meta Title Length</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${(post.metaTitle?.length || 0) <= 60 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                            style={{ width: `${Math.min(((post.metaTitle?.length || 0) / 60) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs ${(post.metaTitle?.length || 0) <= 60 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                        {post.metaTitle?.length || 0}/60
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Meta Description Length</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${(post.metaDescription?.length || 0) <= 160 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                            style={{ width: `${Math.min(((post.metaDescription?.length || 0) / 160) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs ${(post.metaDescription?.length || 0) <= 160 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                        {post.metaDescription?.length || 0}/160
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Translations</span>
                                                <div className="flex gap-1 mt-1">
                                                    <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded">EN</span>
                                                    {post.translations.map(t => (
                                                        <span key={t.locale} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded uppercase">
                                                            {t.locale}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => {
                                    const post = posts.find(p => p.id === showSeoPreview);
                                    if (post) {
                                        openEditModal(post);
                                        setActiveTab('seo');
                                    }
                                    setShowSeoPreview(null);
                                }}
                                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Edit SEO Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <TrashIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Post</h3>
                            <p className="text-gray-500 text-center mb-6">
                                Are you sure you want to delete this blog post? This will also delete all translations. This action cannot be undone.
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deletePost(showDeleteModal)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
