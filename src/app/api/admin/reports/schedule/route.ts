import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/reports/schedule - List scheduled reports
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getScheduledReports } = await import('@/lib/admin/database/queries');

    const result = await getScheduledReports();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching scheduled reports:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch scheduled reports' },
      { status: 500 }
    );
  }
}

// POST /api/admin/reports/schedule - Create a scheduled report
export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createScheduledReport } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { name, type, frequency, nextRunAt } = body;

    if (!name || !type || !frequency) {
      return NextResponse.json(
        { success: false, message: 'Name, type, and frequency are required' },
        { status: 400 }
      );
    }

    const scheduledReport = await createScheduledReport({
      name,
      type,
      frequency,
      nextRunAt: nextRunAt || undefined,
    });

    return NextResponse.json(
      { success: true, data: scheduledReport },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating scheduled report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create scheduled report' },
      { status: 500 }
    );
  }
}
