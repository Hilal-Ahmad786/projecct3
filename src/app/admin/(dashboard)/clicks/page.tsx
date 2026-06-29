import { getPrisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

/** CTA click event types stored in AnalyticsEvent (see /api/tracking). */
const CLICK_EVENT_TYPES = ['whatsapp_click', 'phone_call', 'chat_open'] as const;

const EVENT_LABELS: Record<string, string> = {
    whatsapp_click: 'WhatsApp',
    phone_call: 'Phone',
    chat_open: 'Chat',
};

/** Distinct colors so the same IP is instantly recognizable across rows. */
const IP_COLORS = [
    '#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
];

const PRESETS: { key: string; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: '7d', label: 'Last 7 days' },
    { key: '30d', label: 'Last 30 days' },
    { key: '90d', label: 'Last 90 days' },
];

/** Exact click time in Türkiye (Europe/Istanbul) time, to the second. */
const TIME_FMT = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Europe/Istanbul',
});

type SP = { period?: string; from?: string; to?: string };

function metaStr(metadata: unknown, key: string): string | null {
    if (metadata && typeof metadata === 'object' && key in metadata) {
        const v = (metadata as Record<string, unknown>)[key];
        if (typeof v === 'string' && v) return v;
    }
    return null;
}

/** Türkiye (UTC+3, no DST) is fixed — build day boundaries with a +03:00 offset. */
function resolveRange(sp: SP) {
    const now = new Date();
    const istToday = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(now);
    const todayStart = new Date(`${istToday}T00:00:00+03:00`);
    const period = sp.period ?? '30d';

    if (period === 'today') return { period, from: todayStart, to: now, label: 'Today', fromStr: istToday, toStr: istToday };
    if (period === 'yesterday') {
        const y = new Date(todayStart.getTime() - 86_400_000);
        const yStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(y);
        return { period, from: y, to: todayStart, label: 'Yesterday', fromStr: yStr, toStr: yStr };
    }
    if (period === 'custom' && sp.from && sp.to) {
        const from = new Date(`${sp.from}T00:00:00+03:00`);
        const to = new Date(new Date(`${sp.to}T00:00:00+03:00`).getTime() + 86_400_000);
        if (!Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime()) && from < to) {
            return { period, from, to, label: `${sp.from} – ${sp.to}`, fromStr: sp.from, toStr: sp.to };
        }
    }
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
    return {
        period: period === '7d' || period === '90d' ? period : '30d',
        from: new Date(now.getTime() - days * 86_400_000),
        to: now,
        label: `Last ${days} days`,
        fromStr: istToday,
        toStr: istToday,
    };
}

export default async function ClicksPage({
    searchParams,
}: {
    searchParams: Promise<SP>;
}) {
    const sp = await searchParams;
    const range = resolveRange(sp);

    const prisma = getPrisma();
    const events = await prisma.analyticsEvent.findMany({
        where: {
            eventType: { in: [...CLICK_EVENT_TYPES] },
            createdAt: { gte: range.from, lt: range.to },
        },
        orderBy: { createdAt: 'desc' },
        take: 5000,
        select: { id: true, eventType: true, page: true, metadata: true, device: true, createdAt: true },
    });

    const counts: Record<string, number> = {};
    const ipCount = new Map<string, number>();
    for (const e of events) {
        counts[e.eventType] = (counts[e.eventType] ?? 0) + 1;
        const ip = metaStr(e.metadata, 'ipHash');
        if (ip) ipCount.set(ip, (ipCount.get(ip) ?? 0) + 1);
    }
    const total = events.length;
    const uniqueIps = ipCount.size;
    const repeatIps = [...ipCount.values()].filter((c) => c > 1).length;

    // Busiest IP = #1, stable color per IP.
    const ipInfo = new Map<string, { label: string; color: string; count: number }>();
    [...ipCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(([ip, c], i) => {
            ipInfo.set(ip, { label: `IP #${i + 1}`, color: IP_COLORS[i % IP_COLORS.length], count: c });
        });

    const recent = events.slice(0, 200);

    const presetHref = (key: string) =>
        key === 'custom'
            ? `/admin/clicks?period=custom&from=${range.fromStr}&to=${range.toStr}`
            : `/admin/clicks?period=${key}`;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Clicks</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Every CTA click with its exact time, button and page · {range.label} (Türkiye saati)
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                        <a
                            key={p.key}
                            href={presetHref(p.key)}
                            className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                                p.key === range.period
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {p.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Custom date range */}
            <form method="get" className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <input type="hidden" name="period" value="custom" />
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-500">Start</label>
                    <input type="date" name="from" defaultValue={range.fromStr} className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-500">End</label>
                    <input type="date" name="to" defaultValue={range.toStr} className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
                </div>
                <button type="submit" className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white">
                    Apply range
                </button>
            </form>

            {/* KPI cards */}
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(['whatsapp_click', 'phone_call', 'chat_open'] as const).map((t) => (
                    <div key={t} className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="text-sm text-gray-500">{EVENT_LABELS[t]}</div>
                        <div className="mt-1 text-3xl font-bold text-gray-900">{(counts[t] ?? 0).toLocaleString('tr-TR')}</div>
                    </div>
                ))}
                <div className="rounded-xl border border-gray-900 bg-gray-900 p-5 text-white">
                    <div className="text-sm text-gray-300">Total</div>
                    <div className="mt-1 text-3xl font-bold">{total.toLocaleString('tr-TR')}</div>
                </div>
            </div>

            {/* IP signal */}
            <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="text-sm text-gray-500">Distinct IPs</div>
                    <div className="mt-1 text-3xl font-bold text-gray-900">{uniqueIps}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="text-sm text-gray-500">Repeat IPs</div>
                    <div className="mt-1 text-3xl font-bold text-gray-900">{repeatIps}</div>
                </div>
            </div>
            <p className="mb-6 text-xs text-gray-500">
                Each distinct IP gets its own color/number. Same color = likely the same person/device;
                different colors = different visitors. IPs are stored only as irreversible hashes (no raw IP).
                Older clicks recorded before this update show “no IP”.
            </p>

            {/* Recent clicks log */}
            <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                    <h2 className="text-sm font-bold text-gray-900">Recent clicks</h2>
                    <p className="text-xs text-gray-500">Newest first · showing up to {recent.length} clicks in range</p>
                </div>
                {recent.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-500">No clicks in this period.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    <th className="px-5 py-3">Time</th>
                                    <th className="px-4 py-3">Button</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Page</th>
                                    <th className="px-4 py-3">IP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recent.map((r) => {
                                    const ip = metaStr(r.metadata, 'ipHash');
                                    const info = ip ? ipInfo.get(ip) : undefined;
                                    return (
                                        <tr key={r.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-5 py-3 tabular-nums text-gray-600">{TIME_FMT.format(r.createdAt)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">{EVENT_LABELS[r.eventType] ?? r.eventType}</td>
                                            <td className="px-4 py-3 text-gray-600">{metaStr(r.metadata, 'source') ?? '—'}</td>
                                            <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.page}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {info ? (
                                                    <span
                                                        title={`${info.count} clicks from this IP`}
                                                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                                                        style={{ backgroundColor: info.color }}
                                                    >
                                                        {info.label}
                                                        {info.count > 1 && <span className="opacity-80">×{info.count}</span>}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">no IP</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
