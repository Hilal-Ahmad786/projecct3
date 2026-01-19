'use client';

import { ShieldCheckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const alerts = [
    { type: 'warning', message: 'Failed login attempts detected', time: '5m ago' },
    { type: 'success', message: 'Security scan completed', time: '2h ago' },
    { type: 'success', message: 'SSL certificate valid', time: '1d ago' },
];

export default function SecurityWidget() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Security</h3>
                        <p className="text-sm text-gray-500">System status</p>
                    </div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                    Protected
                </span>
            </div>

            <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">92/100</div>
                <div className="text-sm text-gray-500">Security Score</div>
            </div>

            <div className="space-y-3">
                {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                        {alert.type === 'warning' ? (
                            <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mt-0.5" />
                        ) : (
                            <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                            <div className="text-gray-700">{alert.message}</div>
                            <div className="text-xs text-gray-400">{alert.time}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div>
                    <div className="text-lg font-bold text-gray-900">1,247</div>
                    <div className="text-xs text-gray-500">Attacks Blocked</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-gray-900">99.9%</div>
                    <div className="text-xs text-gray-500">Uptime</div>
                </div>
            </div>
        </div>
    );
}
