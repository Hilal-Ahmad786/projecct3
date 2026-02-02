'use client';

import useSWR from 'swr';
import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Interaction {
  id: string;
  eventType: string;
  page: string;
  metadata: Record<string, string | null> | null;
  device: string | null;
  browser: string | null;
  createdAt: string;
}

interface InteractionsResponse {
  success: boolean;
  data: Interaction[];
  summary: {
    whatsapp_clicks: number;
    phone_calls: number;
    chat_opens: number;
    total: number;
  };
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

const eventLabels: Record<string, { label: string; color: string; icon: 'whatsapp' | 'phone' | 'chat' }> = {
  whatsapp_click: { label: 'WhatsApp', color: 'bg-green-100 text-green-700', icon: 'whatsapp' },
  phone_call: { label: 'Phone Call', color: 'bg-blue-100 text-blue-700', icon: 'phone' },
  chat_open: { label: 'Chat', color: 'bg-purple-100 text-purple-700', icon: 'chat' },
};

function EventIcon({ type }: { type: string }) {
  const info = eventLabels[type];
  if (!info) return null;

  if (info.icon === 'whatsapp') {
    return (
      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }
  if (info.icon === 'phone') {
    return <PhoneIcon className="w-4 h-4 text-blue-600" />;
  }
  return <ChatBubbleLeftRightIcon className="w-4 h-4 text-purple-600" />;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-32 bg-gray-100 rounded" />
          </div>
          <div className="h-3 w-12 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function RecentInteractionsTable() {
  const { data, isLoading, error } = useSWR<InteractionsResponse>(
    '/api/admin/leads/interactions?limit=10',
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 30000 }
  );

  const summary = data?.summary;
  const interactions = data?.data || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Click Interactions</h3>
          {summary && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {summary.whatsapp_clicks} WA
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {summary.phone_calls} Calls
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                {summary.chat_opens} Chat
              </span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">WhatsApp, phone &amp; chat clicks (last 30 days)</p>
      </div>

      {error && (
        <div className="px-6 py-4 text-sm text-amber-700 bg-amber-50">
          Unable to load interactions data.
        </div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : interactions.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <ChatBubbleLeftRightIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No interactions yet</p>
          <p className="text-xs text-gray-400 mt-1">
            When visitors click WhatsApp, call, or chat buttons, interactions will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {interactions.map((item) => {
            const info = eventLabels[item.eventType] || {
              label: item.eventType,
              color: 'bg-gray-100 text-gray-700',
              icon: 'chat' as const,
            };
            const source = (item.metadata as Record<string, string | null> | null)?.source || 'website';
            const message = (item.metadata as Record<string, string | null> | null)?.message;

            return (
              <div key={item.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${info.color}`}>
                  <EventIcon type={item.eventType} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{info.label}</span>
                    <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded-full ${info.color}`}>
                      {source}
                    </span>
                    {item.device && (
                      <span className="text-[10px] text-gray-400">{item.device}</span>
                    )}
                  </div>
                  {message && (
                    <p className="text-xs text-gray-500 truncate">{message}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {timeAgo(item.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
