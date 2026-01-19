import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// GET /api/admin/blog/posts/[id] - Get a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getBlogPostById } = await import('@/lib/admin/database/blog-queries');

    const { id } = await params;
    const post = await getBlogPostById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/blog/posts/[id] - Update a blog post
const updatePostSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  translations: z.array(z.object({
    locale: z.string(),
    title: z.string(),
    excerpt: z.string().optional(),
    content: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { updateBlogPost, updateBlogTranslation } = await import('@/lib/admin/database/blog-queries');

    const { id } = await params;
    const body = await request.json();
    const validation = updatePostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { translations, ...postData } = validation.data;

    // Update the blog post
    const post = await updateBlogPost(id, postData);

    // Update translations if provided
    if (translations && translations.length > 0) {
      for (const translation of translations) {
        await updateBlogTranslation(id, translation.locale, {
          title: translation.title,
          excerpt: translation.excerpt,
          content: translation.content,
          metaTitle: translation.metaTitle,
          metaDescription: translation.metaDescription,
        });
      }
    }

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/posts/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { deleteBlogPost } = await import('@/lib/admin/database/blog-queries');

    const { id } = await params;
    await deleteBlogPost(id);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
