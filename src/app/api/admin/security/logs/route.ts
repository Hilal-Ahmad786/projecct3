import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getSecurityEvents } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);
    const logs = await getSecurityEvents(days);
    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error('Error fetching security audit logs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch security audit logs' },
      { status: 500 }
    );
  }
}
