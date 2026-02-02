export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    // Fetch all media items to get URLs for blob deletion
    const items = await prisma.media.findMany({
      where: { id: { in: ids } },
      select: { id: true, url: true },
    });

    // Delete from Vercel Blob (best-effort)
    await Promise.allSettled(items.map(item => del(item.url)));

    // Delete from database
    const result = await prisma.media.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ deleted: result.count });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
