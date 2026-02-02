import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { duplicatePricingPackage } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const duplicated = await duplicatePricingPackage(id);

    return NextResponse.json({ success: true, data: duplicated }, { status: 201 });
  } catch (error) {
    console.error('Error duplicating pricing package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to duplicate pricing package' },
      { status: 500 }
    );
  }
}
