import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/reports/export - Export report data in CSV or JSON format
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { generateReportData } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const format = searchParams.get('format') || 'json';
    const dateRangeStart = searchParams.get('dateRangeStart') || undefined;
    const dateRangeEnd = searchParams.get('dateRangeEnd') || undefined;

    if (!type) {
      return NextResponse.json(
        { success: false, message: 'Report type is required' },
        { status: 400 }
      );
    }

    if (format !== 'csv' && format !== 'json') {
      return NextResponse.json(
        { success: false, message: 'Format must be csv or json' },
        { status: 400 }
      );
    }

    const reportData = await generateReportData({
      type,
      format,
      dateRangeStart,
      dateRangeEnd,
    });

    // Return CSV format
    if (format === 'csv') {
      let csvString = '';

      if (Array.isArray(reportData) && reportData.length > 0) {
        const headers = Object.keys(reportData[0]);
        csvString = headers.join(',') + '\n';
        csvString += reportData
          .map((row: Record<string, unknown>) =>
            headers
              .map((header) => {
                const value = row[header];
                const stringValue = value === null || value === undefined ? '' : String(value);
                // Escape values that contain commas, quotes, or newlines
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                  return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
              })
              .join(',')
          )
          .join('\n');
      }

      return new NextResponse(csvString, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="report-${type}-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON format
    return NextResponse.json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    console.error('Error exporting report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to export report' },
      { status: 500 }
    );
  }
}
