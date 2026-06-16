import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/overview - Get dashboard overview stats
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getDashboardStats, getPageViews, getPageViewCount, getVisitorStats } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';

    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();

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

    // Get dashboard stats
    const stats = await getDashboardStats();

    // Get page views for the period — `pageViews` is the top-10 pages (for the
    // chart/top-pages list); `totalPageViews` is the true total for the KPI.
    const pageViews = await getPageViews(startDate, now);
    const totalPageViews = await getPageViewCount(startDate, now);

    // Get visitor stats
    const visitorStats = await getVisitorStats(startDate, now);

    // Calculate trends (comparing to previous period)
    const previousStartDate = new Date(startDate);
    previousStartDate.setTime(previousStartDate.getTime() - (now.getTime() - startDate.getTime()));

    const previousTotalPageViews = await getPageViewCount(previousStartDate, startDate);
    const previousVisitorStats = await getVisitorStats(previousStartDate, startDate);

    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalLeads: stats.totalLeads,
          newLeads: stats.newLeads,
          projectRequests: stats.projectRequests,
          contactMessages: stats.contactMessages,
          pageViews: totalPageViews,
          uniqueVisitors: visitorStats.uniqueVisitors,
        },
        trends: {
          pageViews: calculateTrend(totalPageViews, previousTotalPageViews),
          uniqueVisitors: calculateTrend(visitorStats.uniqueVisitors, previousVisitorStats.uniqueVisitors),
        },
        charts: {
          pageViews: pageViews,
          visitorStats: visitorStats,
        },
        period,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics overview' },
      { status: 500 }
    );
  }
}
