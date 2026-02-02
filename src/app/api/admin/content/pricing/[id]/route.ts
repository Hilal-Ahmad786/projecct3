import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { updatePricingPackage } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Package ID is required' },
        { status: 400 }
      );
    }

    const updatedPackage = await updatePricingPackage(id, body);

    return NextResponse.json({ success: true, data: updatedPackage });
  } catch (error) {
    console.error('Error updating pricing package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update pricing package' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { deletePricingPackage } = await import('@/lib/admin/database/queries');

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Package ID is required' },
        { status: 400 }
      );
    }

    await deletePricingPackage(id);

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error('Error deleting pricing package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete pricing package' },
      { status: 500 }
    );
  }
}
