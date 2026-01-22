'use client';

import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    UsersIcon,
    ClockIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';

const metrics = [
    { name: 'Page Views', value: '45,234', change: '+12.5%', trend: 'up' },
    { name: 'Unique Visitors', value: '12,543', change: '+8.2%', trend: 'up' },
    { name: 'Bounce Rate', value: '34.2%', change: '-2.4%', trend: 'down' },
    { name: 'Avg. Session', value: '4m 32s', change: '+15.3%', trend: 'up' },
];

const topPages = [
    { page: '/services/web-development', views: 8450, unique: 6230, bounce: '28%' },
    { page: '/contact', views: 5820, unique: 4120, bounce: '32%' },
    { page: '/services/ai-solutions', views: 4240, unique: 3180, bounce: '25%' },
    { page: '/about', views: 3980, unique: 2940, bounce: '38%' },
    { page: '/projects', views: 2720, unique: 2150, bounce: '35%' },
    { page: '/blog', views: 2340, unique: 1890, bounce: '42%' },
];

const trafficSources = [
    { source: 'Organic Search', visitors: 5420, percentage: 43 },
    { source: 'Direct', visitors: 3180, percentage: 25 },
    { source: 'Social Media', visitors: 2150, percentage: 17 },
    { source: 'Referral', visitors: 1290, percentage: 10 },
    { source: 'Email', visitors: 630, percentage: 5 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-1">Detailed insights into your website performance.</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This year</option>
                    </select>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm">{metric.name}</span>
                            {metric.trend === 'up' ? (
                                <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />
                            ) : (
                                <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
                            )}
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                        <div className={`text-sm ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                            {metric.change} vs last period
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitors Chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Visitors Over Time</h3>
                        <ChartBarIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={day} className="flex-1 flex flex-col items-center">
                                <div
                                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t"
                                    style={{ height: `${[65, 80, 55, 90, 75, 45, 60][i]}%` }}
                                />
                                <span className="text-xs text-gray-500 mt-2">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                        <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-900">{source.source}</span>
                                    <span className="text-gray-500">{source.visitors.toLocaleString()} ({source.percentage}%)</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${source.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {topPages.map((page, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.page}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{page.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{page.unique.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{page.bounce}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Real-time Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <UsersIcon className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-gray-900">47</div>
                        <div className="text-sm text-gray-500">Active Users Now</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ClockIcon className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                        <div className="text-2xl font-bold text-gray-900">3m 45s</div>
                        <div className="text-sm text-gray-500">Avg. Time on Page</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ChartBarIcon className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                        <div className="text-2xl font-bold text-gray-900">156</div>
                        <div className="text-sm text-gray-500">Page Views (Last Hour)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
