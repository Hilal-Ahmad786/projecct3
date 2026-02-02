'use client';

import { useLeads } from '@/hooks/admin/useLeads';
import type { Lead } from '@/hooks/admin/useLeads';

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-emerald-100 text-emerald-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
    closed: 'bg-gray-100 text-gray-700',
};

function TableSkeleton() {
    return (
        <tbody className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                            <div className="h-4 w-28 bg-gray-200 rounded" />
                            <div className="h-3 w-36 bg-gray-100 rounded" />
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default function RecentLeadsTable() {
    const { leads, isLoading, isError } = useLeads({ limit: 5 });

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            </div>
            {isError && (
                <div className="px-6 py-4 text-sm text-amber-700 bg-amber-50">
                    Unable to load leads data. Please try again later.
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <tbody className="divide-y divide-gray-200">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <p className="text-sm text-gray-500">No leads yet</p>
                                        <p className="text-xs text-gray-400 mt-1">Leads will appear here as they come in through your forms and contacts</p>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead: Lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                <div className="text-sm text-gray-500">{lead.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source ?? '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
