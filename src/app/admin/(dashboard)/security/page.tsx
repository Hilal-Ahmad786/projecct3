'use client';

import {
    ShieldCheckIcon,
    ShieldExclamationIcon,
    LockClosedIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XCircleIcon,
    GlobeAltIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const securityStats = [
    { name: 'Security Score', value: '92/100', status: 'good', icon: ShieldCheckIcon },
    { name: 'Blocked Attacks', value: '1,247', status: 'neutral', icon: ShieldExclamationIcon },
    { name: 'SSL Status', value: 'Active', status: 'good', icon: LockClosedIcon },
    { name: 'Threats Today', value: '3', status: 'warning', icon: ExclamationTriangleIcon },
];

const recentAlerts = [
    { type: 'warning', message: 'Multiple failed login attempts from IP 192.168.1.xxx', time: '5 mins ago', resolved: false },
    { type: 'info', message: 'SSL certificate renewed successfully', time: '2 hours ago', resolved: true },
    { type: 'critical', message: 'DDoS attack attempt blocked', time: '1 day ago', resolved: true },
    { type: 'warning', message: 'Suspicious activity detected from unknown region', time: '2 days ago', resolved: true },
    { type: 'info', message: 'Security scan completed - no issues found', time: '3 days ago', resolved: true },
];

const blockedIPs = [
    { ip: '192.168.1.100', reason: 'Brute force attempt', blocked: 'Jan 15, 2024', attempts: 156 },
    { ip: '10.0.0.55', reason: 'SQL injection attempt', blocked: 'Jan 14, 2024', attempts: 23 },
    { ip: '172.16.0.200', reason: 'XSS attack', blocked: 'Jan 13, 2024', attempts: 45 },
    { ip: '192.168.2.150', reason: 'Rate limit exceeded', blocked: 'Jan 12, 2024', attempts: 500 },
];

const securityChecklist = [
    { name: 'SSL/TLS Certificate', status: true, lastChecked: 'Today' },
    { name: 'Firewall Active', status: true, lastChecked: 'Today' },
    { name: 'DDoS Protection', status: true, lastChecked: 'Today' },
    { name: 'Two-Factor Authentication', status: true, lastChecked: 'Today' },
    { name: 'Rate Limiting', status: true, lastChecked: 'Today' },
    { name: 'Input Validation', status: true, lastChecked: 'Yesterday' },
    { name: 'CORS Configuration', status: true, lastChecked: 'Yesterday' },
    { name: 'Security Headers', status: false, lastChecked: 'Yesterday' },
];

export default function SecurityPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security</h1>
                    <p className="text-gray-500 mt-1">Monitor security threats and manage protection settings.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <ShieldCheckIcon className="w-5 h-5" />
                    Run Security Scan
                </button>
            </div>

            {/* Security Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {securityStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                stat.status === 'good' ? 'bg-emerald-100' :
                                stat.status === 'warning' ? 'bg-yellow-100' : 'bg-gray-100'
                            }`}>
                                <stat.icon className={`w-6 h-6 ${
                                    stat.status === 'good' ? 'text-emerald-600' :
                                    stat.status === 'warning' ? 'text-yellow-600' : 'text-gray-600'
                                }`} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.name}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Alerts */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Security Alerts</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentAlerts.map((alert, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 mt-2 rounded-full ${
                                        alert.type === 'critical' ? 'bg-red-500' :
                                        alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`} />
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-900">{alert.message}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <ClockIcon className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-500">{alert.time}</span>
                                            {alert.resolved ? (
                                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                                                    <CheckCircleIcon className="w-4 h-4" /> Resolved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                                                    <ExclamationTriangleIcon className="w-4 h-4" /> Active
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Checklist */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Security Checklist</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {securityChecklist.map((item, index) => (
                            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    {item.status ? (
                                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                                    ) : (
                                        <XCircleIcon className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className="text-sm text-gray-900">{item.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">Checked: {item.lastChecked}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blocked IPs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Blocked IP Addresses</h3>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700">+ Add IP</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blockedIPs.map((ip, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm font-mono text-gray-900">{ip.ip}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{ip.reason}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{ip.blocked}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{ip.attempts}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm text-red-600 hover:text-red-700">Unblock</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
