'use client';

import { useState, useEffect, useCallback } from 'react';
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
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline';

// Types
interface DeviceStat {
    name: string;
    icon: React.ElementType;
    visitors: number;
    percentage: number;
    color: string;
    previousVisitors: number;
}

interface Country {
    name: string;
    code: string;
    flag: string;
    visitors: number;
    percentage: number;
    lat: number;
    lng: number;
}

interface Browser {
    name: string;
    percentage: number;
    color: string;
    icon: string;
    previousPercentage: number;
}

interface Referrer {
    source: string;
    url: string;
    visitors: number;
    percentage: number;
    type: 'social' | 'search' | 'direct' | 'referral';
}

interface PageMetric {
    page: string;
    views: number;
    avgTime: string;
    bounceRate: number;
    loadTime: number;
    exitRate: number;
}

interface JourneyStep {
    from: string;
    to: string;
    users: number;
    percentage: number;
}

interface HourlyData {
    hour: number;
    visitors: number;
    dayOfWeek: number;
}

// Mock Data
const deviceStats: DeviceStat[] = [
    { name: 'Desktop', icon: ComputerDesktopIcon, visitors: 6420, percentage: 51, color: 'bg-blue-500', previousVisitors: 5980 },
    { name: 'Mobile', icon: DevicePhoneMobileIcon, visitors: 4980, percentage: 40, color: 'bg-emerald-500', previousVisitors: 5200 },
    { name: 'Tablet', icon: DeviceTabletIcon, visitors: 1143, percentage: 9, color: 'bg-purple-500', previousVisitors: 1100 },
];

const countries: Country[] = [
    { name: 'United States', code: 'US', flag: '\u{1F1FA}\u{1F1F8}', visitors: 4250, percentage: 34, lat: 40, lng: -100 },
    { name: 'Germany', code: 'DE', flag: '\u{1F1E9}\u{1F1EA}', visitors: 2180, percentage: 17, lat: 51, lng: 10 },
    { name: 'Turkey', code: 'TR', flag: '\u{1F1F9}\u{1F1F7}', visitors: 1890, percentage: 15, lat: 39, lng: 35 },
    { name: 'United Kingdom', code: 'GB', flag: '\u{1F1EC}\u{1F1E7}', visitors: 1420, percentage: 11, lat: 54, lng: -2 },
    { name: 'Pakistan', code: 'PK', flag: '\u{1F1F5}\u{1F1F0}', visitors: 1150, percentage: 9, lat: 30, lng: 70 },
    { name: 'India', code: 'IN', flag: '\u{1F1EE}\u{1F1F3}', visitors: 890, percentage: 7, lat: 20, lng: 77 },
    { name: 'Canada', code: 'CA', flag: '\u{1F1E8}\u{1F1E6}', visitors: 620, percentage: 5, lat: 56, lng: -106 },
    { name: 'France', code: 'FR', flag: '\u{1F1EB}\u{1F1F7}', visitors: 340, percentage: 2, lat: 46, lng: 2 },
];

const browsers: Browser[] = [
    { name: 'Chrome', percentage: 62, color: 'bg-yellow-500', icon: '\u{1F7E1}', previousPercentage: 58 },
    { name: 'Safari', percentage: 21, color: 'bg-blue-500', icon: '\u{1F535}', previousPercentage: 23 },
    { name: 'Firefox', percentage: 10, color: 'bg-orange-500', icon: '\u{1F7E0}', previousPercentage: 11 },
    { name: 'Edge', percentage: 5, color: 'bg-cyan-500', icon: '\u{1F7E2}', previousPercentage: 4 },
    { name: 'Others', percentage: 2, color: 'bg-gray-500', icon: '\u{26AA}', previousPercentage: 4 },
];

const referrers: Referrer[] = [
    { source: 'Google', url: 'https://google.com', visitors: 3250, percentage: 42, type: 'search' },
    { source: 'Facebook', url: 'https://facebook.com', visitors: 1890, percentage: 24, type: 'social' },
    { source: 'Twitter/X', url: 'https://x.com', visitors: 980, percentage: 13, type: 'social' },
    { source: 'Direct', url: '#', visitors: 720, percentage: 9, type: 'direct' },
    { source: 'LinkedIn', url: 'https://linkedin.com', visitors: 540, percentage: 7, type: 'social' },
    { source: 'Bing', url: 'https://bing.com', visitors: 230, percentage: 3, type: 'search' },
    { source: 'Reddit', url: 'https://reddit.com', visitors: 140, percentage: 2, type: 'referral' },
];

const pageMetrics: PageMetric[] = [
    { page: '/', views: 12450, avgTime: '2:34', bounceRate: 32, loadTime: 1.2, exitRate: 18 },
    { page: '/services', views: 8920, avgTime: '3:12', bounceRate: 28, loadTime: 1.5, exitRate: 22 },
    { page: '/services/web-development', views: 6780, avgTime: '4:45', bounceRate: 22, loadTime: 1.8, exitRate: 15 },
    { page: '/contact', views: 4560, avgTime: '1:56', bounceRate: 45, loadTime: 1.1, exitRate: 65 },
    { page: '/about', views: 3890, avgTime: '2:08', bounceRate: 38, loadTime: 1.3, exitRate: 28 },
    { page: '/projects', views: 3240, avgTime: '3:28', bounceRate: 25, loadTime: 2.1, exitRate: 20 },
    { page: '/blog', views: 2890, avgTime: '5:12', bounceRate: 18, loadTime: 1.7, exitRate: 35 },
];

const userJourneys: JourneyStep[] = [
    { from: 'Homepage', to: 'Services', users: 3420, percentage: 45 },
    { from: 'Services', to: 'Web Development', users: 2180, percentage: 64 },
    { from: 'Web Development', to: 'Contact', users: 1560, percentage: 72 },
    { from: 'Homepage', to: 'About', users: 1890, percentage: 25 },
    { from: 'About', to: 'Projects', users: 980, percentage: 52 },
    { from: 'Projects', to: 'Contact', users: 620, percentage: 63 },
    { from: 'Blog', to: 'Services', users: 540, percentage: 38 },
];

// Generate hourly heatmap data
const generateHeatmapData = (): HourlyData[] => {
    const data: HourlyData[] = [];
    for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
            // Simulate realistic traffic patterns
            let baseTraffic = 50;
            // Higher traffic during work hours
            if (hour >= 9 && hour <= 17) baseTraffic += 100;
            // Peak at 10am and 2pm
            if (hour === 10 || hour === 14) baseTraffic += 50;
            // Lower on weekends
            if (day === 0 || day === 6) baseTraffic *= 0.6;
            // Random variation
            const visitors = Math.floor(baseTraffic + Math.random() * 50);
            data.push({ hour, visitors, dayOfWeek: day });
        }
    }
    return data;
};

const heatmapData = generateHeatmapData();

// Comparison data
const comparisonMetrics = {
    current: {
        visitors: 12543,
        pageViews: 45678,
        avgSessionDuration: '3:24',
        bounceRate: 32.5,
        newUsers: 8234,
        returningUsers: 4309,
    },
    previous: {
        visitors: 11280,
        pageViews: 41234,
        avgSessionDuration: '3:02',
        bounceRate: 35.8,
        newUsers: 7456,
        returningUsers: 3824,
    },
};

// World Map Component (CSS-based)
function WorldMap({ countries }: { countries: Country[] }) {
    const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

    // Simplified world map coordinates for major regions
    const regions = [
        { name: 'North America', path: 'M 80 60 Q 100 40 140 45 L 160 70 Q 150 100 120 110 L 90 95 Q 70 80 80 60', color: '#e5e7eb' },
        { name: 'South America', path: 'M 120 130 Q 140 120 150 140 L 145 200 Q 130 220 115 200 L 110 150 Q 110 135 120 130', color: '#e5e7eb' },
        { name: 'Europe', path: 'M 240 45 Q 270 35 290 45 L 300 70 Q 290 85 260 80 L 235 65 Q 235 50 240 45', color: '#e5e7eb' },
        { name: 'Africa', path: 'M 250 90 Q 280 85 300 100 L 295 160 Q 270 180 245 160 L 240 110 Q 240 95 250 90', color: '#e5e7eb' },
        { name: 'Asia', path: 'M 310 40 Q 380 30 420 50 L 430 100 Q 400 120 350 110 L 310 80 Q 300 60 310 40', color: '#e5e7eb' },
        { name: 'Oceania', path: 'M 400 150 Q 430 145 450 160 L 445 185 Q 420 195 400 180 L 395 165 Q 395 155 400 150', color: '#e5e7eb' },
    ];

    // Map country coordinates to map positions
    const getPosition = (country: Country) => {
        // Normalize coordinates to SVG viewport (500x250)
        const x = ((country.lng + 180) / 360) * 500;
        const y = ((90 - country.lat) / 180) * 250;
        return { x, y };
    };

    return (
        <div className="relative bg-slate-900 rounded-xl overflow-hidden">
            <svg viewBox="0 0 500 250" className="w-full h-64">
                {/* Background grid */}
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="500" height="250" fill="#0f172a" />
                <rect width="500" height="250" fill="url(#grid)" opacity="0.3" />

                {/* Simplified continent shapes */}
                {regions.map((region, idx) => (
                    <path
                        key={idx}
                        d={region.path}
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1"
                    />
                ))}

                {/* Connection lines */}
                {countries.slice(0, 5).map((country, idx) => {
                    const pos = getPosition(country);
                    return (
                        <g key={`line-${idx}`}>
                            <line
                                x1="250"
                                y1="125"
                                x2={pos.x}
                                y2={pos.y}
                                stroke="#10b981"
                                strokeWidth="1"
                                strokeDasharray="4,4"
                                opacity="0.3"
                            />
                        </g>
                    );
                })}

                {/* Country markers */}
                {countries.map((country, idx) => {
                    const pos = getPosition(country);
                    const size = Math.max(4, Math.min(12, country.percentage / 3));
                    return (
                        <g
                            key={idx}
                            onMouseEnter={() => setHoveredCountry(country)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            className="cursor-pointer"
                        >
                            {/* Pulse animation */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={size + 4}
                                fill="#10b981"
                                opacity="0.2"
                                className="animate-ping"
                            />
                            {/* Main marker */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={size}
                                fill="#10b981"
                                stroke="#fff"
                                strokeWidth="1"
                            />
                            {/* Country code */}
                            <text
                                x={pos.x}
                                y={pos.y - size - 4}
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="8"
                                fontWeight="500"
                            >
                                {country.code}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredCountry && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 min-w-[150px]">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{hoveredCountry.flag}</span>
                        <span className="font-medium text-gray-900">{hoveredCountry.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div>{hoveredCountry.visitors.toLocaleString()} visitors</div>
                        <div>{hoveredCountry.percentage}% of traffic</div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>High traffic</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-50"></div>
                    <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-25"></div>
                    <span>Low</span>
                </div>
            </div>
        </div>
    );
}

// Traffic Heatmap Component
function TrafficHeatmap({ data }: { data: HourlyData[] }) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getIntensity = (visitors: number) => {
        const max = Math.max(...data.map(d => d.visitors));
        return visitors / max;
    };

    const getColor = (intensity: number) => {
        if (intensity < 0.2) return 'bg-emerald-100';
        if (intensity < 0.4) return 'bg-emerald-200';
        if (intensity < 0.6) return 'bg-emerald-400';
        if (intensity < 0.8) return 'bg-emerald-500';
        return 'bg-emerald-600';
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px]">
                {/* Hours header */}
                <div className="flex mb-2">
                    <div className="w-12"></div>
                    {hours.map(hour => (
                        <div
                            key={hour}
                            className="flex-1 text-center text-xs text-gray-500"
                        >
                            {hour % 3 === 0 ? `${hour}:00` : ''}
                        </div>
                    ))}
                </div>

                {/* Heatmap grid */}
                {days.map((day, dayIdx) => (
                    <div key={day} className="flex items-center mb-1">
                        <div className="w-12 text-xs text-gray-500 font-medium">{day}</div>
                        {hours.map(hour => {
                            const entry = data.find(d => d.dayOfWeek === dayIdx && d.hour === hour);
                            const intensity = entry ? getIntensity(entry.visitors) : 0;
                            return (
                                <div
                                    key={hour}
                                    className={`flex-1 h-6 mx-0.5 rounded-sm ${getColor(intensity)} cursor-pointer transition-transform hover:scale-110`}
                                    title={`${day} ${hour}:00 - ${entry?.visitors || 0} visitors`}
                                />
                            );
                        })}
                    </div>
                ))}

                {/* Legend */}
                <div className="flex items-center justify-end mt-4 gap-2">
                    <span className="text-xs text-gray-500">Less</span>
                    <div className="flex gap-1">
                        {['bg-emerald-100', 'bg-emerald-200', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600'].map((color, idx) => (
                            <div key={idx} className={`w-4 h-4 rounded-sm ${color}`} />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">More</span>
                </div>
            </div>
        </div>
    );
}

// User Journey Flow Component
function UserJourneyFlow({ journeys }: { journeys: JourneyStep[] }) {
    const uniquePages = [...new Set([...journeys.map(j => j.from), ...journeys.map(j => j.to)])];

    return (
        <div className="space-y-3">
            {journeys.slice(0, 6).map((journey, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2">
                        <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium truncate max-w-[120px]">
                            {journey.from}
                        </div>
                        <div className="flex-1 relative">
                            <div className="h-0.5 bg-gray-200 w-full absolute top-1/2 -translate-y-1/2"></div>
                            <div
                                className="h-0.5 bg-emerald-500 absolute top-1/2 -translate-y-1/2 transition-all"
                                style={{ width: `${journey.percentage}%` }}
                            ></div>
                            <ArrowRightIcon className="w-4 h-4 text-emerald-500 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white" />
                        </div>
                        <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium truncate max-w-[120px]">
                            {journey.to}
                        </div>
                    </div>
                    <div className="text-right min-w-[80px]">
                        <div className="text-sm font-semibold text-gray-900">{journey.users.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{journey.percentage}%</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Donut Chart Component
function DonutChart({ data, size = 120 }: { data: { name: string; percentage: number; color: string }[]; size?: number }) {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;

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
                            stroke={item.color.replace('bg-', '').includes('blue') ? '#3b82f6' :
                                item.color.replace('bg-', '').includes('yellow') ? '#eab308' :
                                    item.color.replace('bg-', '').includes('orange') ? '#f97316' :
                                        item.color.replace('bg-', '').includes('cyan') ? '#06b6d4' :
                                            item.color.replace('bg-', '').includes('emerald') ? '#10b981' :
                                                item.color.replace('bg-', '').includes('purple') ? '#8b5cf6' : '#6b7280'}
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
                        {data.reduce((a, b) => a + b.percentage, 0)}%
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                </div>
            </div>
        </div>
    );
}

// Main Component
export default function TrafficPage() {
    const [activeVisitors, setActiveVisitors] = useState(47);
    const [selectedPeriod, setSelectedPeriod] = useState('7days');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [realtimePages, setRealtimePages] = useState([
        { page: '/services/web-development', visitors: 12, country: '\u{1F1FA}\u{1F1F8}', trend: 'up' as const },
        { page: '/contact', visitors: 8, country: '\u{1F1E9}\u{1F1EA}', trend: 'down' as const },
        { page: '/services/ai-solutions', visitors: 6, country: '\u{1F1F9}\u{1F1F7}', trend: 'up' as const },
        { page: '/about', visitors: 5, country: '\u{1F1EC}\u{1F1E7}', trend: 'stable' as const },
        { page: '/projects', visitors: 4, country: '\u{1F1F5}\u{1F1F0}', trend: 'up' as const },
    ]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVisitors(prev => {
                const change = Math.floor(Math.random() * 7) - 3;
                return Math.max(30, Math.min(80, prev + change));
            });

            setRealtimePages(prev => prev.map(page => ({
                ...page,
                visitors: Math.max(1, page.visitors + Math.floor(Math.random() * 5) - 2),
                trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' as const,
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const calculateChange = (current: number, previous: number) => {
        return ((current - previous) / previous * 100).toFixed(1);
    };

    const exportData = useCallback((format: 'csv' | 'json' | 'pdf') => {
        const data = {
            exportDate: new Date().toISOString(),
            period: selectedPeriod,
            summary: comparisonMetrics.current,
            devices: deviceStats,
            countries,
            browsers,
            referrers,
            pageMetrics,
        };

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `traffic-report-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        } else if (format === 'csv') {
            // Create CSV for page metrics
            const headers = ['Page', 'Views', 'Avg Time', 'Bounce Rate', 'Load Time', 'Exit Rate'];
            const rows = pageMetrics.map(p => [p.page, p.views, p.avgTime, p.bounceRate, p.loadTime, p.exitRate]);
            const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `traffic-report-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
        }
        setShowExportMenu(false);
    }, [selectedPeriod]);

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
                        <option value="24h">Last 24 hours</option>
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
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
                                <button
                                    onClick={() => exportData('pdf')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                >
                                    Export as PDF
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                        <div>
                            <div className="text-5xl font-bold mb-1">{activeVisitors}</div>
                            <div className="text-emerald-100">Active visitors now</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">{realtimePages.reduce((a, b) => a + b.visitors, 0)}</div>
                            <div className="text-emerald-100">Pages being viewed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">{countries.length}</div>
                            <div className="text-emerald-100">Countries online</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">2.4s</div>
                            <div className="text-emerald-100">Avg. page load</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Period Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Period Comparison</h3>
                        <p className="text-sm text-gray-500">Current period vs. previous period</p>
                    </div>
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Total Visitors', current: comparisonMetrics.current.visitors, previous: comparisonMetrics.previous.visitors, format: 'number' },
                        { label: 'Page Views', current: comparisonMetrics.current.pageViews, previous: comparisonMetrics.previous.pageViews, format: 'number' },
                        { label: 'Avg. Duration', current: comparisonMetrics.current.avgSessionDuration, previous: comparisonMetrics.previous.avgSessionDuration, format: 'time' },
                        { label: 'Bounce Rate', current: comparisonMetrics.current.bounceRate, previous: comparisonMetrics.previous.bounceRate, format: 'percent', inverse: true },
                        { label: 'New Users', current: comparisonMetrics.current.newUsers, previous: comparisonMetrics.previous.newUsers, format: 'number' },
                        { label: 'Returning', current: comparisonMetrics.current.returningUsers, previous: comparisonMetrics.previous.returningUsers, format: 'number' },
                    ].map((metric, idx) => {
                        const change = typeof metric.current === 'number' && typeof metric.previous === 'number'
                            ? ((metric.current - metric.previous) / metric.previous * 100)
                            : 0;
                        const isPositive = metric.inverse ? change < 0 : change > 0;
                        return (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                                <div className="text-xl font-bold text-gray-900">
                                    {metric.format === 'number' ? (metric.current as number).toLocaleString() :
                                        metric.format === 'percent' ? `${metric.current}%` :
                                            metric.current}
                                </div>
                                <div className={`flex items-center gap-1 text-xs mt-1 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isPositive ? (
                                        <ArrowTrendingUpIcon className="w-3 h-3" />
                                    ) : (
                                        <ArrowTrendingDownIcon className="w-3 h-3" />
                                    )}
                                    {Math.abs(change).toFixed(1)}%
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* World Map */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
                        <p className="text-sm text-gray-500">Real-time visitor locations worldwide</p>
                    </div>
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                </div>
                <WorldMap countries={countries} />

                {/* Country list below map */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {countries.slice(0, 8).map((country, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="text-xl">{country.flag}</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">{country.name}</div>
                                <div className="text-xs text-gray-500">{country.visitors.toLocaleString()} visitors</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-700">{country.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Device & Browser Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Device Breakdown</h3>
                        <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <DonutChart
                            data={deviceStats.map(d => ({ name: d.name, percentage: d.percentage, color: d.color }))}
                            size={160}
                        />
                    </div>
                    <div className="space-y-4">
                        {deviceStats.map((device, index) => {
                            const change = ((device.visitors - device.previousVisitors) / device.previousVisitors * 100);
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`w-10 h-10 ${device.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <device.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-gray-900">{device.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">{device.visitors.toLocaleString()}</span>
                                                <span className={`text-xs ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                                                </span>
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
                </div>

                {/* Browser Statistics */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Browser Usage</h3>
                        <ComputerDesktopIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <DonutChart
                            data={browsers.map(b => ({ name: b.name, percentage: b.percentage, color: b.color }))}
                            size={160}
                        />
                    </div>
                    <div className="space-y-3">
                        {browsers.map((browser, index) => {
                            const change = browser.percentage - browser.previousPercentage;
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <div className={`w-3 h-3 ${browser.color} rounded-full flex-shrink-0`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-900">{browser.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">{browser.percentage}%</span>
                                                <span className={`text-xs ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {change >= 0 ? '+' : ''}{change}%
                                                </span>
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
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Referrer Tracking */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                        <p className="text-sm text-gray-500">Where your visitors are coming from</p>
                    </div>
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {referrers.map((referrer, idx) => (
                        <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${referrer.type === 'search' ? 'bg-blue-100 text-blue-700' :
                                        referrer.type === 'social' ? 'bg-purple-100 text-purple-700' :
                                            referrer.type === 'direct' ? 'bg-gray-100 text-gray-700' :
                                                'bg-orange-100 text-orange-700'
                                        }`}>
                                        {referrer.type}
                                    </span>
                                    <span className="font-medium text-gray-900">{referrer.source}</span>
                                </div>
                                {referrer.url !== '#' && (
                                    <a
                                        href={referrer.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-emerald-600 transition-colors"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{referrer.visitors.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">visitors</div>
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
            </div>

            {/* Traffic Heatmap */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Traffic Heatmap</h3>
                        <p className="text-sm text-gray-500">Visitor activity by hour and day of week</p>
                    </div>
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                </div>
                <TrafficHeatmap data={heatmapData} />
            </div>

            {/* Page Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Page Performance</h3>
                        <p className="text-sm text-gray-500">Detailed metrics for each page</p>
                    </div>
                    <BoltIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Load Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pageMetrics.map((page, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{page.page}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{page.views.toLocaleString()}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{page.avgTime}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${page.bounceRate > 40 ? 'bg-red-500' :
                                                        page.bounceRate > 30 ? 'bg-yellow-500' : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${page.bounceRate}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600">{page.bounceRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-sm ${page.loadTime > 2 ? 'text-red-600' :
                                            page.loadTime > 1.5 ? 'text-yellow-600' : 'text-emerald-600'
                                            }`}>
                                            {page.loadTime}s
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{page.exitRate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Journey Flow */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">User Journey Flow</h3>
                        <p className="text-sm text-gray-500">How visitors navigate through your site</p>
                    </div>
                    <UserGroupIcon className="w-5 h-5 text-gray-400" />
                </div>
                <UserJourneyFlow journeys={userJourneys} />
            </div>

            {/* Real-time Active Pages */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <h3 className="text-lg font-semibold text-gray-900">Active Pages</h3>
                    <span className="text-sm text-gray-500 ml-2">Live updates every 3s</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Visitors</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Country</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {realtimePages.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.page}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-sm text-gray-900 font-semibold">{item.visitors} users</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.trend === 'up' && <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />}
                                        {item.trend === 'down' && <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />}
                                        {item.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400 rounded" />}
                                    </td>
                                    <td className="px-6 py-4 text-xl">{item.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: EyeIcon, label: 'Total Page Views', value: '45,678', change: '+12.5%', positive: true },
                    { icon: UserGroupIcon, label: 'Unique Visitors', value: '12,543', change: '+8.3%', positive: true },
                    { icon: ClockIcon, label: 'Avg. Session', value: '3:24', change: '+15s', positive: true },
                    { icon: ExclamationTriangleIcon, label: 'Bounce Rate', value: '32.5%', change: '-3.3%', positive: true },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                <div className={`text-xs ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
