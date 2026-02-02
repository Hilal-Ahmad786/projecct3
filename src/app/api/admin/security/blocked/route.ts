import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getBlockedIPs } = await import('@/lib/admin/database/queries');
    const blockedIPs = await getBlockedIPs();
    return NextResponse.json({ success: true, data: blockedIPs });
  } catch (error) {
    console.error('Error fetching blocked IPs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blocked IPs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { addBlockedIP } = await import('@/lib/admin/database/queries');
    const body = await request.json();
    const { ip, reason } = body;

    if (!ip || !reason) {
      return NextResponse.json(
        { success: false, message: 'IP and reason are required' },
        { status: 400 }
      );
    }

    const result = await addBlockedIP(ip, reason);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding blocked IP:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add blocked IP' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { removeBlockedIP } = await import('@/lib/admin/database/queries');
    const body = await request.json();
    const { ip } = body;

    if (!ip) {
      return NextResponse.json(
        { success: false, message: 'IP is required' },
        { status: 400 }
      );
    }

    const result = await removeBlockedIP(ip);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error removing blocked IP:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove blocked IP' },
      { status: 500 }
    );
  }
}
