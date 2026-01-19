import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/dashboard - Get dashboard stats and recent activity
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getDashboardStats, getLeads, getProjectRequests, getContactMessages } = await import('@/lib/admin/database/queries');

    // Get overall stats
    const stats = await getDashboardStats();

    // Get recent leads (last 5)
    const recentLeads = await getLeads({}, { page: 1, limit: 5 });

    // Get recent project requests (last 5)
    const recentRequests = await getProjectRequests({}, { page: 1, limit: 5 });

    // Get recent messages (last 5)
    const recentMessages = await getContactMessages({}, { page: 1, limit: 5 });

    // Calculate conversion rate
    const conversionRate = stats.leads.total > 0
      ? Math.round((stats.leads.qualified / stats.leads.total) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalLeads: stats.leads.total,
          newLeads: stats.leads.new,
          qualifiedLeads: stats.leads.qualified,
          projectRequests: stats.requests.total,
          pendingRequests: stats.requests.pending,
          contactMessages: stats.messages.thisMonth,
          unreadMessages: stats.messages.unread,
          conversionRate,
        },
        recentActivity: {
          leads: recentLeads.data,
          projectRequests: recentRequests.data,
          messages: recentMessages.data,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
