import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getActiveVisitors } = await import('@/lib/admin/database/queries');
    const visitors = await getActiveVisitors();
    return NextResponse.json({ success: true, data: visitors });
  } catch (error) {
    console.error('Error fetching active visitors:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch active visitors' }, { status: 500 });
  }
}
