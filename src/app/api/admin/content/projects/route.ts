import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// GET /api/admin/content/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const { getProjects } = await import('@/lib/admin/database/queries');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') || undefined;

    const result = await getProjects(
      {
        status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | undefined,
        category,
        search,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      },
      {
        page,
        limit,
        sortBy,
        sortOrder: sortOrder as 'asc' | 'desc' | undefined,
      }
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
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content/projects - Create a new project
const createProjectSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
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

export async function POST(request: NextRequest) {
  try {
    const { createProject } = await import('@/lib/admin/database/queries');

    const body = await request.json();
    const validation = createProjectSchema.safeParse(body);

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

    const project = await createProject(validation.data);

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
      { status: 500 }
    );
  }
}
