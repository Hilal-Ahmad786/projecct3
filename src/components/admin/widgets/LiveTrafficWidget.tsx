'use client';

import { GlobeAltIcon } from '@heroicons/react/24/outline';

const liveVisitors = [
    { country: '🇺🇸', city: 'New York', page: '/services/web-development', time: 'now' },
    { country: '🇩🇪', city: 'Berlin', page: '/contact', time: '1m ago' },
    { country: '🇹🇷', city: 'Istanbul', page: '/about', time: '2m ago' },
    { country: '🇬🇧', city: 'London', page: '/services/ai-solutions', time: '3m ago' },
    { country: '🇵🇰', city: 'Karachi', page: '/projects', time: '5m ago' },
];

export default function LiveTrafficWidget() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <GlobeAltIcon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Live Traffic</h3>
                        <p className="text-sm text-gray-500">Real-time visitors</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-gray-500">LIVE</span>
                </div>
            </div>

            <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <GlobeAltIcon className="w-24 h-24 text-gray-200" />
                <div className="absolute top-4 left-8 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <div className="absolute top-8 right-12 w-2 h-2 bg-emerald-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-8 left-16 w-2 h-2 bg-emerald-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-4 right-8 w-2 h-2 bg-emerald-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="space-y-2">
                {liveVisitors.map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{visitor.country}</span>
                            <div>
                                <div className="font-medium text-gray-900">{visitor.city}</div>
                                <div className="text-xs text-gray-400 truncate max-w-[120px]">{visitor.page}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            {visitor.time === 'now' && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                            {visitor.time}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
