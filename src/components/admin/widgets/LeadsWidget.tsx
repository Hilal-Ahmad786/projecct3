'use client';

import { EnvelopeIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const leadsData = [
    { stage: 'New', count: 24, color: 'bg-blue-500', percent: 40 },
    { stage: 'Contacted', count: 18, color: 'bg-yellow-500', percent: 30 },
    { stage: 'Qualified', count: 12, color: 'bg-emerald-500', percent: 20 },
    { stage: 'Closed', count: 6, color: 'bg-gray-500', percent: 10 },
];

export default function LeadsWidget() {
    const totalLeads = leadsData.reduce((acc, item) => acc + item.count, 0);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Lead Funnel</h3>
                        <p className="text-sm text-gray-500">{totalLeads} total leads</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    +12%
                </div>
            </div>

            <div className="space-y-3">
                {leadsData.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{item.stage}</span>
                            <span className="font-medium text-gray-900">{item.count}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                style={{ width: `${item.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Conversion Rate</span>
                    <span className="text-lg font-bold text-emerald-600">25%</span>
                </div>
            </div>
        </div>
    );
}
