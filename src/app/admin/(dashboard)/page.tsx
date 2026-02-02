'use client';

import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import RecentLeadsTable from '@/components/admin/widgets/RecentLeadsTable';
import RecentInteractionsTable from '@/components/admin/widgets/RecentInteractionsTable';
import TrafficChart from '@/components/admin/widgets/TrafficChart';
import { useDashboard, type DashboardStats } from '@/hooks/admin/useDashboard';
import {
    UsersIcon,
    EnvelopeIcon,
    CurrencyDollarIcon,
    EyeIcon,
    ArrowTrendingUpIcon,
    BoltIcon,
    CalendarDaysIcon,
    ClockIcon,
    CheckCircleIcon,
    DocumentTextIcon,
    PencilSquareIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    BellIcon,
    UserPlusIcon,
    ArrowUpIcon,
    SparklesIcon,
    FireIcon,
    FlagIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    RocketLaunchIcon,
    PlusCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true);
        }
    }, [startOnView]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, hasStarted]);

    useEffect(() => {
        if (!startOnView || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    return { count, ref };
}

// Loading Skeleton for Stat Cards
function StatCardSkeleton({ gradient }: { gradient: string }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient} shadow-lg animate-pulse`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl" />
            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm w-9 h-9" />
                    <div className="w-14 h-6 bg-white/20 rounded-full" />
                </div>
                <div className="h-8 w-24 bg-white/20 rounded mb-1" />
                <div className="h-4 w-20 bg-white/20 rounded" />
            </div>
        </div>
    );
}

// Animated Stat Card Component
function AnimatedStatCard({
    title,
    value,
    suffix = '',
    prefix = '',
    change,
    icon: Icon,
    gradient,
    isLoading = false,
}: {
    title: string;
    value: number;
    suffix?: string;
    prefix?: string;
    change: number;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    isLoading?: boolean;
}) {
    const { count, ref } = useAnimatedCounter(value);
    const isPositive = change > 0;

    if (isLoading) {
        return <StatCardSkeleton gradient={gradient} />;
    }

    return (
        <div ref={ref} className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl" />
            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                        <ArrowUpIcon className={`w-3 h-3 ${!isPositive ? 'rotate-180' : ''}`} />
                        {Math.abs(change)}%
                    </div>
                </div>
                <p className="text-3xl font-bold mb-1">{prefix}{count.toLocaleString()}{suffix}</p>
                <p className="text-sm text-white/80">{title}</p>
            </div>
        </div>
    );
}

// Conversion Funnel Component
function ConversionFunnel({ stats, isLoading }: { stats?: { totalLeads: number; qualifiedLeads: number; convertedLeads: number; conversionRate: number }; isLoading: boolean }) {
    const totalLeads = stats?.totalLeads ?? 0;
    const qualifiedLeads = stats?.qualifiedLeads ?? 0;
    const convertedLeads = stats?.convertedLeads ?? 0;
    const conversionRate = stats?.conversionRate ?? 0;

    const funnelData = [
        { stage: 'Total Leads', count: totalLeads, color: 'from-blue-500 to-blue-600', width: '100%' },
        { stage: 'Qualified', count: qualifiedLeads, color: 'from-amber-500 to-amber-600', width: totalLeads > 0 ? `${Math.max((qualifiedLeads / totalLeads) * 100, 10)}%` : '50%' },
        { stage: 'Converted', count: convertedLeads, color: 'from-purple-500 to-purple-600', width: totalLeads > 0 ? `${Math.max((convertedLeads / totalLeads) * 100, 10)}%` : '25%' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
                    <p className="text-sm text-gray-500">Track your customer journey</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{isLoading ? '...' : `${conversionRate.toFixed(2)}%`}</p>
                    <p className="text-xs text-gray-500">Overall Conversion</p>
                </div>
            </div>
            <div className="space-y-3">
                {funnelData.map((item, index) => (
                    <div key={item.stage} className="relative">
                        <div
                            className={`h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-between px-4 transition-all duration-500`}
                            style={{ width: item.width, marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            <span className="text-white font-medium text-sm">{item.stage}</span>
                            <span className="text-white font-bold">{item.count.toLocaleString()}</span>
                        </div>
                        {index < funnelData.length - 1 && (
                            <div className="flex justify-center py-1">
                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-200" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Goals & Targets Component
function GoalsTargets({ stats, isLoading }: { stats?: { totalLeads: number; newLeads: number; conversionRate: number; projectRequests: number }; isLoading: boolean }) {
    const goals = [
        { name: 'Total Leads', current: stats?.totalLeads ?? 0, target: 100, icon: UsersIcon, color: 'emerald' },
        { name: 'New Leads', current: stats?.newLeads ?? 0, target: 50, icon: UserPlusIcon, color: 'blue' },
        { name: 'Project Requests', current: stats?.projectRequests ?? 0, target: 30, icon: EyeIcon, color: 'purple' },
        { name: 'Conversion Rate', current: stats?.conversionRate ?? 0, target: 5.0, icon: ArrowTrendingUpIcon, color: 'amber' },
    ];

    const colorClasses: Record<string, { bg: string; fill: string; text: string }> = {
        emerald: { bg: 'bg-emerald-100', fill: 'bg-emerald-500', text: 'text-emerald-600' },
        blue: { bg: 'bg-blue-100', fill: 'bg-blue-500', text: 'text-blue-600' },
        purple: { bg: 'bg-purple-100', fill: 'bg-purple-500', text: 'text-purple-600' },
        amber: { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-600' },
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FlagIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Goals & Targets</h3>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">This Month</span>
            </div>
            <div className="space-y-5">
                {goals.map((goal) => {
                    const percentage = Math.min((goal.current / goal.target) * 100, 100);
                    const Icon = goal.icon;
                    const colors = colorClasses[goal.color];

                    return (
                        <div key={goal.name} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                                        <Icon className={`w-4 h-4 ${colors.text}`} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className={`text-sm font-bold ${colors.text}`}>
                                        {typeof goal.current === 'number' && goal.current >= 1000
                                            ? goal.current.toLocaleString()
                                            : goal.current}
                                        {goal.name === 'Monthly Revenue' && '$' in goal ? '' : ''}
                                    </span>
                                    <span className="text-sm text-gray-400"> / {goal.target.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`absolute inset-y-0 left-0 ${colors.fill} rounded-full transition-all duration-700 ease-out group-hover:opacity-80`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-400">{percentage.toFixed(0)}% achieved</span>
                                {percentage >= 100 && (
                                    <span className="text-xs text-emerald-500 flex items-center gap-1">
                                        <CheckCircleIcon className="w-3 h-3" /> Goal reached!
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper to format relative time
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Activity Feed Component
function ActivityFeed({ recentActivity, isLoading }: {
    recentActivity?: {
        leads: Array<{ id: string; name: string; email: string; status: string; createdAt: string }>;
        projectRequests: Array<{ id: string; name: string; projectType: string; status: string; createdAt: string }>;
        messages: Array<{ id: string; name: string; subject: string; status: string; createdAt: string }>;
    };
    isLoading: boolean;
}) {
    // Build unified activity list from real data
    const activities: Array<{ id: string; action: string; detail: string; time: string; icon: React.ComponentType<{ className?: string }>; color: string; sortDate: string }> = [];

    if (recentActivity) {
        recentActivity.leads?.forEach((lead) => {
            activities.push({
                id: `lead-${lead.id}`,
                action: 'New lead received',
                detail: `${lead.name} (${lead.email})`,
                time: formatRelativeTime(lead.createdAt),
                icon: EnvelopeIcon,
                color: 'bg-blue-500',
                sortDate: lead.createdAt,
            });
        });
        recentActivity.projectRequests?.forEach((req) => {
            activities.push({
                id: `project-${req.id}`,
                action: 'Project request',
                detail: `${req.name} - ${req.projectType}`,
                time: formatRelativeTime(req.createdAt),
                icon: RocketLaunchIcon,
                color: 'bg-emerald-500',
                sortDate: req.createdAt,
            });
        });
        recentActivity.messages?.forEach((msg) => {
            activities.push({
                id: `msg-${msg.id}`,
                action: 'Contact message',
                detail: `${msg.name}: ${msg.subject}`,
                time: formatRelativeTime(msg.createdAt),
                icon: ChatBubbleLeftRightIcon,
                color: 'bg-purple-500',
                sortDate: msg.createdAt,
            });
        });
    }

    // Sort by most recent first
    activities.sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

    // Fallback when no data
    const displayActivities = activities.length > 0 ? activities.slice(0, 6) : [];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
                </div>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-gray-200" />
                            <div className="flex-1 pb-4 space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-48 bg-gray-100 rounded" />
                                <div className="h-3 w-16 bg-gray-100 rounded" />
                            </div>
                        </div>
                    ))
                ) : displayActivities.length === 0 ? (
                    <div className="text-center py-8">
                        <ClockIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No recent activity yet</p>
                        <p className="text-xs text-gray-400 mt-1">Activity will appear here as leads and messages come in</p>
                    </div>
                ) : (
                    displayActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex gap-3 group">
                                <div className="relative">
                                    <div className={`w-9 h-9 rounded-full ${activity.color} flex items-center justify-center shadow-sm`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    {index < displayActivities.length - 1 && (
                                        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-100" />
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{activity.action}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// Today's Highlights Component — driven by real dashboard stats
function TodaysHighlights({ stats, recentActivity, isLoading }: {
    stats?: DashboardStats;
    recentActivity?: {
        leads: Array<{ id: string; name: string; email: string; status: string; createdAt: string }>;
        projectRequests: Array<{ id: string; name: string; projectType: string; status: string; createdAt: string }>;
        messages: Array<{ id: string; name: string; subject: string; status: string; createdAt: string }>;
    };
    isLoading: boolean;
}) {
    const latestLead = recentActivity?.leads?.[0];
    const latestRequest = recentActivity?.projectRequests?.[0];

    const highlights = [
        {
            title: 'Total Leads',
            value: isLoading ? '...' : `${stats?.totalLeads ?? 0} leads`,
            metric: `${stats?.newLeads ?? 0} new this period`,
            icon: UsersIcon,
        },
        {
            title: 'Latest Lead',
            value: latestLead ? latestLead.name : 'No leads yet',
            metric: latestLead ? latestLead.email : 'Leads will appear here',
            icon: FireIcon,
        },
        {
            title: 'Project Requests',
            value: isLoading ? '...' : `${stats?.projectRequests ?? 0} requests`,
            metric: latestRequest ? `Latest: ${latestRequest.name}` : 'No requests yet',
            icon: SparklesIcon,
        },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
                <SparklesIcon className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold">Today&apos;s Highlights</h3>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 animate-pulse">
                            <div className="w-9 h-9 rounded-lg bg-white/10" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-20 bg-white/10 rounded" />
                                <div className="h-4 w-28 bg-white/10 rounded" />
                            </div>
                        </div>
                    ))
                ) : (
                    highlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400">{item.title}</p>
                                    <p className="text-sm font-semibold text-white">{item.value}</p>
                                    <p className="text-xs text-gray-500">{item.metric}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// Enhanced Quick Actions Component
function QuickActions() {
    const actions = [
        { name: 'Create Lead', icon: PlusCircleIcon, color: 'from-emerald-500 to-emerald-600', description: 'Add new contact' },
        { name: 'Send Campaign', icon: RocketLaunchIcon, color: 'from-blue-500 to-blue-600', description: 'Email marketing' },
        { name: 'View Analytics', icon: ChartBarIcon, color: 'from-purple-500 to-purple-600', description: 'Full reports' },
        { name: 'Manage Content', icon: PencilSquareIcon, color: 'from-amber-500 to-amber-600', description: 'Blog & pages' },
        { name: 'Site Search', icon: MagnifyingGlassIcon, color: 'from-pink-500 to-pink-600', description: 'Find anything' },
        { name: 'Settings', icon: Cog6ToothIcon, color: 'from-gray-600 to-gray-700', description: 'Configuration' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <BoltIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.name}
                            className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 text-left"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">{action.name}</p>
                            <p className="text-xs text-gray-500">{action.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// Top Performing Pages — fetches real data from analytics API
function TopPerformingPages() {
    const { data, isLoading } = useSWR<{ success: boolean; data: { topPages: Array<{ page: string; count: number }> } }>(
        '/api/admin/analytics/pageviews?period=7d',
        (url: string) => fetch(url).then(r => r.json()),
        { revalidateOnFocus: false, refreshInterval: 60000 }
    );

    const pages = data?.data?.topPages || [];
    const maxViews = pages.length > 0 ? pages[0].count : 1;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Pages</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Last 7 days</span>
            </div>
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                                    <div className="h-4 w-40 bg-gray-200 rounded" />
                                </div>
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full" />
                        </div>
                    ))}
                </div>
            ) : pages.length === 0 ? (
                <div className="text-center py-8">
                    <DocumentTextIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No page view data yet</p>
                    <p className="text-xs text-gray-400 mt-1">Page analytics will appear here as visitors browse your site</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pages.slice(0, 5).map((item, index) => {
                        const percent = maxViews > 0 ? Math.round((item.count / maxViews) * 100) : 0;
                        return (
                            <div key={index} className="group">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors truncate max-w-[200px]">{item.page}</span>
                                    </div>
                                    <span className="text-gray-500">{item.count.toLocaleString()} views</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700 group-hover:from-emerald-500 group-hover:to-emerald-600"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Performance Overview — driven by real dashboard stats
function PerformanceOverview({ stats, isLoading }: { stats?: DashboardStats; isLoading: boolean }) {
    const overviewItems = [
        {
            label: 'Total Leads',
            value: isLoading ? '...' : (stats?.totalLeads ?? 0).toLocaleString(),
            icon: UsersIcon,
        },
        {
            label: 'Conversion Rate',
            value: isLoading ? '...' : `${(stats?.conversionRate ?? 0).toFixed(1)}%`,
            icon: ArrowTrendingUpIcon,
        },
        {
            label: 'Unread Messages',
            value: isLoading ? '...' : (stats?.unreadMessages ?? 0).toLocaleString(),
            icon: DocumentTextIcon,
        },
        {
            label: 'Pending Requests',
            value: isLoading ? '...' : (stats?.pendingRequests ?? 0).toLocaleString(),
            icon: ClockIcon,
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {overviewItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-500">{item.label}</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Main Dashboard Component
export default function AdminDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { stats, recentActivity, isLoading, isError } = useDashboard();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const greeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="space-y-8 pb-8">
            {/* Page Header with Gradient */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-lg">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{greeting()}, Admin</h1>
                        <p className="text-emerald-100 flex items-center gap-2">
                            <CalendarDaysIcon className="w-4 h-4" />
                            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            <span className="mx-2">|</span>
                            <ClockIcon className="w-4 h-4" />
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm">
                            <BellIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Notifications</span>
                            {(stats?.unreadMessages ?? 0) > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{stats?.unreadMessages}</span>
                            )}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span className="text-sm">Messages</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Stats Grid */}
            {isError && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                    Unable to load dashboard data. Showing default values. Please check your connection and try again.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatedStatCard
                    title="Total Leads"
                    value={stats?.totalLeads ?? 0}
                    change={0}
                    icon={EyeIcon}
                    gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                    isLoading={isLoading}
                />
                <AnimatedStatCard
                    title="New Leads"
                    value={stats?.newLeads ?? 0}
                    change={0}
                    icon={EnvelopeIcon}
                    gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
                    isLoading={isLoading}
                />
                <AnimatedStatCard
                    title="Conversions"
                    value={stats?.convertedLeads ?? 0}
                    change={0}
                    icon={UsersIcon}
                    gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                    isLoading={isLoading}
                />
                <AnimatedStatCard
                    title="Project Requests"
                    value={stats?.projectRequests ?? 0}
                    change={0}
                    icon={CurrencyDollarIcon}
                    gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                    isLoading={isLoading}
                />
            </div>
            {!isLoading && !isError && (stats?.totalLeads ?? 0) === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 text-center">
                    Your dashboard is ready! Data will populate here as you receive leads, project requests, and messages.
                </div>
            )}

            {/* Today's Highlights + Quick Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TodaysHighlights stats={stats} recentActivity={recentActivity} isLoading={isLoading} />
                <div className="lg:col-span-2">
                    <QuickActions />
                </div>
            </div>

            {/* Conversion Funnel + Goals Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConversionFunnel stats={stats} isLoading={isLoading} />
                <GoalsTargets stats={stats} isLoading={isLoading} />
            </div>

            {/* Charts and Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TrafficChart />
                </div>
                <ActivityFeed recentActivity={recentActivity} isLoading={isLoading} />
            </div>

            {/* Top Pages + Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPerformingPages />
                <PerformanceOverview stats={stats} isLoading={isLoading} />
            </div>

            {/* Recent Leads & Interactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentLeadsTable />
                <RecentInteractionsTable />
            </div>
        </div>
    );
}
