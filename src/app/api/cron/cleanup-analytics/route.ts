import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';

// Retention cleanup for the AnalyticsEvent table (pageviews + heatmap clicks).
// Without this the table grows forever, making every admin analytics query —
// and the Neon free-tier data transfer — progressively more expensive. The
// admin heatmap/traffic views only ever look back 30 days, so 90 days of
// retention loses nothing anyone reads.
//
// Invoked by Vercel Cron (see vercel.json). Vercel automatically sends
// `Authorization: Bearer ${CRON_SECRET}` when the CRON_SECRET env var is set.
// Fails closed: without CRON_SECRET configured nothing runs, so a missing env
// var can never turn this into a public delete endpoint.
const RETENTION_DAYS = 90;

function isAuthorized(request: NextRequest, secret: string): boolean {
  const given = Buffer.from(request.headers.get('authorization') ?? '');
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error('[cron/cleanup-analytics] CRON_SECRET is not set; refusing to run');
    return NextResponse.json({ success: false }, { status: 503 });
  }
  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const { getPrisma } = await import('@/lib/db/prisma');
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

    const { count } = await getPrisma().analyticsEvent.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });

    console.log(`[cron/cleanup-analytics] deleted ${count} events older than ${RETENTION_DAYS}d`);
    return NextResponse.json({ success: true, deleted: count });
  } catch (err) {
    console.error('[cron/cleanup-analytics] failed:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
