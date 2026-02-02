import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getPublishedServices, getFeaturedServices } = await import('@/lib/database/public-queries');

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const featured = searchParams.get('featured');

    const services = featured === 'true'
      ? await getFeaturedServices(locale)
      : await getPublishedServices(locale);

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
