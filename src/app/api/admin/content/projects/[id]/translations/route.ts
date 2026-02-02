import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const translationSchema = z.object({
  locale: z.string().min(2).max(5),
  name: z.string().min(1),
  description: z.string().optional(),
  fullDescription: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.any().optional(),
  content: z.any().optional(),
});

// GET /api/admin/content/projects/[id]/translations - Get all translations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getProjectTranslations } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const translations = await getProjectTranslations(id);

    return NextResponse.json({ success: true, data: translations });
  } catch (error) {
    console.error('Error fetching project translations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content/projects/[id]/translations - Create/update a translation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { upsertProjectTranslation } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const body = await request.json();
    const validation = translationSchema.safeParse(body);

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

    const { locale, ...data } = validation.data;
    const translation = await upsertProjectTranslation(id, locale, data);

    return NextResponse.json({ success: true, data: translation });
  } catch (error) {
    console.error('Error upserting project translation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save translation' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content/projects/[id]/translations - Delete a translation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { deleteProjectTranslation } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    if (!locale) {
      return NextResponse.json(
        { success: false, message: 'Locale query parameter is required' },
        { status: 400 }
      );
    }

    await deleteProjectTranslation(id, locale);

    return NextResponse.json({
      success: true,
      message: 'Translation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project translation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete translation' },
      { status: 500 }
    );
  }
}
