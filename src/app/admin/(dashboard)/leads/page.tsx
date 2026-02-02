'use client';

import { useState, useMemo, useCallback, Fragment } from 'react';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    TrashIcon,
    XMarkIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
    CheckIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    Squares2X2Icon,
    ListBulletIcon,
    PencilSquareIcon,
    PaperAirplaneIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { useLeads, useLeadMutations } from '@/hooks/admin/useLeads';

// DB status type (UPPERCASE from API)
type DbStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST' | 'ARCHIVED';
// Display status type (lowercase for UI)
type DisplayStatus = 'new' | 'contacted' | 'qualified' | 'closed';

// Types matching database schema
interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: DbStatus;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    source: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

type SortField = 'name' | 'email' | 'source' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'list' | 'kanban';

// Map DB status -> display status
function toDisplayStatus(dbStatus: DbStatus): DisplayStatus {
    switch (dbStatus) {
        case 'NEW': return 'new';
        case 'CONTACTED': return 'contacted';
        case 'QUALIFIED':
        case 'PROPOSAL':
        case 'NEGOTIATION': return 'qualified';
        case 'WON':
        case 'LOST':
        case 'ARCHIVED': return 'closed';
        default: return 'new';
    }
}

// Map display status -> DB status (for status changes)
function toDbStatus(displayStatus: DisplayStatus): DbStatus {
    switch (displayStatus) {
        case 'new': return 'NEW';
        case 'contacted': return 'CONTACTED';
        case 'qualified': return 'QUALIFIED';
        case 'closed': return 'WON';
        default: return 'NEW';
    }
}

// Map display status filter -> DB status for API query
function toDbStatusFilter(displayStatus: string): DbStatus | undefined {
    switch (displayStatus) {
        case 'new': return 'NEW';
        case 'contacted': return 'CONTACTED';
        case 'qualified': return 'QUALIFIED';
        case 'closed': return undefined; // We handle closed separately since it maps to multiple DB statuses
        default: return undefined;
    }
}

const statusColors: Record<DisplayStatus, string> = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    qualified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusBgColors: Record<DisplayStatus, string> = {
    new: 'bg-blue-50 border-blue-200',
    contacted: 'bg-yellow-50 border-yellow-200',
    qualified: 'bg-emerald-50 border-emerald-200',
    closed: 'bg-gray-50 border-gray-200',
};

const sourceColors: Record<string, string> = {
    'Contact Form': 'bg-purple-500',
    'Service Page': 'bg-blue-500',
    'Referral': 'bg-emerald-500',
    'Google Ads': 'bg-red-500',
    'LinkedIn': 'bg-sky-500',
    'contact_form': 'bg-purple-500',
    'website': 'bg-blue-500',
    'referral': 'bg-emerald-500',
    'google_ads': 'bg-red-500',
    'linkedin': 'bg-sky-500',
    'other': 'bg-gray-400',
};

// Loading Skeleton Component
function LeadsLoadingSkeleton() {
    return (
        <div className="space-y-6">
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                            <div>
                                <div className="h-7 w-12 bg-gray-200 rounded animate-pulse mb-1" />
                                <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Table skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                </div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="px-6 py-4 border-t border-gray-100 flex items-center gap-4">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                        <div className="flex gap-1 ml-auto">
                            <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
                            <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
                            <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Lead Detail Modal Component
function LeadDetailModal({
    lead,
    isOpen,
    onClose,
    onStatusChange,
    onUpdateNotes,
    onSendEmail
}: {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (leadId: string, status: DisplayStatus) => void;
    onUpdateNotes: (leadId: string, notes: string) => void;
    onSendEmail: (lead: Lead) => void;
}) {
    const [editingNotes, setEditingNotes] = useState(false);
    const [notesValue, setNotesValue] = useState('');

    if (!lead) return null;

    const displayStatus = toDisplayStatus(lead.status);

    const handleEditNotes = () => {
        setNotesValue(lead.notes || '');
        setEditingNotes(true);
    };

    const handleSaveNotes = () => {
        onUpdateNotes(lead.id, notesValue);
        setEditingNotes(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                    <div>
                                        <Dialog.Title className="text-xl font-semibold text-gray-900">
                                            {lead.name}
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500 mt-1">Lead Details</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                    {/* Contact Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <div className="text-xs text-gray-500">Email</div>
                                                <div className="text-sm font-medium text-gray-900">{lead.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <PhoneIcon className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <div className="text-xs text-gray-500">Phone</div>
                                                <div className="text-sm font-medium text-gray-900">{lead.phone || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Source */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <select
                                                value={displayStatus}
                                                onChange={(e) => onStatusChange(lead.id, e.target.value as DisplayStatus)}
                                                className={`w-full px-3 py-2 rounded-lg border text-sm font-medium ${statusColors[displayStatus]}`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                                                <span className={`w-2 h-2 rounded-full ${sourceColors[lead.source] || 'bg-gray-400'}`}></span>
                                                <span className="text-sm text-gray-900">{lead.source}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company */}
                                    {lead.company && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                            <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900">{lead.company}</div>
                                        </div>
                                    )}

                                    {/* Priority */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900">{lead.priority}</div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Created:</span>
                                            <span className="ml-2 text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Updated:</span>
                                            <span className="ml-2 text-gray-900">{new Date(lead.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Notes
                                            </label>
                                            {!editingNotes && (
                                                <button
                                                    onClick={handleEditNotes}
                                                    className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700"
                                                >
                                                    <PencilSquareIcon className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                            )}
                                        </div>

                                        {editingNotes ? (
                                            <div className="space-y-2">
                                                <textarea
                                                    value={notesValue}
                                                    onChange={(e) => setNotesValue(e.target.value)}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                                                    placeholder="Add notes about this lead..."
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => setEditingNotes(false)}
                                                        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSaveNotes}
                                                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap min-h-[60px]">
                                                {lead.notes || <span className="italic text-gray-400">No notes yet</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => onSendEmail(lead)}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                    >
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                        Quick Response
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

// Email Composer Modal
function EmailComposerModal({
    lead,
    isOpen,
    onClose,
}: {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    if (!lead) return null;

    const handleSend = () => {
        window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                                        Quick Response
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                        <input
                                            type="text"
                                            value={`${lead.name} <${lead.email}>`}
                                            disabled
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input
                                            type="text"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            placeholder={`Re: Inquiry from ${lead.name}`}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={6}
                                            placeholder={`Hi ${lead.name},\n\nThank you for reaching out...\n\nBest regards`}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                                        />
                                    </div>

                                    {/* Quick Templates */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: Inquiry - Initial Response`);
                                                    setMessage(`Hi ${lead.name},\n\nThank you for reaching out to us. We've received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nThe Team`);
                                                }}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Initial Response
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: Inquiry - Schedule a Call`);
                                                    setMessage(`Hi ${lead.name},\n\nThank you for your interest. I'd love to schedule a call to discuss your requirements in detail.\n\nPlease let me know your availability for a 30-minute call this week.\n\nBest regards,\nThe Team`);
                                                }}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Schedule Call
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: Inquiry - Following Up`);
                                                    setMessage(`Hi ${lead.name},\n\nI hope this email finds you well. I'm following up on your inquiry.\n\nHave you had a chance to review our previous correspondence? I'd be happy to answer any questions you might have.\n\nBest regards,\nThe Team`);
                                                }}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Follow Up
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                    >
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                        Send Email
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

// Source Breakdown Chart Component
function SourceBreakdownChart({ leads }: { leads: Lead[] }) {
    const sourceData = useMemo(() => {
        const sources: Record<string, number> = {};
        leads.forEach(lead => {
            sources[lead.source] = (sources[lead.source] || 0) + 1;
        });
        return Object.entries(sources).map(([source, count]) => ({
            source,
            count,
            percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0,
            color: sourceColors[source] || 'bg-gray-400',
        })).sort((a, b) => b.count - a.count);
    }, [leads]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Lead Sources</h3>
                <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
                {sourceData.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No data available</p>
                )}
                {sourceData.map((item) => (
                    <div key={item.source}>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                                <span className="text-gray-700">{item.source}</span>
                            </div>
                            <span className="font-medium text-gray-900">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} transition-all duration-500`}
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Conversion Metrics Component
function ConversionMetrics({ leads }: { leads: Lead[] }) {
    const metrics = useMemo(() => {
        const total = leads.length;
        const contacted = leads.filter(l => l.status === 'CONTACTED').length;
        const qualified = leads.filter(l => ['QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(l.status)).length;
        const closed = leads.filter(l => ['WON', 'LOST', 'ARCHIVED'].includes(l.status)).length;
        const won = leads.filter(l => l.status === 'WON').length;

        return {
            contactRate: total > 0 ? Math.round(((contacted + qualified + closed) / total) * 100) : 0,
            qualificationRate: total > 0 ? Math.round(((qualified + closed) / total) * 100) : 0,
            closeRate: total > 0 ? Math.round((won / total) * 100) : 0,
            avgResponseTime: '---',
        };
    }, [leads]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Conversion Metrics</h3>
                <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metrics.contactRate}%</div>
                    <div className="text-xs text-blue-700">Contact Rate</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{metrics.qualificationRate}%</div>
                    <div className="text-xs text-yellow-700">Qualification Rate</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{metrics.closeRate}%</div>
                    <div className="text-xs text-emerald-700">Close Rate</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{metrics.avgResponseTime}</div>
                    <div className="text-xs text-purple-700">Avg Response</div>
                </div>
            </div>
        </div>
    );
}

// Kanban Column Component
function KanbanColumn({
    title,
    displayStatus,
    leads,
    onLeadClick,
    onStatusChange
}: {
    title: string;
    displayStatus: DisplayStatus;
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
    onStatusChange: (leadId: string, status: DisplayStatus) => void;
}) {
    return (
        <div className={`flex-1 min-w-[280px] rounded-xl border ${statusBgColors[displayStatus]} p-4`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${displayStatus === 'new' ? 'bg-blue-500' : displayStatus === 'contacted' ? 'bg-yellow-500' : displayStatus === 'qualified' ? 'bg-emerald-500' : 'bg-gray-500'}`}></span>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
                <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600">{leads.length}</span>
            </div>
            <div className="space-y-3">
                {leads.map((lead) => (
                    <div
                        key={lead.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onLeadClick(lead)}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
                            <Menu as="div" className="relative">
                                <Menu.Button
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                        {(['new', 'contacted', 'qualified', 'closed'] as DisplayStatus[]).map((s) => (
                                            <Menu.Item key={s}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onStatusChange(lead.id, s);
                                                        }}
                                                        className={`${active ? 'bg-gray-50' : ''} w-full px-3 py-2 text-left text-sm capitalize ${s === displayStatus ? 'text-emerald-600 font-medium' : 'text-gray-700'}`}
                                                    >
                                                        {s === displayStatus && <CheckIcon className="w-4 h-4 inline mr-2" />}
                                                        {s}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{lead.email}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{lead.company || ''}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sourceColors[lead.source] || 'bg-gray-400'} inline-block mr-1`}></span>
                            </span>
                        </div>
                        {lead.notes && (
                            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                                <span>Has notes</span>
                            </div>
                        )}
                    </div>
                ))}
                {leads.length === 0 && (
                    <div className="text-center py-8 text-sm text-gray-400">
                        No leads in this stage
                    </div>
                )}
            </div>
        </div>
    );
}

// Bulk Actions Bar
function BulkActionsBar({
    selectedCount,
    onMarkContacted,
    onDeleteSelected,
    onExportSelected,
    onClearSelection
}: {
    selectedCount: number;
    onMarkContacted: () => void;
    onDeleteSelected: () => void;
    onExportSelected: () => void;
    onClearSelection: () => void;
}) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-xl shadow-2xl px-6 py-4 flex items-center gap-6 z-40">
            <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">{selectedCount} selected</span>
            </div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2">
                <button
                    onClick={onMarkContacted}
                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <PhoneIcon className="w-4 h-4" />
                    Mark Contacted
                </button>
                <button
                    onClick={onExportSelected}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Export
                </button>
                <button
                    onClick={onDeleteSelected}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                </button>
            </div>
            <button
                onClick={onClearSelection}
                className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
}

// Delete Confirmation Modal
function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    count,
    isDeleting
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    count: number;
    isDeleting?: boolean;
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                                            Delete {count} Lead{count > 1 ? 's' : ''}?
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500">This action cannot be undone.</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-6">
                                    <button
                                        onClick={onClose}
                                        disabled={isDeleting}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        disabled={isDeleting}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

// Main Page Component
export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailLead, setEmailLead] = useState<Lead | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeletingBulk, setIsDeletingBulk] = useState(false);

    // Determine DB status filter for API
    const apiStatusFilter = statusFilter !== 'all' ? toDbStatusFilter(statusFilter) : undefined;

    // Use the real hook for data fetching
    const { leads, pagination, isLoading, isError, mutate } = useLeads({
        page: currentPage,
        limit: 10,
        status: apiStatusFilter as any,
        search: debouncedSearch || undefined,
    });

    // For "closed" filter, we need to fetch all and filter client-side for WON/LOST/ARCHIVED
    // Since the API might not support multiple status filters, we handle it gracefully
    const { updateLead, deleteLead, isLoading: isMutating } = useLeadMutations();

    // Cast leads to our Lead type
    const typedLeads = leads as unknown as Lead[];

    // Handle search with debounce
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const timeout = setTimeout(() => {
            setDebouncedSearch(value);
            setCurrentPage(1);
        }, 400);
        setSearchTimeout(timeout);
    };

    // Client-side sorting (server doesn't support sort params based on the hook)
    const sortedLeads = useMemo(() => {
        const result = [...typedLeads];
        result.sort((a, b) => {
            const aVal = a[sortField] ?? '';
            const bVal = b[sortField] ?? '';

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                const comparison = aVal.localeCompare(bVal);
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            return 0;
        });
        return result;
    }, [typedLeads, sortField, sortDirection]);

    // Stats computed from the current page of leads
    const stats = useMemo(() => ({
        total: pagination?.total ?? typedLeads.length,
        new: typedLeads.filter(l => l.status === 'NEW').length,
        contacted: typedLeads.filter(l => l.status === 'CONTACTED').length,
        qualified: typedLeads.filter(l => ['QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(l.status)).length,
        closed: typedLeads.filter(l => ['WON', 'LOST', 'ARCHIVED'].includes(l.status)).length,
    }), [typedLeads, pagination]);

    // Kanban grouping
    const kanbanGroups = useMemo(() => ({
        new: sortedLeads.filter(l => l.status === 'NEW'),
        contacted: sortedLeads.filter(l => l.status === 'CONTACTED'),
        qualified: sortedLeads.filter(l => ['QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(l.status)),
        closed: sortedLeads.filter(l => ['WON', 'LOST', 'ARCHIVED'].includes(l.status)),
    }), [sortedLeads]);

    // Handlers
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSelectAll = () => {
        if (selectedLeads.size === sortedLeads.length) {
            setSelectedLeads(new Set());
        } else {
            setSelectedLeads(new Set(sortedLeads.map(l => l.id)));
        }
    };

    const handleSelectLead = (leadId: string) => {
        const newSelected = new Set(selectedLeads);
        if (newSelected.has(leadId)) {
            newSelected.delete(leadId);
        } else {
            newSelected.add(leadId);
        }
        setSelectedLeads(newSelected);
    };

    const handleStatusChange = async (leadId: string, displayStatus: DisplayStatus) => {
        const dbStatus = toDbStatus(displayStatus);
        try {
            await updateLead(leadId, { status: dbStatus as any });
            await mutate();
            // Update the selected lead if it's the one being changed
            if (selectedLead?.id === leadId) {
                setSelectedLead({ ...selectedLead, status: dbStatus });
            }
        } catch (err) {
            console.error('Failed to update lead status:', err);
        }
    };

    const handleUpdateNotes = async (leadId: string, notes: string) => {
        try {
            await updateLead(leadId, { notes } as any);
            await mutate();
            if (selectedLead?.id === leadId) {
                setSelectedLead({ ...selectedLead, notes });
            }
        } catch (err) {
            console.error('Failed to update notes:', err);
        }
    };

    const handleBulkMarkContacted = async () => {
        try {
            const promises = Array.from(selectedLeads).map(id =>
                updateLead(id, { status: 'CONTACTED' as any })
            );
            await Promise.all(promises);
            await mutate();
            setSelectedLeads(new Set());
        } catch (err) {
            console.error('Failed to bulk update:', err);
        }
    };

    const handleBulkDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setIsDeletingBulk(true);
        try {
            const promises = Array.from(selectedLeads).map(id => deleteLead(id));
            await Promise.all(promises);
            await mutate();
            setSelectedLeads(new Set());
            setIsDeleteModalOpen(false);
        } catch (err) {
            console.error('Failed to delete leads:', err);
        } finally {
            setIsDeletingBulk(false);
        }
    };

    const handleExportSelected = () => {
        const selectedLeadsData = typedLeads.filter(lead => selectedLeads.has(lead.id));
        const csv = [
            ['Name', 'Email', 'Phone', 'Company', 'Status', 'Source', 'Priority', 'Created'].join(','),
            ...selectedLeadsData.map(lead =>
                [lead.name, lead.email, lead.phone || '', lead.company || '', lead.status, lead.source, lead.priority, lead.createdAt].join(',')
            )
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleExportAll = () => {
        const csv = [
            ['Name', 'Email', 'Phone', 'Company', 'Status', 'Source', 'Priority', 'Created'].join(','),
            ...typedLeads.map(lead =>
                [lead.name, lead.email, lead.phone || '', lead.company || '', lead.status, lead.source, lead.priority, lead.createdAt].join(',')
            )
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `all-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleLeadClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDetailModalOpen(true);
    };

    const handleSendEmail = (lead: Lead) => {
        setEmailLead(lead);
        setIsEmailModalOpen(true);
        setIsDetailModalOpen(false);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />;
        return sortDirection === 'asc'
            ? <ChevronUpIcon className="w-4 h-4 text-emerald-600" />
            : <ChevronDownIcon className="w-4 h-4 text-emerald-600" />;
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                    <p className="text-gray-500 mt-1">Manage and track your incoming leads.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <ListBulletIcon className="w-4 h-4" />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            <Squares2X2Icon className="w-4 h-4" />
                            Kanban
                        </button>
                    </div>
                    <button
                        onClick={handleExportAll}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && <LeadsLoadingSkeleton />}

            {/* Error State */}
            {isError && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <ExclamationTriangleIcon className="w-10 h-10 text-red-400 mx-auto mb-3" />
                    <p className="text-red-700 font-medium">Failed to load leads</p>
                    <p className="text-red-500 text-sm mt-1">Please try refreshing the page.</p>
                    <button
                        onClick={() => mutate()}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Main content - only show when not loading */}
            {!isLoading && !isError && (
                <>
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <UserGroupIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                    <div className="text-sm text-gray-500">Total Leads</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <ClockIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
                                    <div className="text-sm text-gray-500">New</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <PhoneIcon className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
                                    <div className="text-sm text-gray-500">Contacted</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">{stats.qualified}</div>
                                    <div className="text-sm text-gray-500">Qualified</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <CheckIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
                                    <div className="text-sm text-gray-500">Closed</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SourceBreakdownChart leads={typedLeads} />
                        <ConversionMetrics leads={typedLeads} />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search leads by name, email..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLeads.size === sortedLeads.length && sortedLeads.length > 0}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                />
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('name')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Name
                                                    {getSortIcon('name')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('email')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Contact
                                                    {getSortIcon('email')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('source')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Source
                                                    {getSortIcon('source')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('status')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Status
                                                    {getSortIcon('status')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('createdAt')}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date
                                                    {getSortIcon('createdAt')}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {sortedLeads.map((lead) => {
                                            const displayStatus = toDisplayStatus(lead.status);
                                            return (
                                                <tr key={lead.id} className={`hover:bg-gray-50 ${selectedLeads.has(lead.id) ? 'bg-emerald-50' : ''}`}>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedLeads.has(lead.id)}
                                                            onChange={() => handleSelectLead(lead.id)}
                                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleLeadClick(lead)}
                                                            className="font-medium text-gray-900 hover:text-emerald-600 text-left"
                                                        >
                                                            {lead.name}
                                                        </button>
                                                        {lead.notes && (
                                                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                                                <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                                                                Notes
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{lead.email}</div>
                                                        <div className="text-sm text-gray-500">{lead.phone || ''}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${sourceColors[lead.source] || 'bg-gray-400'}`}></span>
                                                            <span className="text-sm text-gray-500">{lead.source}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Menu as="div" className="relative inline-block text-left">
                                                            <Menu.Button className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[displayStatus]}`}>
                                                                {displayStatus}
                                                                <ChevronUpDownIcon className="w-3 h-3" />
                                                            </Menu.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute left-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                                                    {(['new', 'contacted', 'qualified', 'closed'] as DisplayStatus[]).map((status) => (
                                                                        <Menu.Item key={status}>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={() => handleStatusChange(lead.id, status)}
                                                                                    className={`${active ? 'bg-gray-50' : ''} w-full px-3 py-2 text-left text-sm capitalize ${status === displayStatus ? 'text-emerald-600 font-medium' : 'text-gray-700'}`}
                                                                                >
                                                                                    {status === displayStatus && <CheckIcon className="w-4 h-4 inline mr-2" />}
                                                                                    {status}
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => handleLeadClick(lead)}
                                                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                                title="View Details"
                                                            >
                                                                <EyeIcon className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleSendEmail(lead)}
                                                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                                title="Quick Response"
                                                            >
                                                                <PaperAirplaneIcon className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedLeads(new Set([lead.id]));
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {sortedLeads.length === 0 && (
                                <div className="text-center py-12">
                                    <UserGroupIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No leads found</p>
                                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Kanban View */}
                    {viewMode === 'kanban' && (
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            <KanbanColumn
                                title="New"
                                displayStatus="new"
                                leads={kanbanGroups.new}
                                onLeadClick={handleLeadClick}
                                onStatusChange={handleStatusChange}
                            />
                            <KanbanColumn
                                title="Contacted"
                                displayStatus="contacted"
                                leads={kanbanGroups.contacted}
                                onLeadClick={handleLeadClick}
                                onStatusChange={handleStatusChange}
                            />
                            <KanbanColumn
                                title="Qualified"
                                displayStatus="qualified"
                                leads={kanbanGroups.qualified}
                                onLeadClick={handleLeadClick}
                                onStatusChange={handleStatusChange}
                            />
                            <KanbanColumn
                                title="Closed"
                                displayStatus="closed"
                                leads={kanbanGroups.closed}
                                onLeadClick={handleLeadClick}
                                onStatusChange={handleStatusChange}
                            />
                        </div>
                    )}

                    {/* Pagination (List View) */}
                    {viewMode === 'list' && pagination && (
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {sortedLeads.length} of {pagination.total} leads (Page {pagination.page} of {pagination.totalPages})
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage <= 1}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                    disabled={currentPage >= pagination.totalPages}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Bulk Actions Bar */}
            <BulkActionsBar
                selectedCount={selectedLeads.size}
                onMarkContacted={handleBulkMarkContacted}
                onDeleteSelected={handleBulkDelete}
                onExportSelected={handleExportSelected}
                onClearSelection={() => setSelectedLeads(new Set())}
            />

            {/* Modals */}
            <LeadDetailModal
                lead={selectedLead}
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                onStatusChange={handleStatusChange}
                onUpdateNotes={handleUpdateNotes}
                onSendEmail={handleSendEmail}
            />

            <EmailComposerModal
                lead={emailLead}
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                count={selectedLeads.size}
                isDeleting={isDeletingBulk}
            />
        </div>
    );
}
