import { NextRequest, NextResponse } from 'next/server';

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
    }, {
      // Cache at the CDN edge per-URL (each locale/page/category combo) for an
      // hour, serving stale while revalidating. Public blog content rarely
      // changes, so this removes a DB hit from nearly every listing request.
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
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
