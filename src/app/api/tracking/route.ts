import { createHmac } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VALID_EVENT_TYPES = ['whatsapp_click', 'phone_call', 'chat_open'] as const;

/** Salted, irreversible IP fingerprint (KVKK-friendly — raw IP is never stored). */
function hashIp(ip: string): string {
  const pepper = process.env.CLICK_PEPPER || 'click-pepper';
  return createHmac('sha256', pepper).update(ip).digest('hex').slice(0, 16);
}

function clientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '';
}

export async function POST(request: NextRequest) {
  try {
    const { trackAnalyticsEvent, createNotification } = await import(
      '@/lib/admin/database/queries'
    );

    const body = await request.json();
    const { eventType, source, message, page, sessionId } = body;

    if (!eventType || !VALID_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid event type' },
        { status: 400 }
      );
    }

    // Extract basic info from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;
    const ip = clientIp(request);
    const ipHash = ip && ip !== '0.0.0.0' ? hashIp(ip) : null;

    // Store as analytics event
    await trackAnalyticsEvent({
      sessionId: sessionId || `anon-${Date.now()}`,
      eventType,
      eventName: eventType,
      page: page || referer || '/',
      referrer: referer,
      metadata: {
        source: source || 'floating_button',
        message: message || null,
        ipHash,
      },
      browser: userAgent ? parseBrowser(userAgent) : undefined,
      device: userAgent ? parseDevice(userAgent) : undefined,
    });

    // Create admin notification
    const labels: Record<string, { title: string; icon: string }> = {
      whatsapp_click: { title: 'WhatsApp Click', icon: 'whatsapp' },
      phone_call: { title: 'Phone Call Click', icon: 'phone' },
      chat_open: { title: 'Chat Opened', icon: 'chat' },
    };

    const label = labels[eventType] || { title: eventType, icon: 'info' };

    await createNotification({
      type: 'lead',
      priority: 'medium',
      title: `New ${label.title}`,
      message: `A visitor clicked ${label.title.toLowerCase()} from ${source || 'the website'}${
        message ? `. Message: "${message.slice(0, 100)}"` : ''
      }`,
      actionUrl: '/admin/leads',
      metadata: {
        eventType,
        source: source || 'floating_button',
        message: message || null,
        page: page || referer || null,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    // Don't expose errors to client — tracking should fail silently
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
