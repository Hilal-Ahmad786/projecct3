'use client';

import { useState } from 'react';
import {
    DocumentChartBarIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UsersIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

const reportTypes = [
    { id: 'traffic', name: 'Traffic Report', description: 'Website traffic and visitor analytics', icon: ChartBarIcon, color: 'bg-blue-500' },
    { id: 'leads', name: 'Leads Report', description: 'Lead generation and conversion metrics', icon: EnvelopeIcon, color: 'bg-emerald-500' },
    { id: 'revenue', name: 'Revenue Report', description: 'Revenue and financial performance', icon: CurrencyDollarIcon, color: 'bg-purple-500' },
    { id: 'users', name: 'User Activity', description: 'Admin user activity and actions', icon: UsersIcon, color: 'bg-orange-500' },
];

const recentReports = [
    { name: 'Monthly Traffic Report', date: 'Jan 15, 2024', type: 'Traffic', size: '2.4 MB', format: 'PDF' },
    { name: 'Q4 2023 Leads Analysis', date: 'Jan 10, 2024', type: 'Leads', size: '1.8 MB', format: 'PDF' },
    { name: 'Annual Revenue Summary', date: 'Jan 5, 2024', type: 'Revenue', size: '3.2 MB', format: 'Excel' },
    { name: 'December Analytics', date: 'Jan 2, 2024', type: 'Traffic', size: '1.5 MB', format: 'PDF' },
    { name: 'User Activity Log', date: 'Dec 28, 2023', type: 'Users', size: '890 KB', format: 'CSV' },
];

const scheduledReports = [
    { name: 'Weekly Traffic Summary', frequency: 'Every Monday', nextRun: 'Jan 22, 2024', status: 'active' },
    { name: 'Monthly Leads Report', frequency: 'First of month', nextRun: 'Feb 1, 2024', status: 'active' },
    { name: 'Quarterly Revenue', frequency: 'Every quarter', nextRun: 'Apr 1, 2024', status: 'active' },
];

export default function ReportsPage() {
    const [selectedReportType, setSelectedReportType] = useState('traffic');
    const [dateRange, setDateRange] = useState('last30');

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-500 mt-1">Generate and download comprehensive reports.</p>
                </div>
            </div>

            {/* Generate Report Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate New Report</h3>

                {/* Report Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {reportTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedReportType(type.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                                selectedReportType === type.id
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center mb-3`}>
                                <type.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="font-medium text-gray-900">{type.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                        </button>
                    ))}
                </div>

                {/* Date Range & Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                            >
                                <option value="last7">Last 7 days</option>
                                <option value="last30">Last 30 days</option>
                                <option value="last90">Last 90 days</option>
                                <option value="thisYear">This year</option>
                                <option value="custom">Custom range</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                            <option>PDF</option>
                            <option>Excel (XLSX)</option>
                            <option>CSV</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            <DocumentChartBarIcon className="w-5 h-5" />
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Reports */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentReports.map((report, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">{report.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {report.date} • {report.type} • {report.size}
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scheduled Reports */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700">+ Add Schedule</button>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {scheduledReports.map((report, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium text-gray-900">{report.name}</div>
                                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                                        {report.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {report.frequency} • Next: {report.nextRun}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">156</div>
                        <div className="text-sm text-gray-500">Reports Generated</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">12</div>
                        <div className="text-sm text-gray-500">Scheduled Reports</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">4.2 GB</div>
                        <div className="text-sm text-gray-500">Storage Used</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">89</div>
                        <div className="text-sm text-gray-500">Downloads This Month</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
