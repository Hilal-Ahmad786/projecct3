import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { getSettings } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const settings = await getSettings(category);

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { upsertSetting } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { key, value, category } = body;

    if (!key || value === undefined || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: key, value, category' },
        { status: 400 }
      );
    }

    const setting = await upsertSetting(key, value, category);

    return NextResponse.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Error upserting setting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upsert setting' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { bulkUpsertSettings } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { settings } = body;

    if (!Array.isArray(settings) || settings.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing or empty settings array' },
        { status: 400 }
      );
    }

    const invalid = settings.some(
      (s: { key?: string; value?: unknown; category?: string }) =>
        !s.key || s.value === undefined || !s.category
    );

    if (invalid) {
      return NextResponse.json(
        { success: false, error: 'Each setting must have key, value, and category' },
        { status: 400 }
      );
    }

    const result = await bulkUpsertSettings(settings);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error bulk upserting settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to bulk upsert settings' },
      { status: 500 }
    );
  }
}
