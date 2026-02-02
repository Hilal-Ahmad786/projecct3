import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const translationSchema = z.object({
  locale: z.string().min(2).max(5),
  name: z.string().min(1),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  content: z.any().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// GET /api/admin/content/services/[id]/translations - Get all translations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getServiceTranslations } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const translations = await getServiceTranslations(id);

    return NextResponse.json({ success: true, data: translations });
  } catch (error) {
    console.error('Error fetching service translations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content/services/[id]/translations - Create/update a translation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { upsertServiceTranslation } = await import('@/lib/admin/database/queries');

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
    const translation = await upsertServiceTranslation(id, locale, data);

    return NextResponse.json({ success: true, data: translation });
  } catch (error) {
    console.error('Error upserting service translation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save translation' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content/services/[id]/translations - Delete a translation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { deleteServiceTranslation } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    if (!locale) {
      return NextResponse.json(
        { success: false, message: 'Locale query parameter is required' },
        { status: 400 }
      );
    }

    await deleteServiceTranslation(id, locale);

    return NextResponse.json({
      success: true,
      message: 'Translation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service translation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete translation' },
      { status: 500 }
    );
  }
}
