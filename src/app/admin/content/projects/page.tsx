'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    XMarkIcon,
    CheckIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    LinkIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    ArrowTrendingUpIcon,
    PhotoIcon,
    ClockIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Project {
    id: string;
    name: string;
    slug: string;
    client: string;
    clientLogo: string;
    category: string;
    status: 'published' | 'draft';
    featured: boolean;
    thumbnail: string;
    description: string;
    technologies: string[];
    completedDate: string;
    projectUrl: string;
    views: number;
    inquiries: number;
    duration: string;
    teamSize: number;
}

const categories = ['All', 'E-Commerce', 'Automation', 'Mobile', 'AI', 'Analytics', 'DevOps', 'Web App', 'SaaS'];

const initialProjects: Project[] = [
    {
        id: '1',
        name: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        client: 'TechStart Solutions',
        clientLogo: '/clients/techstart.png',
        category: 'E-Commerce',
        status: 'published',
        featured: true,
        thumbnail: '/projects/ecommerce.jpg',
        description: 'A full-featured e-commerce platform with advanced product management, multi-currency support, and AI-powered recommendations.',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
        completedDate: '2024-01-10',
        projectUrl: 'https://techstart-store.com',
        views: 3420,
        inquiries: 45,
        duration: '4 months',
        teamSize: 5,
    },
    {
        id: '2',
        name: 'Business Automation Suite',
        slug: 'business-automation-suite',
        client: 'DataFlow Inc',
        clientLogo: '/clients/dataflow.png',
        category: 'Automation',
        status: 'published',
        featured: true,
        thumbnail: '/projects/automation.jpg',
        description: 'Enterprise automation suite integrating CRM, ERP, and custom workflows with Python-based intelligent processing.',
        technologies: ['Python', 'Django', 'Celery', 'Redis', 'Docker'],
        completedDate: '2023-12-15',
        projectUrl: 'https://dataflow-automation.com',
        views: 2890,
        inquiries: 38,
        duration: '6 months',
        teamSize: 4,
    },
    {
        id: '3',
        name: 'Mobile Finance App',
        slug: 'mobile-finance-app',
        client: 'FinServe',
        clientLogo: '/clients/finserve.png',
        category: 'Mobile',
        status: 'published',
        featured: true,
        thumbnail: '/projects/finance-app.jpg',
        description: 'Cross-platform mobile banking application with biometric authentication and real-time transaction processing.',
        technologies: ['React Native', 'TypeScript', 'Firebase', 'Plaid API'],
        completedDate: '2023-11-20',
        projectUrl: 'https://finserve-app.com',
        views: 4560,
        inquiries: 67,
        duration: '5 months',
        teamSize: 6,
    },
    {
        id: '4',
        name: 'AI Customer Support',
        slug: 'ai-customer-support',
        client: 'ServicePro',
        clientLogo: '/clients/servicepro.png',
        category: 'AI',
        status: 'published',
        featured: false,
        thumbnail: '/projects/ai-support.jpg',
        description: 'Intelligent customer support system with NLP-powered chatbot and sentiment analysis for ticket prioritization.',
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI', 'MongoDB'],
        completedDate: '2023-10-05',
        projectUrl: 'https://servicepro-ai.com',
        views: 2150,
        inquiries: 29,
        duration: '3 months',
        teamSize: 3,
    },
    {
        id: '5',
        name: 'Analytics Dashboard',
        slug: 'analytics-dashboard',
        client: 'RetailMax',
        clientLogo: '/clients/retailmax.png',
        category: 'Analytics',
        status: 'draft',
        featured: false,
        thumbnail: '/projects/analytics.jpg',
        description: 'Real-time analytics dashboard with predictive insights, custom visualizations, and automated reporting.',
        technologies: ['React', 'D3.js', 'Python', 'Apache Kafka', 'ClickHouse'],
        completedDate: '2024-01-25',
        projectUrl: '',
        views: 890,
        inquiries: 12,
        duration: '4 months',
        teamSize: 4,
    },
    {
        id: '6',
        name: 'DevOps Pipeline',
        slug: 'devops-pipeline',
        client: 'CloudTech',
        clientLogo: '/clients/cloudtech.png',
        category: 'DevOps',
        status: 'published',
        featured: false,
        thumbnail: '/projects/devops.jpg',
        description: 'Enterprise-grade CI/CD pipeline with multi-cloud deployment, infrastructure as code, and automated testing.',
        technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'GitHub Actions'],
        completedDate: '2023-09-15',
        projectUrl: 'https://cloudtech-devops.com',
        views: 1780,
        inquiries: 23,
        duration: '2 months',
        teamSize: 2,
    },
    {
        id: '7',
        name: 'Healthcare Portal',
        slug: 'healthcare-portal',
        client: 'MediCare Plus',
        clientLogo: '/clients/medicare.png',
        category: 'Web App',
        status: 'published',
        featured: false,
        thumbnail: '/projects/healthcare.jpg',
        description: 'HIPAA-compliant patient portal with telemedicine integration, appointment scheduling, and medical records management.',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
        completedDate: '2023-08-20',
        projectUrl: 'https://medicare-portal.com',
        views: 2340,
        inquiries: 31,
        duration: '6 months',
        teamSize: 5,
    },
    {
        id: '8',
        name: 'SaaS Subscription Platform',
        slug: 'saas-subscription-platform',
        client: 'StartupHub',
        clientLogo: '/clients/startuphub.png',
        category: 'SaaS',
        status: 'draft',
        featured: false,
        thumbnail: '/projects/saas.jpg',
        description: 'Multi-tenant SaaS platform with subscription management, usage-based billing, and white-label support.',
        technologies: ['Next.js', 'Prisma', 'Stripe', 'Vercel', 'PlanetScale'],
        completedDate: '2024-02-01',
        projectUrl: '',
        views: 560,
        inquiries: 8,
        duration: '5 months',
        teamSize: 4,
    },
];

export default function ProjectsContentPage() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');

    // Form state for add/edit
    const emptyProject = {
        name: '',
        slug: '',
        client: '',
        category: 'Web App',
        description: '',
        technologies: '',
        projectUrl: '',
        duration: '',
        teamSize: 1,
        status: 'draft' as 'published' | 'draft',
        featured: false,
    };
    const [formData, setFormData] = useState(emptyProject);

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalViews = projects.reduce((acc, p) => acc + p.views, 0);
    const totalInquiries = projects.reduce((acc, p) => acc + p.inquiries, 0);

    const toggleFeatured = (id: string) => {
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, featured: !p.featured } : p
        ));
    };

    const toggleStatus = (id: string) => {
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
        ));
    };

    const openEditModal = (project: Project) => {
        setFormData({
            name: project.name,
            slug: project.slug,
            client: project.client,
            category: project.category,
            description: project.description,
            technologies: project.technologies.join(', '),
            projectUrl: project.projectUrl,
            duration: project.duration,
            teamSize: project.teamSize,
            status: project.status,
            featured: project.featured,
        });
        setShowEditModal(project.id);
    };

    const saveProject = () => {
        if (!formData.name.trim() || !formData.client.trim()) return;

        if (showEditModal) {
            // Update existing project
            setProjects(prev => prev.map(p =>
                p.id === showEditModal ? {
                    ...p,
                    name: formData.name,
                    slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                    client: formData.client,
                    category: formData.category,
                    description: formData.description,
                    technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                    projectUrl: formData.projectUrl,
                    duration: formData.duration,
                    teamSize: formData.teamSize,
                    status: formData.status,
                    featured: formData.featured,
                } : p
            ));
            setShowEditModal(null);
        } else {
            // Add new project
            const newId = (Math.max(...projects.map(p => parseInt(p.id))) + 1).toString();
            setProjects(prev => [...prev, {
                id: newId,
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                client: formData.client,
                clientLogo: '/clients/default.png',
                category: formData.category,
                status: formData.status,
                featured: formData.featured,
                thumbnail: '/projects/default.jpg',
                description: formData.description,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                completedDate: new Date().toISOString().split('T')[0],
                projectUrl: formData.projectUrl,
                views: 0,
                inquiries: 0,
                duration: formData.duration,
                teamSize: formData.teamSize,
            }]);
            setShowAddModal(false);
        }

        setFormData(emptyProject);
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
        setShowDeleteModal(null);
    };

    const ProjectModal = ({ isEdit = false }: { isEdit?: boolean }) => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isEdit ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button
                        onClick={() => {
                            isEdit ? setShowEditModal(null) : setShowAddModal(false);
                            setFormData(emptyProject);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    name: e.target.value,
                                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                                }))}
                                placeholder="e.g., E-Commerce Platform"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                                placeholder="e.g., TechStart Solutions"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                        <div className="flex items-center">
                            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">/projects/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
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
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            placeholder="Describe the project, its goals, and outcomes..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.technologies}
                            onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                            placeholder="e.g., Next.js, Node.js, PostgreSQL"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                            <input
                                type="url"
                                value={formData.projectUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                placeholder="e.g., 3 months"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                            <input
                                type="number"
                                min="1"
                                value={formData.teamSize}
                                onChange={(e) => setFormData(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 1 }))}
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
                            <span className="text-sm text-gray-700">Featured project</span>
                        </label>
                    </div>

                    {/* Thumbnail upload placeholder */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Thumbnail</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                            <PhotoIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (1200x800 recommended)</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                    <button
                        onClick={() => {
                            isEdit ? setShowEditModal(null) : setShowAddModal(false);
                            setFormData(emptyProject);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveProject}
                        disabled={!formData.name.trim() || !formData.client.trim()}
                        className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? 'Save Changes' : 'Add Project'}
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
                    <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
                    <p className="text-gray-500 mt-1">Manage your portfolio projects and case studies.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Project
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                            <div className="text-sm text-gray-500">Total Projects</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <BuildingOfficeIcon className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">{projects.filter(p => p.status === 'published').length}</div>
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
                            <div className="text-2xl font-bold text-purple-600">{projects.filter(p => p.featured).length}</div>
                            <div className="text-sm text-gray-500">Featured</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <StarIcon className="w-5 h-5 text-purple-600" />
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
                            <CursorArrowRaysIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-orange-600">{totalInquiries}</div>
                            <div className="text-sm text-gray-500">Inquiries</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                            <ChartBarIcon className="w-5 h-5 text-orange-600" />
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
                        placeholder="Search projects or clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Filter */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

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
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('gallery')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'gallery' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
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

            {/* Projects Gallery View */}
            {viewMode === 'gallery' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-blue-500">
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                                    {project.name.charAt(0)}
                                </div>
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1">
                                    {project.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900">
                                            <StarIcon className="w-3 h-3" />
                                            Featured
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        project.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {project.status}
                                    </span>
                                </div>
                                {/* Category badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white">
                                        {project.category}
                                    </span>
                                </div>
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(project)}
                                        className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors">
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(project.id)}
                                        className="p-3 bg-white/20 hover:bg-red-500/50 rounded-full text-white transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                {/* Title and Client */}
                                <div className="mb-3">
                                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <BuildingOfficeIcon className="w-4 h-4" />
                                        {project.client}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {project.technologies.slice(0, 4).map((tech, idx) => (
                                        <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-gray-900">{project.views.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">Views</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-emerald-600">{project.inquiries}</div>
                                        <div className="text-xs text-gray-500">Inquiries</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-blue-600">{project.duration}</div>
                                        <div className="text-xs text-gray-500">Duration</div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => toggleStatus(project.id)}
                                            className={`p-1.5 rounded-lg transition-colors ${
                                                project.status === 'published'
                                                    ? 'text-emerald-600 hover:bg-emerald-50'
                                                    : 'text-gray-400 hover:bg-gray-50'
                                            }`}
                                            title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => toggleFeatured(project.id)}
                                            className={`p-1.5 rounded-lg transition-colors ${
                                                project.featured
                                                    ? 'text-yellow-500 hover:bg-yellow-50'
                                                    : 'text-gray-400 hover:bg-gray-50'
                                            }`}
                                            title={project.featured ? 'Remove from featured' : 'Add to featured'}
                                        >
                                            <StarIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {project.projectUrl && (
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Visit project"
                                            >
                                                <GlobeAltIcon className="w-4 h-4" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => openEditModal(project)}
                                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            title="Edit"
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

            {/* Projects List View */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inquiries</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                                {project.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{project.name}</span>
                                                    {project.featured && (
                                                        <StarIcon className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {project.technologies.slice(0, 3).map((tech, idx) => (
                                                        <span key={idx} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{project.client}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(project.id)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                                                project.status === 'published'
                                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                            }`}
                                        >
                                            {project.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{project.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium">{project.inquiries}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleFeatured(project.id)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    project.featured
                                                        ? 'text-yellow-500 hover:bg-yellow-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                            >
                                                <StarIcon className="w-4 h-4" />
                                            </button>
                                            {project.projectUrl && (
                                                <a
                                                    href={project.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <GlobeAltIcon className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => openEditModal(project)}
                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(project.id)}
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

            {/* Empty state */}
            {filteredProjects.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || selectedCategory !== 'All' || statusFilter !== 'all'
                            ? 'Try adjusting your filters or search term.'
                            : 'Get started by adding your first project.'}
                    </p>
                    {!searchTerm && selectedCategory === 'All' && statusFilter === 'all' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add Project
                        </button>
                    )}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && <ProjectModal />}
            {showEditModal && <ProjectModal isEdit />}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <TrashIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Project</h3>
                            <p className="text-gray-500 text-center mb-6">
                                Are you sure you want to delete this project? This action cannot be undone.
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteProject(showDeleteModal)}
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
