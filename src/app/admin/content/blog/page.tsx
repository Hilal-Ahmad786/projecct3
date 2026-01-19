'use client';

import { useState } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    ClockIcon,
    TagIcon,
    UserIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    ShareIcon,
    DocumentTextIcon,
    PhotoIcon,
    GlobeAltIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    author: string;
    authorAvatar: string;
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'scheduled';
    publishDate: string;
    scheduledDate?: string;
    readTime: number;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    seo: {
        metaTitle: string;
        metaDescription: string;
        focusKeyword: string;
    };
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

const categories = ['All', 'Web Development', 'AI & ML', 'Mobile', 'E-Commerce', 'DevOps', 'Analytics', 'Design', 'Business'];
const authors = ['Admin', 'John Doe', 'Jane Smith', 'Mike Johnson'];

const initialPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Getting Started with Next.js 14: A Complete Guide',
        slug: 'getting-started-nextjs-14-complete-guide',
        excerpt: 'Learn how to build modern web applications with Next.js 14, featuring the new App Router, Server Components, and more.',
        content: 'Full article content here...',
        featuredImage: '/blog/nextjs-14.jpg',
        author: 'Admin',
        authorAvatar: '/avatars/admin.jpg',
        category: 'Web Development',
        tags: ['Next.js', 'React', 'TypeScript', 'Web Development'],
        status: 'published',
        publishDate: '2024-01-15',
        readTime: 12,
        views: 12450,
        likes: 342,
        comments: 56,
        shares: 128,
        seo: {
            metaTitle: 'Getting Started with Next.js 14 - Complete Guide 2024',
            metaDescription: 'Master Next.js 14 with this comprehensive guide covering App Router, Server Components, and best practices for modern web development.',
            focusKeyword: 'Next.js 14 tutorial',
        },
        featured: true,
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15',
    },
    {
        id: '2',
        title: 'AI Integration Best Practices for Modern Applications',
        slug: 'ai-integration-best-practices-modern-applications',
        excerpt: 'Discover the best practices for integrating AI capabilities into your applications, from API design to user experience.',
        content: 'Full article content here...',
        featuredImage: '/blog/ai-integration.jpg',
        author: 'John Doe',
        authorAvatar: '/avatars/john.jpg',
        category: 'AI & ML',
        tags: ['AI', 'Machine Learning', 'API', 'Integration'],
        status: 'published',
        publishDate: '2024-01-12',
        readTime: 15,
        views: 9800,
        likes: 287,
        comments: 43,
        shares: 95,
        seo: {
            metaTitle: 'AI Integration Best Practices - Complete Guide',
            metaDescription: 'Learn how to effectively integrate AI into your applications with these proven best practices and implementation strategies.',
            focusKeyword: 'AI integration',
        },
        featured: true,
        createdAt: '2024-01-08',
        updatedAt: '2024-01-12',
    },
    {
        id: '3',
        title: 'Mobile App Development with React Native in 2024',
        slug: 'mobile-app-development-react-native-2024',
        excerpt: 'Everything you need to know about building cross-platform mobile apps with React Native in 2024.',
        content: 'Full article content here...',
        featuredImage: '/blog/react-native.jpg',
        author: 'Jane Smith',
        authorAvatar: '/avatars/jane.jpg',
        category: 'Mobile',
        tags: ['React Native', 'Mobile Development', 'iOS', 'Android'],
        status: 'published',
        publishDate: '2024-01-10',
        readTime: 10,
        views: 7560,
        likes: 198,
        comments: 34,
        shares: 67,
        seo: {
            metaTitle: 'React Native Development Guide 2024',
            metaDescription: 'Build powerful cross-platform mobile apps with React Native. Complete guide with best practices and tips.',
            focusKeyword: 'React Native 2024',
        },
        featured: false,
        createdAt: '2024-01-05',
        updatedAt: '2024-01-10',
    },
    {
        id: '4',
        title: 'E-Commerce Trends That Will Dominate 2024',
        slug: 'ecommerce-trends-dominate-2024',
        excerpt: 'Explore the emerging e-commerce trends that will shape online retail in 2024 and beyond.',
        content: 'Full article content here...',
        featuredImage: '/blog/ecommerce-trends.jpg',
        author: 'Admin',
        authorAvatar: '/avatars/admin.jpg',
        category: 'E-Commerce',
        tags: ['E-Commerce', 'Trends', 'Retail', 'Business'],
        status: 'draft',
        publishDate: '',
        readTime: 8,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        seo: {
            metaTitle: 'Top E-Commerce Trends 2024',
            metaDescription: 'Discover the latest e-commerce trends that will define online shopping in 2024.',
            focusKeyword: 'e-commerce trends 2024',
        },
        featured: false,
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
    },
    {
        id: '5',
        title: 'DevOps CI/CD Pipeline Setup: From Zero to Production',
        slug: 'devops-cicd-pipeline-setup-zero-production',
        excerpt: 'Step-by-step guide to setting up a complete CI/CD pipeline for your development workflow.',
        content: 'Full article content here...',
        featuredImage: '/blog/devops-cicd.jpg',
        author: 'Mike Johnson',
        authorAvatar: '/avatars/mike.jpg',
        category: 'DevOps',
        tags: ['DevOps', 'CI/CD', 'Automation', 'Deployment'],
        status: 'published',
        publishDate: '2024-01-05',
        readTime: 18,
        views: 5420,
        likes: 156,
        comments: 28,
        shares: 45,
        seo: {
            metaTitle: 'DevOps CI/CD Pipeline Setup Guide',
            metaDescription: 'Learn to build a robust CI/CD pipeline from scratch. Complete DevOps guide for modern development teams.',
            focusKeyword: 'CI/CD pipeline setup',
        },
        featured: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-05',
    },
    {
        id: '6',
        title: 'Data Analytics for Business Growth: A Practical Guide',
        slug: 'data-analytics-business-growth-practical-guide',
        excerpt: 'Learn how to leverage data analytics to drive business decisions and accelerate growth.',
        content: 'Full article content here...',
        featuredImage: '/blog/data-analytics.jpg',
        author: 'Jane Smith',
        authorAvatar: '/avatars/jane.jpg',
        category: 'Analytics',
        tags: ['Analytics', 'Data', 'Business', 'Growth'],
        status: 'scheduled',
        publishDate: '',
        scheduledDate: '2024-02-01',
        readTime: 14,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        seo: {
            metaTitle: 'Data Analytics for Business Growth',
            metaDescription: 'Practical guide to using data analytics for driving business decisions and growth strategies.',
            focusKeyword: 'data analytics business',
        },
        featured: false,
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03',
    },
    {
        id: '7',
        title: 'UI/UX Design Principles for Web Applications',
        slug: 'ui-ux-design-principles-web-applications',
        excerpt: 'Essential design principles every web developer should know for creating user-friendly interfaces.',
        content: 'Full article content here...',
        featuredImage: '/blog/ui-ux-design.jpg',
        author: 'John Doe',
        authorAvatar: '/avatars/john.jpg',
        category: 'Design',
        tags: ['UI/UX', 'Design', 'Web Development', 'User Experience'],
        status: 'draft',
        publishDate: '',
        readTime: 11,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        seo: {
            metaTitle: 'UI/UX Design Principles for Web Apps',
            metaDescription: 'Learn essential UI/UX design principles to create intuitive and engaging web applications.',
            focusKeyword: 'UI UX design principles',
        },
        featured: false,
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
    },
];

export default function BlogContentPage() {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAuthor, setSelectedAuthor] = useState('All');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
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
        author: 'Admin',
        category: 'Web Development',
        tags: '',
        status: 'draft' as 'published' | 'draft' | 'scheduled',
        scheduledDate: '',
        readTime: 5,
        featured: false,
        seo: {
            metaTitle: '',
            metaDescription: '',
            focusKeyword: '',
        },
    };
    const [formData, setFormData] = useState(emptyPost);
    const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesAuthor = selectedAuthor === 'All' || post.author === selectedAuthor;
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesCategory && matchesAuthor && matchesStatus;
    });

    const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
    const totalEngagement = posts.reduce((acc, p) => acc + p.likes + p.comments + p.shares, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-emerald-100 text-emerald-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published': return <EyeIcon className="w-3 h-3" />;
            case 'draft': return <DocumentTextIcon className="w-3 h-3" />;
            case 'scheduled': return <ClockIcon className="w-3 h-3" />;
            default: return null;
        }
    };

    const toggleFeatured = (id: string) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, featured: !p.featured } : p
        ));
    };

    const openEditModal = (post: BlogPost) => {
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            category: post.category,
            tags: post.tags.join(', '),
            status: post.status,
            scheduledDate: post.scheduledDate || '',
            readTime: post.readTime,
            featured: post.featured,
            seo: { ...post.seo },
        });
        setShowEditModal(post.id);
        setActiveTab('content');
    };

    const savePost = () => {
        if (!formData.title.trim()) return;

        if (showEditModal) {
            setPosts(prev => prev.map(p =>
                p.id === showEditModal ? {
                    ...p,
                    title: formData.title,
                    slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    excerpt: formData.excerpt,
                    content: formData.content,
                    author: formData.author,
                    category: formData.category,
                    tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                    status: formData.status,
                    scheduledDate: formData.status === 'scheduled' ? formData.scheduledDate : undefined,
                    publishDate: formData.status === 'published' ? new Date().toISOString().split('T')[0] : p.publishDate,
                    readTime: formData.readTime,
                    featured: formData.featured,
                    seo: { ...formData.seo },
                    updatedAt: new Date().toISOString().split('T')[0],
                } : p
            ));
            setShowEditModal(null);
        } else {
            const newId = (Math.max(...posts.map(p => parseInt(p.id))) + 1).toString();
            const now = new Date().toISOString().split('T')[0];
            setPosts(prev => [...prev, {
                id: newId,
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                excerpt: formData.excerpt,
                content: formData.content,
                featuredImage: '/blog/default.jpg',
                author: formData.author,
                authorAvatar: '/avatars/default.jpg',
                category: formData.category,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                status: formData.status,
                publishDate: formData.status === 'published' ? now : '',
                scheduledDate: formData.status === 'scheduled' ? formData.scheduledDate : undefined,
                readTime: formData.readTime,
                views: 0,
                likes: 0,
                comments: 0,
                shares: 0,
                seo: { ...formData.seo },
                featured: formData.featured,
                createdAt: now,
                updatedAt: now,
            }]);
            setShowAddModal(false);
        }

        setFormData(emptyPost);
    };

    const deletePost = (id: string) => {
        setPosts(prev => prev.filter(p => p.id !== id));
        setShowDeleteModal(null);
    };

    const PostModal = ({ isEdit = false }: { isEdit?: boolean }) => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
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
                        Content
                    </button>
                    <button
                        onClick={() => setActiveTab('seo')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'seo'
                                ? 'border-emerald-500 text-emerald-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        SEO Settings
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'content' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        title: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                                        seo: {
                                            ...prev.seo,
                                            metaTitle: prev.seo.metaTitle || e.target.value,
                                        }
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        excerpt: e.target.value,
                                        seo: {
                                            ...prev.seo,
                                            metaDescription: prev.seo.metaDescription || e.target.value.slice(0, 160),
                                        }
                                    }))}
                                    rows={2}
                                    placeholder="Brief summary of the post..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    rows={8}
                                    placeholder="Write your blog post content here... (Markdown supported)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                            </div>

                            {/* Featured image placeholder */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                                    <PhotoIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (1200x630 recommended)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <select
                                        value={formData.author}
                                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    >
                                        {authors.map(author => (
                                            <option key={author} value={author}>{author}</option>
                                        ))}
                                    </select>
                                </div>
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

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as typeof formData.status }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="scheduled">Scheduled</option>
                                    </select>
                                </div>
                                {formData.status === 'scheduled' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.scheduledDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (min)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 1 }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
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

                    {activeTab === 'seo' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.seo.metaTitle}
                                    onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo, metaTitle: e.target.value } }))}
                                    placeholder="SEO title (50-60 characters)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                <p className={`text-xs mt-1 ${formData.seo.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {formData.seo.metaTitle.length}/60 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                <textarea
                                    value={formData.seo.metaDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo, metaDescription: e.target.value } }))}
                                    rows={3}
                                    placeholder="SEO description (150-160 characters)"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                />
                                <p className={`text-xs mt-1 ${formData.seo.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {formData.seo.metaDescription.length}/160 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keyword</label>
                                <input
                                    type="text"
                                    value={formData.seo.focusKeyword}
                                    onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo, focusKeyword: e.target.value } }))}
                                    placeholder="Primary keyword for this post"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            {/* SEO Preview */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search Engine Preview</label>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                                        {formData.seo.metaTitle || formData.title || 'Page Title'}
                                    </div>
                                    <div className="text-emerald-700 text-sm truncate">
                                        yourdomain.com/blog/{formData.slug || 'page-slug'}
                                    </div>
                                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                        {formData.seo.metaDescription || formData.excerpt || 'Add a meta description to see a preview here...'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
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
                        disabled={!formData.title.trim()}
                        className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? 'Save Changes' : 'Create Post'}
                    </button>
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
                    <p className="text-gray-500 mt-1">Create and manage blog posts, articles, and content.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Post
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
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
                            <div className="text-2xl font-bold text-emerald-600">{posts.filter(p => p.status === 'published').length}</div>
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
                            <div className="text-2xl font-bold text-yellow-600">{posts.filter(p => p.status === 'draft').length}</div>
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
                            <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Total Views</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <ChartBarIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{totalEngagement.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Engagement</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <HeartIcon className="w-5 h-5 text-purple-600" />
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

                    {/* Author Filter */}
                    <select
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    >
                        <option value="All">All Authors</option>
                        {authors.map(author => (
                            <option key={author} value={author}>{author}</option>
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
                            onClick={() => setStatusFilter('published')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'published' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Published
                        </button>
                        <button
                            onClick={() => setStatusFilter('draft')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'draft' ? 'bg-yellow-100 text-yellow-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Drafts
                        </button>
                        <button
                            onClick={() => setStatusFilter('scheduled')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'scheduled' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Scheduled
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

            {/* Posts List View */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                            <div className="flex">
                                {/* Featured Image */}
                                <div className="w-48 h-40 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-blue-500 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold">
                                        {post.title.charAt(0)}
                                    </div>
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
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{post.excerpt}</p>

                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <UserIcon className="w-3 h-3" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    {post.status === 'scheduled' ? `Scheduled: ${post.scheduledDate}` : post.publishDate || 'Not published'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ClockIcon className="w-3 h-3" />
                                                    {post.readTime} min read
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

                                        {/* Stats & Actions */}
                                        <div className="text-right">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                                                <div className="text-xs text-gray-500">Views</div>
                                                <div className="text-sm font-semibold text-gray-900">{post.views.toLocaleString()}</div>
                                                <div className="text-xs text-gray-500">Likes</div>
                                                <div className="text-sm font-semibold text-pink-600">{post.likes}</div>
                                                <div className="text-xs text-gray-500">Comments</div>
                                                <div className="text-sm font-semibold text-blue-600">{post.comments}</div>
                                            </div>
                                            <div className="flex items-center gap-1 justify-end">
                                                <button
                                                    onClick={() => toggleFeatured(post.id)}
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
                        </div>
                    ))}
                </div>
            )}

            {/* Posts Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                            {/* Featured Image */}
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-blue-500">
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                                    {post.title.charAt(0)}
                                </div>
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
                                    <span className="text-xs text-gray-400">{post.readTime} min read</span>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-sm text-gray-500">{post.author}</span>
                                    <span className="text-xs text-gray-400">
                                        {post.publishDate || (post.scheduledDate && `Scheduled: ${post.scheduledDate}`)}
                                    </span>
                                </div>

                                {/* Engagement Stats */}
                                <div className="flex items-center gap-4 py-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <EyeIcon className="w-4 h-4" />
                                        <span className="text-sm">{post.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-pink-500">
                                        <HeartIcon className="w-4 h-4" />
                                        <span className="text-sm">{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-500">
                                        <ChatBubbleLeftIcon className="w-4 h-4" />
                                        <span className="text-sm">{post.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <ShareIcon className="w-4 h-4" />
                                        <span className="text-sm">{post.shares}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() => toggleFeatured(post.id)}
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
            {filteredPosts.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || selectedCategory !== 'All' || selectedAuthor !== 'All' || statusFilter !== 'all'
                            ? 'Try adjusting your filters or search term.'
                            : 'Get started by creating your first blog post.'}
                    </p>
                    {!searchTerm && selectedCategory === 'All' && selectedAuthor === 'All' && statusFilter === 'all' && (
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
                                                    {post.seo.metaTitle || post.title}
                                                </div>
                                                <div className="text-emerald-700 text-sm truncate">
                                                    yourdomain.com/blog/{post.slug}
                                                </div>
                                                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                    {post.seo.metaDescription || post.excerpt}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs text-gray-500">Focus Keyword</span>
                                                <p className="text-sm font-medium text-gray-900">{post.seo.focusKeyword || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Meta Title Length</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${post.seo.metaTitle.length <= 60 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                            style={{ width: `${Math.min((post.seo.metaTitle.length / 60) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs ${post.seo.metaTitle.length <= 60 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                        {post.seo.metaTitle.length}/60
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Meta Description Length</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${post.seo.metaDescription.length <= 160 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                            style={{ width: `${Math.min((post.seo.metaDescription.length / 160) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs ${post.seo.metaDescription.length <= 160 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                        {post.seo.metaDescription.length}/160
                                                    </span>
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
                                Are you sure you want to delete this blog post? This action cannot be undone.
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
