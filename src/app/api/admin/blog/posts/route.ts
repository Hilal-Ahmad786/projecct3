import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// GET /api/admin/blog/posts - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { getBlogPosts } = await import('@/lib/admin/database/blog-queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured');

    const result = await getBlogPosts(
      {
        status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | undefined,
        category,
        search,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      },
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
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog/posts - Create a new blog post
const createPostSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
  translations: z.array(z.object({
    locale: z.string(),
    title: z.string(),
    excerpt: z.string().optional(),
    content: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const { createBlogPost, createBlogTranslation } = await import('@/lib/admin/database/blog-queries');

    const body = await request.json();
    const validation = createPostSchema.safeParse(body);

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

    const { translations, scheduledAt: scheduledAtStr, ...postData } = validation.data;

    // Create the blog post
    const post = await createBlogPost({
      ...postData,
      scheduledAt: scheduledAtStr ? new Date(scheduledAtStr) : undefined,
    });

    // Create translations if provided
    if (translations && translations.length > 0) {
      for (const translation of translations) {
        await createBlogTranslation({
          postId: post.id,
          ...translation,
        });
      }
    }

    revalidateTag('blog');

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
