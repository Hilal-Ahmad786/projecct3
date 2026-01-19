'use client';

import { useState, useMemo, Fragment, useEffect, useCallback } from 'react';
import {
    BellIcon,
    BellSlashIcon,
    CheckIcon,
    CheckCircleIcon,
    XMarkIcon,
    FunnelIcon,
    Cog6ToothIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    ArrowPathIcon,
    UserPlusIcon,
    CurrencyDollarIcon,
    ServerIcon,
    LockClosedIcon,
    MegaphoneIcon,
    TrashIcon,
    EyeIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    ClockIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import { Dialog, Transition, Switch } from '@headlessui/react';

// Types
type NotificationCategory = 'leads' | 'security' | 'system' | 'updates';
type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Notification {
    id: string;
    title: string;
    message: string;
    category: NotificationCategory;
    priority: NotificationPriority;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    actionLabel?: string;
    metadata?: Record<string, string>;
}

interface NotificationPreferences {
    emailNotifications: boolean;
    browserNotifications: boolean;
    soundEnabled: boolean;
    categories: {
        leads: boolean;
        security: boolean;
        system: boolean;
        updates: boolean;
    };
    quietHoursEnabled: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
}

// Category configurations
const categoryConfig: Record<NotificationCategory, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; label: string }> = {
    leads: {
        icon: UserPlusIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200',
        label: 'Leads',
    },
    security: {
        icon: ShieldCheckIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200',
        label: 'Security',
    },
    system: {
        icon: ServerIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200',
        label: 'System',
    },
    updates: {
        icon: MegaphoneIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        borderColor: 'border-emerald-200',
        label: 'Updates',
    },
};

const priorityConfig: Record<NotificationPriority, { color: string; bgColor: string; label: string }> = {
    low: { color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Low' },
    medium: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Medium' },
    high: { color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'High' },
    urgent: { color: 'text-red-600', bgColor: 'bg-red-100', label: 'Urgent' },
};

// Mock notifications data
const generateMockNotifications = (): Notification[] => {
    const now = new Date();
    return [
        {
            id: '1',
            title: 'New Lead Received',
            message: 'John Smith submitted a contact form inquiry about Web Development services.',
            category: 'leads',
            priority: 'high',
            timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
            read: false,
            actionUrl: '/admin/leads',
            actionLabel: 'View Lead',
            metadata: { leadName: 'John Smith', source: 'Contact Form' },
        },
        {
            id: '2',
            title: 'Suspicious Login Attempt',
            message: 'Multiple failed login attempts detected from IP 192.168.1.100.',
            category: 'security',
            priority: 'urgent',
            timestamp: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago
            read: false,
            actionUrl: '/admin/security',
            actionLabel: 'Review Activity',
            metadata: { ip: '192.168.1.100', attempts: '5' },
        },
        {
            id: '3',
            title: 'System Backup Completed',
            message: 'Daily automated backup completed successfully. All data secured.',
            category: 'system',
            priority: 'low',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
            read: true,
            metadata: { backupSize: '2.3 GB', duration: '12 min' },
        },
        {
            id: '4',
            title: 'New Feature Available',
            message: 'AI-powered lead scoring is now available. Enable it in settings to prioritize your leads.',
            category: 'updates',
            priority: 'medium',
            timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
            read: false,
            actionUrl: '/admin/settings',
            actionLabel: 'Enable Feature',
        },
        {
            id: '5',
            title: 'Lead Converted',
            message: 'Sarah Johnson has been marked as qualified and converted to a customer.',
            category: 'leads',
            priority: 'medium',
            timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday
            read: true,
            actionUrl: '/admin/leads',
            actionLabel: 'View Details',
        },
        {
            id: '6',
            title: 'SSL Certificate Renewal',
            message: 'Your SSL certificate will expire in 14 days. Renew now to avoid security warnings.',
            category: 'security',
            priority: 'high',
            timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday
            read: false,
            actionUrl: '/admin/security',
            actionLabel: 'Renew Certificate',
        },
        {
            id: '7',
            title: 'Database Optimization',
            message: 'Scheduled database optimization completed. Performance improved by 15%.',
            category: 'system',
            priority: 'low',
            timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            read: true,
        },
        {
            id: '8',
            title: 'New Integration Available',
            message: 'Slack integration is now available. Connect your workspace for real-time notifications.',
            category: 'updates',
            priority: 'medium',
            timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            read: true,
            actionUrl: '/admin/settings/integrations',
            actionLabel: 'Connect Slack',
        },
        {
            id: '9',
            title: 'New Lead from Google Ads',
            message: 'Michael Chen expressed interest in Mobile App Development.',
            category: 'leads',
            priority: 'high',
            timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            read: true,
            actionUrl: '/admin/leads',
            actionLabel: 'View Lead',
        },
        {
            id: '10',
            title: 'Security Patch Applied',
            message: 'Critical security patch has been automatically applied to protect your data.',
            category: 'security',
            priority: 'high',
            timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            read: true,
        },
        {
            id: '11',
            title: 'Storage Usage Alert',
            message: 'Your storage usage has reached 75%. Consider upgrading your plan.',
            category: 'system',
            priority: 'medium',
            timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            read: true,
            actionUrl: '/admin/settings/billing',
            actionLabel: 'Upgrade Plan',
        },
        {
            id: '12',
            title: 'Monthly Report Ready',
            message: 'Your December 2024 analytics report is ready for download.',
            category: 'updates',
            priority: 'low',
            timestamp: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            read: true,
            actionUrl: '/admin/reports',
            actionLabel: 'Download Report',
        },
    ];
};

// Helper functions
const getTimeGroup = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (date >= today) return 'Today';
    if (date >= yesterday) return 'Yesterday';
    if (date >= weekAgo) return 'This Week';
    return 'Older';
};

const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Notification Card Component
function NotificationCard({
    notification,
    onMarkRead,
    onMarkUnread,
    onDelete,
    onAction,
}: {
    notification: Notification;
    onMarkRead: (id: string) => void;
    onMarkUnread: (id: string) => void;
    onDelete: (id: string) => void;
    onAction?: (notification: Notification) => void;
}) {
    const config = categoryConfig[notification.category];
    const priority = priorityConfig[notification.priority];
    const IconComponent = config.icon;

    return (
        <div
            className={`
                relative p-4 rounded-xl border transition-all duration-200
                ${notification.read
                    ? 'bg-white border-gray-200 hover:border-gray-300'
                    : 'bg-blue-50/50 border-blue-200 hover:border-blue-300 shadow-sm'
                }
            `}
        >
            {/* Unread indicator */}
            {!notification.read && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}

            <div className="flex gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                    {notification.title}
                                </h3>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priority.bgColor} ${priority.color}`}>
                                    {priority.label}
                                </span>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.bgColor} ${config.color}`}>
                                    {config.label}
                                </span>
                            </div>
                            <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                                {notification.message}
                            </p>

                            {/* Metadata */}
                            {notification.metadata && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {Object.entries(notification.metadata).map(([key, value]) => (
                                        <span key={key} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                            <span className="ml-1">{value}</span>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-xs text-gray-400">
                                    {formatTimestamp(notification.timestamp)}
                                </span>

                                {notification.actionUrl && notification.actionLabel && (
                                    <button
                                        onClick={() => onAction?.(notification)}
                                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                                    >
                                        {notification.actionLabel}
                                    </button>
                                )}

                                <div className="flex-1" />

                                <div className="flex items-center gap-1">
                                    {notification.read ? (
                                        <button
                                            onClick={() => onMarkUnread(notification.id)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Mark as unread"
                                        >
                                            <BellIcon className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onMarkRead(notification.id)}
                                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            title="Mark as read"
                                        >
                                            <CheckIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDelete(notification.id)}
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
        </div>
    );
}

// Preferences Modal Component
function PreferencesModal({
    isOpen,
    onClose,
    preferences,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    preferences: NotificationPreferences;
    onSave: (prefs: NotificationPreferences) => void;
}) {
    const [localPrefs, setLocalPrefs] = useState(preferences);

    useEffect(() => {
        setLocalPrefs(preferences);
    }, [preferences]);

    const handleSave = () => {
        onSave(localPrefs);
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
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                    <div>
                                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                                            Notification Preferences
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500 mt-1">Customize how you receive notifications</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                                    {/* Notification Channels */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Channels</h3>
                                        <div className="space-y-4">
                                            {/* Email Notifications */}
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Email Notifications</div>
                                                        <div className="text-sm text-gray-500">Receive notifications via email</div>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.emailNotifications}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, emailNotifications: checked })}
                                                    className={`${localPrefs.emailNotifications ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.emailNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>

                                            {/* Browser Notifications */}
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <ComputerDesktopIcon className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Browser Notifications</div>
                                                        <div className="text-sm text-gray-500">Show desktop push notifications</div>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.browserNotifications}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, browserNotifications: checked })}
                                                    className={`${localPrefs.browserNotifications ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.browserNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>

                                            {/* Sound */}
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                        {localPrefs.soundEnabled ? (
                                                            <SpeakerWaveIcon className="w-5 h-5 text-orange-600" />
                                                        ) : (
                                                            <SpeakerXMarkIcon className="w-5 h-5 text-orange-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Sound Notifications</div>
                                                        <div className="text-sm text-gray-500">Play sound for new notifications</div>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.soundEnabled}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, soundEnabled: checked })}
                                                    className={`${localPrefs.soundEnabled ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.soundEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Preferences */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
                                        <div className="space-y-3">
                                            {(Object.entries(categoryConfig) as [NotificationCategory, typeof categoryConfig[NotificationCategory]][]).map(([key, config]) => {
                                                const IconComponent = config.icon;
                                                return (
                                                    <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                                                                <IconComponent className={`w-4 h-4 ${config.color}`} />
                                                            </div>
                                                            <span className="font-medium text-gray-700">{config.label}</span>
                                                        </div>
                                                        <Switch
                                                            checked={localPrefs.categories[key]}
                                                            onChange={(checked) => setLocalPrefs({
                                                                ...localPrefs,
                                                                categories: { ...localPrefs.categories, [key]: checked }
                                                            })}
                                                            className={`${localPrefs.categories[key] ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                        >
                                                            <span className={`${localPrefs.categories[key] ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                        </Switch>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Quiet Hours */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">Quiet Hours</h3>
                                                <p className="text-sm text-gray-500">Mute notifications during specific hours</p>
                                            </div>
                                            <Switch
                                                checked={localPrefs.quietHoursEnabled}
                                                onChange={(checked) => setLocalPrefs({ ...localPrefs, quietHoursEnabled: checked })}
                                                className={`${localPrefs.quietHoursEnabled ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                            >
                                                <span className={`${localPrefs.quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                            </Switch>
                                        </div>
                                        {localPrefs.quietHoursEnabled && (
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                                    <input
                                                        type="time"
                                                        value={localPrefs.quietHoursStart}
                                                        onChange={(e) => setLocalPrefs({ ...localPrefs, quietHoursStart: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                                    <input
                                                        type="time"
                                                        value={localPrefs.quietHoursEnd}
                                                        onChange={(e) => setLocalPrefs({ ...localPrefs, quietHoursEnd: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                    >
                                        Save Preferences
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

// Empty State Component
function EmptyState({ filter }: { filter: string }) {
    return (
        <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellSlashIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
                {filter === 'all'
                    ? "You're all caught up! No notifications to display."
                    : `No ${filter} notifications to show at this time.`
                }
            </p>
        </div>
    );
}

// Collapsible Group Component
function NotificationGroup({
    title,
    notifications,
    isExpanded,
    onToggle,
    onMarkRead,
    onMarkUnread,
    onDelete,
    onAction,
}: {
    title: string;
    notifications: Notification[];
    isExpanded: boolean;
    onToggle: () => void;
    onMarkRead: (id: string) => void;
    onMarkUnread: (id: string) => void;
    onDelete: (id: string) => void;
    onAction?: (notification: Notification) => void;
}) {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="mb-6">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-3"
            >
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{title}</span>
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                        {notifications.length}
                    </span>
                    {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                            {unreadCount} unread
                        </span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onMarkRead={onMarkRead}
                            onMarkUnread={onMarkUnread}
                            onDelete={onDelete}
                            onAction={onAction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Main Page Component
export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filter, setFilter] = useState<'all' | NotificationCategory>('all');
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'Today': true,
        'Yesterday': true,
        'This Week': true,
        'Older': false,
    });
    const [preferences, setPreferences] = useState<NotificationPreferences>({
        emailNotifications: true,
        browserNotifications: true,
        soundEnabled: true,
        categories: {
            leads: true,
            security: true,
            system: true,
            updates: true,
        },
        quietHoursEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '07:00',
    });
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initialize notifications
    useEffect(() => {
        setNotifications(generateMockNotifications());
    }, []);

    // Request browser notification permission
    useEffect(() => {
        if (preferences.browserNotifications && 'Notification' in window) {
            Notification.requestPermission();
        }
    }, [preferences.browserNotifications]);

    // Simulated real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate occasional new notification (10% chance every 30 seconds)
            if (Math.random() < 0.1) {
                const newNotification: Notification = {
                    id: `new-${Date.now()}`,
                    title: 'New Activity Detected',
                    message: 'Someone is viewing your services page.',
                    category: 'leads',
                    priority: 'low',
                    timestamp: new Date(),
                    read: false,
                };

                setNotifications(prev => [newNotification, ...prev]);

                // Play sound if enabled
                if (preferences.soundEnabled) {
                    // In a real app, you would play an actual sound
                    console.log('Playing notification sound');
                }

                // Show browser notification if enabled
                if (preferences.browserNotifications && 'Notification' in window && Notification.permission === 'granted') {
                    new Notification(newNotification.title, {
                        body: newNotification.message,
                        icon: '/favicon.ico',
                    });
                }
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [preferences.soundEnabled, preferences.browserNotifications]);

    // Filter notifications
    const filteredNotifications = useMemo(() => {
        if (filter === 'all') return notifications;
        return notifications.filter(n => n.category === filter);
    }, [notifications, filter]);

    // Group notifications by time
    const groupedNotifications = useMemo(() => {
        const groups: Record<string, Notification[]> = {
            'Today': [],
            'Yesterday': [],
            'This Week': [],
            'Older': [],
        };

        filteredNotifications.forEach(notification => {
            const group = getTimeGroup(notification.timestamp);
            groups[group].push(notification);
        });

        return groups;
    }, [filteredNotifications]);

    // Stats
    const stats = useMemo(() => ({
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        leads: notifications.filter(n => n.category === 'leads').length,
        security: notifications.filter(n => n.category === 'security').length,
        system: notifications.filter(n => n.category === 'system').length,
        updates: notifications.filter(n => n.category === 'updates').length,
    }), [notifications]);

    // Handlers
    const handleMarkRead = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }, []);

    const handleMarkUnread = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: false } : n)
        );
    }, []);

    const handleDelete = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const handleMarkAllRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const handleAction = useCallback((notification: Notification) => {
        if (notification.actionUrl) {
            // In a real app, navigate to the URL
            handleMarkRead(notification.id);
            window.location.href = notification.actionUrl;
        }
    }, [handleMarkRead]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotifications(generateMockNotifications());
        setIsRefreshing(false);
    }, []);

    const toggleGroup = useCallback((group: string) => {
        setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500 mt-1">Stay updated with important alerts and updates</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <ArrowPathIcon className={`w-5 h-5 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium text-gray-700">Refresh</span>
                    </button>
                    <button
                        onClick={() => setIsPreferencesOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Preferences</span>
                    </button>
                    {stats.unread > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <CheckCircleIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Mark All Read</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <BellIconSolid className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-sm text-gray-500">Total</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BellIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
                            <div className="text-sm text-gray-500">Unread</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <UserPlusIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{stats.leads}</div>
                            <div className="text-sm text-gray-500">Leads</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <ShieldCheckIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{stats.security}</div>
                            <div className="text-sm text-gray-500">Security</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <ServerIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{stats.system}</div>
                            <div className="text-sm text-gray-500">System</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        filter === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    All Notifications
                    {stats.unread > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">{stats.unread}</span>
                    )}
                </button>
                {(Object.entries(categoryConfig) as [NotificationCategory, typeof categoryConfig[NotificationCategory]][]).map(([key, config]) => {
                    const count = notifications.filter(n => n.category === key && !n.read).length;
                    const IconComponent = config.icon;
                    return (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                filter === key
                                    ? `${config.bgColor} ${config.color} border ${config.borderColor}`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <IconComponent className="w-4 h-4" />
                            {config.label}
                            {count > 0 && (
                                <span className={`px-1.5 py-0.5 rounded text-xs ${
                                    filter === key ? 'bg-white/50' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                {filteredNotifications.length === 0 ? (
                    <EmptyState filter={filter} />
                ) : (
                    <div>
                        {(['Today', 'Yesterday', 'This Week', 'Older'] as const).map((group) => {
                            const groupNotifications = groupedNotifications[group];
                            if (groupNotifications.length === 0) return null;

                            return (
                                <NotificationGroup
                                    key={group}
                                    title={group}
                                    notifications={groupNotifications}
                                    isExpanded={expandedGroups[group]}
                                    onToggle={() => toggleGroup(group)}
                                    onMarkRead={handleMarkRead}
                                    onMarkUnread={handleMarkUnread}
                                    onDelete={handleDelete}
                                    onAction={handleAction}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Preferences Modal */}
            <PreferencesModal
                isOpen={isPreferencesOpen}
                onClose={() => setIsPreferencesOpen(false)}
                preferences={preferences}
                onSave={setPreferences}
            />
        </div>
    );
}
