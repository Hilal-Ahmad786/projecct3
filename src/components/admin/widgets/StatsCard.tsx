'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
};

export default function StatsCard({
    title,
    value,
    change,
    changeLabel = 'vs last month',
    icon: Icon,
    color = 'emerald'
}: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            {isPositive && <ArrowUpIcon className="w-4 h-4 text-emerald-500" />}
                            {isNegative && <ArrowDownIcon className="w-4 h-4 text-red-500" />}
                            <span className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-gray-500'}`}>
                                {isPositive && '+'}{change}%
                            </span>
                            <span className="text-sm text-gray-400">{changeLabel}</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
