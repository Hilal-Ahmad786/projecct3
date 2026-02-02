import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getAdminUsers } = await import('@/lib/admin/database/queries');
    const result = await getAdminUsers();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password, role } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: 'Email, name, and password are required' },
        { status: 400 }
      );
    }

    const { createAdminUser } = await import('@/lib/admin/database/queries');
    const result = await createAdminUser({ email, name, password, role });
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
