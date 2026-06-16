import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/tracking/pageview — log a pageview to our own AnalyticsEvent table
// (eventType 'pageview'), which the admin Analytics/Traffic dashboards count.
// Deliberately lightweight and notification-free (unlike /api/tracking), so it
// can fire on every navigation without spamming the admin. Fails silently.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const page = typeof body?.page === 'string' ? body.page.slice(0, 300) : null;
    if (!page) return NextResponse.json({ success: true });

    const { trackAnalyticsEvent } = await import('@/lib/admin/database/queries');
    const ua = request.headers.get('user-agent') || '';
    const headerReferer = request.headers.get('referer') || undefined;

    await trackAnalyticsEvent({
      sessionId: (typeof body?.sessionId === 'string' && body.sessionId) || `anon-${Date.now()}`,
      eventType: 'pageview',
      eventName: 'pageview',
      page,
      referrer: (typeof body?.referrer === 'string' && body.referrer) || headerReferer,
      device: typeof body?.device === 'string' ? body.device : (ua ? parseDevice(ua) : undefined),
      browser: ua ? parseBrowser(ua) : undefined,
      os: ua ? parseOS(ua) : undefined,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

function parseBrowser(ua: string): string {
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

function parseDevice(ua: string): string {
  if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile';
  if (/Tablet|iPad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function parseOS(ua: string): string {
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iOS/i.test(ua)) return 'iOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Other';
}
