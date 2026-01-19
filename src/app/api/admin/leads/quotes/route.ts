import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// GET /api/admin/leads/quotes - Get all project requests (quote requests)
export async function GET(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { getProjectRequests } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await getProjectRequests(
      { status: status as 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | undefined, search },
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
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/leads/quotes - Create a project request
const createQuoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10),
  leadId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createProjectRequest } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const validation = createQuoteSchema.safeParse(body);

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

    const quote = await createProjectRequest({
      leadId: validation.data.leadId,
      serviceType: validation.data.projectType,
      description: validation.data.description,
    });

    return NextResponse.json(
      { success: true, data: quote },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/leads/quotes - Update quote status
export async function PATCH(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { updateProjectRequest } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Quote ID is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['PENDING', 'UNDER_REVIEW', 'NEEDS_INFO', 'APPROVED', 'REJECTED', 'CONVERTED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updateData: { status?: 'PENDING' | 'UNDER_REVIEW' | 'NEEDS_INFO' | 'APPROVED' | 'REJECTED' | 'CONVERTED'; internalNotes?: string } = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.internalNotes = adminNotes;

    const quote = await updateProjectRequest(id, updateData);

    if (!quote) {
      return NextResponse.json(
        { success: false, message: 'Quote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: quote });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update quote' },
      { status: 500 }
    );
  }
}
