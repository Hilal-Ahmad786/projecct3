import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/leads/contacts - Get all leads with pagination
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getLeads } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const source = searchParams.get('source') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await getLeads(
      { status: status as 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST' | undefined, source, search },
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
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST /api/admin/leads/contacts - Create a new lead
const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createLead } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const validation = createLeadSchema.safeParse(body);

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

    const lead = await createLead(validation.data);

    return NextResponse.json(
      { success: true, data: lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
