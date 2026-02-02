'use client';

import { useState } from 'react';
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    UsersIcon,
    ClockIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
    useAnalyticsOverview,
    usePageViews,
    useTrafficSources,
    useRealtimeAnalytics,
} from '@/hooks/admin/useAnalytics';

// --- Helpers ---

function formatNumber(n: number | undefined): string {
    if (n === undefined || n === null) return '0';
    return n.toLocaleString();
}

function formatPercentage(n: number | undefined): string {
    if (n === undefined || n === null) return '0%';
    return `${n.toFixed(1)}%`;
}

function formatDuration(seconds: number | undefined): string {
    if (!seconds) return '0m 0s';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}m ${s}s`;
}

function trendDirection(value: number | undefined): 'up' | 'down' {
    if (value === undefined || value === null) return 'up';
    return value >= 0 ? 'up' : 'down';
}

function trendLabel(value: number | undefined): string {
    if (value === undefined || value === null) return '+0%';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
}

// --- Skeleton Components ---

function MetricSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-200 rounded" />
            </div>
            <div className="h-8 w-28 bg-gray-200 rounded mb-1" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-6">
                <div className="h-5 w-40 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-200 rounded" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                            className="w-full bg-gray-200 rounded-t"
                            style={{ height: `${30 + Math.random() * 50}%` }}
                        />
                        <div className="h-3 w-6 bg-gray-200 rounded mt-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TableSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-6 border-b border-gray-200">
                <div className="h-5 w-28 bg-gray-200 rounded" />
            </div>
            <div className="p-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-4 flex-[3] bg-gray-200 rounded" />
                        <div className="h-4 flex-1 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function RealtimeSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                <div className="h-5 w-36 bg-gray-200 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 mx-auto bg-gray-200 rounded mb-2" />
                        <div className="h-7 w-12 mx-auto bg-gray-200 rounded mb-1" />
                        <div className="h-4 w-28 mx-auto bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Empty State ---

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <ChartBarIcon className="w-12 h-12 mb-3" />
            <p className="text-sm">{message}</p>
        </div>
    );
}

// --- Period Options ---

const periodOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
] as const;

// --- Page Component ---

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<string>('7d');

    const { overview, trends, charts, isLoading: overviewLoading } = useAnalyticsOverview(period);
    const { chartData, topPages, isLoading: pagesLoading } = usePageViews(period);
    const { sources, isLoading: sourcesLoading } = useTrafficSources(period);
    const { visitors: realtimeData, isLoading: realtimeLoading } = useRealtimeAnalytics();

    // Cast sources to the expected shape
    const trafficSources = (Array.isArray(sources) ? sources : []) as Array<{
        source: string;
        referrer?: string;
        visitors: number;
        percentage: number;
    }>;

    // Cast realtime data
    const realtime = (realtimeData ?? {}) as {
        activeVisitors?: number;
        activePages?: Array<{ page: string; visitors: number }>;
        avgTimeOnPage?: number;
        pageViewsLastHour?: number;
    };

    // Build metrics from overview data
    const metricsData = overview
        ? [
              {
                  name: 'Page Views',
                  value: formatNumber(overview.pageViews),
                  change: trendLabel(trends?.pageViews),
                  trend: trendDirection(trends?.pageViews),
              },
              {
                  name: 'Unique Visitors',
                  value: formatNumber(overview.uniqueVisitors),
                  change: trendLabel(trends?.uniqueVisitors),
                  trend: trendDirection(trends?.uniqueVisitors),
              },
              {
                  name: 'Bounce Rate',
                  value: formatPercentage((overview as Record<string, unknown>).bounceRate as number | undefined),
                  change: trendLabel((trends as Record<string, unknown>)?.bounceRate as number | undefined),
                  trend: trendDirection((trends as Record<string, unknown>)?.bounceRate as number | undefined),
              },
              {
                  name: 'Avg. Session',
                  value: formatDuration((overview as Record<string, unknown>).avgSession as number | undefined),
                  change: trendLabel((trends as Record<string, unknown>)?.avgSession as number | undefined),
                  trend: trendDirection((trends as Record<string, unknown>)?.avgSession as number | undefined),
              },
          ]
        : [];

    // Build chart bars from chartData
    const chartBars = chartData.length > 0
        ? chartData.map((d) => ({
              label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
              count: d.count,
          }))
        : [];

    const maxCount = chartBars.length > 0 ? Math.max(...chartBars.map((b) => b.count), 1) : 1;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-1">Detailed insights into your website performance.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        {periodOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Metrics Grid */}
            {overviewLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <MetricSkeleton key={i} />
                    ))}
                </div>
            ) : metricsData.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <EmptyState message="No analytics data available for this period." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metricsData.map((metric, index) => (
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
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitors Chart */}
                {pagesLoading ? (
                    <ChartSkeleton />
                ) : chartBars.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Visitors Over Time</h3>
                            <ChartBarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <EmptyState message="No visitor data for this period." />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Visitors Over Time</h3>
                            <ChartBarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {chartBars.map((bar, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t"
                                        style={{ height: `${(bar.count / maxCount) * 100}%` }}
                                    />
                                    <span className="text-xs text-gray-500 mt-2">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Traffic Sources */}
                {sourcesLoading ? (
                    <ChartSkeleton />
                ) : trafficSources.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                            <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <EmptyState message="No traffic source data for this period." />
                    </div>
                ) : (
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
                                        <span className="text-gray-500">
                                            {source.visitors.toLocaleString()} ({source.percentage}%)
                                        </span>
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
                )}
            </div>

            {/* Top Pages Table */}
            {pagesLoading ? (
                <TableSkeleton />
            ) : topPages.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
                    </div>
                    <EmptyState message="No page view data for this period." />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Page
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Views
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {topPages.map((page, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.page}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {page.count.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Real-time Section */}
            {realtimeLoading ? (
                <RealtimeSkeleton />
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <UsersIcon className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                            <div className="text-2xl font-bold text-gray-900">
                                {formatNumber(realtime.activeVisitors)}
                            </div>
                            <div className="text-sm text-gray-500">Active Users Now</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <ClockIcon className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                            <div className="text-2xl font-bold text-gray-900">
                                {formatDuration(realtime.avgTimeOnPage)}
                            </div>
                            <div className="text-sm text-gray-500">Avg. Time on Page</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <ChartBarIcon className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                            <div className="text-2xl font-bold text-gray-900">
                                {formatNumber(realtime.pageViewsLastHour)}
                            </div>
                            <div className="text-sm text-gray-500">Page Views (Last Hour)</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
