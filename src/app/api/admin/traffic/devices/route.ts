import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getTrafficByDevice, getTrafficByBrowser } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const days = period === '24h' ? 1 : period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const [devices, browsers] = await Promise.all([
      getTrafficByDevice(days),
      getTrafficByBrowser(days),
    ]);
    return NextResponse.json({
      success: true,
      data: { devices, browsers },
    });
  } catch (error) {
    console.error('Error fetching device traffic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch device traffic' },
      { status: 500 }
    );
  }
}
