import { NextRequest, NextResponse } from 'next/server';

// GET /api/blog/posts/[slug] - Get a single published blog post by slug.
// Served from the cached public query (1h, tag 'blog') + CDN edge cache, so a
// blog pageview no longer costs a Neon read. (Previously force-dynamic and
// uncached — one full-content DB transfer per view.)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { getPublicBlogPostBySlug } = await import('@/lib/database/public-queries');

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const post = await getPublicBlogPostBySlug(slug, locale);

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
