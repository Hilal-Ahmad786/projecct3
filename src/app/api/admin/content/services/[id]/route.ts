import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/content/services/[id] - Get a single service by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Lazy import to avoid build-time issues
    const { getServiceById } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/content/services/[id] - Update a service
const updateServiceSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  heroImage: z.string().optional(),
  icon: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived']).optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
  color: z.string().optional(),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  content: z.any().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Lazy import to avoid build-time issues
    const { updateService } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const body = await request.json();
    const validation = updateServiceSchema.safeParse(body);

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

    const service = await updateService(id, validation.data);

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Lazy import to avoid build-time issues
    const { deleteService } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const deleted = await deleteService(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
