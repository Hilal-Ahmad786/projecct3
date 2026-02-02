import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getPublicPricingPackages } = await import('@/lib/database/public-queries');

    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get('service') || undefined;

    const packages = await getPublicPricingPackages(serviceSlug);

    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pricing packages' },
      { status: 500 }
    );
  }
}
