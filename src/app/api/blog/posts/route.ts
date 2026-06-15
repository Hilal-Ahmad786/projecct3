import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts - Get published blog posts for public view
export async function GET(request: NextRequest) {
  try {
    const { getPublishedBlogPosts } = await import('@/lib/admin/database/blog-queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const locale = searchParams.get('locale') || 'en';
    // Optional partition: 'general' (company blog) or a service slug.
    const category = searchParams.get('category') || undefined;

    const result = await getPublishedBlogPosts(locale, { page, limit }, category);

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
