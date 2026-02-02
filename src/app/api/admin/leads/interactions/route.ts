import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const eventTypes = ['whatsapp_click', 'phone_call', 'chat_open'];

    const [events, total] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where: { eventType: { in: eventTypes } },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.analyticsEvent.count({
        where: { eventType: { in: eventTypes } },
      }),
    ]);

    // Also get summary counts for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const summary = await prisma.analyticsEvent.groupBy({
      by: ['eventType'],
      where: {
        eventType: { in: eventTypes },
        createdAt: { gte: thirtyDaysAgo },
      },
      _count: true,
    });

    const summaryMap: Record<string, number> = {};
    for (const s of summary) {
      summaryMap[s.eventType] = s._count;
    }

    return NextResponse.json({
      success: true,
      data: events,
      summary: {
        whatsapp_clicks: summaryMap['whatsapp_click'] || 0,
        phone_calls: summaryMap['phone_call'] || 0,
        chat_opens: summaryMap['chat_open'] || 0,
        total: Object.values(summaryMap).reduce((a, b) => a + b, 0),
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch interactions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch interactions' },
      { status: 500 }
    );
  }
}
