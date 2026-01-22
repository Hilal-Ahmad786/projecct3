'use client';

import { useState, useEffect, useRef } from 'react';
import RecentLeadsTable from '@/components/admin/widgets/RecentLeadsTable';
import TrafficChart from '@/components/admin/widgets/TrafficChart';
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
    TrophyIcon,
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

// Animated Stat Card Component
function AnimatedStatCard({
    title,
    value,
    suffix = '',
    prefix = '',
    change,
    icon: Icon,
    gradient
}: {
    title: string;
    value: number;
    suffix?: string;
    prefix?: string;
    change: number;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
}) {
    const { count, ref } = useAnimatedCounter(value);
    const isPositive = change > 0;

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
function ConversionFunnel() {
    const funnelData = [
        { stage: 'Visitors', count: 12543, color: 'from-blue-500 to-blue-600', width: '100%' },
        { stage: 'Engaged', count: 5420, color: 'from-cyan-500 to-cyan-600', width: '80%' },
        { stage: 'Leads', count: 1850, color: 'from-emerald-500 to-emerald-600', width: '60%' },
        { stage: 'Qualified', count: 620, color: 'from-amber-500 to-amber-600', width: '40%' },
        { stage: 'Converted', count: 156, color: 'from-purple-500 to-purple-600', width: '25%' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
                    <p className="text-sm text-gray-500">Track your customer journey</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">1.24%</p>
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
function GoalsTargets() {
    const goals = [
        { name: 'Monthly Revenue', current: 24500, target: 30000, icon: CurrencyDollarIcon, color: 'emerald' },
        { name: 'New Leads', current: 48, target: 100, icon: UserPlusIcon, color: 'blue' },
        { name: 'Website Traffic', current: 12543, target: 15000, icon: EyeIcon, color: 'purple' },
        { name: 'Conversion Rate', current: 1.24, target: 2.0, icon: ArrowTrendingUpIcon, color: 'amber' },
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

// Activity Feed Component
function ActivityFeed() {
    const activities = [
        { id: 1, action: 'New lead received', detail: 'John Smith submitted a contact form', time: '2 min ago', icon: EnvelopeIcon, color: 'bg-blue-500' },
        { id: 2, action: 'Project completed', detail: 'E-commerce website for ABC Corp', time: '15 min ago', icon: CheckCircleIcon, color: 'bg-emerald-500' },
        { id: 3, action: 'Payment received', detail: '$2,400 from XYZ Industries', time: '1 hour ago', icon: CurrencyDollarIcon, color: 'bg-green-500' },
        { id: 4, action: 'New user signup', detail: 'sarah@company.com registered', time: '2 hours ago', icon: UserPlusIcon, color: 'bg-purple-500' },
        { id: 5, action: 'Security alert resolved', detail: 'Suspicious login blocked', time: '3 hours ago', icon: ShieldCheckIcon, color: 'bg-amber-500' },
        { id: 6, action: 'Blog post published', detail: 'AI Trends in 2024', time: '5 hours ago', icon: DocumentTextIcon, color: 'bg-pink-500' },
    ];

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
                {activities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="flex gap-3 group">
                            <div className="relative">
                                <div className={`w-9 h-9 rounded-full ${activity.color} flex items-center justify-center shadow-sm`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                {index < activities.length - 1 && (
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
                })}
            </div>
        </div>
    );
}

// Today's Highlights Component
function TodaysHighlights() {
    const highlights = [
        {
            title: 'Best Performing Page',
            value: '/services/web-development',
            metric: '2,450 views',
            icon: TrophyIcon,
            trend: '+15%',
            positive: true
        },
        {
            title: 'Hot Lead',
            value: 'Tech Startup Inc.',
            metric: '$15k potential',
            icon: FireIcon,
            trend: 'High Priority',
            positive: true
        },
        {
            title: 'Peak Traffic Hour',
            value: '2:00 PM - 3:00 PM',
            metric: '520 visitors',
            icon: SparklesIcon,
            trend: '+22%',
            positive: true
        },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
                <SparklesIcon className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold">Today&apos;s Highlights</h3>
            </div>
            <div className="space-y-4">
                {highlights.map((item, index) => {
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
                            <div className={`px-2 py-1 rounded text-xs font-medium ${item.positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                {item.trend}
                            </div>
                        </div>
                    );
                })}
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

// Main Dashboard Component
export default function AdminDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

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
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span className="text-sm">Messages</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatedStatCard
                    title="Total Visitors"
                    value={12543}
                    change={12.5}
                    icon={EyeIcon}
                    gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <AnimatedStatCard
                    title="New Leads"
                    value={48}
                    change={8.2}
                    icon={EnvelopeIcon}
                    gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
                />
                <AnimatedStatCard
                    title="Conversions"
                    value={156}
                    change={-2.4}
                    icon={UsersIcon}
                    gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                />
                <AnimatedStatCard
                    title="Revenue"
                    value={24500}
                    prefix="$"
                    change={15.3}
                    icon={CurrencyDollarIcon}
                    gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                />
            </div>

            {/* Today's Highlights + Quick Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TodaysHighlights />
                <div className="lg:col-span-2">
                    <QuickActions />
                </div>
            </div>

            {/* Conversion Funnel + Goals Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConversionFunnel />
                <GoalsTargets />
            </div>

            {/* Charts and Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TrafficChart />
                </div>
                <ActivityFeed />
            </div>

            {/* Top Pages Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Top Performing Pages</h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Last 7 days</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { page: '/services/web-development', views: 2450, percent: 100, trend: '+15%' },
                            { page: '/contact', views: 1820, percent: 74, trend: '+8%' },
                            { page: '/services/ai-solutions', views: 1240, percent: 51, trend: '+22%' },
                            { page: '/about', views: 980, percent: 40, trend: '+5%' },
                            { page: '/projects', views: 720, percent: 29, trend: '-3%' },
                        ].map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{item.page}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500">{item.views.toLocaleString()} views</span>
                                        <span className={`text-xs font-medium ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {item.trend}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700 group-hover:from-emerald-500 group-hover:to-emerald-600"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Overview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Avg. Session Duration', value: '4m 32s', change: '+12%', icon: ClockIcon },
                            { label: 'Bounce Rate', value: '32.5%', change: '-5%', icon: ArrowTrendingUpIcon },
                            { label: 'Pages per Session', value: '3.8', change: '+8%', icon: DocumentTextIcon },
                            { label: 'New vs Returning', value: '65/35%', change: '+3%', icon: UsersIcon },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            const isPositive = item.change.startsWith('+') || (item.label === 'Bounce Rate' && item.change.startsWith('-'));
                            return (
                                <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-500">{item.label}</span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <span className="text-xl font-bold text-gray-900">{item.value}</span>
                                        <span className={`text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {item.change}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Leads Table */}
            <RecentLeadsTable />
        </div>
    );
}
