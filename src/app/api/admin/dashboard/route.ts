import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats, getLeads, getProjectRequests, getContactMessages } from '@/lib/admin/database/queries';

// GET /api/admin/dashboard - Get dashboard stats and recent activity
export async function GET(request: NextRequest) {
  try {
    // Get overall stats
    const stats = await getDashboardStats();

    // Get recent leads (last 5)
    const recentLeads = await getLeads({ page: 1, limit: 5 });

    // Get recent project requests (last 5)
    const recentRequests = await getProjectRequests({ page: 1, limit: 5 });

    // Get recent messages (last 5)
    const recentMessages = await getContactMessages({ page: 1, limit: 5 });

    // Calculate conversion rate
    const conversionRate = stats.totalLeads > 0
      ? Math.round((stats.convertedLeads / stats.totalLeads) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalLeads: stats.totalLeads,
          newLeads: stats.newLeads,
          contactedLeads: stats.contactedLeads,
          qualifiedLeads: stats.qualifiedLeads,
          convertedLeads: stats.convertedLeads,
          lostLeads: stats.lostLeads,
          projectRequests: stats.projectRequests,
          pendingRequests: stats.pendingRequests,
          contactMessages: stats.contactMessages,
          unreadMessages: stats.unreadMessages,
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
