import { NextRequest, NextResponse } from 'next/server';
import { getProjectRequests, createProjectRequest, updateProjectRequest } from '@/lib/admin/database/queries';
import { z } from 'zod';

// GET /api/admin/leads/quotes - Get all project requests (quote requests)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await getProjectRequests({
      page,
      limit,
      status: status as 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected' | undefined,
      search,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
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
  leadId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
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

    const quote = await createProjectRequest(validation.data);

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
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Quote ID is required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'reviewed', 'quoted', 'accepted', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updateData: { status?: string; adminNotes?: string } = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

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
