import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// GET /api/admin/content/projects/[id] - Get a single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { getProjectById } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const project = await getProjectById(id);

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

// PATCH /api/admin/content/projects/[id] - Update a project
const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
  client: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  fullDescription: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  images: z.array(z.string()).optional(),
  results: z.any().optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  completedDate: z.string().optional(),
  projectUrl: z.string().optional(),
  content: z.any().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { updateProject } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    const body = await request.json();
    const validation = updateProjectSchema.safeParse(body);

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

    const project = await updateProject(id, validation.data);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { deleteProject } = await import('@/lib/admin/database/queries');

    const { id } = await params;
    await deleteProject(id);

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
