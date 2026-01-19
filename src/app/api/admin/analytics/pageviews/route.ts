import { NextRequest, NextResponse } from 'next/server';
import { getPageViews, trackAnalyticsEvent } from '@/lib/admin/database/queries';

// GET /api/admin/analytics/pageviews - Get page view data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const page = searchParams.get('page') || undefined;

    // Calculate date range based on period
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const pageViews = await getPageViews(startDate, endDate);

    // Group by page if requested
    let groupedData = pageViews;
    if (page) {
      groupedData = pageViews.filter(pv => pv.page === page);
    }

    // Aggregate by date for chart data
    const dailyData: Record<string, number> = {};
    pageViews.forEach(pv => {
      const date = pv.timestamp.toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + 1;
    });

    const chartData = Object.entries(dailyData).map(([date, count]) => ({
      date,
      count,
    })).sort((a, b) => a.date.localeCompare(b.date));

    // Get top pages
    const pageCount: Record<string, number> = {};
    pageViews.forEach(pv => {
      pageCount[pv.page] = (pageCount[pv.page] || 0) + 1;
    });

    const topPages = Object.entries(pageCount)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        total: pageViews.length,
        chartData,
        topPages,
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
    const body = await request.json();
    const { page, referrer, userAgent, sessionId } = body;

    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page is required' },
        { status: 400 }
      );
    }

    await trackAnalyticsEvent({
      eventType: 'page_view',
      page,
      referrer: referrer || null,
      userAgent: userAgent || null,
      sessionId: sessionId || null,
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
