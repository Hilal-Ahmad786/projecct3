import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getPricingPackages } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId') || undefined;

    const packages = await getPricingPackages(serviceId);

    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('Error fetching pricing packages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pricing packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { createPricingPackage } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { serviceId, tier, name, price, description, features, highlighted, billingPeriod, yearlyPrice, ctaText } = body;

    if (!serviceId || !name || price === undefined) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: serviceId, name, price' },
        { status: 400 }
      );
    }

    const newPackage = await createPricingPackage({
      serviceId,
      tier,
      name,
      price,
      description,
      features,
      highlighted,
      billingPeriod,
      yearlyPrice,
      ctaText,
    });

    revalidateTag('pricing');
    revalidateTag('services');

    return NextResponse.json({ success: true, data: newPackage }, { status: 201 });
  } catch (error) {
    console.error('Error creating pricing package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create pricing package' },
      { status: 500 }
    );
  }
}
