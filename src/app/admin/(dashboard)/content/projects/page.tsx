'use client';

import { useState, useCallback } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    BuildingOfficeIcon,
    PhotoIcon,
    GlobeAltIcon,
    DocumentTextIcon,
    CubeIcon,
    ChartBarIcon,
    LanguageIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useProjects, useProjectMutations, type Project, type ProjectTranslation } from '@/hooks/admin/useProjects';
import TabbedModal from '@/components/admin/forms/TabbedModal';
import ArrayEditor from '@/components/admin/forms/ArrayEditor';
import TagInput from '@/components/admin/forms/TagInput';
import ResultsEditor from '@/components/admin/forms/ResultsEditor';

const categories = ['All', 'E-Commerce', 'Automation', 'Mobile', 'AI', 'Analytics', 'DevOps', 'Web App', 'SaaS'];

const LOCALES = [
    { code: 'tr', name: 'Turkish', flag: '\uD83C\uDDF9\uD83C\uDDF7' },
    { code: 'de', name: 'German', flag: '\uD83C\uDDE9\uD83C\uDDEA' },
    { code: 'ur', name: 'Urdu', flag: '\uD83C\uDDF5\uD83C\uDDF0' },
    { code: 'ar', name: 'Arabic', flag: '\uD83C\uDDF8\uD83C\uDDE6' },
];

const TECH_SUGGESTIONS = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Django', 'PostgreSQL',
    'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'TensorFlow',
    'PyTorch', 'GraphQL', 'REST API', 'Prisma', 'Tailwind CSS', 'Flutter', 'React Native',
];

interface ProjectFormData {
    name: string;
    slug: string;
    client: string;
    category: string;
    industry: string;
    description: string;
    fullDescription: string;
    challenge: string;
    solution: string;
    thumbnail: string;
    images: string[];
    technologies: string[];
    results: { metric: string; value: string }[];
    duration: string;
    teamSize: string;
    projectUrl: string;
    completedDate: string;
    status: Project['status'];
    featured: boolean;
    translations: {
        locale: string;
        name: string;
        description: string;
        fullDescription: string;
        challenge: string;
        solution: string;
    }[];
}

const emptyFormData = (): ProjectFormData => ({
    name: '',
    slug: '',
    client: '',
    category: 'Web App',
    industry: '',
    description: '',
    fullDescription: '',
    challenge: '',
    solution: '',
    thumbnail: '',
    images: [],
    technologies: [],
    results: [],
    duration: '',
    teamSize: '',
    projectUrl: '',
    completedDate: '',
    status: 'DRAFT',
    featured: false,
    translations: LOCALES.map(l => ({
        locale: l.code,
        name: '',
        description: '',
        fullDescription: '',
        challenge: '',
        solution: '',
    })),
});

// ─── Project Edit Modal ──────────────────────────────────────────────
function ProjectEditModal({
    title,
    data,
    onChange,
    onSave,
    onClose,
    isSaving,
}: {
    title: string;
    data: ProjectFormData;
    onChange: (data: ProjectFormData) => void;
    onSave: () => void;
    onClose: () => void;
    isSaving: boolean;
}) {
    const [activeTab, setActiveTab] = useState('basic');
    const [activeTransLocale, setActiveTransLocale] = useState('tr');

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: <CubeIcon className="w-4 h-4" /> },
        { id: 'content', label: 'Content', icon: <DocumentTextIcon className="w-4 h-4" /> },
        { id: 'media', label: 'Media & Tech', icon: <PhotoIcon className="w-4 h-4" /> },
        { id: 'results', label: 'Results', icon: <ChartBarIcon className="w-4 h-4" /> },
        { id: 'translations', label: 'Translations', icon: <LanguageIcon className="w-4 h-4" /> },
    ];

    const updateTranslation = (locale: string, field: string, value: string) => {
        onChange({
            ...data,
            translations: data.translations.map(t =>
                t.locale === locale ? { ...t, [field]: value } : t
            ),
        });
    };

    return (
        <TabbedModal
            title={title}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={onClose}
            onSave={onSave}
            isSaving={isSaving}
            saveDisabled={!data.name.trim()}
            footer={
                activeTab === 'translations' ? (
                    <span>{data.translations.filter(t => t.name).length} of {LOCALES.length} translations started</span>
                ) : undefined
            }
        >
            {/* Tab 1: Basic Info */}
            {activeTab === 'basic' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => onChange({
                                    ...data,
                                    name: e.target.value,
                                    slug: data.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                                })}
                                placeholder="e.g., E-Commerce Platform"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                            <input
                                type="text"
                                value={data.client}
                                onChange={(e) => onChange({ ...data, client: e.target.value })}
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
                                value={data.slug}
                                onChange={(e) => onChange({ ...data, slug: e.target.value })}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => onChange({ ...data, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                {categories.filter(c => c !== 'All').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                            <input
                                type="text"
                                value={data.industry}
                                onChange={(e) => onChange({ ...data, industry: e.target.value })}
                                placeholder="e.g., Healthcare, Finance"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => onChange({ ...data, status: e.target.value as Project['status'] })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                            <input
                                type="url"
                                value={data.projectUrl}
                                onChange={(e) => onChange({ ...data, projectUrl: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Completed Date</label>
                            <input
                                type="date"
                                value={data.completedDate}
                                onChange={(e) => onChange({ ...data, completedDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                value={data.duration}
                                onChange={(e) => onChange({ ...data, duration: e.target.value })}
                                placeholder="e.g., 3 months"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                            <input
                                type="text"
                                value={data.teamSize}
                                onChange={(e) => onChange({ ...data, teamSize: e.target.value })}
                                placeholder="e.g., 5 developers"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.featured}
                            onChange={(e) => onChange({ ...data, featured: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">Featured project</span>
                    </label>
                </div>
            )}

            {/* Tab 2: Content */}
            {activeTab === 'content' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => onChange({ ...data, description: e.target.value })}
                            rows={3}
                            placeholder="Brief overview shown on project cards..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                        <textarea
                            value={data.fullDescription}
                            onChange={(e) => onChange({ ...data, fullDescription: e.target.value })}
                            rows={6}
                            placeholder="Detailed project description..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Challenge</label>
                        <textarea
                            value={data.challenge}
                            onChange={(e) => onChange({ ...data, challenge: e.target.value })}
                            rows={4}
                            placeholder="What challenge did the client face?"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                        <textarea
                            value={data.solution}
                            onChange={(e) => onChange({ ...data, solution: e.target.value })}
                            rows={4}
                            placeholder="How did you solve it?"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>
            )}

            {/* Tab 3: Media & Tech */}
            {activeTab === 'media' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={data.thumbnail}
                            onChange={(e) => onChange({ ...data, thumbnail: e.target.value })}
                            placeholder="https://example.com/thumbnail.jpg"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        {data.thumbnail && (
                            <div className="mt-2 relative aspect-video max-w-xs rounded-lg overflow-hidden bg-gray-100">
                                <img src={data.thumbnail} alt="Thumbnail preview" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>

                    <ArrayEditor
                        label="Gallery Images (URLs)"
                        items={data.images}
                        onChange={(images) => onChange({ ...data, images })}
                        placeholder="https://example.com/image.jpg"
                    />

                    <TagInput
                        label="Technologies"
                        tags={data.technologies}
                        onChange={(technologies) => onChange({ ...data, technologies })}
                        placeholder="Add technology..."
                        suggestions={TECH_SUGGESTIONS}
                    />
                </div>
            )}

            {/* Tab 4: Results */}
            {activeTab === 'results' && (
                <div>
                    <ResultsEditor
                        label="Project Results"
                        items={data.results}
                        onChange={(results) => onChange({ ...data, results })}
                    />
                </div>
            )}

            {/* Tab 5: Translations */}
            {activeTab === 'translations' && (
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {LOCALES.map(locale => (
                            <button
                                key={locale.code}
                                onClick={() => setActiveTransLocale(locale.code)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    activeTransLocale === locale.code
                                        ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                                }`}
                            >
                                <span>{locale.flag}</span>
                                {locale.name}
                                {data.translations.find(t => t.locale === locale.code)?.name && (
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {LOCALES.map(locale => (
                        <div
                            key={locale.code}
                            className={activeTransLocale === locale.code ? 'space-y-4' : 'hidden'}
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <span className="text-lg">{locale.flag}</span>
                                <span>Translating to <strong>{locale.name}</strong></span>
                                {(locale.code === 'ar' || locale.code === 'ur') && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">RTL</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={data.translations.find(t => t.locale === locale.code)?.name || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'name', e.target.value)}
                                    placeholder={`Project name in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.description || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'description', e.target.value)}
                                    rows={3}
                                    placeholder={`Description in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.fullDescription || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'fullDescription', e.target.value)}
                                    rows={4}
                                    placeholder={`Full description in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Challenge</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.challenge || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'challenge', e.target.value)}
                                    rows={3}
                                    placeholder={`Challenge in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.solution || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'solution', e.target.value)}
                                    rows={3}
                                    placeholder={`Solution in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            {/* English Reference */}
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Reference: English Content</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p><strong>Name:</strong> {data.name || 'Not set'}</p>
                                    <p><strong>Description:</strong> {data.description || 'Not set'}</p>
                                    <details className="cursor-pointer">
                                        <summary className="text-emerald-600 hover:text-emerald-700">View challenge &amp; solution</summary>
                                        <div className="mt-2 space-y-2 text-xs">
                                            <p><strong>Challenge:</strong> {data.challenge || 'Not set'}</p>
                                            <p><strong>Solution:</strong> {data.solution || 'Not set'}</p>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </TabbedModal>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function ProjectsContentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [statusFilter, setStatusFilter] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');
    const [formData, setFormData] = useState<ProjectFormData>(emptyFormData());

    const { projects, pagination, isLoading, isError, error, mutate } = useProjects({
        search: searchTerm || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        limit: 50,
    });

    const {
        createProject,
        updateProject,
        deleteProject,
        saveProjectTranslations,
        isLoading: isMutating,
    } = useProjectMutations();

    const toggleFeatured = useCallback(async (project: Project) => {
        try {
            await updateProject(project.id, { featured: !project.featured });
            mutate();
        } catch {
            // error captured in hook
        }
    }, [updateProject, mutate]);

    const toggleStatus = useCallback(async (project: Project) => {
        const newStatus: Project['status'] = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        try {
            await updateProject(project.id, { status: newStatus });
            mutate();
        } catch {
            // error captured in hook
        }
    }, [updateProject, mutate]);

    const openEditModal = (project: Project) => {
        setFormData({
            name: project.name,
            slug: project.slug,
            client: project.client || '',
            category: project.category || 'Web App',
            industry: project.industry || '',
            description: project.description || '',
            fullDescription: project.fullDescription || '',
            challenge: project.challenge || '',
            solution: project.solution || '',
            thumbnail: project.thumbnail || '',
            images: project.images || [],
            technologies: project.technologies || [],
            results: (project.results as { metric: string; value: string }[]) || [],
            duration: project.duration || '',
            teamSize: project.teamSize || '',
            projectUrl: project.projectUrl || '',
            completedDate: project.completedDate || '',
            status: project.status,
            featured: project.featured,
            translations: LOCALES.map(l => {
                const existing = project.translations?.find(t => t.locale === l.code);
                return {
                    locale: l.code,
                    name: existing?.name ?? '',
                    description: existing?.description ?? '',
                    fullDescription: existing?.fullDescription ?? '',
                    challenge: existing?.challenge ?? '',
                    solution: existing?.solution ?? '',
                };
            }),
        });
        setShowEditModal(project.id);
    };

    const saveProject = async () => {
        if (!formData.name.trim()) return;

        const payload: Partial<Project> = {
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            client: formData.client || undefined,
            category: formData.category,
            industry: formData.industry || undefined,
            description: formData.description || undefined,
            fullDescription: formData.fullDescription || undefined,
            challenge: formData.challenge || undefined,
            solution: formData.solution || undefined,
            thumbnail: formData.thumbnail || undefined,
            images: formData.images.filter(Boolean),
            technologies: formData.technologies,
            results: formData.results.filter(r => r.metric),
            duration: formData.duration || undefined,
            teamSize: formData.teamSize || undefined,
            projectUrl: formData.projectUrl || undefined,
            completedDate: formData.completedDate || undefined,
            status: formData.status,
            featured: formData.featured,
        };

        try {
            let projectId: string;
            if (showEditModal) {
                await updateProject(showEditModal, payload);
                projectId = showEditModal;
            } else {
                const created = await createProject(payload);
                projectId = created.id;
            }

            // Save translations
            const translationsToSave = formData.translations
                .filter(t => t.name)
                .map(t => ({
                    locale: t.locale,
                    name: t.name,
                    description: t.description || undefined,
                    fullDescription: t.fullDescription || undefined,
                    challenge: t.challenge || undefined,
                    solution: t.solution || undefined,
                }));

            if (translationsToSave.length > 0) {
                await saveProjectTranslations(projectId, translationsToSave);
            }

            mutate();
            setShowEditModal(null);
            setShowAddModal(false);
            setFormData(emptyFormData());
        } catch {
            // error captured in hook
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id);
            mutate();
            setShowDeleteModal(null);
        } catch {
            // error captured in hook
        }
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-80 bg-gray-100 rounded animate-pulse mt-2" />
                    </div>
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mt-1" />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="aspect-video bg-gray-200 animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
                    <p className="text-gray-500 mt-1">Manage your portfolio projects and case studies.</p>
                </div>
                <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <XMarkIcon className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load projects</h3>
                    <p className="text-gray-500 mb-4">{error?.message || 'Something went wrong.'}</p>
                    <button onClick={() => mutate()} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Retry</button>
                </div>
            </div>
        );
    }

    const publishedCount = projects.filter(p => p.status === 'PUBLISHED').length;
    const featuredCount = projects.filter(p => p.featured).length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
                    <p className="text-gray-500 mt-1">Manage your portfolio projects and case studies.</p>
                </div>
                <button
                    onClick={() => { setFormData(emptyFormData()); setShowAddModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Project
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{pagination?.total ?? projects.length}</div>
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
                            <div className="text-2xl font-bold text-purple-600">{featuredCount}</div>
                            <div className="text-sm text-gray-500">Featured</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <StarIcon className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
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
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>{cat}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
                        <button onClick={() => setStatusFilter('PUBLISHED')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Published</button>
                        <button onClick={() => setStatusFilter('DRAFT')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'DRAFT' ? 'bg-yellow-100 text-yellow-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Drafts</button>
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button onClick={() => setViewMode('gallery')} className={`p-2 rounded-md transition-colors ${viewMode === 'gallery' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery View */}
            {viewMode === 'gallery' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-blue-500">
                                {project.thumbnail ? (
                                    <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">{project.name.charAt(0)}</div>
                                )}
                                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1">
                                    {project.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900"><StarIcon className="w-3 h-3" />Featured</span>
                                    )}
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {project.status === 'PUBLISHED' ? 'Published' : project.status === 'DRAFT' ? 'Draft' : 'Archived'}
                                    </span>
                                </div>
                                {project.category && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white">{project.category}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button onClick={() => openEditModal(project)} className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"><PencilIcon className="w-5 h-5" /></button>
                                    <button onClick={() => setShowDeleteModal(project.id)} className="p-3 bg-white/20 hover:bg-red-500/50 rounded-full text-white transition-colors"><TrashIcon className="w-5 h-5" /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                    {project.client && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500"><BuildingOfficeIcon className="w-4 h-4" />{project.client}</div>
                                    )}
                                </div>
                                {project.description && <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {project.technologies.slice(0, 4).map((tech, idx) => (
                                            <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{tech}</span>
                                        ))}
                                        {project.technologies.length > 4 && <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">+{project.technologies.length - 4}</span>}
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => toggleStatus(project)} className={`p-1.5 rounded-lg transition-colors ${project.status === 'PUBLISHED' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-50'}`}><EyeIcon className="w-4 h-4" /></button>
                                        <button onClick={() => toggleFeatured(project)} className={`p-1.5 rounded-lg transition-colors ${project.featured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`}><StarIcon className="w-4 h-4" /></button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><GlobeAltIcon className="w-4 h-4" /></a>}
                                        <button onClick={() => openEditModal(project)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><PencilIcon className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                                                {project.thumbnail ? <img src={project.thumbnail} alt="" className="w-full h-full object-cover rounded-lg" /> : project.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{project.name}</span>
                                                    {project.featured && <StarIcon className="w-4 h-4 text-yellow-500" />}
                                                </div>
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                                            <span key={idx} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">{tech}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.client && <div className="flex items-center gap-2"><BuildingOfficeIcon className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-600">{project.client}</span></div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.category && <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{project.category}</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleStatus(project)} className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${project.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}>
                                            {project.status === 'PUBLISHED' ? 'Published' : project.status === 'DRAFT' ? 'Draft' : 'Archived'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(project.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => toggleFeatured(project)} className={`p-1.5 rounded-lg transition-colors ${project.featured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`}><StarIcon className="w-4 h-4" /></button>
                                            <button onClick={() => openEditModal(project)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><PencilIcon className="w-4 h-4" /></button>
                                            <button onClick={() => setShowDeleteModal(project.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty state */}
            {projects.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || selectedCategory !== 'All' || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Get started by adding your first project.'}
                    </p>
                    {!searchTerm && selectedCategory === 'All' && statusFilter === 'all' && (
                        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            <PlusIcon className="w-5 h-5" />Add Project
                        </button>
                    )}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && (
                <ProjectEditModal
                    title="Add New Project"
                    data={formData}
                    onChange={setFormData}
                    onSave={saveProject}
                    onClose={() => { setShowAddModal(false); setFormData(emptyFormData()); }}
                    isSaving={isMutating}
                />
            )}
            {showEditModal && (
                <ProjectEditModal
                    title="Edit Project"
                    data={formData}
                    onChange={setFormData}
                    onSave={saveProject}
                    onClose={() => { setShowEditModal(null); setFormData(emptyFormData()); }}
                    isSaving={isMutating}
                />
            )}

            {/* Delete Confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl">
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <TrashIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Project</h3>
                            <p className="text-gray-500 text-center mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowDeleteModal(null)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                                <button onClick={() => handleDeleteProject(showDeleteModal)} disabled={isMutating} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">{isMutating ? 'Deleting...' : 'Delete'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
