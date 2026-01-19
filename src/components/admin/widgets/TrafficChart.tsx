'use client';

export default function TrafficChart() {
    // Mock data for a simple bar chart visualization
    const data = [
        { day: 'Mon', visitors: 120 },
        { day: 'Tue', visitors: 180 },
        { day: 'Wed', visitors: 150 },
        { day: 'Thu', visitors: 220 },
        { day: 'Fri', visitors: 200 },
        { day: 'Sat', visitors: 90 },
        { day: 'Sun', visitors: 70 },
    ];

    const maxVisitors = Math.max(...data.map(d => d.visitors));

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Traffic</h3>
            <div className="flex items-end justify-between gap-2 h-48">
                {data.map((item) => (
                    <div key={item.day} className="flex flex-col items-center flex-1">
                        <div className="w-full flex justify-center mb-2">
                            <div
                                className="w-8 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-500"
                                style={{ height: `${(item.visitors / maxVisitors) * 150}px` }}
                            />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                <span className="text-gray-500">Total this week</span>
                <span className="font-semibold text-gray-900">1,030 visitors</span>
            </div>
        </div>
    );
}
