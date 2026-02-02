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
    ChatBubbleLeftIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import { Dialog, Transition, Switch } from '@headlessui/react';
import {
    useNotifications,
    useNotificationMutations,
    useNotificationPreferences,
    type Notification as DBNotification,
} from '@/hooks/admin/useNotifications';

// Types
type NotificationCategory = 'info' | 'success' | 'warning' | 'error' | 'lead' | 'message' | 'request';
type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

interface MappedNotification {
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

// Category configurations
const categoryConfig: Record<NotificationCategory, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; label: string }> = {
    lead: {
        icon: UserPlusIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200',
        label: 'Leads',
    },
    message: {
        icon: ChatBubbleLeftIcon,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        borderColor: 'border-indigo-200',
        label: 'Messages',
    },
    request: {
        icon: DocumentTextIcon,
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200',
        label: 'Requests',
    },
    error: {
        icon: ShieldCheckIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200',
        label: 'Errors',
    },
    warning: {
        icon: ExclamationTriangleIcon,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-200',
        label: 'Warnings',
    },
    success: {
        icon: CheckCircleIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        borderColor: 'border-emerald-200',
        label: 'Success',
    },
    info: {
        icon: InformationCircleIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200',
        label: 'Info',
    },
};

const priorityConfig: Record<NotificationPriority, { color: string; bgColor: string; label: string }> = {
    low: { color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Low' },
    medium: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Medium' },
    high: { color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'High' },
    urgent: { color: 'text-red-600', bgColor: 'bg-red-100', label: 'Urgent' },
};

// Map DB notification to local shape
function mapNotification(n: DBNotification): MappedNotification {
    const type = (n.type || 'info') as NotificationCategory;
    const category = categoryConfig[type] ? type : 'info';
    const priority = (n.priority || 'low') as NotificationPriority;

    const metadata: Record<string, string> | undefined = n.metadata
        ? Object.fromEntries(
              Object.entries(n.metadata).map(([k, v]) => [k, String(v)])
          )
        : undefined;

    return {
        id: n.id,
        title: n.title,
        message: n.message,
        category,
        priority: priorityConfig[priority] ? priority : 'low',
        timestamp: new Date(n.createdAt),
        read: n.read,
        actionUrl: n.actionUrl,
        actionLabel: n.actionUrl ? 'View Details' : undefined,
        metadata,
    };
}

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

// Loading Skeleton Component
function NotificationSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-200 animate-pulse">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg" />
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-4 bg-gray-200 rounded w-48" />
                                <div className="h-5 bg-gray-200 rounded-full w-16" />
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-full" />
                            <div className="h-3 bg-gray-200 rounded w-3/4" />
                            <div className="flex items-center gap-3 pt-1">
                                <div className="h-3 bg-gray-200 rounded w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Notification Card Component
function NotificationCard({
    notification,
    onMarkRead,
    onDelete,
    onAction,
}: {
    notification: MappedNotification;
    onMarkRead: (id: string) => void;
    onDelete: (id: string) => void;
    onAction?: (notification: MappedNotification) => void;
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
                            {notification.metadata && Object.keys(notification.metadata).length > 0 && (
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
                                    {!notification.read && (
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
    preferences: ReturnType<typeof useNotificationPreferences>['preferences'];
    onSave: (prefs: Partial<typeof preferences>) => void;
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

                                            {/* Push Notifications */}
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <ComputerDesktopIcon className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Push Notifications</div>
                                                        <div className="text-sm text-gray-500">Show desktop push notifications</div>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.pushNotifications}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, pushNotifications: checked })}
                                                    className={`${localPrefs.pushNotifications ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.pushNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
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
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Notify Me About</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <UserPlusIcon className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">New Leads</span>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.notifyOnNewLead}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, notifyOnNewLead: checked })}
                                                    className={`${localPrefs.notifyOnNewLead ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.notifyOnNewLead ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>
                                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                        <ChatBubbleLeftIcon className="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">New Messages</span>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.notifyOnNewMessage}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, notifyOnNewMessage: checked })}
                                                    className={`${localPrefs.notifyOnNewMessage ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.notifyOnNewMessage ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>
                                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                                        <DocumentTextIcon className="w-4 h-4 text-amber-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">New Requests</span>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.notifyOnNewRequest}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, notifyOnNewRequest: checked })}
                                                    className={`${localPrefs.notifyOnNewRequest ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.notifyOnNewRequest ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>
                                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                        <ArrowPathIcon className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">Status Changes</span>
                                                </div>
                                                <Switch
                                                    checked={localPrefs.notifyOnStatusChange}
                                                    onChange={(checked) => setLocalPrefs({ ...localPrefs, notifyOnStatusChange: checked })}
                                                    className={`${localPrefs.notifyOnStatusChange ? 'bg-emerald-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                                                >
                                                    <span className={`${localPrefs.notifyOnStatusChange ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                                </Switch>
                                            </div>
                                        </div>
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

// Error State Component
function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load notifications</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-4">
                Something went wrong while fetching your notifications.
            </p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
                Try Again
            </button>
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
    onDelete,
    onAction,
}: {
    title: string;
    notifications: MappedNotification[];
    isExpanded: boolean;
    onToggle: () => void;
    onMarkRead: (id: string) => void;
    onDelete: (id: string) => void;
    onAction?: (notification: MappedNotification) => void;
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
    const [filter, setFilter] = useState<'all' | NotificationCategory>('all');
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'Today': true,
        'Yesterday': true,
        'This Week': true,
        'Older': false,
    });

    // Hooks for real data
    const {
        notifications: rawNotifications,
        unreadCount,
        isLoading,
        isError,
        mutate,
    } = useNotifications({
        limit: 50,
        type: filter === 'all' ? undefined : filter,
    });

    const { markAsRead, markAllAsRead, deleteNotification, isLoading: isMutating } = useNotificationMutations();
    const { preferences, updatePreferences } = useNotificationPreferences();

    // Map DB notifications to display shape
    const notifications = useMemo(
        () => rawNotifications.map(mapNotification),
        [rawNotifications]
    );

    // Group notifications by time
    const groupedNotifications = useMemo(() => {
        const groups: Record<string, MappedNotification[]> = {
            'Today': [],
            'Yesterday': [],
            'This Week': [],
            'Older': [],
        };

        notifications.forEach(notification => {
            const group = getTimeGroup(notification.timestamp);
            groups[group].push(notification);
        });

        return groups;
    }, [notifications]);

    // Stats (computed from the full list; when filtering we still show totals from current set)
    const stats = useMemo(() => {
        const unread = notifications.filter(n => !n.read).length;
        const byCat = (cat: NotificationCategory) => notifications.filter(n => n.category === cat).length;
        return {
            total: notifications.length,
            unread,
            lead: byCat('lead'),
            message: byCat('message'),
            request: byCat('request'),
            error: byCat('error'),
            warning: byCat('warning'),
            success: byCat('success'),
            info: byCat('info'),
        };
    }, [notifications]);

    // Handlers
    const handleMarkRead = useCallback(async (id: string) => {
        await markAsRead(id);
        mutate();
    }, [markAsRead, mutate]);

    const handleDelete = useCallback(async (id: string) => {
        await deleteNotification(id);
        mutate();
    }, [deleteNotification, mutate]);

    const handleMarkAllRead = useCallback(async () => {
        await markAllAsRead();
        mutate();
    }, [markAllAsRead, mutate]);

    const handleAction = useCallback((notification: MappedNotification) => {
        if (notification.actionUrl) {
            handleMarkRead(notification.id);
            window.location.href = notification.actionUrl;
        }
    }, [handleMarkRead]);

    const handleRefresh = useCallback(async () => {
        await mutate();
    }, [mutate]);

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
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <ArrowPathIcon className={`w-5 h-5 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium text-gray-700">Refresh</span>
                    </button>
                    <button
                        onClick={() => setIsPreferencesOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Preferences</span>
                    </button>
                    {(unreadCount > 0 || stats.unread > 0) && (
                        <button
                            onClick={handleMarkAllRead}
                            disabled={isMutating}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
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
                            <div className="text-2xl font-bold text-gray-900">{isLoading ? '-' : stats.total}</div>
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
                            <div className="text-2xl font-bold text-blue-600">{isLoading ? '-' : unreadCount}</div>
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
                            <div className="text-2xl font-bold text-blue-600">{isLoading ? '-' : stats.lead}</div>
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
                            <div className="text-2xl font-bold text-red-600">{isLoading ? '-' : stats.error}</div>
                            <div className="text-sm text-gray-500">Errors</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <InformationCircleIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{isLoading ? '-' : stats.info}</div>
                            <div className="text-sm text-gray-500">Info</div>
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
                    {unreadCount > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">{unreadCount}</span>
                    )}
                </button>
                {(Object.entries(categoryConfig) as [NotificationCategory, typeof categoryConfig[NotificationCategory]][]).map(([key, config]) => {
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
                        </button>
                    );
                })}
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                {isLoading ? (
                    <NotificationSkeleton />
                ) : isError ? (
                    <ErrorState onRetry={handleRefresh} />
                ) : notifications.length === 0 ? (
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
                onSave={updatePreferences}
            />
        </div>
    );
}
