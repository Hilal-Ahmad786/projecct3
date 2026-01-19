'use client';

import { BoltIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const metrics = [
    { name: 'Page Load Time', value: '0.8s', status: 'good', target: '< 2s' },
    { name: 'First Contentful Paint', value: '1.2s', status: 'good', target: '< 2s' },
    { name: 'Time to Interactive', value: '2.1s', status: 'warning', target: '< 2s' },
    { name: 'Cumulative Layout Shift', value: '0.05', status: 'good', target: '< 0.1' },
];

export default function PerformanceWidget() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BoltIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Performance</h3>
                    <p className="text-sm text-gray-500">Core Web Vitals</p>
                </div>
            </div>

            <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray={`${92 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">92</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {metric.status === 'good' ? (
                                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <ExclamationCircleIcon className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="text-sm text-gray-600">{metric.name}</span>
                        </div>
                        <span className={`text-sm font-medium ${metric.status === 'good' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
