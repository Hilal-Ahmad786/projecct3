import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/notifications - List notifications
export async function GET(request: NextRequest) {
  try {
    const { getNotifications, getUnreadCount } = await import(
      '@/lib/admin/database/queries'
    );

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const read = searchParams.get('read');
    const type = searchParams.get('type') || undefined;

    const result = await getNotifications(
      {
        read: read !== null ? read === 'true' : undefined,
        type,
      },
      { page, limit }
    );

    const unreadCount = await getUnreadCount();

    return NextResponse.json({
      success: true,
      data: {
        notifications: result.data,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: result.totalPages,
        },
        unreadCount,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST /api/admin/notifications - Create a notification
export async function POST(request: NextRequest) {
  try {
    const { createNotification } = await import(
      '@/lib/admin/database/queries'
    );

    const body = await request.json();
    const { title, message, type, priority, userId, actionUrl, metadata } =
      body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, message: 'Title and message are required' },
        { status: 400 }
      );
    }

    const notification = await createNotification({
      title,
      message,
      type,
      priority,
      userId,
      actionUrl,
      metadata,
    });

    return NextResponse.json(
      { success: true, data: notification },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/notifications - Mark notification(s) as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, markAll } = body;

    if (markAll) {
      const { markAllNotificationsRead } = await import(
        '@/lib/admin/database/queries'
      );

      const result = await markAllNotificationsRead();

      return NextResponse.json({ success: true, data: result });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Notification id is required' },
        { status: 400 }
      );
    }

    const { markNotificationRead } = await import(
      '@/lib/admin/database/queries'
    );

    const notification = await markNotificationRead(id);

    return NextResponse.json({ success: true, data: notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to mark notification as read' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/notifications - Delete a notification
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Notification id is required' },
        { status: 400 }
      );
    }

    const { deleteNotification } = await import(
      '@/lib/admin/database/queries'
    );

    await deleteNotification(id);

    return NextResponse.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
