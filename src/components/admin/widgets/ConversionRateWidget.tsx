'use client';

import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const weeklyData = [
    { day: 'Mon', rate: 4.2 },
    { day: 'Tue', rate: 3.8 },
    { day: 'Wed', rate: 5.1 },
    { day: 'Thu', rate: 4.6 },
    { day: 'Fri', rate: 5.8 },
    { day: 'Sat', rate: 3.2 },
    { day: 'Sun', rate: 2.9 },
];

export default function ConversionRateWidget() {
    const currentRate = 4.2;
    const previousRate = 3.8;
    const change = ((currentRate - previousRate) / previousRate * 100).toFixed(1);
    const isPositive = currentRate > previousRate;
    const maxRate = Math.max(...weeklyData.map(d => d.rate));

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <ChartBarIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Conversion Rate</h3>
                        <p className="text-sm text-gray-500">This week</p>
                    </div>
                </div>
            </div>

            <div className="flex items-end gap-2 mb-6">
                <div className="text-3xl font-bold text-gray-900">{currentRate}%</div>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
                    {change}%
                </div>
            </div>

            <div className="h-24 flex items-end justify-between gap-1">
                {weeklyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t transition-all duration-300"
                            style={{ height: `${(item.rate / maxRate) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500 mt-1">{item.day}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">vs. last week</span>
                    <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>{isPositive ? '+' : ''}{change}%</span>
                </div>
            </div>
        </div>
    );
}
