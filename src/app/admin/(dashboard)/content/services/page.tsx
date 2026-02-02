'use client';

import { useState, useMemo, useRef } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    EyeSlashIcon,
    Bars3Icon,
    CheckIcon,
    XMarkIcon,
    ArrowsUpDownIcon,
    MagnifyingGlassIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
    CubeIcon,
    ListBulletIcon,
    QuestionMarkCircleIcon,
    LanguageIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useServices, useServiceMutations, type Service, type ServiceTranslation } from '@/hooks/admin/useServices';
import TabbedModal from '@/components/admin/forms/TabbedModal';
import ArrayEditor from '@/components/admin/forms/ArrayEditor';
import TagInput from '@/components/admin/forms/TagInput';
import StepBuilder from '@/components/admin/forms/StepBuilder';
import FAQBuilder from '@/components/admin/forms/FAQBuilder';
import MarkdownToolbar from '@/components/admin/forms/MarkdownToolbar';
import { MediaPicker } from '@/components/admin/media';

// ─── Gradient presets ───────────────────────────────────────────────
const GRADIENT_PRESETS = [
    { label: 'Emerald', value: 'from-emerald-400 to-emerald-600' },
    { label: 'Blue', value: 'from-blue-400 to-blue-600' },
    { label: 'Purple', value: 'from-purple-400 to-purple-600' },
    { label: 'Orange', value: 'from-orange-400 to-orange-600' },
    { label: 'Rose', value: 'from-rose-400 to-rose-600' },
    { label: 'Cyan', value: 'from-cyan-400 to-cyan-600' },
    { label: 'Amber', value: 'from-amber-400 to-amber-600' },
    { label: 'Indigo', value: 'from-indigo-400 to-indigo-600' },
];

const DEFAULT_GRADIENT = 'from-emerald-400 to-emerald-600';

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

// ─── Form data types ────────────────────────────────────────────────
interface ProcessStep {
    title: string;
    description: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface PortfolioItem {
    title: string;
    image: string;
}

interface ServiceFormData {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    fullDescription: string;
    heroImage: string;
    icon: string;
    status: 'active' | 'draft';
    featured: boolean;
    order: number;
    color: string;
    features: string[];
    benefits: string[];
    technologies: string[];
    process: ProcessStep[];
    faq: FAQItem[];
    portfolio: PortfolioItem[];
    translations: {
        locale: string;
        name: string;
        shortDescription: string;
        fullDescription: string;
        features: string[];
        benefits: string[];
        metaTitle: string;
        metaDescription: string;
    }[];
}

const emptyFormData = (): ServiceFormData => ({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    fullDescription: '',
    heroImage: '',
    icon: '',
    status: 'draft',
    featured: false,
    order: 1,
    color: DEFAULT_GRADIENT,
    features: [],
    benefits: [],
    technologies: [],
    process: [],
    faq: [],
    portfolio: [],
    translations: LOCALES.map(l => ({
        locale: l.code,
        name: '',
        shortDescription: '',
        fullDescription: '',
        features: [],
        benefits: [],
        metaTitle: '',
        metaDescription: '',
    })),
});

// ─── Loading Skeletons ──────────────────────────────────────────────
function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ListSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="px-6 py-4 border-t border-gray-200 animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-200" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3" />
                            <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Service Modal (Tabbed) ─────────────────────────────────────────
function ServiceEditModal({
    title,
    data,
    onChange,
    onSave,
    onClose,
    isSaving,
}: {
    title: string;
    data: ServiceFormData;
    onChange: (data: ServiceFormData) => void;
    onSave: () => void;
    onClose: () => void;
    isSaving: boolean;
}) {
    const [activeTab, setActiveTab] = useState('basic');
    const [activeTransLocale, setActiveTransLocale] = useState('tr');
    const fullDescRef = useRef<HTMLTextAreaElement>(null);

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: <CubeIcon className="w-4 h-4" /> },
        { id: 'content', label: 'Content', icon: <DocumentTextIcon className="w-4 h-4" /> },
        { id: 'features', label: 'Features & Benefits', icon: <ListBulletIcon className="w-4 h-4" /> },
        { id: 'process', label: 'Process & Tech', icon: <Bars3Icon className="w-4 h-4" /> },
        { id: 'faq', label: 'FAQ & Portfolio', icon: <QuestionMarkCircleIcon className="w-4 h-4" /> },
        { id: 'translations', label: 'Translations', icon: <LanguageIcon className="w-4 h-4" /> },
    ];

    const updateTranslation = (locale: string, field: string, value: unknown) => {
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => onChange({
                                    ...data,
                                    name: e.target.value,
                                    slug: data.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                                })}
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
                                    value={data.slug}
                                    onChange={(e) => onChange({ ...data, slug: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                            <input
                                type="text"
                                value={data.icon}
                                onChange={(e) => onChange({ ...data, icon: e.target.value })}
                                placeholder="e.g., code, cpu, cloud"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <input
                                type="number"
                                min={1}
                                value={data.order}
                                onChange={(e) => onChange({ ...data, order: parseInt(e.target.value) || 1 })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
                        <div className="grid grid-cols-4 gap-2">
                            {GRADIENT_PRESETS.map((preset) => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => onChange({ ...data, color: preset.value })}
                                    className={`relative h-10 rounded-lg bg-gradient-to-br ${preset.value} transition-all ${
                                        data.color === preset.value ? 'ring-2 ring-offset-2 ring-gray-900 scale-105' : 'hover:scale-105'
                                    }`}
                                    title={preset.label}
                                >
                                    {data.color === preset.value && (
                                        <CheckIcon className="w-4 h-4 text-white absolute inset-0 m-auto" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => onChange({ ...data, status: e.target.value as 'active' | 'draft' })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Published</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={(e) => onChange({ ...data, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm text-gray-700">Featured service</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 2: Content */}
            {activeTab === 'content' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            value={data.shortDescription}
                            onChange={(e) => onChange({ ...data, shortDescription: e.target.value })}
                            rows={3}
                            placeholder="Brief description shown on service cards..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Markdown)</label>
                        <MarkdownToolbar
                            textareaRef={fullDescRef}
                            value={data.fullDescription}
                            onChange={(val) => onChange({ ...data, fullDescription: val })}
                        />
                        <textarea
                            ref={fullDescRef}
                            value={data.fullDescription}
                            onChange={(e) => onChange({ ...data, fullDescription: e.target.value })}
                            rows={10}
                            placeholder="Detailed description of the service... (Markdown supported)"
                            className="w-full px-4 py-2 border border-gray-200 rounded-b-lg rounded-t-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm"
                        />
                    </div>
                    <MediaPicker
                        label="Hero Image"
                        value={data.heroImage}
                        onChange={(url) => onChange({ ...data, heroImage: url })}
                        placeholder="No hero image selected"
                    />
                </div>
            )}

            {/* Tab 3: Features & Benefits */}
            {activeTab === 'features' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ArrayEditor
                        label="Features"
                        items={data.features}
                        onChange={(features) => onChange({ ...data, features })}
                        placeholder="Enter a feature..."
                    />
                    <ArrayEditor
                        label="Benefits"
                        items={data.benefits}
                        onChange={(benefits) => onChange({ ...data, benefits })}
                        placeholder="Enter a benefit..."
                    />
                </div>
            )}

            {/* Tab 4: Process & Tech */}
            {activeTab === 'process' && (
                <div className="space-y-6">
                    <StepBuilder
                        label="Process Steps"
                        steps={data.process}
                        onChange={(process) => onChange({ ...data, process })}
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

            {/* Tab 5: FAQ & Portfolio */}
            {activeTab === 'faq' && (
                <div className="space-y-6">
                    <FAQBuilder
                        label="FAQ Items"
                        items={data.faq}
                        onChange={(faq) => onChange({ ...data, faq })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Items</label>
                        <div className="space-y-3">
                            {data.portfolio.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => {
                                                const updated = [...data.portfolio];
                                                updated[index] = { ...updated[index], title: e.target.value };
                                                onChange({ ...data, portfolio: updated });
                                            }}
                                            placeholder="Project title..."
                                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                        <MediaPicker
                                            value={item.image}
                                            onChange={(url) => {
                                                const updated = [...data.portfolio];
                                                updated[index] = { ...updated[index], image: url };
                                                onChange({ ...data, portfolio: updated });
                                            }}
                                            placeholder="No image"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onChange({ ...data, portfolio: data.portfolio.filter((_, i) => i !== index) })}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => onChange({ ...data, portfolio: [...data.portfolio, { title: '', image: '' }] })}
                            className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add portfolio item
                        </button>
                    </div>
                </div>
            )}

            {/* Tab 6: Translations */}
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

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={data.translations.find(t => t.locale === locale.code)?.name || ''}
                                        onChange={(e) => updateTranslation(locale.code, 'name', e.target.value)}
                                        placeholder={`Service name in ${locale.name}`}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.translations.find(t => t.locale === locale.code)?.metaTitle || ''}
                                        onChange={(e) => updateTranslation(locale.code, 'metaTitle', e.target.value)}
                                        placeholder="SEO title"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.shortDescription || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'shortDescription', e.target.value)}
                                    rows={2}
                                    placeholder={`Short description in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                                <textarea
                                    value={data.translations.find(t => t.locale === locale.code)?.fullDescription || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'fullDescription', e.target.value)}
                                    rows={6}
                                    placeholder={`Full description in ${locale.name}`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                <input
                                    type="text"
                                    value={data.translations.find(t => t.locale === locale.code)?.metaDescription || ''}
                                    onChange={(e) => updateTranslation(locale.code, 'metaDescription', e.target.value)}
                                    placeholder="SEO description"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    dir={locale.code === 'ar' || locale.code === 'ur' ? 'rtl' : 'ltr'}
                                />
                            </div>

                            <ArrayEditor
                                label={`Features (${locale.name})`}
                                items={data.translations.find(t => t.locale === locale.code)?.features || []}
                                onChange={(features) => updateTranslation(locale.code, 'features', features)}
                                placeholder={`Feature in ${locale.name}`}
                            />

                            <ArrayEditor
                                label={`Benefits (${locale.name})`}
                                items={data.translations.find(t => t.locale === locale.code)?.benefits || []}
                                onChange={(benefits) => updateTranslation(locale.code, 'benefits', benefits)}
                                placeholder={`Benefit in ${locale.name}`}
                            />

                            {/* English Reference */}
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Reference: English Content</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p><strong>Name:</strong> {data.name || 'Not set'}</p>
                                    <p><strong>Short:</strong> {data.shortDescription || 'Not set'}</p>
                                    <details className="cursor-pointer">
                                        <summary className="text-emerald-600 hover:text-emerald-700">View full description</summary>
                                        <pre className="mt-2 p-2 bg-white rounded border text-xs overflow-auto max-h-40">{data.fullDescription || 'Not set'}</pre>
                                    </details>
                                    {data.features.length > 0 && (
                                        <div>
                                            <strong>Features:</strong>
                                            <ul className="list-disc list-inside text-xs mt-1">
                                                {data.features.map((f, i) => <li key={i}>{f}</li>)}
                                            </ul>
                                        </div>
                                    )}
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
export default function ServicesContentPage() {
    // Filters & UI state
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'order' | 'name' | 'updatedAt'>('order');

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState<Service | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    // Bulk selection
    const [bulkMode, setBulkMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Drag-and-drop
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<ServiceFormData>(emptyFormData());

    // ─── Data hooks ──────────────────────────────────────────────────
    const { services, isLoading, isError, error, mutate } = useServices({
        limit: 100,
        sortBy: sortBy,
        sortOrder: sortBy === 'name' ? 'asc' : sortBy === 'updatedAt' ? 'desc' : 'asc',
    });

    const {
        createService,
        updateService,
        deleteService: deleteServiceApi,
        reorderServices,
        saveServiceTranslations,
        isLoading: isMutating,
    } = useServiceMutations();

    // ─── Client-side filtering ───────────────────────────────────────
    const filteredServices = useMemo(() => {
        return (services ?? [])
            .filter((service) => {
                const matchesSearch =
                    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (service.description ?? '').toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'name': return a.name.localeCompare(b.name);
                    case 'updatedAt': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                    default: return a.order - b.order;
                }
            });
    }, [services, searchTerm, statusFilter, sortBy]);

    // ─── Computed stats ──────────────────────────────────────────────
    const allServices = services ?? [];
    const publishedCount = allServices.filter((s) => s.status === 'active').length;
    const draftCount = allServices.filter((s) => s.status === 'draft').length;
    const featuredCount = allServices.filter((s) => s.featured).length;

    // ─── Handlers ────────────────────────────────────────────────────
    const toggleStatus = async (service: Service) => {
        const newStatus = service.status === 'active' ? 'draft' : 'active';
        try {
            await updateService(service.id, { status: newStatus });
            mutate();
        } catch (err) {
            console.error('Failed to toggle status:', err);
        }
    };

    const toggleFeatured = async (service: Service) => {
        try {
            await updateService(service.id, { featured: !service.featured });
            mutate();
        } catch (err) {
            console.error('Failed to toggle featured:', err);
        }
    };

    const openEditModal = (service: Service) => {
        const content = (service.content ?? {}) as Record<string, unknown>;
        setFormData({
            name: service.name,
            slug: service.slug,
            description: service.description ?? '',
            shortDescription: service.shortDescription ?? '',
            fullDescription: service.fullDescription ?? '',
            heroImage: service.heroImage ?? '',
            icon: service.icon ?? '',
            status: service.status as 'active' | 'draft',
            featured: service.featured,
            order: service.order,
            color: service.color ?? DEFAULT_GRADIENT,
            features: service.features ?? [],
            benefits: service.benefits ?? [],
            technologies: (content.technologies as string[]) ?? [],
            process: (content.process as ProcessStep[]) ?? [],
            faq: (content.faq as FAQItem[]) ?? [],
            portfolio: (content.portfolio as PortfolioItem[]) ?? [],
            translations: LOCALES.map(l => {
                const existing = service.translations?.find(t => t.locale === l.code);
                return {
                    locale: l.code,
                    name: existing?.name ?? '',
                    shortDescription: existing?.shortDescription ?? '',
                    fullDescription: existing?.fullDescription ?? '',
                    features: existing?.features ?? [],
                    benefits: existing?.benefits ?? [],
                    metaTitle: existing?.metaTitle ?? '',
                    metaDescription: existing?.metaDescription ?? '',
                };
            }),
        });
        setShowEditModal(service);
    };

    const openAddModal = () => {
        setFormData({ ...emptyFormData(), order: allServices.length + 1 });
        setShowAddModal(true);
    };

    const saveModal = async () => {
        if (!formData.name.trim()) return;

        const servicePayload: Partial<Service> = {
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            description: formData.shortDescription || formData.description,
            shortDescription: formData.shortDescription,
            fullDescription: formData.fullDescription,
            heroImage: formData.heroImage || undefined,
            icon: formData.icon || undefined,
            status: formData.status,
            featured: formData.featured,
            order: formData.order,
            color: formData.color,
            features: formData.features.filter(Boolean),
            benefits: formData.benefits.filter(Boolean),
            content: {
                technologies: formData.technologies,
                process: formData.process.filter(s => s.title),
                faq: formData.faq.filter(f => f.question),
                portfolio: formData.portfolio.filter(p => p.title),
            },
        };

        try {
            let serviceId: string;
            if (showEditModal) {
                await updateService(showEditModal.id, servicePayload);
                serviceId = showEditModal.id;
            } else {
                const created = await createService(servicePayload);
                serviceId = created.id;
            }

            // Save translations
            const translationsToSave = formData.translations
                .filter(t => t.name)
                .map(t => ({
                    locale: t.locale,
                    name: t.name,
                    shortDescription: t.shortDescription || undefined,
                    fullDescription: t.fullDescription || undefined,
                    features: t.features.filter(Boolean),
                    benefits: t.benefits.filter(Boolean),
                    metaTitle: t.metaTitle || undefined,
                    metaDescription: t.metaDescription || undefined,
                }));

            if (translationsToSave.length > 0) {
                await saveServiceTranslations(serviceId, translationsToSave);
            }

            mutate();
            setShowEditModal(null);
            setShowAddModal(false);
            setFormData(emptyFormData());
        } catch (err) {
            console.error('Failed to save service:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteServiceApi(id);
            mutate();
            setShowDeleteModal(null);
        } catch (err) {
            console.error('Failed to delete service:', err);
        }
    };

    // ─── Drag and drop with persistence ──────────────────────────────
    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverId(targetId);
    };

    const handleDrop = async (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        setDragOverId(null);
        if (!draggedId || draggedId === targetId) {
            setDraggedId(null);
            return;
        }

        const items = [...filteredServices];
        const fromIdx = items.findIndex((s) => s.id === draggedId);
        const toIdx = items.findIndex((s) => s.id === targetId);
        if (fromIdx === -1 || toIdx === -1) return;

        const [moved] = items.splice(fromIdx, 1);
        items.splice(toIdx, 0, moved);

        const orders = items.map((s, i) => ({ id: s.id, order: i + 1 }));
        setDraggedId(null);

        try {
            await reorderServices(orders);
            mutate();
        } catch (err) {
            console.error('Failed to reorder:', err);
        }
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverId(null);
    };

    // ─── Bulk actions ────────────────────────────────────────────────
    const toggleSelectAll = () => {
        if (selectedIds.size === filteredServices.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredServices.map((s) => s.id)));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const bulkAction = async (action: 'publish' | 'draft' | 'delete' | 'feature' | 'unfeature') => {
        if (selectedIds.size === 0) return;
        const ids = Array.from(selectedIds);

        try {
            for (const id of ids) {
                switch (action) {
                    case 'publish': await updateService(id, { status: 'active' }); break;
                    case 'draft': await updateService(id, { status: 'draft' }); break;
                    case 'delete': await deleteServiceApi(id); break;
                    case 'feature': await updateService(id, { featured: true }); break;
                    case 'unfeature': await updateService(id, { featured: false }); break;
                }
            }
            mutate();
            setSelectedIds(new Set());
            setBulkMode(false);
        } catch (err) {
            console.error('Bulk action failed:', err);
        }
    };

    const exitBulkMode = () => {
        setBulkMode(false);
        setSelectedIds(new Set());
    };

    // ─── Format helpers ──────────────────────────────────────────────
    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const statusLabel = (s: string) => (s === 'active' ? 'published' : s);
    const getGradient = (service: Service) => service.color || DEFAULT_GRADIENT;

    // ─── Render ──────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
                    <p className="text-gray-500 mt-1">Manage your service pages, content, and visibility.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => bulkMode ? exitBulkMode() : setBulkMode(true)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            bulkMode ? 'bg-gray-900 text-white border-gray-900' : 'text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {bulkMode ? 'Cancel Selection' : 'Select'}
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Service
                    </button>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {bulkMode && selectedIds.size > 0 && (
                <div className="flex items-center gap-3 bg-gray-900 text-white rounded-xl px-5 py-3">
                    <span className="text-sm font-medium">{selectedIds.size} selected</span>
                    <div className="h-4 w-px bg-gray-600" />
                    <button onClick={() => bulkAction('publish')} className="px-3 py-1 text-sm bg-emerald-600 rounded-lg hover:bg-emerald-700">Publish</button>
                    <button onClick={() => bulkAction('draft')} className="px-3 py-1 text-sm bg-yellow-600 rounded-lg hover:bg-yellow-700">Draft</button>
                    <button onClick={() => bulkAction('feature')} className="px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-700">Feature</button>
                    <button onClick={() => bulkAction('unfeature')} className="px-3 py-1 text-sm bg-gray-600 rounded-lg hover:bg-gray-700">Unfeature</button>
                    <button onClick={() => bulkAction('delete')} className="px-3 py-1 text-sm bg-red-600 rounded-lg hover:bg-red-700">Delete</button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{allServices.length}</div>
                            <div className="text-sm text-gray-500">Total Services</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Bars3Icon className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs">
                        <span className="text-emerald-600">{publishedCount} published</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-yellow-600">{draftCount} drafts</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{publishedCount}</div>
                            <div className="text-sm text-gray-500">Published</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <EyeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Live on your website</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">{featuredCount}</div>
                            <div className="text-sm text-gray-500">Featured</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                            <StarIcon className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Highlighted on homepage</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{draftCount}</div>
                            <div className="text-sm text-gray-500">Drafts</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <EyeSlashIcon className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Not yet visible to visitors</div>
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
                        <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
                        <button onClick={() => setStatusFilter('active')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'active' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Published</button>
                        <button onClick={() => setStatusFilter('draft')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === 'draft' ? 'bg-yellow-100 text-yellow-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Drafts</button>
                    </div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                        <option value="order">Sort by Order</option>
                        <option value="name">Sort by Name</option>
                        <option value="updatedAt">Sort by Updated</option>
                    </select>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Drag hint */}
            {sortBy === 'order' && !isLoading && !bulkMode && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
                    <ArrowsUpDownIcon className="w-4 h-4 text-blue-500" />
                    <span>Drag and drop services to reorder them. Changes are saved automatically.</span>
                </div>
            )}

            {/* Error state */}
            {isError && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                        <p className="font-medium text-red-800">Failed to load services</p>
                        <p className="text-sm text-red-600">{error?.message ?? 'An unexpected error occurred.'}</p>
                    </div>
                    <button onClick={() => mutate()} className="ml-auto px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">Retry</button>
                </div>
            )}

            {/* Loading state */}
            {isLoading && viewMode === 'grid' && <GridSkeleton />}
            {isLoading && viewMode === 'list' && <ListSkeleton />}

            {/* Empty state */}
            {!isLoading && !isError && filteredServices.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                    <Bars3Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No services found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters.' : 'Get started by adding your first service.'}
                    </p>
                    {!searchTerm && statusFilter === 'all' && (
                        <button onClick={openAddModal} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            Add Service
                        </button>
                    )}
                </div>
            )}

            {/* Services Grid View */}
            {!isLoading && viewMode === 'grid' && filteredServices.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bulkMode && (
                        <div className="col-span-full flex items-center gap-2 mb-2">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                                <input type="checkbox" checked={selectedIds.size === filteredServices.length && filteredServices.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-emerald-600" />
                                Select all ({filteredServices.length})
                            </label>
                        </div>
                    )}
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            draggable={sortBy === 'order' && !bulkMode}
                            onDragStart={(e) => handleDragStart(e, service.id)}
                            onDragOver={(e) => handleDragOver(e, service.id)}
                            onDrop={(e) => handleDrop(e, service.id)}
                            onDragEnd={handleDragEnd}
                            className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all ${
                                draggedId === service.id ? 'opacity-50 scale-95' : ''
                            } ${dragOverId === service.id && draggedId !== service.id ? 'border-emerald-400 shadow-emerald-100 shadow-lg' : 'border-gray-200'}
                            ${sortBy === 'order' && !bulkMode ? 'cursor-grab active:cursor-grabbing' : ''}
                            ${bulkMode && selectedIds.has(service.id) ? 'ring-2 ring-emerald-500' : ''}`}
                        >
                            <div className={`relative aspect-video bg-gradient-to-br ${getGradient(service)}`}>
                                {bulkMode && (
                                    <div className="absolute top-2 right-2 z-10">
                                        <input type="checkbox" checked={selectedIds.has(service.id)} onChange={() => toggleSelect(service.id)} className="w-5 h-5 rounded border-white text-emerald-600 cursor-pointer" />
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl font-bold">{service.name.charAt(0)}</div>
                                <div className="absolute top-2 left-2 flex items-center gap-1">
                                    {service.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-400 text-yellow-900">
                                            <StarIcon className="w-3 h-3" />Featured
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {statusLabel(service.status)}
                                    </span>
                                </div>
                                {sortBy === 'order' && (
                                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">{service.order}</div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{service.shortDescription || service.description}</p>
                                <p className="text-xs text-gray-400 font-mono mb-3">/services/{service.slug}</p>
                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-gray-900">#{service.order}</div>
                                        <div className="text-xs text-gray-500">Order</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-sm font-semibold ${service.status === 'active' ? 'text-emerald-600' : 'text-yellow-600'}`}>{statusLabel(service.status)}</div>
                                        <div className="text-xs text-gray-500">Status</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-purple-600">{service.featured ? 'Yes' : 'No'}</div>
                                        <div className="text-xs text-gray-500">Featured</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => toggleStatus(service)} disabled={isMutating} className={`p-1.5 rounded-lg transition-colors ${service.status === 'active' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-50'}`} title={service.status === 'active' ? 'Unpublish' : 'Publish'}>
                                            {service.status === 'active' ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                                        </button>
                                        <button onClick={() => toggleFeatured(service)} disabled={isMutating} className={`p-1.5 rounded-lg transition-colors ${service.featured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`} title={service.featured ? 'Remove from featured' : 'Add to featured'}>
                                            <StarIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => openEditModal(service)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setShowDeleteModal(service.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Services List View */}
            {!isLoading && viewMode === 'list' && filteredServices.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {bulkMode && (
                                    <th className="px-4 py-3 w-10">
                                        <input type="checkbox" checked={selectedIds.size === filteredServices.length && filteredServices.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-emerald-600" />
                                    </th>
                                )}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr
                                    key={service.id}
                                    className={`hover:bg-gray-50 ${draggedId === service.id ? 'opacity-50' : ''} ${dragOverId === service.id && draggedId !== service.id ? 'bg-emerald-50' : ''} ${bulkMode && selectedIds.has(service.id) ? 'bg-emerald-50/50' : ''}`}
                                    draggable={sortBy === 'order' && !bulkMode}
                                    onDragStart={(e) => handleDragStart(e, service.id)}
                                    onDragOver={(e) => handleDragOver(e, service.id)}
                                    onDrop={(e) => handleDrop(e, service.id)}
                                    onDragEnd={handleDragEnd}
                                >
                                    {bulkMode && (
                                        <td className="px-4 py-4">
                                            <input type="checkbox" checked={selectedIds.has(service.id)} onChange={() => toggleSelect(service.id)} className="w-4 h-4 rounded border-gray-300 text-emerald-600" />
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {sortBy === 'order' && !bulkMode && <Bars3Icon className="w-4 h-4 text-gray-400 cursor-grab" />}
                                            <span className="text-sm text-gray-500">{service.order}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getGradient(service)} flex items-center justify-center text-white font-bold`}>{service.name.charAt(0)}</div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{service.name}</span>
                                                    {service.featured && <StarIcon className="w-4 h-4 text-yellow-500" />}
                                                </div>
                                                <span className="text-xs text-gray-500 font-mono">/services/{service.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleStatus(service)} disabled={isMutating} className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${service.status === 'active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}>
                                            {service.status === 'active' ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                                            {statusLabel(service.status)}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleFeatured(service)} disabled={isMutating} className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${service.featured ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                            <StarIcon className="w-3 h-3" />{service.featured ? 'Featured' : 'No'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{service.icon ?? '--'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(service.updatedAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openEditModal(service)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Edit"><PencilIcon className="w-4 h-4" /></button>
                                            <button onClick={() => setShowDeleteModal(service.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Service Modal */}
            {showAddModal && (
                <ServiceEditModal
                    title="Add New Service"
                    data={formData}
                    onChange={setFormData}
                    onSave={saveModal}
                    onClose={() => { setShowAddModal(false); setFormData(emptyFormData()); }}
                    isSaving={isMutating}
                />
            )}
            {showEditModal && (
                <ServiceEditModal
                    title="Edit Service"
                    data={formData}
                    onChange={setFormData}
                    onSave={saveModal}
                    onClose={() => { setShowEditModal(null); setFormData(emptyFormData()); }}
                    isSaving={isMutating}
                />
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
                            <p className="text-gray-500 text-center mb-6">Are you sure you want to delete this service? This action cannot be undone and all associated pages will be removed.</p>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowDeleteModal(null)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                                <button onClick={() => handleDelete(showDeleteModal)} disabled={isMutating} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">{isMutating ? 'Deleting...' : 'Delete'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
