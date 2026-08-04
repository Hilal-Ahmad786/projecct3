import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { duplicateBlogPost } = await import('@/lib/admin/database/blog-queries');

    const { id } = await params;
    const duplicated = await duplicateBlogPost(id);

    revalidateTag('blog');

    return NextResponse.json({ success: true, data: duplicated }, { status: 201 });
  } catch (error) {
    console.error('Error duplicating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to duplicate blog post' },
      { status: 500 }
    );
  }
}
