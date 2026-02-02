import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const reorderSchema = z.object({
  orders: z.array(z.object({
    id: z.string(),
    order: z.number().int(),
  })),
});

export async function POST(request: NextRequest) {
  try {
    const { reorderServices } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const validation = reorderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validation.error.errors },
        { status: 400 }
      );
    }

    await reorderServices(validation.data.orders);

    return NextResponse.json({ success: true, message: 'Services reordered successfully' });
  } catch (error) {
    console.error('Error reordering services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reorder services' },
      { status: 500 }
    );
  }
}
