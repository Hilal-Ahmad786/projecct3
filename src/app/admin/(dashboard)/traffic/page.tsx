'use client';

import { useState, useMemo } from 'react';
import {
    GlobeAltIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    DeviceTabletIcon,
    MapPinIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ClockIcon,
    ArrowPathIcon,
    ArrowDownTrayIcon,
    LinkIcon,
    ChartBarIcon,
    EyeIcon,
    UserGroupIcon,
    BoltIcon,
    ExclamationTriangleIcon,
    ArrowRightIcon,
    CalendarIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { useTrafficLive, useTrafficSources, useTrafficGeographic, useTrafficDevices } from '@/hooks/admin/useTraffic';
import { useAnalyticsOverview, usePageViews } from '@/hooks/admin/useAnalytics';

// ─── Skeleton Components ────────────────────────────────────────────────────

function SkeletonBlock({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

function SkeletonRow() {
    return (
        <div className="flex items-center gap-4 py-3">
            <SkeletonBlock className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-1/3" />
                <SkeletonBlock className="h-2 w-full" />
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="p-4 border border-gray-100 rounded-lg space-y-3">
            <SkeletonBlock className="h-4 w-1/2" />
            <SkeletonBlock className="h-8 w-1/3" />
            <SkeletonBlock className="h-1.5 w-full" />
        </div>
    );
}

function SkeletonTable({ rows = 5, cols = 3 }: { rows?: number; cols?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4">
                {Array.from({ length: cols }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-4 flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    {Array.from({ length: cols }).map((_, j) => (
                        <SkeletonBlock key={j} className="h-6 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState({ message = 'No data available', icon: Icon = InboxIcon }: { message?: string; icon?: React.ElementType }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Icon className="w-12 h-12 mb-3" />
            <p className="text-sm">{message}</p>
        </div>
    );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const DEVICE_COLORS: Record<string, string> = {
    desktop: 'bg-blue-500',
    mobile: 'bg-emerald-500',
    tablet: 'bg-purple-500',
};

const DEVICE_ICONS: Record<string, React.ElementType> = {
    desktop: ComputerDesktopIcon,
    mobile: DevicePhoneMobileIcon,
    tablet: DeviceTabletIcon,
};

const BROWSER_COLORS: string[] = [
    'bg-yellow-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-gray-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
];

function colorToHex(cls: string): string {
    if (cls.includes('blue')) return '#3b82f6';
    if (cls.includes('yellow')) return '#eab308';
    if (cls.includes('orange')) return '#f97316';
    if (cls.includes('cyan')) return '#06b6d4';
    if (cls.includes('emerald')) return '#10b981';
    if (cls.includes('purple')) return '#8b5cf6';
    if (cls.includes('pink')) return '#ec4899';
    if (cls.includes('red')) return '#ef4444';
    return '#6b7280';
}

// ─── Donut Chart Component ──────────────────────────────────────────────────

function DonutChart({ data, size = 120 }: { data: { name: string; percentage: number; color: string }[]; size?: number }) {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;

    const totalPercentage = data.reduce((a, b) => a + b.percentage, 0);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                {data.map((item, idx) => {
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -currentOffset;
                    currentOffset += (item.percentage / 100) * circumference;

                    return (
                        <circle
                            key={idx}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={colorToHex(item.color)}
                            strokeWidth="20"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500"
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                        {Math.round(totalPercentage)}%
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                </div>
            </div>
        </div>
    );
}

// ─── World Map Component (CSS-based, adapted for dynamic data) ──────────────

function WorldMap({ countries }: { countries: { country: string; _count: number }[] }) {
    // Simplified continent shapes
    const regions = [
        { name: 'North America', path: 'M 80 60 Q 100 40 140 45 L 160 70 Q 150 100 120 110 L 90 95 Q 70 80 80 60' },
        { name: 'South America', path: 'M 120 130 Q 140 120 150 140 L 145 200 Q 130 220 115 200 L 110 150 Q 110 135 120 130' },
        { name: 'Europe', path: 'M 240 45 Q 270 35 290 45 L 300 70 Q 290 85 260 80 L 235 65 Q 235 50 240 45' },
        { name: 'Africa', path: 'M 250 90 Q 280 85 300 100 L 295 160 Q 270 180 245 160 L 240 110 Q 240 95 250 90' },
        { name: 'Asia', path: 'M 310 40 Q 380 30 420 50 L 430 100 Q 400 120 350 110 L 310 80 Q 300 60 310 40' },
        { name: 'Oceania', path: 'M 400 150 Q 430 145 450 160 L 445 185 Q 420 195 400 180 L 395 165 Q 395 155 400 150' },
    ];

    const total = countries.reduce((sum, c) => sum + c._count, 0);

    return (
        <div className="relative bg-slate-900 rounded-xl overflow-hidden">
            <svg viewBox="0 0 500 250" className="w-full h-64">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="500" height="250" fill="#0f172a" />
                <rect width="500" height="250" fill="url(#grid)" opacity="0.3" />

                {regions.map((region, idx) => (
                    <path
                        key={idx}
                        d={region.path}
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1"
                    />
                ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>{countries.length} countries</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>{total.toLocaleString()} total visits</span>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function TrafficPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const [showExportMenu, setShowExportMenu] = useState(false);

    // Data hooks
    const { activeVisitors, activePages, isLoading: liveLoading } = useTrafficLive();
    const { sources, isLoading: sourcesLoading } = useTrafficSources(selectedPeriod);
    const { countries, isLoading: geoLoading } = useTrafficGeographic(selectedPeriod);
    const { devices, browsers, isLoading: devicesLoading } = useTrafficDevices(selectedPeriod);
    const { overview, trends, isLoading: overviewLoading } = useAnalyticsOverview(selectedPeriod);
    const { total: totalPageViews, topPages, isLoading: pageViewsLoading } = usePageViews(selectedPeriod);

    // Derived device data with percentages
    const deviceData = useMemo(() => {
        if (!devices || devices.length === 0) return [];
        const total = devices.reduce((sum: number, d: { device: string; _count: number }) => sum + d._count, 0);
        return devices.map((d: { device: string; _count: number }) => {
            const name = d.device?.toLowerCase() || 'unknown';
            const percentage = total > 0 ? Math.round((d._count / total) * 100) : 0;
            return {
                name: d.device || 'Unknown',
                count: d._count,
                percentage,
                color: DEVICE_COLORS[name] || 'bg-gray-500',
                icon: DEVICE_ICONS[name] || ComputerDesktopIcon,
            };
        });
    }, [devices]);

    // Derived browser data with percentages
    const browserData = useMemo(() => {
        if (!browsers || browsers.length === 0) return [];
        const total = browsers.reduce((sum: number, b: { browser: string; _count: number }) => sum + b._count, 0);
        return browsers.map((b: { browser: string; _count: number }, i: number) => {
            const percentage = total > 0 ? Math.round((b._count / total) * 100) : 0;
            return {
                name: b.browser || 'Unknown',
                count: b._count,
                percentage,
                color: BROWSER_COLORS[i % BROWSER_COLORS.length],
            };
        });
    }, [browsers]);

    // Derived source data with percentages
    const sourceData = useMemo(() => {
        if (!sources || !Array.isArray(sources) || sources.length === 0) return [];
        const total = sources.reduce((sum: number, s: { referrer: string; _count: number }) => sum + s._count, 0);
        return sources.map((s: { referrer: string; _count: number }) => {
            const percentage = total > 0 ? Math.round((s._count / total) * 100) : 0;
            return {
                source: s.referrer || 'Direct',
                count: s._count,
                percentage,
            };
        });
    }, [sources]);

    // Derived country data
    const countryData = useMemo(() => {
        if (!countries || countries.length === 0) return [];
        const total = countries.reduce((sum: number, c: { country: string; _count: number }) => sum + c._count, 0);
        return countries.map((c: { country: string; _count: number }) => {
            const percentage = total > 0 ? Math.round((c._count / total) * 100) : 0;
            return {
                name: c.country || 'Unknown',
                count: c._count,
                percentage,
            };
        });
    }, [countries]);

    // Export handler
    const exportData = (format: 'csv' | 'json' | 'pdf') => {
        const data = {
            exportDate: new Date().toISOString(),
            period: selectedPeriod,
            overview,
            devices: deviceData,
            countries: countryData,
            browsers: browserData,
            sources: sourceData,
            topPages,
        };

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `traffic-report-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        } else if (format === 'csv') {
            const headers = ['Page', 'Views'];
            const rows = topPages.map((p: { page: string; count: number }) => [p.page, p.count]);
            const csv = [headers.join(','), ...rows.map((r: (string | number)[]) => r.join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `traffic-report-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
        }
        setShowExportMenu(false);
    };

    const periodLabel = selectedPeriod === '7d' ? 'Last 7 days' : selectedPeriod === '30d' ? 'Last 30 days' : 'Last 90 days';

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Traffic Analytics</h1>
                    <p className="text-gray-500 mt-1">Comprehensive traffic insights and visitor behavior analysis.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Export
                        </button>
                        {showExportMenu && (
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                <button
                                    onClick={() => exportData('csv')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                >
                                    Export as CSV
                                </button>
                                <button
                                    onClick={() => exportData('json')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                >
                                    Export as JSON
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Real-time Banner */}
            <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50"></div>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="text-sm font-medium tracking-wider">LIVE TRAFFIC</span>
                        <ArrowPathIcon className="w-4 h-4 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    {liveLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <div className="animate-pulse bg-white/20 rounded h-12 w-20 mb-1" />
                                    <div className="animate-pulse bg-white/10 rounded h-4 w-28" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                            <div>
                                <div className="text-5xl font-bold mb-1">{activeVisitors}</div>
                                <div className="text-emerald-100">Active visitors now</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">{activePages?.length || 0}</div>
                                <div className="text-emerald-100">Pages being viewed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">{countryData.length}</div>
                                <div className="text-emerald-100">Countries ({periodLabel})</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">{totalPageViews.toLocaleString()}</div>
                                <div className="text-emerald-100">Page views ({periodLabel})</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Period Overview Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Overview Metrics</h3>
                        <p className="text-sm text-gray-500">{periodLabel} performance summary</p>
                    </div>
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                {overviewLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                                <SkeletonBlock className="h-3 w-16" />
                                <SkeletonBlock className="h-6 w-20" />
                                <SkeletonBlock className="h-3 w-12" />
                            </div>
                        ))}
                    </div>
                ) : overview ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: 'Page Views', value: overview.pageViews, trend: trends?.pageViews },
                            { label: 'Unique Visitors', value: overview.uniqueVisitors, trend: trends?.uniqueVisitors },
                            { label: 'Total Leads', value: overview.totalLeads },
                            { label: 'New Leads', value: overview.newLeads },
                            { label: 'Project Requests', value: overview.projectRequests },
                            { label: 'Contact Messages', value: overview.contactMessages },
                        ].map((metric, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                <div className="text-xl font-bold text-gray-900">
                                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value ?? '--'}
                                </div>
                                {metric.trend !== undefined && (
                                    <div className={`flex items-center gap-1 text-xs mt-1 ${metric.trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {metric.trend >= 0 ? (
                                            <ArrowTrendingUpIcon className="w-3 h-3" />
                                        ) : (
                                            <ArrowTrendingDownIcon className="w-3 h-3" />
                                        )}
                                        {Math.abs(metric.trend).toFixed(1)}% vs prev
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No overview data available yet" icon={ChartBarIcon} />
                )}
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
                        <p className="text-sm text-gray-500">Visitor locations for {periodLabel.toLowerCase()}</p>
                    </div>
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                </div>
                {geoLoading ? (
                    <div className="space-y-4">
                        <SkeletonBlock className="h-64 w-full rounded-xl" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-2 p-2">
                                    <SkeletonBlock className="w-8 h-8 rounded" />
                                    <div className="flex-1 space-y-1">
                                        <SkeletonBlock className="h-4 w-24" />
                                        <SkeletonBlock className="h-3 w-16" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : countryData.length > 0 ? (
                    <>
                        <WorldMap countries={countries} />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {countryData.slice(0, 8).map((country, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <GlobeAltIcon className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{country.name}</div>
                                        <div className="text-xs text-gray-500">{country.count.toLocaleString()} visits</div>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">{country.percentage}%</div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState message="No geographic data available yet" icon={GlobeAltIcon} />
                )}
            </div>

            {/* Device & Browser Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Device Breakdown</h3>
                        <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    {devicesLoading ? (
                        <div className="space-y-4">
                            <div className="flex justify-center"><SkeletonBlock className="w-40 h-40 rounded-full" /></div>
                            {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
                        </div>
                    ) : deviceData.length > 0 ? (
                        <>
                            <div className="flex items-center justify-center mb-6">
                                <DonutChart
                                    data={deviceData.map(d => ({ name: d.name, percentage: d.percentage, color: d.color }))}
                                    size={160}
                                />
                            </div>
                            <div className="space-y-4">
                                {deviceData.map((device, index) => {
                                    const DeviceIcon = device.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${device.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <DeviceIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-medium text-gray-900">{device.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">{device.count.toLocaleString()}</span>
                                                        <span className="text-xs text-gray-400">{device.percentage}%</span>
                                                    </div>
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${device.color} rounded-full transition-all duration-500`} style={{ width: `${device.percentage}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <EmptyState message="No device data available yet" icon={DevicePhoneMobileIcon} />
                    )}
                </div>

                {/* Browser Statistics */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Browser Usage</h3>
                        <ComputerDesktopIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    {devicesLoading ? (
                        <div className="space-y-4">
                            <div className="flex justify-center"><SkeletonBlock className="w-40 h-40 rounded-full" /></div>
                            {[1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}
                        </div>
                    ) : browserData.length > 0 ? (
                        <>
                            <div className="flex items-center justify-center mb-6">
                                <DonutChart
                                    data={browserData.map(b => ({ name: b.name, percentage: b.percentage, color: b.color }))}
                                    size={160}
                                />
                            </div>
                            <div className="space-y-3">
                                {browserData.map((browser, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className={`w-3 h-3 ${browser.color} rounded-full flex-shrink-0`} />
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-900">{browser.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">{browser.count.toLocaleString()}</span>
                                                    <span className="text-xs text-gray-400">{browser.percentage}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${browser.color} rounded-full transition-all duration-500`}
                                                    style={{ width: `${browser.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <EmptyState message="No browser data available yet" icon={ComputerDesktopIcon} />
                    )}
                </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                        <p className="text-sm text-gray-500">Where your visitors are coming from</p>
                    </div>
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                </div>
                {sourcesLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
                    </div>
                ) : sourceData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sourceData.map((referrer, idx) => (
                            <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                            referrer
                                        </span>
                                        <span className="font-medium text-gray-900">{referrer.source}</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{referrer.count.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">visits</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-emerald-600">{referrer.percentage}%</div>
                                        <div className="text-xs text-gray-500">of total</div>
                                    </div>
                                </div>
                                <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all"
                                        style={{ width: `${referrer.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No traffic source data available yet" icon={LinkIcon} />
                )}
            </div>

            {/* Page Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
                        <p className="text-sm text-gray-500">Most viewed pages for {periodLabel.toLowerCase()}</p>
                    </div>
                    <BoltIcon className="w-5 h-5 text-gray-400" />
                </div>
                {pageViewsLoading ? (
                    <SkeletonTable rows={7} cols={3} />
                ) : topPages.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {topPages.map((page: { page: string; count: number }, idx: number) => {
                                    const share = totalPageViews > 0 ? Math.round((page.count / totalPageViews) * 100) : 0;
                                    return (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-400">{idx + 1}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{page.page}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{page.count.toLocaleString()}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-emerald-500"
                                                            style={{ width: `${share}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-600">{share}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState message="No page view data available yet" icon={EyeIcon} />
                )}
            </div>

            {/* User Journey Flow - Simplified empty state since real journey data requires session tracking */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">User Journey Flow</h3>
                        <p className="text-sm text-gray-500">How visitors navigate through your site</p>
                    </div>
                    <UserGroupIcon className="w-5 h-5 text-gray-400" />
                </div>
                {topPages.length >= 2 ? (
                    <div className="space-y-3">
                        {topPages.slice(0, -1).map((page: { page: string; count: number }, idx: number) => {
                            const nextPage = topPages[idx + 1];
                            if (!nextPage) return null;
                            const flowPercentage = totalPageViews > 0 ? Math.round((nextPage.count / page.count) * 100) : 0;
                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium truncate max-w-[150px]">
                                            {page.page}
                                        </div>
                                        <div className="flex-1 relative">
                                            <div className="h-0.5 bg-gray-200 w-full absolute top-1/2 -translate-y-1/2"></div>
                                            <div
                                                className="h-0.5 bg-emerald-500 absolute top-1/2 -translate-y-1/2 transition-all"
                                                style={{ width: `${Math.min(flowPercentage, 100)}%` }}
                                            ></div>
                                            <ArrowRightIcon className="w-4 h-4 text-emerald-500 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white" />
                                        </div>
                                        <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium truncate max-w-[150px]">
                                            {nextPage.page}
                                        </div>
                                    </div>
                                    <div className="text-right min-w-[80px]">
                                        <div className="text-sm font-semibold text-gray-900">{nextPage.count.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">{flowPercentage}% flow</div>
                                    </div>
                                </div>
                            );
                        })}
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            Based on top page view rankings. Actual navigation paths require session-level tracking.
                        </p>
                    </div>
                ) : (
                    <EmptyState message="Not enough page data to show user journeys" icon={UserGroupIcon} />
                )}
            </div>

            {/* Real-time Active Pages */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <h3 className="text-lg font-semibold text-gray-900">Active Pages</h3>
                    <span className="text-sm text-gray-500 ml-2">Live updates every 5s</span>
                </div>
                {liveLoading ? (
                    <SkeletonTable rows={5} cols={2} />
                ) : activePages && activePages.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Visitors</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {activePages.map((item: { page: string; visitors: number }, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.page}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                <span className="text-sm text-gray-900 font-semibold">{item.visitors} users</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState message="No active pages right now" icon={EyeIcon} />
                )}
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {overviewLoading ? (
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <SkeletonBlock className="w-10 h-10 rounded-lg" />
                                <div className="space-y-1">
                                    <SkeletonBlock className="h-3 w-20" />
                                    <SkeletonBlock className="h-5 w-16" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    [
                        {
                            icon: EyeIcon,
                            label: 'Total Page Views',
                            value: totalPageViews.toLocaleString(),
                            change: trends?.pageViews,
                        },
                        {
                            icon: UserGroupIcon,
                            label: 'Unique Visitors',
                            value: overview?.uniqueVisitors?.toLocaleString() ?? '--',
                            change: trends?.uniqueVisitors,
                        },
                        {
                            icon: ChartBarIcon,
                            label: 'Total Leads',
                            value: overview?.totalLeads?.toLocaleString() ?? '--',
                        },
                        {
                            icon: ExclamationTriangleIcon,
                            label: 'Contact Messages',
                            value: overview?.contactMessages?.toLocaleString() ?? '--',
                        },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">{stat.label}</div>
                                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                    {stat.change !== undefined && (
                                        <div className={`text-xs ${stat.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}%
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
