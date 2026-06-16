import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/heatmap
//   (no ?page)        → list of pages with click counts (for the picker)
//   ?page=/services/x → click points for that page
// Optional: &days=30  &device=Desktop|Mobile|Tablet|all
export async function GET(request: NextRequest) {
  try {
    const { getHeatmapPages, getHeatmapPoints } = await import('@/lib/admin/database/queries');
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || undefined;
    const days = parseInt(searchParams.get('days') || '30', 10);
    const device = searchParams.get('device') || 'all';

    if (!page) {
      const pages = await getHeatmapPages(days);
      return NextResponse.json({ success: true, data: pages });
    }

    const data = await getHeatmapPoints(page, days, device);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Heatmap fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load heatmap' },
      { status: 500 }
    );
  }
}
