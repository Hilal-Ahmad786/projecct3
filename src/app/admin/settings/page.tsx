'use client';

import { useState } from 'react';
import {
    CogIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    BellIcon,
    ShieldCheckIcon,
    PaintBrushIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'api', name: 'API Keys', icon: KeyIcon },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        siteName: 'PakSoft',
        siteUrl: 'https://paksoft.com',
        adminEmail: 'admin@paksoft.com',
        timezone: 'Europe/Istanbul',
        language: 'en',
        emailNotifications: true,
        pushNotifications: false,
        weeklyReports: true,
        twoFactor: true,
        sessionTimeout: '30',
        theme: 'light',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Configure your admin panel and site settings.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-emerald-500 text-emerald-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'general' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={formData.siteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                                <input
                                    type="url"
                                    name="siteUrl"
                                    value={formData.siteUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formData.adminEmail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="Europe/Istanbul">Europe/Istanbul (GMT+3)</option>
                                        <option value="America/New_York">America/New_York (EST)</option>
                                        <option value="Europe/London">Europe/London (GMT)</option>
                                        <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="en">English</option>
                                        <option value="tr">Türkçe</option>
                                        <option value="de">Deutsch</option>
                                        <option value="ur">اردو</option>
                                        <option value="ar">العربية</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                                    <input type="text" placeholder="587" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                                        <option>TLS</option>
                                        <option>SSL</option>
                                        <option>None</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                                <input type="text" placeholder="username" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
                            </div>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                Test Connection
                            </button>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Email Notifications</div>
                                    <div className="text-sm text-gray-500">Receive email alerts for new leads</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Push Notifications</div>
                                    <div className="text-sm text-gray-500">Get browser push notifications</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="pushNotifications" checked={formData.pushNotifications} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Weekly Reports</div>
                                    <div className="text-sm text-gray-500">Receive weekly summary reports</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="weeklyReports" checked={formData.weeklyReports} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                                    <div className="text-sm text-gray-500">Add an extra layer of security</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="twoFactor" checked={formData.twoFactor} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                <select name="sessionTimeout" value={formData.sessionTimeout} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="120">2 hours</option>
                                </select>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                                    Log Out All Sessions
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Theme</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <button className={`p-4 rounded-lg border-2 ${formData.theme === 'light' ? 'border-emerald-500' : 'border-gray-200'}`}>
                                        <div className="w-full h-20 bg-white rounded border border-gray-200 mb-2"></div>
                                        <span className="text-sm">Light</span>
                                    </button>
                                    <button className={`p-4 rounded-lg border-2 ${formData.theme === 'dark' ? 'border-emerald-500' : 'border-gray-200'}`}>
                                        <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                                        <span className="text-sm">Dark</span>
                                    </button>
                                    <button className={`p-4 rounded-lg border-2 ${formData.theme === 'system' ? 'border-emerald-500' : 'border-gray-200'}`}>
                                        <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 rounded mb-2"></div>
                                        <span className="text-sm">System</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'api' && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="text-sm text-yellow-800">
                                    Keep your API keys secure. Never share them publicly.
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                                <input type="text" placeholder="G-XXXXXXXXXX" className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
                                <input type="password" placeholder="••••••••••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">reCAPTCHA Site Key</label>
                                <input type="text" placeholder="6LcXXXXXXXXXXXXXXXXXXXXX" className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">reCAPTCHA Secret Key</label>
                                <input type="password" placeholder="••••••••••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono" />
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
