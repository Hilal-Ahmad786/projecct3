'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    CogIcon,
    EnvelopeIcon,
    BellIcon,
    ShieldCheckIcon,
    PaintBrushIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { useSettings, useSettingsMutations } from '@/hooks/admin/useSettings';

const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'api', name: 'API Keys', icon: KeyIcon },
];

// Default values used as fallback when settings haven't been saved yet
const defaultFormData: Record<string, string | boolean> = {
    siteName: '',
    siteUrl: '',
    adminEmail: '',
    timezone: 'Europe/Istanbul',
    language: 'en',
    smtpHost: '',
    smtpPort: '',
    smtpEncryption: 'TLS',
    smtpUsername: '',
    smtpPassword: '',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    twoFactor: true,
    sessionTimeout: '30',
    theme: 'light',
    googleAnalyticsId: '',
    googleMapsApiKey: '',
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
};

// Maps each setting key to its category for bulkUpdateSettings
const keyToCategoryMap: Record<string, string> = {
    siteName: 'general',
    siteUrl: 'general',
    adminEmail: 'general',
    timezone: 'general',
    language: 'general',
    smtpHost: 'email',
    smtpPort: 'email',
    smtpEncryption: 'email',
    smtpUsername: 'email',
    smtpPassword: 'email',
    emailNotifications: 'notifications',
    pushNotifications: 'notifications',
    weeklyReports: 'notifications',
    twoFactor: 'security',
    sessionTimeout: 'security',
    theme: 'appearance',
    googleAnalyticsId: 'api',
    googleMapsApiKey: 'api',
    recaptchaSiteKey: 'api',
    recaptchaSecretKey: 'api',
};

function parseSettingValue(value: string): string | boolean {
    try {
        const parsed = JSON.parse(value);
        return parsed;
    } catch {
        return value;
    }
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState<Record<string, string | boolean>>(defaultFormData);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const { settings, isLoading, isError } = useSettings();
    const { bulkUpdateSettings, isUpdating } = useSettingsMutations();

    // Populate formData from database settings once loaded
    useEffect(() => {
        if (settings && settings.length > 0) {
            const loaded: Record<string, string | boolean> = { ...defaultFormData };
            for (const setting of settings) {
                if (setting.key in defaultFormData) {
                    loaded[setting.key] = parseSettingValue(setting.value);
                }
            }
            setFormData(loaded);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleThemeChange = (theme: string) => {
        setFormData(prev => ({ ...prev, theme }));
    };

    const handleSave = useCallback(async () => {
        setSaveMessage(null);
        try {
            const settingsToUpdate = Object.entries(formData).map(([key, value]) => ({
                key,
                value: JSON.stringify(value),
                category: keyToCategoryMap[key] || 'general',
            }));
            await bulkUpdateSettings(settingsToUpdate);
            setSaveMessage({ type: 'success', text: 'Settings saved successfully!' });
            setTimeout(() => setSaveMessage(null), 4000);
        } catch {
            setSaveMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
            setTimeout(() => setSaveMessage(null), 4000);
        }
    }, [formData, bulkUpdateSettings]);

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Configure your admin panel and site settings.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-12 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 text-sm">Loading settings...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Configure your admin panel and site settings.</p>
                </div>
                <div className="bg-white rounded-xl border border-red-200 p-12 flex items-center justify-center">
                    <p className="text-red-600 text-sm">Failed to load settings. Please refresh the page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Configure your admin panel and site settings.</p>
            </div>

            {/* Toast message */}
            {saveMessage && (
                <div className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    saveMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {saveMessage.text}
                </div>
            )}

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
                                    value={formData.siteName as string}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                                <input
                                    type="url"
                                    name="siteUrl"
                                    value={formData.siteUrl as string}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formData.adminEmail as string}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone as string}
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
                                        value={formData.language as string}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="en">English</option>
                                        <option value="tr">Turkce</option>
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
                                <input
                                    type="text"
                                    name="smtpHost"
                                    value={formData.smtpHost as string}
                                    onChange={handleChange}
                                    placeholder="smtp.example.com"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                                    <input
                                        type="text"
                                        name="smtpPort"
                                        value={formData.smtpPort as string}
                                        onChange={handleChange}
                                        placeholder="587"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                                    <select
                                        name="smtpEncryption"
                                        value={formData.smtpEncryption as string}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                    >
                                        <option>TLS</option>
                                        <option>SSL</option>
                                        <option>None</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                                <input
                                    type="text"
                                    name="smtpUsername"
                                    value={formData.smtpUsername as string}
                                    onChange={handleChange}
                                    placeholder="username"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                                <input
                                    type="password"
                                    name="smtpPassword"
                                    value={formData.smtpPassword as string}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                                />
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
                                    <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications as boolean} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Push Notifications</div>
                                    <div className="text-sm text-gray-500">Get browser push notifications</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="pushNotifications" checked={formData.pushNotifications as boolean} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-gray-900">Weekly Reports</div>
                                    <div className="text-sm text-gray-500">Receive weekly summary reports</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="weeklyReports" checked={formData.weeklyReports as boolean} onChange={handleChange} className="sr-only peer" />
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
                                    <input type="checkbox" name="twoFactor" checked={formData.twoFactor as boolean} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                <select name="sessionTimeout" value={formData.sessionTimeout as string} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg">
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
                                    <button onClick={() => handleThemeChange('light')} className={`p-4 rounded-lg border-2 ${formData.theme === 'light' ? 'border-emerald-500' : 'border-gray-200'}`}>
                                        <div className="w-full h-20 bg-white rounded border border-gray-200 mb-2"></div>
                                        <span className="text-sm">Light</span>
                                    </button>
                                    <button onClick={() => handleThemeChange('dark')} className={`p-4 rounded-lg border-2 ${formData.theme === 'dark' ? 'border-emerald-500' : 'border-gray-200'}`}>
                                        <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                                        <span className="text-sm">Dark</span>
                                    </button>
                                    <button onClick={() => handleThemeChange('system')} className={`p-4 rounded-lg border-2 ${formData.theme === 'system' ? 'border-emerald-500' : 'border-gray-200'}`}>
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
                                <input
                                    type="text"
                                    name="googleAnalyticsId"
                                    value={formData.googleAnalyticsId as string}
                                    onChange={handleChange}
                                    placeholder="G-XXXXXXXXXX"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
                                <input
                                    type="password"
                                    name="googleMapsApiKey"
                                    value={formData.googleMapsApiKey as string}
                                    onChange={handleChange}
                                    placeholder="••••••••••••••••"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">reCAPTCHA Site Key</label>
                                <input
                                    type="text"
                                    name="recaptchaSiteKey"
                                    value={formData.recaptchaSiteKey as string}
                                    onChange={handleChange}
                                    placeholder="6LcXXXXXXXXXXXXXXXXXXXXX"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">reCAPTCHA Secret Key</label>
                                <input
                                    type="password"
                                    name="recaptchaSecretKey"
                                    value={formData.recaptchaSecretKey as string}
                                    onChange={handleChange}
                                    placeholder="••••••••••••••••"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <button
                            onClick={handleSave}
                            disabled={isUpdating}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
