'use client';

import { CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const monthlyRevenue = [
    { month: 'Jul', amount: 18500 },
    { month: 'Aug', amount: 22000 },
    { month: 'Sep', amount: 19800 },
    { month: 'Oct', amount: 28500 },
    { month: 'Nov', amount: 32000 },
    { month: 'Dec', amount: 24500 },
];

export default function RevenueWidget() {
    const totalRevenue = monthlyRevenue.reduce((acc, item) => acc + item.amount, 0);
    const maxAmount = Math.max(...monthlyRevenue.map(m => m.amount));

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Revenue</h3>
                        <p className="text-sm text-gray-500">Last 6 months</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    +15.3%
                </div>
            </div>

            <div className="h-40 flex items-end justify-between gap-2">
                {monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                            className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-300 hover:from-purple-600 hover:to-purple-500"
                            style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Revenue</span>
                    <span className="text-lg font-bold text-gray-900">${totalRevenue.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
