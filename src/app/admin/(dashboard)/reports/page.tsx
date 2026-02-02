'use client';

import { useState, useRef } from 'react';
import {
    DocumentChartBarIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UsersIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useRecentReports, useScheduledReports, useGenerateReport } from '@/hooks/admin/useReports';

const reportTypes = [
    { id: 'traffic', name: 'Traffic Report', description: 'Website traffic and visitor analytics', icon: ChartBarIcon, color: 'bg-blue-500' },
    { id: 'leads', name: 'Leads Report', description: 'Lead generation and conversion metrics', icon: EnvelopeIcon, color: 'bg-emerald-500' },
    { id: 'revenue', name: 'Revenue Report', description: 'Revenue and financial performance', icon: CurrencyDollarIcon, color: 'bg-purple-500' },
    { id: 'users', name: 'User Activity', description: 'Admin user activity and actions', icon: UsersIcon, color: 'bg-orange-500' },
];

const FORMAT_MAP: Record<string, string> = {
    'PDF': 'pdf',
    'Excel (XLSX)': 'xlsx',
    'CSV': 'csv',
};

function getDateRange(range: string): { start: string; end: string } {
    const end = new Date();
    const start = new Date();
    switch (range) {
        case 'last7':
            start.setDate(end.getDate() - 7);
            break;
        case 'last30':
            start.setDate(end.getDate() - 30);
            break;
        case 'last90':
            start.setDate(end.getDate() - 90);
            break;
        case 'thisYear':
            start.setMonth(0, 1);
            break;
        default:
            start.setDate(end.getDate() - 30);
    }
    return { start: start.toISOString(), end: end.toISOString() };
}

function SkeletonRow() {
    return (
        <div className="p-4 animate-pulse flex items-center justify-between">
            <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/5" />
                <div className="h-3 bg-gray-100 rounded w-2/5" />
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded" />
        </div>
    );
}

function SkeletonScheduleRow() {
    return (
        <div className="p-4 animate-pulse">
            <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-200 rounded w-2/5" />
                <div className="h-5 bg-gray-100 rounded-full w-14" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-3/5" />
        </div>
    );
}

export default function ReportsPage() {
    const [selectedReportType, setSelectedReportType] = useState('traffic');
    const [dateRange, setDateRange] = useState('last30');
    const [format, setFormat] = useState('PDF');
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { reports, isLoading: reportsLoading, mutate: mutateReports } = useRecentReports();
    const { scheduledReports, isLoading: scheduledLoading } = useScheduledReports();
    const { generateReport, isGenerating } = useGenerateReport();

    function showToast(type: 'success' | 'error', message: string) {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast({ type, message });
        toastTimer.current = setTimeout(() => setToast(null), 4000);
    }

    async function handleGenerate() {
        const selectedType = reportTypes.find((t) => t.id === selectedReportType);
        const { start, end } = getDateRange(dateRange);
        try {
            await generateReport({
                name: selectedType?.name ?? 'Report',
                type: selectedReportType,
                format: FORMAT_MAP[format] || 'pdf',
                dateRangeStart: start,
                dateRangeEnd: end,
            });
            showToast('success', 'Report generated successfully!');
            mutateReports();
        } catch {
            showToast('error', 'Failed to generate report. Please try again.');
        }
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all ${
                        toast.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    ) : (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

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
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        >
                            <option>PDF</option>
                            <option>Excel (XLSX)</option>
                            <option>CSV</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <DocumentChartBarIcon className="w-5 h-5" />
                                    Generate Report
                                </>
                            )}
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
                        {reportsLoading ? (
                            <>
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                            </>
                        ) : reports.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                No reports generated yet. Create your first report above.
                            </div>
                        ) : (
                            reports.map((report: { id: string; name: string; type: string; format: string; status: string; fileUrl?: string; createdAt: string }) => (
                                <div key={report.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-gray-900">{report.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            {' '}&bull; {report.type} &bull; {report.format?.toUpperCase()}
                                            {report.status === 'processing' && (
                                                <span className="ml-2 text-amber-600 font-medium">Processing...</span>
                                            )}
                                        </div>
                                    </div>
                                    {report.fileUrl ? (
                                        <a
                                            href={report.fileUrl}
                                            download
                                            className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                                        >
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <button className="p-2 text-gray-300 cursor-not-allowed" disabled>
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Scheduled Reports */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700">+ Add Schedule</button>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {scheduledLoading ? (
                            <>
                                <SkeletonScheduleRow />
                                <SkeletonScheduleRow />
                                <SkeletonScheduleRow />
                            </>
                        ) : scheduledReports.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                No scheduled reports yet.
                            </div>
                        ) : (
                            scheduledReports.map((report: { id: string; name: string; type: string; frequency: string; nextRunAt: string; status: string }) => (
                                <div key={report.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-medium text-gray-900">{report.name}</div>
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                report.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {report.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {report.frequency} &bull; Next: {new Date(report.nextRunAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            ))
                        )}
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
