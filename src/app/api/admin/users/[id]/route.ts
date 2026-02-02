import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const { updateAdminUser } = await import('@/lib/admin/database/queries');
    const result = await updateAdminUser(id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update admin user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const { deleteAdminUser } = await import('@/lib/admin/database/queries');
    const result = await deleteAdminUser(id);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete admin user' },
      { status: 500 }
    );
  }
}
