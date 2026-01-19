'use client';

import { useState } from 'react';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    status: 'active' | 'inactive';
    lastActive: string;
    avatar: string;
}

const mockUsers: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@paksoft.com', role: 'admin', status: 'active', lastActive: '2 mins ago', avatar: 'A' },
    { id: '2', name: 'Sarah Editor', email: 'sarah@paksoft.com', role: 'editor', status: 'active', lastActive: '1 hour ago', avatar: 'S' },
    { id: '3', name: 'John Viewer', email: 'john@paksoft.com', role: 'viewer', status: 'active', lastActive: '3 hours ago', avatar: 'J' },
    { id: '4', name: 'Mike Content', email: 'mike@paksoft.com', role: 'editor', status: 'inactive', lastActive: '2 days ago', avatar: 'M' },
    { id: '5', name: 'Lisa Support', email: 'lisa@paksoft.com', role: 'viewer', status: 'active', lastActive: '5 mins ago', avatar: 'L' },
];

const roleColors = {
    admin: 'bg-purple-100 text-purple-800',
    editor: 'bg-blue-100 text-blue-800',
    viewer: 'bg-gray-100 text-gray-800',
};

const statusColors = {
    active: 'bg-emerald-100 text-emerald-800',
    inactive: 'bg-red-100 text-red-800',
};

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users] = useState<User[]>(mockUsers);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-500 mt-1">Manage admin users and their permissions.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                    <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</div>
                    <div className="text-sm text-gray-500">Admins</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'editor').length}</div>
                    <div className="text-sm text-gray-500">Editors</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-emerald-600">{users.filter(u => u.status === 'active').length}</div>
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

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg font-medium">{user.avatar}</span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            {user.role === 'admin' && (
                                <ShieldCheckIcon className="w-5 h-5 text-purple-500" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                                {user.role}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status]}`}>
                                {user.status}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">
                            Last active: {user.lastActive}
                        </div>
                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <PencilIcon className="w-4 h-4" />
                                Edit
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <TrashIcon className="w-4 h-4" />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Roles & Permissions Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles & Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-800 mb-2">Admin</div>
                        <ul className="text-sm text-purple-600 space-y-1">
                            <li>• Full system access</li>
                            <li>• Manage users</li>
                            <li>• Configure settings</li>
                            <li>• View all reports</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800 mb-2">Editor</div>
                        <ul className="text-sm text-blue-600 space-y-1">
                            <li>• Edit content</li>
                            <li>• Manage leads</li>
                            <li>• View analytics</li>
                            <li>• Create reports</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800 mb-2">Viewer</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• View dashboard</li>
                            <li>• View analytics</li>
                            <li>• View leads</li>
                            <li>• Export data</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
