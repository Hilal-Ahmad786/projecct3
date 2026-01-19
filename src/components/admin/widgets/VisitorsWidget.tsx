'use client';

import { UsersIcon } from '@heroicons/react/24/outline';

export default function VisitorsWidget() {
    return (
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-medium">LIVE</span>
                </div>
            </div>

            <div className="text-4xl font-bold mb-1">47</div>
            <div className="text-emerald-100 text-sm mb-4">Active visitors right now</div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div>
                    <div className="text-lg font-semibold">156</div>
                    <div className="text-xs text-emerald-100">Last hour</div>
                </div>
                <div>
                    <div className="text-lg font-semibold">2.4K</div>
                    <div className="text-xs text-emerald-100">Today</div>
                </div>
                <div>
                    <div className="text-lg font-semibold">12.5K</div>
                    <div className="text-xs text-emerald-100">This week</div>
                </div>
            </div>
        </div>
    );
}
