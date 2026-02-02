export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';
    const alt = (formData.get('alt') as string) || '';
    const title = (formData.get('title') as string) || '';
    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Allowed: JPG, PNG, GIF, WebP, SVG, MP4, WebM` },
        { status: 400 }
      );
    }

    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Max size: ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(`media/${folder}/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    // Save to database
    const { getPrisma } = await import('@/lib/db/prisma');
    const prisma = getPrisma();

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: blob.url,
        type: file.type,
        size: file.size,
        alt,
        title: title || file.name,
        folder,
        tags,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
