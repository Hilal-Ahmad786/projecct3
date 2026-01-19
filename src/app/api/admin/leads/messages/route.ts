import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/leads/messages - Get all contact messages with pagination
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getContactMessages } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await getContactMessages(
      { status: status as 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED' | undefined, search },
      { page, limit }
    );

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/leads/messages - Bulk update messages (mark as read, etc.)
export async function PATCH(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { updateContactMessage } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { ids, status } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid message IDs' },
        { status: 400 }
      );
    }

    const validStatuses = ['UNREAD', 'READ', 'REPLIED', 'ARCHIVED', 'SPAM'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update each message
    const updates = await Promise.all(
      ids.map((id: string) => updateContactMessage(id, { status }))
    );

    return NextResponse.json({
      success: true,
      message: `${updates.filter(Boolean).length} messages updated`,
    });
  } catch (error) {
    console.error('Error updating messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update messages' },
      { status: 500 }
    );
  }
}
