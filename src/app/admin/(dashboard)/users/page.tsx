'use client';

import { useState } from 'react';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ShieldCheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAdminUsers, useAdminUserMutations } from '@/hooks/admin/useUsers';

type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'VIEWER';

interface AdminUser {
    id: string;
    email: string;
    name: string | null;
    role: AdminRole;
    isActive: boolean;
    lastLogin: string | null;
    createdAt: string;
}

const roleLabels: Record<AdminRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    VIEWER: 'Viewer',
};

const roleColors: Record<AdminRole, string> = {
    SUPER_ADMIN: 'bg-purple-100 text-purple-800',
    ADMIN: 'bg-blue-100 text-blue-800',
    MANAGER: 'bg-emerald-100 text-emerald-800',
    VIEWER: 'bg-gray-100 text-gray-800',
};

const statusColors = {
    active: 'bg-emerald-100 text-emerald-800',
    inactive: 'bg-red-100 text-red-800',
};

function formatLastActive(lastLogin: string | null): string {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    return date.toLocaleDateString();
}

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full" />
                            <div>
                                <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </div>
                    <div className="h-3 w-32 bg-gray-200 rounded mb-4" />
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                        <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
                        <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}

interface AddUserModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; email: string; password: string; role: AdminRole }) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

function AddUserModal({ open, onClose, onSubmit, isLoading, error }: AddUserModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<AdminRole>('VIEWER');

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ name, email, password, role });
        setName('');
        setEmail('');
        setPassword('');
        setRole('VIEWER');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Minimum 8 characters"
                            minLength={8}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as AdminRole)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="VIEWER">Viewer</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { users, isLoading, isError, error, mutate } = useAdminUsers();
    const { createUser, updateUser, deleteUser, isLoading: mutationLoading, error: mutationError } = useAdminUserMutations();

    const filteredUsers = (users as AdminUser[]).filter((user) =>
        (user.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = async (data: { name: string; email: string; password: string; role: AdminRole }) => {
        await createUser({ ...data });
        await mutate();
        setShowAddModal(false);
    };

    const handleToggleActive = async (user: AdminUser) => {
        await updateUser(user.id, { isActive: !user.isActive });
        await mutate();
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        setDeletingId(id);
        try {
            await deleteUser(id);
            await mutate();
        } finally {
            setDeletingId(null);
        }
    };

    const allUsers = users as AdminUser[];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-500 mt-1">Manage admin users and their permissions.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-gray-900">{allUsers.length}</div>
                    <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-purple-600">
                        {allUsers.filter(u => u.role === 'SUPER_ADMIN' || u.role === 'ADMIN').length}
                    </div>
                    <div className="text-sm text-gray-500">Admins</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-blue-600">
                        {allUsers.filter(u => u.role === 'MANAGER').length}
                    </div>
                    <div className="text-sm text-gray-500">Managers</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-emerald-600">
                        {allUsers.filter(u => u.isActive).length}
                    </div>
                    <div className="text-sm text-gray-500">Active</div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            {/* Error State */}
            {isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    Failed to load users: {error?.message || 'Unknown error'}
                </div>
            )}

            {/* Loading State */}
            {isLoading && <LoadingSkeleton />}

            {/* Users Grid */}
            {!isLoading && !isError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            {searchTerm ? 'No users match your search.' : 'No users found.'}
                        </div>
                    )}
                    {filteredUsers.map((user) => {
                        const avatar = (user.name ?? user.email).charAt(0).toUpperCase();
                        const statusKey = user.isActive ? 'active' : 'inactive';
                        return (
                            <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">{avatar}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name ?? 'Unnamed'}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                    {(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                                        <ShieldCheckIcon className="w-5 h-5 text-purple-500" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                                        {roleLabels[user.role]}
                                    </span>
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[statusKey]}`}>
                                        {statusKey}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mb-4">
                                    Last active: {formatLastActive(user.lastLogin)}
                                </div>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleToggleActive(user)}
                                        disabled={mutationLoading}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                        {user.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        disabled={deletingId === user.id}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        {deletingId === user.id ? 'Removing...' : 'Remove'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Roles & Permissions Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-800 mb-2">Super Admin</div>
                        <ul className="text-sm text-purple-600 space-y-1">
                            <li>&#8226; Full system access</li>
                            <li>&#8226; Manage all users</li>
                            <li>&#8226; Configure settings</li>
                            <li>&#8226; View all reports</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800 mb-2">Admin</div>
                        <ul className="text-sm text-blue-600 space-y-1">
                            <li>&#8226; Manage content</li>
                            <li>&#8226; Manage users</li>
                            <li>&#8226; View analytics</li>
                            <li>&#8226; Create reports</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                        <div className="font-medium text-emerald-800 mb-2">Manager</div>
                        <ul className="text-sm text-emerald-600 space-y-1">
                            <li>&#8226; Edit content</li>
                            <li>&#8226; Manage leads</li>
                            <li>&#8226; View analytics</li>
                            <li>&#8226; Export data</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800 mb-2">Viewer</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>&#8226; View dashboard</li>
                            <li>&#8226; View analytics</li>
                            <li>&#8226; View leads</li>
                            <li>&#8226; Export data</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AddUserModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddUser}
                isLoading={mutationLoading}
                error={mutationError}
            />
        </div>
    );
}
