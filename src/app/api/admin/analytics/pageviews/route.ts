import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/pageviews - Get page view data
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getPageViews } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';

    // Calculate days based on period
    let days = 7;
    switch (period) {
      case '24h':
        days = 1;
        break;
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 7;
    }

    const pageViews = await getPageViews(days);

    return NextResponse.json({
      success: true,
      data: {
        topPages: pageViews.map((pv) => ({
          page: pv.page,
          count: pv._count,
        })),
        period,
      },
    });
  } catch (error) {
    console.error('Error fetching page views:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page views' },
      { status: 500 }
    );
  }
}

// POST /api/admin/analytics/pageviews - Track a page view
export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { trackAnalyticsEvent } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { page, referrer, sessionId } = body;

    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page is required' },
        { status: 400 }
      );
    }

    await trackAnalyticsEvent({
      eventType: 'pageview',
      page,
      referrer: referrer || undefined,
      sessionId: sessionId || `session_${Date.now()}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track page view' },
      { status: 500 }
    );
  }
}
