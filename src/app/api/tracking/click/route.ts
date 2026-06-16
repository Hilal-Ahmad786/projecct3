import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/tracking/click — store a batch of click points for the heatmap.
// Each point becomes an AnalyticsEvent row (eventType 'click'). Fails silently
// so it never disrupts the visitor experience.
const MAX_POINTS = 50;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const page = typeof body?.page === 'string' ? body.page.slice(0, 300) : null;
    const points = Array.isArray(body?.points) ? body.points : [];
    if (!page || points.length === 0) return NextResponse.json({ success: true });

    const { trackAnalyticsEvent } = await import('@/lib/admin/database/queries');
    const sessionId = (typeof body?.sessionId === 'string' && body.sessionId) || `anon-${Date.now()}`;
    const device = typeof body?.device === 'string' ? body.device : undefined;
    const vw = Number.isFinite(body?.vw) ? body.vw : null;

    const clean = points
      .filter((p: unknown): p is { xpct: number; ypct: number; tag?: string } =>
        !!p && typeof (p as { xpct?: unknown }).xpct === 'number' && typeof (p as { ypct?: unknown }).ypct === 'number')
      .slice(0, MAX_POINTS);

    await Promise.all(
      clean.map(p =>
        trackAnalyticsEvent({
          sessionId,
          eventType: 'click',
          eventName: 'heatmap_click',
          page,
          metadata: { xpct: p.xpct, ypct: p.ypct, vw, tag: p.tag || null },
          device,
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    // Tracking must never surface errors to the client.
    return NextResponse.json({ success: true });
  }
}
