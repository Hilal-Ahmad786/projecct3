'use client';

import { useState } from 'react';
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
} from '@heroicons/react/24/outline';

interface PricingPackage {
    id: string;
    serviceName: string;
    serviceSlug: string;
    tier: 'starter' | 'professional' | 'enterprise';
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted: boolean;
    lastUpdated: string;
}

const initialPackages: PricingPackage[] = [
    // Web Development
    { id: '1', serviceName: 'Web Development', serviceSlug: 'web-development', tier: 'starter', name: 'Starter', price: '$4,999', description: 'Perfect for small businesses', features: ['Single-page website', 'Responsive design', 'SEO optimization', '2 weeks delivery'], highlighted: false, lastUpdated: '2024-01-15' },
    { id: '2', serviceName: 'Web Development', serviceSlug: 'web-development', tier: 'professional', name: 'Professional', price: '$12,999', description: 'Ideal for growing businesses', features: ['Multi-page website', 'Custom design', 'CMS integration', '3 months support'], highlighted: true, lastUpdated: '2024-01-15' },
    { id: '3', serviceName: 'Web Development', serviceSlug: 'web-development', tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Full-scale applications', features: ['Unlimited pages', 'Custom web app', 'API development', '6+ months support'], highlighted: false, lastUpdated: '2024-01-15' },

    // AI Solutions
    { id: '4', serviceName: 'AI Solutions', serviceSlug: 'ai-solutions', tier: 'starter', name: 'Starter', price: '$4,999', description: 'Single AI model', features: ['Single AI model', 'Basic preprocessing', 'API integration', '1 month maintenance'], highlighted: false, lastUpdated: '2024-01-14' },
    { id: '5', serviceName: 'AI Solutions', serviceSlug: 'ai-solutions', tier: 'professional', name: 'Professional', price: '$12,999', description: 'Multiple AI models', features: ['Multiple models', 'Advanced pipeline', 'Custom API', '3 months support'], highlighted: true, lastUpdated: '2024-01-14' },
    { id: '6', serviceName: 'AI Solutions', serviceSlug: 'ai-solutions', tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Enterprise AI', features: ['Unlimited models', 'End-to-end MLOps', 'Dedicated team', '24/7 support'], highlighted: false, lastUpdated: '2024-01-14' },

    // Mobile Development
    { id: '7', serviceName: 'Mobile Development', serviceSlug: 'mobile-development', tier: 'starter', name: 'Starter', price: '$9,999', description: 'Single platform app', features: ['iOS or Android', 'Basic features', 'App store submission', '1 month support'], highlighted: false, lastUpdated: '2024-01-13' },
    { id: '8', serviceName: 'Mobile Development', serviceSlug: 'mobile-development', tier: 'professional', name: 'Professional', price: '$24,999', description: 'Cross-platform app', features: ['iOS & Android', 'Advanced features', 'Push notifications', '3 months support'], highlighted: true, lastUpdated: '2024-01-13' },
    { id: '9', serviceName: 'Mobile Development', serviceSlug: 'mobile-development', tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Enterprise mobile', features: ['Multiple apps', 'Backend integration', 'Analytics', '12 months support'], highlighted: false, lastUpdated: '2024-01-13' },

    // Prompt Engineering
    { id: '10', serviceName: 'Prompt Engineering', serviceSlug: 'prompt-engineering', tier: 'starter', name: 'Starter', price: '$2,499', description: 'Basic prompt optimization', features: ['Up to 10 prompts', 'Basic optimization', 'Documentation'], highlighted: false, lastUpdated: '2024-01-12' },
    { id: '11', serviceName: 'Prompt Engineering', serviceSlug: 'prompt-engineering', tier: 'professional', name: 'Professional', price: '$6,999', description: 'Comprehensive prompt library', features: ['Up to 50 prompts', 'Advanced chains', 'Training workshop'], highlighted: true, lastUpdated: '2024-01-12' },
    { id: '12', serviceName: 'Prompt Engineering', serviceSlug: 'prompt-engineering', tier: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'Full infrastructure', features: ['Unlimited prompts', 'Custom orchestration', 'Dedicated engineer'], highlighted: false, lastUpdated: '2024-01-12' },
];

const services = [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'AI Solutions', slug: 'ai-solutions' },
    { name: 'Mobile Development', slug: 'mobile-development' },
    { name: 'Machine Learning', slug: 'machine-learning' },
    { name: 'Conversational AI', slug: 'conversational-ai' },
    { name: 'Computer Vision', slug: 'computer-vision' },
    { name: 'LLM Fine-tuning', slug: 'llm-finetuning' },
    { name: 'Prompt Engineering', slug: 'prompt-engineering' },
    { name: 'AI Agents', slug: 'ai-agents' },
    { name: 'RAG Solutions', slug: 'rag-solutions' },
    { name: 'MLOps Deployment', slug: 'mlops-deployment' },
    { name: 'Python Automation', slug: 'python-automation' },
    { name: 'DevOps & Cloud', slug: 'devops-cloud' },
    { name: 'Data Analytics', slug: 'data-analytics' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'E-Commerce', slug: 'e-commerce' },
    { name: 'API Development', slug: 'api-development' },
    { name: 'UI/UX Design', slug: 'ui-ux-design' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
];

export default function PricingManagementPage() {
    const [packages, setPackages] = useState<PricingPackage[]>(initialPackages);
    const [selectedService, setSelectedService] = useState<string>('all');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingPackage, setEditingPackage] = useState<Partial<PricingPackage>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPackage, setNewPackage] = useState<Partial<PricingPackage>>({
        tier: 'starter',
        highlighted: false,
        features: [''],
    });

    const filteredPackages = packages.filter(
        pkg => selectedService === 'all' || pkg.serviceSlug === selectedService
    );

    const groupedPackages = filteredPackages.reduce((acc, pkg) => {
        if (!acc[pkg.serviceName]) {
            acc[pkg.serviceName] = [];
        }
        acc[pkg.serviceName].push(pkg);
        return acc;
    }, {} as Record<string, PricingPackage[]>);

    const totalPackages = packages.length;
    const uniqueServices = new Set(packages.map(p => p.serviceSlug)).size;

    const startEditing = (pkg: PricingPackage) => {
        setEditingId(pkg.id);
        setEditingPackage({ ...pkg });
    };

    const saveEditing = () => {
        if (editingId && editingPackage) {
            setPackages(prev => prev.map(p =>
                p.id === editingId ? { ...p, ...editingPackage, lastUpdated: new Date().toISOString().split('T')[0] } : p
            ));
            setEditingId(null);
            setEditingPackage({});
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingPackage({});
    };

    const deletePackage = (id: string) => {
        setPackages(prev => prev.filter(p => p.id !== id));
    };

    const toggleHighlighted = (id: string) => {
        setPackages(prev => prev.map(p =>
            p.id === id ? { ...p, highlighted: !p.highlighted } : p
        ));
    };

    const addFeature = () => {
        setNewPackage(prev => ({
            ...prev,
            features: [...(prev.features || []), '']
        }));
    };

    const updateFeature = (index: number, value: string) => {
        setNewPackage(prev => {
            const features = [...(prev.features || [])];
            features[index] = value;
            return { ...prev, features };
        });
    };

    const removeFeature = (index: number) => {
        setNewPackage(prev => ({
            ...prev,
            features: (prev.features || []).filter((_, i) => i !== index)
        }));
    };

    const addNewPackage = () => {
        if (!newPackage.serviceName || !newPackage.name || !newPackage.price) return;

        const service = services.find(s => s.name === newPackage.serviceName);
        const newId = (Math.max(...packages.map(p => parseInt(p.id))) + 1).toString();

        setPackages(prev => [...prev, {
            id: newId,
            serviceName: newPackage.serviceName!,
            serviceSlug: service?.slug || newPackage.serviceName!.toLowerCase().replace(/\s+/g, '-'),
            tier: newPackage.tier as 'starter' | 'professional' | 'enterprise',
            name: newPackage.name!,
            price: newPackage.price!,
            description: newPackage.description || '',
            features: (newPackage.features || []).filter(f => f.trim() !== ''),
            highlighted: newPackage.highlighted || false,
            lastUpdated: new Date().toISOString().split('T')[0],
        }]);

        setNewPackage({ tier: 'starter', highlighted: false, features: [''] });
        setShowAddModal(false);
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

            {/* Filter */}
            <div className="flex items-center gap-4">
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

            {/* Pricing Packages by Service */}
            {Object.entries(groupedPackages).map(([serviceName, servicePackages]) => (
                <div key={serviceName} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">{serviceName}</h2>
                        <p className="text-sm text-gray-500">/services/{servicePackages[0]?.serviceSlug}/pricing</p>
                    </div>

                    <div className="p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            {servicePackages.sort((a, b) => {
                                const order = { starter: 1, professional: 2, enterprise: 3 };
                                return order[a.tier] - order[b.tier];
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
                                            <input
                                                type="text"
                                                value={editingPackage.price || ''}
                                                onChange={(e) => setEditingPackage(prev => ({ ...prev, price: e.target.value }))}
                                                placeholder="Price"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                            <textarea
                                                value={editingPackage.description || ''}
                                                onChange={(e) => setEditingPackage(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Description"
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={saveEditing}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
                                                >
                                                    <CheckIcon className="w-4 h-4" />
                                                    Save
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
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                    pkg.tier === 'starter' ? 'bg-gray-100 text-gray-700' :
                                                    pkg.tier === 'professional' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {pkg.tier.charAt(0).toUpperCase() + pkg.tier.slice(1)}
                                                </span>
                                                {pkg.highlighted && (
                                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                                            <div className="text-2xl font-bold text-emerald-600 my-2">{pkg.price}</div>
                                            <p className="text-sm text-gray-500 mb-3">{pkg.description}</p>
                                            <ul className="space-y-1 mb-4">
                                                {pkg.features.slice(0, 3).map((feature, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                                        <CheckIcon className="w-3 h-3 text-emerald-500" />
                                                        {feature}
                                                    </li>
                                                ))}
                                                {pkg.features.length > 3 && (
                                                    <li className="text-xs text-gray-400">+{pkg.features.length - 3} more features</li>
                                                )}
                                            </ul>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-400">Updated: {pkg.lastUpdated}</span>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => toggleHighlighted(pkg.id)}
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
                                                        onClick={() => startEditing(pkg)}
                                                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                                    >
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deletePackage(pkg.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
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
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-lg font-semibold text-gray-900">Add Pricing Package</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                                <select
                                    value={newPackage.serviceName || ''}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, serviceName: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                >
                                    <option value="">Select a service</option>
                                    {services.map(service => (
                                        <option key={service.slug} value={service.name}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                                    <input
                                        type="text"
                                        value={newPackage.name || ''}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g., Starter"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tier *</label>
                                    <select
                                        value={newPackage.tier || 'starter'}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, tier: e.target.value as 'starter' | 'professional' | 'enterprise' }))}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="starter">Starter</option>
                                        <option value="professional">Professional</option>
                                        <option value="enterprise">Enterprise</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                                <input
                                    type="text"
                                    value={newPackage.price || ''}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="e.g., $4,999 or Custom"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newPackage.description || ''}
                                    onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                                    rows={2}
                                    placeholder="Brief description of the package"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                <div className="space-y-2">
                                    {(newPackage.features || []).map((feature, index) => (
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
                                        checked={newPackage.highlighted || false}
                                        onChange={(e) => setNewPackage(prev => ({ ...prev, highlighted: e.target.checked }))}
                                        className="w-4 h-4 rounded border-gray-300 text-emerald-600"
                                    />
                                    <span className="text-sm text-gray-700">Highlight this package (mark as Popular)</span>
                                </label>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewPackage}
                                disabled={!newPackage.serviceName || !newPackage.name || !newPackage.price}
                                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Package
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
