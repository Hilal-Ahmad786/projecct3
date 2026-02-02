import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/content/services - Get all services with pagination
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getServices } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const featured = searchParams.get('featured') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') || undefined;

    const result = await getServices(
      {
        status: status as 'active' | 'draft' | 'archived' | undefined,
        featured: featured !== undefined ? featured === 'true' : undefined,
        search,
        sortBy,
        sortOrder: sortOrder as 'asc' | 'desc' | undefined,
      },
      { page, limit }
    );

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
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content/services - Create a new service
const createServiceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
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

export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createService } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const validation = createServiceSchema.safeParse(body);

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

    const service = await createService(validation.data);

    return NextResponse.json(
      { success: true, data: service },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}
