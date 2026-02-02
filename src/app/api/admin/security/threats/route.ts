import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getSecurityEvents } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);
    const threats = await getSecurityEvents(days);
    return NextResponse.json({ success: true, data: threats });
  } catch (error) {
    console.error('Error fetching security threats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch security threats' },
      { status: 500 }
    );
  }
}
