'use client';

import { useState, useMemo, Fragment } from 'react';
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

// Types
interface LeadNote {
    id: string;
    content: string;
    createdAt: string;
    author: string;
}

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'new' | 'contacted' | 'qualified' | 'closed';
    createdAt: string;
    source: string;
    notes: LeadNote[];
    lastContacted?: string;
    assignedTo?: string;
}

type SortField = 'name' | 'email' | 'subject' | 'source' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'list' | 'kanban';

// Mock data with notes
const mockLeads: Lead[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234 567 8901',
        subject: 'Web Development',
        message: 'Looking for a custom web application for our e-commerce business. We need inventory management, customer portal, and payment integration.',
        status: 'new',
        createdAt: '2024-01-15',
        source: 'Contact Form',
        notes: [{ id: 'n1', content: 'Initial inquiry received', createdAt: '2024-01-15', author: 'System' }],
        assignedTo: 'Sarah'
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@company.com',
        phone: '+1 234 567 8902',
        subject: 'AI Solutions',
        message: 'Interested in chatbot integration for our customer support. We handle about 500 queries per day.',
        status: 'contacted',
        createdAt: '2024-01-14',
        source: 'Service Page',
        notes: [
            { id: 'n2', content: 'Called and discussed requirements', createdAt: '2024-01-14', author: 'John' },
            { id: 'n3', content: 'Sent proposal document', createdAt: '2024-01-15', author: 'John' }
        ],
        lastContacted: '2024-01-15',
        assignedTo: 'John'
    },
    {
        id: '3',
        name: 'Michael Chen',
        email: 'michael@startup.io',
        phone: '+1 234 567 8903',
        subject: 'Mobile App',
        message: 'Need a cross-platform mobile app for our fitness startup. iOS and Android with social features.',
        status: 'qualified',
        createdAt: '2024-01-13',
        source: 'Referral',
        notes: [
            { id: 'n4', content: 'Qualified lead - budget confirmed $50k', createdAt: '2024-01-13', author: 'Sarah' },
            { id: 'n5', content: 'Meeting scheduled for next week', createdAt: '2024-01-14', author: 'Sarah' }
        ],
        lastContacted: '2024-01-14',
        assignedTo: 'Sarah'
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@corp.com',
        phone: '+1 234 567 8904',
        subject: 'E-commerce',
        message: 'Want to set up an online store with 500+ products. Need inventory sync with our existing ERP.',
        status: 'new',
        createdAt: '2024-01-12',
        source: 'Google Ads',
        notes: [],
        assignedTo: 'Mike'
    },
    {
        id: '5',
        name: 'David Wilson',
        email: 'david@tech.co',
        phone: '+1 234 567 8905',
        subject: 'DevOps',
        message: 'Need help with CI/CD pipeline setup and cloud infrastructure optimization.',
        status: 'closed',
        createdAt: '2024-01-11',
        source: 'Contact Form',
        notes: [
            { id: 'n6', content: 'Project completed successfully', createdAt: '2024-01-20', author: 'Mike' },
            { id: 'n7', content: 'Client very satisfied - potential for future projects', createdAt: '2024-01-21', author: 'Mike' }
        ],
        lastContacted: '2024-01-21',
        assignedTo: 'Mike'
    },
    {
        id: '6',
        name: 'Lisa Anderson',
        email: 'lisa@enterprise.com',
        phone: '+1 234 567 8906',
        subject: 'Data Analytics',
        message: 'Looking for BI dashboard solution for our sales team. Real-time analytics and reporting.',
        status: 'contacted',
        createdAt: '2024-01-10',
        source: 'LinkedIn',
        notes: [{ id: 'n8', content: 'Demo scheduled', createdAt: '2024-01-11', author: 'John' }],
        lastContacted: '2024-01-11',
        assignedTo: 'John'
    },
    {
        id: '7',
        name: 'Robert Taylor',
        email: 'robert@agency.net',
        phone: '+1 234 567 8907',
        subject: 'Web Development',
        message: 'Need a portfolio website with CMS for our creative agency.',
        status: 'qualified',
        createdAt: '2024-01-09',
        source: 'Referral',
        notes: [{ id: 'n9', content: 'Contract under review', createdAt: '2024-01-12', author: 'Sarah' }],
        lastContacted: '2024-01-12',
        assignedTo: 'Sarah'
    },
    {
        id: '8',
        name: 'Jennifer White',
        email: 'jennifer@retail.com',
        phone: '+1 234 567 8908',
        subject: 'Mobile App',
        message: 'Customer loyalty app with rewards program and push notifications.',
        status: 'new',
        createdAt: '2024-01-08',
        source: 'Google Ads',
        notes: [],
    },
];

const statusColors: Record<Lead['status'], string> = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    qualified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusBgColors: Record<Lead['status'], string> = {
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
};

// Lead Detail Modal Component
function LeadDetailModal({
    lead,
    isOpen,
    onClose,
    onStatusChange,
    onAddNote,
    onSendEmail
}: {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (leadId: string, status: Lead['status']) => void;
    onAddNote: (leadId: string, note: string) => void;
    onSendEmail: (lead: Lead) => void;
}) {
    const [newNote, setNewNote] = useState('');

    if (!lead) return null;

    const handleAddNote = () => {
        if (newNote.trim()) {
            onAddNote(lead.id, newNote);
            setNewNote('');
        }
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
                                                <div className="text-sm font-medium text-gray-900">{lead.phone}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Source */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <select
                                                value={lead.status}
                                                onChange={(e) => onStatusChange(lead.id, e.target.value as Lead['status'])}
                                                className={`w-full px-3 py-2 rounded-lg border text-sm font-medium ${statusColors[lead.status]}`}
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

                                    {/* Subject & Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900">{lead.subject}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Created:</span>
                                            <span className="ml-2 text-gray-900">{lead.createdAt}</span>
                                        </div>
                                        {lead.lastContacted && (
                                            <div>
                                                <span className="text-gray-500">Last Contact:</span>
                                                <span className="ml-2 text-gray-900">{lead.lastContacted}</span>
                                            </div>
                                        )}
                                        {lead.assignedTo && (
                                            <div>
                                                <span className="text-gray-500">Assigned:</span>
                                                <span className="ml-2 text-gray-900">{lead.assignedTo}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes Section */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Notes & Comments ({lead.notes.length})
                                        </label>

                                        {/* Add Note */}
                                        <div className="flex gap-2 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Add a note..."
                                                value={newNote}
                                                onChange={(e) => setNewNote(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                            <button
                                                onClick={handleAddNote}
                                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {/* Notes List */}
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {lead.notes.length === 0 ? (
                                                <p className="text-sm text-gray-500 italic">No notes yet</p>
                                            ) : (
                                                lead.notes.map((note) => (
                                                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-sm text-gray-700">{note.content}</p>
                                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                                            <span>{note.author}</span>
                                                            <span>&bull;</span>
                                                            <span>{note.createdAt}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
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
        // In a real app, this would send the email via API
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
                                            placeholder={`Re: ${lead.subject}`}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={6}
                                            placeholder={`Hi ${lead.name},\n\nThank you for reaching out about ${lead.subject}...\n\nBest regards`}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                                        />
                                    </div>

                                    {/* Quick Templates */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: ${lead.subject} - Initial Response`);
                                                    setMessage(`Hi ${lead.name},\n\nThank you for reaching out to us regarding ${lead.subject}. We've received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nThe Team`);
                                                }}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Initial Response
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: ${lead.subject} - Schedule a Call`);
                                                    setMessage(`Hi ${lead.name},\n\nThank you for your interest in ${lead.subject}. I'd love to schedule a call to discuss your requirements in detail.\n\nPlease let me know your availability for a 30-minute call this week.\n\nBest regards,\nThe Team`);
                                                }}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                                            >
                                                Schedule Call
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSubject(`Re: ${lead.subject} - Following Up`);
                                                    setMessage(`Hi ${lead.name},\n\nI hope this email finds you well. I'm following up on your inquiry about ${lead.subject}.\n\nHave you had a chance to review our previous correspondence? I'd be happy to answer any questions you might have.\n\nBest regards,\nThe Team`);
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
            percentage: Math.round((count / leads.length) * 100),
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
        const contacted = leads.filter(l => l.status === 'contacted').length;
        const qualified = leads.filter(l => l.status === 'qualified').length;
        const closed = leads.filter(l => l.status === 'closed').length;

        return {
            contactRate: total > 0 ? Math.round(((contacted + qualified + closed) / total) * 100) : 0,
            qualificationRate: total > 0 ? Math.round(((qualified + closed) / total) * 100) : 0,
            closeRate: total > 0 ? Math.round((closed / total) * 100) : 0,
            avgResponseTime: '2.4h', // Mock data
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
    status,
    leads,
    statusColor,
    onLeadClick,
    onStatusChange
}: {
    title: string;
    status: Lead['status'];
    leads: Lead[];
    statusColor: string;
    onLeadClick: (lead: Lead) => void;
    onStatusChange: (leadId: string, status: Lead['status']) => void;
}) {
    return (
        <div className={`flex-1 min-w-[280px] rounded-xl border ${statusBgColors[status]} p-4`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${statusColor === 'new' ? 'bg-blue-500' : statusColor === 'contacted' ? 'bg-yellow-500' : statusColor === 'qualified' ? 'bg-emerald-500' : 'bg-gray-500'}`}></span>
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
                                        {(['new', 'contacted', 'qualified', 'closed'] as Lead['status'][]).map((s) => (
                                            <Menu.Item key={s}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onStatusChange(lead.id, s);
                                                        }}
                                                        className={`${active ? 'bg-gray-50' : ''} w-full px-3 py-2 text-left text-sm capitalize ${s === status ? 'text-emerald-600 font-medium' : 'text-gray-700'}`}
                                                    >
                                                        {s === status && <CheckIcon className="w-4 h-4 inline mr-2" />}
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
                            <span className="text-xs text-gray-400">{lead.subject}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${sourceColors[lead.source] ? 'text-white' : 'text-gray-600 bg-gray-100'}`} style={{ backgroundColor: sourceColors[lead.source] ? undefined : undefined }}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sourceColors[lead.source]} inline-block mr-1`}></span>
                            </span>
                        </div>
                        {lead.notes.length > 0 && (
                            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                                <span>{lead.notes.length} note{lead.notes.length > 1 ? 's' : ''}</span>
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
    count
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    count: number;
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
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                    >
                                        Delete
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
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailLead, setEmailLead] = useState<Lead | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Filter and sort leads
    const filteredLeads = useMemo(() => {
        let result = leads.filter(lead => {
            const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.subject.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        // Sort
        result.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                const comparison = aVal.localeCompare(bVal);
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            return 0;
        });

        return result;
    }, [leads, searchTerm, statusFilter, sortField, sortDirection]);

    // Stats
    const stats = useMemo(() => ({
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        closed: leads.filter(l => l.status === 'closed').length,
    }), [leads]);

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
        if (selectedLeads.size === filteredLeads.length) {
            setSelectedLeads(new Set());
        } else {
            setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
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

    const handleStatusChange = (leadId: string, status: Lead['status']) => {
        setLeads(leads.map(lead =>
            lead.id === leadId ? { ...lead, status } : lead
        ));
        // Update selectedLead if it's the one being changed
        if (selectedLead?.id === leadId) {
            setSelectedLead({ ...selectedLead, status });
        }
    };

    const handleAddNote = (leadId: string, content: string) => {
        const newNote: LeadNote = {
            id: `n${Date.now()}`,
            content,
            createdAt: new Date().toISOString().split('T')[0],
            author: 'You',
        };
        setLeads(leads.map(lead =>
            lead.id === leadId ? { ...lead, notes: [...lead.notes, newNote] } : lead
        ));
        if (selectedLead?.id === leadId) {
            setSelectedLead({ ...selectedLead, notes: [...selectedLead.notes, newNote] });
        }
    };

    const handleBulkMarkContacted = () => {
        setLeads(leads.map(lead =>
            selectedLeads.has(lead.id) ? { ...lead, status: 'contacted' as const } : lead
        ));
        setSelectedLeads(new Set());
    };

    const handleBulkDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setLeads(leads.filter(lead => !selectedLeads.has(lead.id)));
        setSelectedLeads(new Set());
        setIsDeleteModalOpen(false);
    };

    const handleExportSelected = () => {
        const selectedLeadsData = leads.filter(lead => selectedLeads.has(lead.id));
        const csv = [
            ['Name', 'Email', 'Phone', 'Subject', 'Status', 'Source', 'Created'].join(','),
            ...selectedLeadsData.map(lead =>
                [lead.name, lead.email, lead.phone, lead.subject, lead.status, lead.source, lead.createdAt].join(',')
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
            ['Name', 'Email', 'Phone', 'Subject', 'Status', 'Source', 'Created'].join(','),
            ...leads.map(lead =>
                [lead.name, lead.email, lead.phone, lead.subject, lead.status, lead.source, lead.createdAt].join(',')
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
                <SourceBreakdownChart leads={leads} />
                <ConversionMetrics leads={leads} />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FunnelIcon className="w-5 h-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                                            checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
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
                                        onClick={() => handleSort('subject')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Subject
                                            {getSortIcon('subject')}
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
                                {filteredLeads.map((lead) => (
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
                                            {lead.notes.length > 0 && (
                                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                                    <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                                                    {lead.notes.length}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{lead.email}</div>
                                            <div className="text-sm text-gray-500">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{lead.subject}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${sourceColors[lead.source] || 'bg-gray-400'}`}></span>
                                                <span className="text-sm text-gray-500">{lead.source}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                                                    {lead.status}
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
                                                        {(['new', 'contacted', 'qualified', 'closed'] as Lead['status'][]).map((status) => (
                                                            <Menu.Item key={status}>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleStatusChange(lead.id, status)}
                                                                        className={`${active ? 'bg-gray-50' : ''} w-full px-3 py-2 text-left text-sm capitalize ${status === lead.status ? 'text-emerald-600 font-medium' : 'text-gray-700'}`}
                                                                    >
                                                                        {status === lead.status && <CheckIcon className="w-4 h-4 inline mr-2" />}
                                                                        {status}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{lead.createdAt}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLeads.length === 0 && (
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
                        status="new"
                        statusColor="new"
                        leads={filteredLeads.filter(l => l.status === 'new')}
                        onLeadClick={handleLeadClick}
                        onStatusChange={handleStatusChange}
                    />
                    <KanbanColumn
                        title="Contacted"
                        status="contacted"
                        statusColor="contacted"
                        leads={filteredLeads.filter(l => l.status === 'contacted')}
                        onLeadClick={handleLeadClick}
                        onStatusChange={handleStatusChange}
                    />
                    <KanbanColumn
                        title="Qualified"
                        status="qualified"
                        statusColor="qualified"
                        leads={filteredLeads.filter(l => l.status === 'qualified')}
                        onLeadClick={handleLeadClick}
                        onStatusChange={handleStatusChange}
                    />
                    <KanbanColumn
                        title="Closed"
                        status="closed"
                        statusColor="closed"
                        leads={filteredLeads.filter(l => l.status === 'closed')}
                        onLeadClick={handleLeadClick}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            )}

            {/* Pagination (List View) */}
            {viewMode === 'list' && filteredLeads.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {filteredLeads.length} of {leads.length} leads
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
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
                onAddNote={handleAddNote}
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
            />
        </div>
    );
}
