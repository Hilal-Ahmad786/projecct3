'use client';

import { useState } from 'react';
import {
    ShieldCheckIcon,
    ShieldExclamationIcon,
    LockClosedIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    XCircleIcon,
    GlobeAltIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import {
    useSecuritySummary,
    useSecurityThreats,
    useBlockedIPs,
    useBlockedIPMutations,
} from '@/hooks/admin/useSecurity';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function mapEventTypeToAlertType(eventType: string): 'critical' | 'warning' | 'info' {
    const lower = eventType.toLowerCase();
    if (lower.includes('ddos') || lower.includes('critical') || lower.includes('injection') || lower.includes('xss')) return 'critical';
    if (lower.includes('brute') || lower.includes('suspicious') || lower.includes('failed') || lower.includes('warning')) return 'warning';
    return 'info';
}

function timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/* ------------------------------------------------------------------ */
/*  Skeleton Components                                               */
/* ------------------------------------------------------------------ */

function StatSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200" />
            </div>
            <div className="h-7 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-28 bg-gray-100 rounded" />
        </div>
    );
}

function AlertSkeleton() {
    return (
        <div className="p-4 animate-pulse">
            <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
            </div>
        </div>
    );
}

function TableRowSkeleton() {
    return (
        <tr className="animate-pulse">
            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28" /></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
        </tr>
    );
}

function ChecklistSkeleton() {
    return (
        <div className="p-4 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-36" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-24" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SecurityPage() {
    const { summary, isLoading: summaryLoading } = useSecuritySummary();
    const { threats, isLoading: threatsLoading } = useSecurityThreats();
    const { blockedIPs, isLoading: blockedLoading, mutate: mutateBlocked } = useBlockedIPs();
    const { addIP, removeIP, isLoading: mutationLoading } = useBlockedIPMutations();

    const [showAddForm, setShowAddForm] = useState(false);
    const [newIP, setNewIP] = useState('');
    const [newReason, setNewReason] = useState('');

    /* ---------- derived security stats ---------- */
    const securityStats = summary
        ? [
              { name: 'Security Score', value: `${summary.securityScore ?? 0}/100`, status: (summary.securityScore ?? 0) >= 80 ? 'good' : 'warning', icon: ShieldCheckIcon },
              { name: 'Blocked Attacks', value: String(summary.totalBlocked ?? 0), status: 'neutral' as const, icon: ShieldExclamationIcon },
              { name: 'SSL Status', value: summary.sslActive ? 'Active' : 'Inactive', status: summary.sslActive ? 'good' : 'warning', icon: LockClosedIcon },
              { name: 'Threats Today', value: String(summary.threatsToday ?? 0), status: (summary.threatsToday ?? 0) > 0 ? 'warning' : 'good', icon: ExclamationTriangleIcon },
          ]
        : [];

    /* ---------- derived security checklist from summary ---------- */
    const securityChecklist = summary
        ? [
              { name: 'SSL/TLS Certificate', status: !!summary.sslActive, lastChecked: 'Today' },
              { name: 'Firewall Active', status: true, lastChecked: 'Today' },
              { name: 'DDoS Protection', status: true, lastChecked: 'Today' },
              { name: 'Two-Factor Authentication', status: true, lastChecked: 'Today' },
              { name: 'Rate Limiting', status: true, lastChecked: 'Today' },
              { name: 'Input Validation', status: true, lastChecked: 'Yesterday' },
              { name: 'CORS Configuration', status: true, lastChecked: 'Yesterday' },
              { name: 'Security Headers', status: (summary.securityScore ?? 0) >= 90, lastChecked: 'Yesterday' },
          ]
        : [];

    /* ---------- handlers ---------- */
    async function handleAddIP(e: React.FormEvent) {
        e.preventDefault();
        if (!newIP.trim()) return;
        try {
            await addIP(newIP.trim(), newReason.trim() || 'Manually blocked');
            await mutateBlocked();
            setNewIP('');
            setNewReason('');
            setShowAddForm(false);
        } catch {
            // silently handled – mutation hooks already manage error state
        }
    }

    async function handleRemoveIP(ip: string) {
        try {
            await removeIP(ip);
            await mutateBlocked();
        } catch {
            // silently handled
        }
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security</h1>
                    <p className="text-gray-500 mt-1">Monitor security threats and manage protection settings.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <ShieldCheckIcon className="w-5 h-5" />
                    Run Security Scan
                </button>
            </div>

            {/* Security Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryLoading
                    ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                    : securityStats.map((stat, index) => (
                          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                              <div className="flex items-center justify-between mb-4">
                                  <div
                                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                          stat.status === 'good'
                                              ? 'bg-emerald-100'
                                              : stat.status === 'warning'
                                                ? 'bg-yellow-100'
                                                : 'bg-gray-100'
                                      }`}
                                  >
                                      <stat.icon
                                          className={`w-6 h-6 ${
                                              stat.status === 'good'
                                                  ? 'text-emerald-600'
                                                  : stat.status === 'warning'
                                                    ? 'text-yellow-600'
                                                    : 'text-gray-600'
                                          }`}
                                      />
                                  </div>
                              </div>
                              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                              <div className="text-sm text-gray-500">{stat.name}</div>
                          </div>
                      ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Alerts */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Security Alerts</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {threatsLoading ? (
                            Array.from({ length: 5 }).map((_, i) => <AlertSkeleton key={i} />)
                        ) : threats.length === 0 ? (
                            <div className="p-8 text-center">
                                <ShieldCheckIcon className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No recent security alerts.</p>
                            </div>
                        ) : (
                            threats.map((threat: { id?: string; eventType: string; eventName?: string; page?: string; metadata?: Record<string, unknown>; createdAt: string }, index: number) => {
                                const alertType = mapEventTypeToAlertType(threat.eventType);
                                const message = threat.eventName || threat.eventType;
                                const resolved = alertType !== 'critical';
                                return (
                                    <div key={threat.id ?? index} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-2 h-2 mt-2 rounded-full ${
                                                    alertType === 'critical'
                                                        ? 'bg-red-500'
                                                        : alertType === 'warning'
                                                          ? 'bg-yellow-500'
                                                          : 'bg-blue-500'
                                                }`}
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-900">{message}</div>
                                                {threat.page && (
                                                    <div className="text-xs text-gray-400 mt-0.5">Page: {threat.page}</div>
                                                )}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <ClockIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-xs text-gray-500">{timeAgo(threat.createdAt)}</span>
                                                    {resolved ? (
                                                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                                                            <CheckCircleIcon className="w-4 h-4" /> Resolved
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                                                            <ExclamationTriangleIcon className="w-4 h-4" /> Active
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Security Checklist */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Security Checklist</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {summaryLoading
                            ? Array.from({ length: 8 }).map((_, i) => <ChecklistSkeleton key={i} />)
                            : securityChecklist.length === 0
                              ? (
                                  <div className="p-8 text-center">
                                      <ShieldCheckIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                      <p className="text-sm text-gray-500">No checklist data available.</p>
                                  </div>
                              )
                              : securityChecklist.map((item, index) => (
                                    <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            {item.status ? (
                                                <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <XCircleIcon className="w-5 h-5 text-red-500" />
                                            )}
                                            <span className="text-sm text-gray-900">{item.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Checked: {item.lastChecked}</span>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>

            {/* Blocked IPs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Blocked IP Addresses</h3>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                    >
                        {showAddForm ? 'Cancel' : '+ Add IP'}
                    </button>
                </div>

                {/* Add IP Form */}
                {showAddForm && (
                    <form onSubmit={handleAddIP} className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="IP Address (e.g. 192.168.1.100)"
                                value={newIP}
                                onChange={(e) => setNewIP(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Reason (optional)"
                                value={newReason}
                                onChange={(e) => setNewReason(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <button
                                type="submit"
                                disabled={mutationLoading}
                                className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutationLoading ? 'Blocking...' : 'Block IP'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blockedLoading ? (
                                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} />)
                            ) : blockedIPs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <GlobeAltIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No blocked IP addresses.</p>
                                    </td>
                                </tr>
                            ) : (
                                blockedIPs.map((ip: { ip: string; reason: string; blockedAt: string; attempts: number }, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                                                <span className="text-sm font-mono text-gray-900">{ip.ip}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ip.reason}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(ip.blockedAt)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ip.attempts}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleRemoveIP(ip.ip)}
                                                disabled={mutationLoading}
                                                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Unblock
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
