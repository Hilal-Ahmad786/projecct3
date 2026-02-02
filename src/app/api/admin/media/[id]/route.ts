export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(media);
  } catch (error) {
    console.error('Media get error:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { alt, title, folder, tags } = body;

    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    const data: Record<string, unknown> = {};
    if (alt !== undefined) data.alt = alt;
    if (title !== undefined) data.title = title;
    if (folder !== undefined) data.folder = folder;
    if (tags !== undefined) data.tags = tags;

    const media = await prisma.media.update({ where: { id }, data });
    return NextResponse.json(media);
  } catch (error) {
    console.error('Media update error:', error);
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Delete from Vercel Blob
    try {
      await del(media.url);
    } catch {
      // Blob deletion may fail if already removed; continue with DB deletion
    }

    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Media delete error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
