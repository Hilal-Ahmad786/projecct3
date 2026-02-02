import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getPublishedProjects, getFeaturedProjects } = await import('@/lib/database/public-queries');

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const featured = searchParams.get('featured');
    const category = searchParams.get('category') || undefined;

    const projects = featured === 'true'
      ? await getFeaturedProjects(locale)
      : await getPublishedProjects(locale, category);

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
