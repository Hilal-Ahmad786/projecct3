'use client';

import { useState, useCallback } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    EyeSlashIcon,
    Bars3Icon,
    ChartBarIcon,
    CheckIcon,
    XMarkIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon,
    CursorArrowRaysIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Service {
    id: string;
    name: string;
    slug: string;
    status: 'published' | 'draft';
    pages: number;
    description: string;
    icon: string;
    thumbnail: string;
    views: number;
    leads: number;
    conversionRate: number;
    order: number;
    lastUpdated: string;
    featured: boolean;
}

const initialServices: Service[] = [
    { id: '1', name: 'Web Development', slug: 'web-development', status: 'published', pages: 7, description: 'Custom web applications and websites', icon: 'code', thumbnail: '/services/web-dev.jpg', views: 12450, leads: 234, conversionRate: 1.88, order: 1, lastUpdated: '2024-01-15', featured: true },
    { id: '2', name: 'AI Solutions', slug: 'ai-solutions', status: 'published', pages: 7, description: 'Intelligent AI-powered solutions', icon: 'cpu', thumbnail: '/services/ai.jpg', views: 8920, leads: 189, conversionRate: 2.12, order: 2, lastUpdated: '2024-01-14', featured: true },
    { id: '3', name: 'Mobile Development', slug: 'mobile-development', status: 'published', pages: 7, description: 'iOS and Android app development', icon: 'device-mobile', thumbnail: '/services/mobile.jpg', views: 7650, leads: 156, conversionRate: 2.04, order: 3, lastUpdated: '2024-01-13', featured: true },
    { id: '4', name: 'Python Automation', slug: 'python-automation', status: 'published', pages: 7, description: 'Automate workflows with Python', icon: 'cog', thumbnail: '/services/python.jpg', views: 5430, leads: 98, conversionRate: 1.80, order: 4, lastUpdated: '2024-01-12', featured: false },
    { id: '5', name: 'Data Analytics', slug: 'data-analytics', status: 'published', pages: 7, description: 'Data-driven insights and analytics', icon: 'chart-bar', thumbnail: '/services/analytics.jpg', views: 6780, leads: 145, conversionRate: 2.14, order: 5, lastUpdated: '2024-01-11', featured: false },
    { id: '6', name: 'Machine Learning', slug: 'machine-learning', status: 'published', pages: 7, description: 'ML models and predictions', icon: 'brain', thumbnail: '/services/ml.jpg', views: 4560, leads: 87, conversionRate: 1.91, order: 6, lastUpdated: '2024-01-10', featured: false },
    { id: '7', name: 'Conversational AI', slug: 'conversational-ai', status: 'draft', pages: 7, description: 'Chatbots and virtual assistants', icon: 'chat', thumbnail: '/services/chatbot.jpg', views: 2340, leads: 45, conversionRate: 1.92, order: 7, lastUpdated: '2024-01-09', featured: false },
    { id: '8', name: 'API Development', slug: 'api-development', status: 'published', pages: 7, description: 'RESTful and GraphQL APIs', icon: 'api', thumbnail: '/services/api.jpg', views: 5670, leads: 112, conversionRate: 1.98, order: 8, lastUpdated: '2024-01-08', featured: false },
    { id: '9', name: 'UI/UX Design', slug: 'ui-ux-design', status: 'published', pages: 7, description: 'User-centered design solutions', icon: 'paint-brush', thumbnail: '/services/uiux.jpg', views: 8900, leads: 167, conversionRate: 1.88, order: 9, lastUpdated: '2024-01-07', featured: false },
    { id: '10', name: 'Digital Marketing', slug: 'digital-marketing', status: 'published', pages: 7, description: 'SEO, PPC, and social media', icon: 'megaphone', thumbnail: '/services/marketing.jpg', views: 7230, leads: 198, conversionRate: 2.74, order: 10, lastUpdated: '2024-01-06', featured: false },
    { id: '11', name: 'E-Commerce', slug: 'e-commerce', status: 'published', pages: 7, description: 'Online store solutions', icon: 'shopping-cart', thumbnail: '/services/ecommerce.jpg', views: 9450, leads: 223, conversionRate: 2.36, order: 11, lastUpdated: '2024-01-05', featured: false },
    { id: '12', name: 'DevOps & Cloud', slug: 'devops-cloud', status: 'draft', pages: 7, description: 'Cloud infrastructure and CI/CD', icon: 'cloud', thumbnail: '/services/devops.jpg', views: 3450, leads: 67, conversionRate: 1.94, order: 12, lastUpdated: '2024-01-04', featured: false },
    { id: '13', name: 'Cybersecurity', slug: 'cybersecurity', status: 'published', pages: 7, description: 'Security audits and protection', icon: 'shield', thumbnail: '/services/security.jpg', views: 4560, leads: 89, conversionRate: 1.95, order: 13, lastUpdated: '2024-01-03', featured: false },
];

export default function ServicesContentPage() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'order' | 'views' | 'leads' | 'name'>('order');

    // New service form state
    const [newService, setNewService] = useState({
        name: '',
        slug: '',
        description: '',
        status: 'draft' as 'published' | 'draft',
        featured: false,
    });

    const filteredServices = services
        .filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'views': return b.views - a.views;
                case 'leads': return b.leads - a.leads;
                case 'name': return a.name.localeCompare(b.name);
                default: return a.order - b.order;
            }
        });

    const totalViews = services.reduce((acc, s) => acc + s.views, 0);
    const totalLeads = services.reduce((acc, s) => acc + s.leads, 0);
    const avgConversion = services.length > 0 ? (services.reduce((acc, s) => acc + s.conversionRate, 0) / services.length).toFixed(2) : '0';

    const toggleStatus = (id: string) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, status: s.status === 'published' ? 'draft' : 'published' } : s
        ));
    };

    const toggleFeatured = (id: string) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, featured: !s.featured } : s
        ));
    };

    const startEditing = (service: Service) => {
        setEditingId(service.id);
        setEditingName(service.name);
        setEditingDescription(service.description);
    };

    const saveEditing = () => {
        if (editingId) {
            setServices(prev => prev.map(s =>
                s.id === editingId ? { ...s, name: editingName, description: editingDescription, slug: editingName.toLowerCase().replace(/\s+/g, '-') } : s
            ));
            setEditingId(null);
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingName('');
        setEditingDescription('');
    };

    const deleteService = (id: string) => {
        setServices(prev => prev.filter(s => s.id !== id));
        setShowDeleteModal(null);
    };

    const addNewService = () => {
        if (!newService.name.trim()) return;

        const newId = (Math.max(...services.map(s => parseInt(s.id))) + 1).toString();
        const newOrder = Math.max(...services.map(s => s.order)) + 1;

        setServices(prev => [...prev, {
            id: newId,
            name: newService.name,
            slug: newService.slug || newService.name.toLowerCase().replace(/\s+/g, '-'),
            description: newService.description,
            status: newService.status,
            featured: newService.featured,
            pages: 0,
            icon: 'cube',
            thumbnail: '/services/default.jpg',
            views: 0,
            leads: 0,
            conversionRate: 0,
            order: newOrder,
            lastUpdated: new Date().toISOString().split('T')[0],
        }]);

        setNewService({ name: '', slug: '', description: '', status: 'draft', featured: false });
        setShowAddModal(false);
    };

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const draggedIndex = services.findIndex(s => s.id === draggedId);
        const targetIndex = services.findIndex(s => s.id === targetId);

        const newServices = [...services];
        const [removed] = newServices.splice(draggedIndex, 1);
        newServices.splice(targetIndex, 0, removed);

        // Update order numbers
        const reorderedServices = newServices.map((s, index) => ({ ...s, order: index + 1 }));
        setServices(reorderedServices);
        setDraggedId(null);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
                    <p className="text-gray-500 mt-1">Manage your service pages, content, and visibility.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Service
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{services.length}</div>
                            <div className="text-sm text-gray-500">Total Services</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Bars3Icon className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs">
                        <span className="text-emerald-600">{services.filter(s => s.status === 'published').length} published</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-yellow-600">{services.filter(s => s.status === 'draft').length} drafts</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Total Views</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <CursorArrowRaysIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        +12.5% from last month
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">{totalLeads.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Leads Generated</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <UserGroupIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        +8.3% from last month
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{avgConversion}%</div>
                            <div className="text-sm text-gray-500">Avg. Conversion</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <ChartBarIcon className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        +0.3% from last month
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>

                <div className="flex items-center gap-2">
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
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    >
                        <option value="order">Sort by Order</option>
                        <option value="views">Sort by Views</option>
                        <option value="leads">Sort by Leads</option>
                        <option value="name">Sort by Name</option>
                    </select>

                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Drag hint */}
            {sortBy === 'order' && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
                    <ArrowsUpDownIcon className="w-4 h-4 text-blue-500" />
                    <span>Drag and drop services to reorder them on your website</span>
                </div>
            )}

            {/* Services Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            draggable={sortBy === 'order'}
                            onDragStart={(e) => handleDragStart(e, service.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, service.id)}
                            onDragEnd={handleDragEnd}
                            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${
                                draggedId === service.id ? 'opacity-50 scale-95' : ''
                            } ${sortBy === 'order' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-emerald-600">
                                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl font-bold">
                                    {service.name.charAt(0)}
                                </div>
                                {/* Status badge */}
                                <div className="absolute top-2 left-2 flex items-center gap-1">
                                    {service.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900">
                                            <StarIcon className="w-3 h-3" />
                                            Featured
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        service.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {service.status}
                                    </span>
                                </div>
                                {/* Order badge */}
                                {sortBy === 'order' && (
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">
                                        {service.order}
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                {/* Editable name and description */}
                                {editingId === service.id ? (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500"
                                            autoFocus
                                        />
                                        <textarea
                                            value={editingDescription}
                                            onChange={(e) => setEditingDescription(e.target.value)}
                                            rows={2}
                                            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 resize-none"
                                        />
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={saveEditing}
                                                className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                            >
                                                <CheckIcon className="w-3 h-3" />
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            >
                                                <XMarkIcon className="w-3 h-3" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{service.description}</p>
                                        <p className="text-xs text-gray-400 font-mono mb-3">/services/{service.slug}</p>
                                    </>
                                )}

                                {/* Stats */}
                                {editingId !== service.id && (
                                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-sm font-semibold text-gray-900">{service.views.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">Views</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-semibold text-emerald-600">{service.leads}</div>
                                            <div className="text-xs text-gray-500">Leads</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-semibold text-purple-600">{service.conversionRate}%</div>
                                            <div className="text-xs text-gray-500">Conv.</div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                {editingId !== service.id && (
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleStatus(service.id)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    service.status === 'published'
                                                        ? 'text-emerald-600 hover:bg-emerald-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={service.status === 'published' ? 'Unpublish' : 'Publish'}
                                            >
                                                {service.status === 'published' ? (
                                                    <EyeIcon className="w-4 h-4" />
                                                ) : (
                                                    <EyeSlashIcon className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => toggleFeatured(service.id)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    service.featured
                                                        ? 'text-yellow-500 hover:bg-yellow-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={service.featured ? 'Remove from featured' : 'Add to featured'}
                                            >
                                                <StarIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => startEditing(service)}
                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Quick edit"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(service.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Services List View */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conv.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr
                                    key={service.id}
                                    className={`hover:bg-gray-50 ${draggedId === service.id ? 'opacity-50' : ''}`}
                                    draggable={sortBy === 'order'}
                                    onDragStart={(e) => handleDragStart(e, service.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, service.id)}
                                    onDragEnd={handleDragEnd}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {sortBy === 'order' && (
                                                <Bars3Icon className="w-4 h-4 text-gray-400 cursor-grab" />
                                            )}
                                            <span className="text-sm text-gray-500">{service.order}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                                                {service.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{service.name}</span>
                                                    {service.featured && (
                                                        <StarIcon className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500 font-mono">/services/{service.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(service.id)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                                                service.status === 'published'
                                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                            }`}
                                        >
                                            {service.status === 'published' ? (
                                                <EyeIcon className="w-3 h-3" />
                                            ) : (
                                                <EyeSlashIcon className="w-3 h-3" />
                                            )}
                                            {service.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{service.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium">{service.leads}</td>
                                    <td className="px-6 py-4 text-sm text-purple-600">{service.conversionRate}%</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{service.lastUpdated}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleFeatured(service.id)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    service.featured
                                                        ? 'text-yellow-500 hover:bg-yellow-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                            >
                                                <StarIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => startEditing(service)}
                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(service.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Service Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-xl">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Add New Service</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                                <input
                                    type="text"
                                    value={newService.name}
                                    onChange={(e) => setNewService(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                                    }))}
                                    placeholder="e.g., Cloud Computing"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">/services/</span>
                                    <input
                                        type="text"
                                        value={newService.slug}
                                        onChange={(e) => setNewService(prev => ({ ...prev, slug: e.target.value }))}
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    placeholder="Brief description of the service..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={newService.status}
                                        onChange={(e) => setNewService(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={newService.featured}
                                            onChange={(e) => setNewService(prev => ({ ...prev, featured: e.target.checked }))}
                                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-700">Featured service</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewService}
                                disabled={!newService.name.trim()}
                                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Service
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
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Service</h3>
                            <p className="text-gray-500 text-center mb-6">
                                Are you sure you want to delete this service? This action cannot be undone and all associated pages will be removed.
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteService(showDeleteModal)}
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
