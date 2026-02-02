import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getTrafficByReferrer } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const days = period === '24h' ? 1 : period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const sources = await getTrafficByReferrer(days);
    return NextResponse.json({ success: true, data: sources });
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch traffic sources' },
      { status: 500 }
    );
  }
}
