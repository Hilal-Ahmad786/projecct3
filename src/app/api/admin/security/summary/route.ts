import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getSecuritySummary } = await import('@/lib/admin/database/queries');
    const summary = await getSecuritySummary();
    return NextResponse.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error fetching security summary:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch security summary' },
      { status: 500 }
    );
  }
}
