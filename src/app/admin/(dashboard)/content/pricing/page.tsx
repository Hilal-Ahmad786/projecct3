'use client';

import { useState, useMemo } from 'react';
import {
    PencilIcon,
    TrashIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    TagIcon,
    ClipboardDocumentListIcon,
    DocumentDuplicateIcon,
    TableCellsIcon,
} from '@heroicons/react/24/outline';
import { usePricingPackages, usePricingMutations } from '@/hooks/admin/usePricing';
import { useServices } from '@/hooks/admin/useServices';

interface PricingPackageWithService {
    id: string;
    serviceId: string;
    tier: string;
    name: string;
    price: string;
    description?: string;
    features?: string[];
    highlighted?: boolean;
    billingPeriod?: string;
    yearlyPrice?: string;
    ctaText?: string;
    service: { id: string; name: string; slug: string };
    createdAt: string;
    updatedAt: string;
}

const TIER_OPTIONS = ['starter', 'professional', 'enterprise'];

export default function PricingManagementPage() {
    const [selectedService, setSelectedService] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [billingView, setBillingView] = useState<'monthly' | 'yearly'>('monthly');

    const { services, isLoading: servicesLoading } = useServices({ limit: 100, sortBy: 'name', sortOrder: 'asc' });
    const selectedServiceId = selectedService === 'all'
        ? undefined
        : services.find(s => s.slug === selectedService)?.id;

    const {
        packages: rawPackages,
        isLoading: packagesLoading,
        isError,
        error: fetchError,
        mutate,
    } = usePricingPackages(selectedServiceId);

    const packages = rawPackages as unknown as PricingPackageWithService[];

    const {
        createPackage,
        updatePackage,
        deletePackage: deletePackageMutation,
        duplicatePackage,
        isLoading: mutationLoading,
    } = usePricingMutations();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingPackage, setEditingPackage] = useState<Partial<PricingPackageWithService>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [customTierMode, setCustomTierMode] = useState(false);
    const [editCustomTierMode, setEditCustomTierMode] = useState(false);
    const [newPackage, setNewPackage] = useState({
        serviceId: '',
        tier: 'starter',
        name: '',
        price: '',
        description: '',
        features: [''],
        highlighted: false,
        billingPeriod: 'monthly',
        yearlyPrice: '',
        ctaText: '',
    });

    // Group packages by service name
    const groupedPackages = useMemo(() => {
        return packages.reduce((acc, pkg) => {
            const serviceName = pkg.service?.name || 'Unknown';
            if (!acc[serviceName]) acc[serviceName] = [];
            acc[serviceName].push(pkg);
            return acc;
        }, {} as Record<string, PricingPackageWithService[]>);
    }, [packages]);

    const totalPackages = packages.length;
    const uniqueServices = new Set(packages.map(p => p.service?.slug)).size;

    // ─── Editing helpers ─────────────────────────────────────────────
    const startEditing = (pkg: PricingPackageWithService) => {
        setEditingId(pkg.id);
        setEditingPackage({ ...pkg });
        setEditCustomTierMode(!TIER_OPTIONS.includes(pkg.tier));
    };

    const saveEditing = async () => {
        if (editingId && editingPackage) {
            try {
                await updatePackage(editingId, {
                    name: editingPackage.name,
                    price: editingPackage.price as unknown as number,
                    description: editingPackage.description,
                    features: editingPackage.features,
                    highlighted: editingPackage.highlighted,
                    tier: editingPackage.tier,
                    billingPeriod: editingPackage.billingPeriod,
                    yearlyPrice: editingPackage.yearlyPrice,
                    ctaText: editingPackage.ctaText,
                });
                await mutate();
                setEditingId(null);
                setEditingPackage({});
                setEditCustomTierMode(false);
            } catch {
                // error handled by mutation hook
            }
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingPackage({});
        setEditCustomTierMode(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this package?')) return;
        try {
            await deletePackageMutation(id);
            await mutate();
        } catch {
            // error handled by mutation hook
        }
    };

    const handleDuplicate = async (id: string) => {
        try {
            await duplicatePackage(id);
            await mutate();
        } catch {
            // error handled by mutation hook
        }
    };

    const toggleHighlighted = async (pkg: PricingPackageWithService) => {
        try {
            await updatePackage(pkg.id, { highlighted: !pkg.highlighted });
            await mutate();
        } catch {
            // error handled by mutation hook
        }
    };

    // ─── Feature list helpers ────────────────────────────────────────
    const addFeature = () => {
        setNewPackage(prev => ({ ...prev, features: [...prev.features, ''] }));
    };
    const updateFeature = (index: number, value: string) => {
        setNewPackage(prev => {
            const features = [...prev.features];
            features[index] = value;
            return { ...prev, features };
        });
    };
    const removeFeature = (index: number) => {
        setNewPackage(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    };

    const addEditFeature = () => {
        setEditingPackage(prev => ({ ...prev, features: [...(prev.features || []), ''] }));
    };
    const updateEditFeature = (index: number, value: string) => {
        setEditingPackage(prev => {
            const features = [...(prev.features || [])];
            features[index] = value;
            return { ...prev, features };
        });
    };
    const removeEditFeature = (index: number) => {
        setEditingPackage(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    };

    // ─── Add new package ─────────────────────────────────────────────
    const addNewPackage = async () => {
        if (!newPackage.serviceId || !newPackage.name || !newPackage.price) return;
        try {
            await createPackage({
                serviceId: newPackage.serviceId,
                tier: newPackage.tier,
                name: newPackage.name,
                price: newPackage.price as unknown as number,
                description: newPackage.description || undefined,
                features: newPackage.features.filter(f => f.trim() !== ''),
                highlighted: newPackage.highlighted,
                billingPeriod: newPackage.billingPeriod,
                yearlyPrice: newPackage.yearlyPrice || undefined,
                ctaText: newPackage.ctaText || undefined,
            });
            await mutate();
            setNewPackage({
                serviceId: '', tier: 'starter', name: '', price: '', description: '',
                features: [''], highlighted: false, billingPeriod: 'monthly', yearlyPrice: '', ctaText: '',
            });
            setCustomTierMode(false);
            setShowAddModal(false);
        } catch {
            // error handled by mutation hook
        }
    };

    // ─── Savings calculation ─────────────────────────────────────────
    const getSavingsPercent = (monthlyStr: string, yearlyStr: string) => {
        const monthly = parseFloat(monthlyStr.replace(/[^0-9.]/g, ''));
        const yearly = parseFloat(yearlyStr.replace(/[^0-9.]/g, ''));
        if (!monthly || !yearly || yearly >= monthly * 12) return null;
        const savings = Math.round((1 - yearly / (monthly * 12)) * 100);
        return savings > 0 ? savings : null;
    };

    const getDisplayPrice = (pkg: PricingPackageWithService) => {
        if (billingView === 'yearly' && pkg.yearlyPrice) return pkg.yearlyPrice;
        return pkg.price;
    };

    const getBillingLabel = (pkg: PricingPackageWithService) => {
        if (billingView === 'yearly' && pkg.yearlyPrice) return '/year';
        if (pkg.billingPeriod === 'yearly') return '/year';
        return '/month';
    };

    const isLoading = packagesLoading || servicesLoading;

    // ─── Loading skeleton ────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-80 bg-gray-100 rounded animate-pulse mt-2" />
                    </div>
                    <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mt-1" />
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="p-6">
                            <div className="grid md:grid-cols-3 gap-4">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="p-4 rounded-xl border-2 border-gray-200 space-y-3">
                                        <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // ─── Error state ─────────────────────────────────────────────────
    if (isError) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
                        <p className="text-gray-500 mt-1">Manage pricing packages for all services.</p>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-medium">Failed to load pricing packages</p>
                    <p className="text-red-500 text-sm mt-1">{fetchError?.message || 'An unexpected error occurred.'}</p>
                    <button
                        onClick={() => mutate()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ─── Tier select component ───────────────────────────────────────
    const TierSelect = ({
        value,
        onChange,
        isCustom,
        onToggleCustom,
    }: {
        value: string;
        onChange: (v: string) => void;
        isCustom: boolean;
        onToggleCustom: (v: boolean) => void;
    }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tier *</label>
            {isCustom ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Custom tier name"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => { onToggleCustom(false); onChange('starter'); }}
                        className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        Presets
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                    >
                        <option value="starter">Starter</option>
                        <option value="professional">Professional</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => { onToggleCustom(true); onChange(''); }}
                        className="px-3 py-2 text-sm text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50"
                    >
                        Custom
                    </button>
                </div>
            )}
        </div>
    );

    // ─── Comparison Table View ───────────────────────────────────────
    const ComparisonTable = ({ serviceName, servicePackages }: { serviceName: string; servicePackages: PricingPackageWithService[] }) => {
        const sorted = [...servicePackages].sort((a, b) => {
            const order: Record<string, number> = { starter: 1, professional: 2, enterprise: 3 };
            return (order[a.tier] || 99) - (order[b.tier] || 99);
        });

        // Collect all unique features
        const allFeatures = Array.from(new Set(sorted.flatMap(p => p.features || [])));

        return (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">{serviceName}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Feature</th>
                                {sorted.map((pkg) => (
                                    <th key={pkg.id} className="px-6 py-3 text-center">
                                        <div className="text-sm font-semibold text-gray-900">{pkg.name}</div>
                                        <div className="text-lg font-bold text-emerald-600">{getDisplayPrice(pkg)}</div>
                                        <div className="text-xs text-gray-400">{getBillingLabel(pkg)}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allFeatures.map((feature, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-2.5 text-sm text-gray-700">{feature}</td>
                                    {sorted.map((pkg) => (
                                        <td key={pkg.id} className="px-6 py-2.5 text-center">
                                            {(pkg.features || []).includes(feature) ? (
                                                <CheckIcon className="w-5 h-5 text-emerald-500 mx-auto" />
                                            ) : (
                                                <span className="text-gray-300">—</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
                    <p className="text-gray-500 mt-1">Manage pricing packages for all services.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Package
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{totalPackages}</div>
                            <div className="text-sm text-gray-500">Total Packages</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CurrencyDollarIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{uniqueServices}</div>
                            <div className="text-sm text-gray-500">Services with Pricing</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <TagIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{packages.filter(p => p.highlighted).length}</div>
                            <div className="text-sm text-gray-500">Highlighted</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-orange-600">{packages.filter(p => p.tier === 'enterprise').length}</div>
                            <div className="text-sm text-gray-500">Enterprise Plans</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                            <ClipboardDocumentListIcon className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Filter by Service:</label>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">All Services</option>
                        {services.map(service => (
                            <option key={service.slug} value={service.slug}>{service.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    {/* Billing toggle */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setBillingView('monthly')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${billingView === 'monthly' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingView('yearly')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${billingView === 'yearly' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Yearly
                        </button>
                    </div>

                    {/* View mode toggle */}
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Cards view"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Comparison table view"
                        >
                            <TableCellsIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty state */}
            {packages.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <CurrencyDollarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No pricing packages found</p>
                    <p className="text-gray-400 text-sm mt-1">
                        {selectedService === 'all'
                            ? 'Get started by adding your first pricing package.'
                            : 'No packages for this service. Try a different filter or add one.'}
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Package
                    </button>
                </div>
            )}

            {/* Comparison Table View */}
            {viewMode === 'table' && Object.entries(groupedPackages).map(([serviceName, servicePackages]) => (
                <ComparisonTable key={serviceName} serviceName={serviceName} servicePackages={servicePackages} />
            ))}

            {/* Cards View */}
            {viewMode === 'cards' && Object.entries(groupedPackages).map(([serviceName, servicePackages]) => (
                <div key={serviceName} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">{serviceName}</h2>
                        <p className="text-sm text-gray-500">/services/{servicePackages[0]?.service?.slug}/pricing</p>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            {servicePackages.sort((a, b) => {
                                const order: Record<string, number> = { starter: 1, professional: 2, enterprise: 3 };
                                return (order[a.tier] || 99) - (order[b.tier] || 99);
                            }).map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        pkg.highlighted
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {editingId === pkg.id ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editingPackage.name || ''}
                                                onChange={(e) => setEditingPackage(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Package Name"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                            <TierSelect
                                                value={editingPackage.tier || 'starter'}
                                                onChange={(v) => setEditingPackage(prev => ({ ...prev, tier: v }))}
                                                isCustom={editCustomTierMode}
                                                onToggleCustom={setEditCustomTierMode}
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Price</label>
                                                    <input
                                                        type="text"
                                                        value={editingPackage.price || ''}
                                                        onChange={(e) => setEditingPackage(prev => ({ ...prev, price: e.target.value }))}
                                                        placeholder="Price"
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Yearly Price</label>
                                                    <input
                                                        type="text"
                                                        value={editingPackage.yearlyPrice || ''}
                                                        onChange={(e) => setEditingPackage(prev => ({ ...prev, yearlyPrice: e.target.value }))}
                                                        placeholder="e.g., $3,999"
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">CTA Button Text</label>
                                                <input
                                                    type="text"
                                                    value={editingPackage.ctaText || ''}
                                                    onChange={(e) => setEditingPackage(prev => ({ ...prev, ctaText: e.target.value }))}
                                                    placeholder="e.g., Get Started"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                />
                                            </div>
                                            <textarea
                                                value={editingPackage.description || ''}
                                                onChange={(e) => setEditingPackage(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Description"
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                                            />
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Features</label>
                                                <div className="space-y-1">
                                                    {(editingPackage.features || []).map((feature, index) => (
                                                        <div key={index} className="flex gap-1">
                                                            <input
                                                                type="text"
                                                                value={feature}
                                                                onChange={(e) => updateEditFeature(index, e.target.value)}
                                                                placeholder="Feature"
                                                                className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs"
                                                            />
                                                            <button onClick={() => removeEditFeature(index)} className="p-1 text-gray-400 hover:text-red-600">
                                                                <XMarkIcon className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button onClick={addEditFeature} className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700">
                                                        <PlusIcon className="w-3 h-3" />
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            <label className="flex items-center gap-2 cursor-pointer text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={editingPackage.highlighted || false}
                                                    onChange={(e) => setEditingPackage(prev => ({ ...prev, highlighted: e.target.checked }))}
                                                    className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600"
                                                />
                                                <span className="text-gray-600">Highlighted</span>
                                            </label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={saveEditing}
                                                    disabled={mutationLoading}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 disabled:opacity-50"
                                                >
                                                    <CheckIcon className="w-4 h-4" />
                                                    {mutationLoading ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                        pkg.tier === 'starter' ? 'bg-gray-100 text-gray-700' :
                                                        pkg.tier === 'professional' ? 'bg-blue-100 text-blue-700' :
                                                        pkg.tier === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-indigo-100 text-indigo-700'
                                                    }`}>
                                                        {pkg.tier.charAt(0).toUpperCase() + pkg.tier.slice(1)}
                                                    </span>
                                                    {pkg.billingPeriod && (
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                            pkg.billingPeriod === 'yearly' ? 'bg-amber-100 text-amber-700' :
                                                            pkg.billingPeriod === 'monthly' ? 'bg-sky-100 text-sky-700' :
                                                            'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {pkg.billingPeriod.charAt(0).toUpperCase() + pkg.billingPeriod.slice(1)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {pkg.highlighted && (
                                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                                            Popular
                                                        </span>
                                                    )}
                                                    {billingView === 'yearly' && pkg.yearlyPrice && pkg.price && (() => {
                                                        const savings = getSavingsPercent(String(pkg.price), pkg.yearlyPrice);
                                                        return savings ? (
                                                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                                                                Save {savings}%
                                                            </span>
                                                        ) : null;
                                                    })()}
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-1 my-2">
                                                <span className="text-2xl font-bold text-emerald-600">{getDisplayPrice(pkg)}</span>
                                                <span className="text-sm text-gray-400">{getBillingLabel(pkg)}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">{pkg.description}</p>

                                            {/* CTA Preview */}
                                            {pkg.ctaText && (
                                                <div className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-center mb-3 ${
                                                    pkg.highlighted
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                }`}>
                                                    {pkg.ctaText}
                                                </div>
                                            )}

                                            <ul className="space-y-1 mb-4">
                                                {(pkg.features || []).slice(0, 3).map((feature, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                                        <CheckIcon className="w-3 h-3 text-emerald-500 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                                {(pkg.features || []).length > 3 && (
                                                    <li className="text-xs text-gray-400">+{(pkg.features || []).length - 3} more features</li>
                                                )}
                                            </ul>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-400">Updated: {new Date(pkg.updatedAt).toLocaleDateString()}</span>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => toggleHighlighted(pkg)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            pkg.highlighted
                                                                ? 'text-emerald-600 bg-emerald-50'
                                                                : 'text-gray-400 hover:bg-gray-50'
                                                        }`}
                                                        title={pkg.highlighted ? 'Remove highlight' : 'Highlight'}
                                                    >
                                                        <ArrowTrendingUpIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDuplicate(pkg.id)}
                                                        disabled={mutationLoading}
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Duplicate"
                                                    >
                                                        <DocumentDuplicateIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => startEditing(pkg)}
                                                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Package Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-lg font-semibold text-gray-900">Add Pricing Package</h2>
                            <button
                                onClick={() => { setShowAddModal(false); setCustomTierMode(false); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                                <select
                                    value={newPackage.serviceId}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, serviceId: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                >
                                    <option value="">Select a service</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                                    <input
                                        type="text"
                                        value={newPackage.name}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g., Starter"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <TierSelect
                                    value={newPackage.tier}
                                    onChange={(v) => setNewPackage(prev => ({ ...prev, tier: v }))}
                                    isCustom={customTierMode}
                                    onToggleCustom={setCustomTierMode}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price *</label>
                                    <input
                                        type="text"
                                        value={newPackage.price}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="e.g., $4,999"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Yearly Price
                                        {newPackage.price && newPackage.yearlyPrice && (() => {
                                            const savings = getSavingsPercent(newPackage.price, newPackage.yearlyPrice);
                                            return savings ? (
                                                <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                                                    Save {savings}%
                                                </span>
                                            ) : null;
                                        })()}
                                    </label>
                                    <input
                                        type="text"
                                        value={newPackage.yearlyPrice}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, yearlyPrice: e.target.value }))}
                                        placeholder="e.g., $3,999"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                                <input
                                    type="text"
                                    value={newPackage.ctaText}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, ctaText: e.target.value }))}
                                    placeholder="e.g., Get Started, Contact Us"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                />
                                {newPackage.ctaText && (
                                    <div className="mt-2">
                                        <span className="text-xs text-gray-500 mb-1 block">Preview:</span>
                                        <div className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-center ${
                                            newPackage.highlighted
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                                        }`}>
                                            {newPackage.ctaText}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newPackage.description}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                                    rows={2}
                                    placeholder="Brief description of the package"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                <div className="space-y-2">
                                    {newPackage.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(index, e.target.value)}
                                                placeholder="Feature description"
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                            <button
                                                onClick={() => removeFeature(index)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addFeature}
                                        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Add Feature
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newPackage.highlighted}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, highlighted: e.target.checked }))}
                                        className="w-4 h-4 rounded border-gray-300 text-emerald-600"
                                    />
                                    <span className="text-sm text-gray-700">Highlight this package (mark as Popular)</span>
                                </label>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                            <button
                                onClick={() => { setShowAddModal(false); setCustomTierMode(false); }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewPackage}
                                disabled={!newPackage.serviceId || !newPackage.name || !newPackage.price || mutationLoading}
                                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutationLoading ? 'Adding...' : 'Add Package'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
