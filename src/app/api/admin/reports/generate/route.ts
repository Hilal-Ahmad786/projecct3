import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/reports/generate - List recent reports
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getReportRecords } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await getReportRecords(
      { type },
      { page, limit }
    );

    return NextResponse.json({
      success: true,
      data: {
        data: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST /api/admin/reports/generate - Generate a new report
export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createReportRecord, generateReportData } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { name, type, format, dateRangeStart, dateRangeEnd } = body;

    if (!name || !type) {
      return NextResponse.json(
        { success: false, message: 'Name and type are required' },
        { status: 400 }
      );
    }

    // First generate the report data
    const reportData = await generateReportData({
      type,
      format: format || 'json',
      dateRangeStart: dateRangeStart || undefined,
      dateRangeEnd: dateRangeEnd || undefined,
    });

    // Then create the report record
    const reportRecord = await createReportRecord({
      name,
      type,
      format: format || 'json',
      dateRangeStart: dateRangeStart || undefined,
      dateRangeEnd: dateRangeEnd || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          record: reportRecord,
          reportData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
