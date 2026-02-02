import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getTrafficByCountry } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const days = period === '24h' ? 1 : period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const countries = await getTrafficByCountry(days);
    return NextResponse.json({ success: true, data: countries });
  } catch (error) {
    console.error('Error fetching geographic traffic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch geographic traffic' },
      { status: 500 }
    );
  }
}
