import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { getPublishedProjectBySlug } = await import('@/lib/database/public-queries');

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const project = await getPublishedProjectBySlug(slug, locale);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
