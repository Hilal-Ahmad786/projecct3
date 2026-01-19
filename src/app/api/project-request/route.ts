import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const projectRequestSchema = z.object({
  // Contact Info
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),

  // Project Type
  serviceType: z.string().min(1),
  projectTitle: z.string().optional(),

  // Project Details
  description: z.string().min(50),
  goals: z.string().optional(),
  targetAudience: z.string().optional(),

  // Technical Requirements
  techPreferences: z.string().optional(),
  integrations: z.string().optional(),
  performanceReqs: z.string().optional(),

  // Budget & Timeline
  budgetRange: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE', 'CUSTOM']),
  timeline: z.enum(['URGENT', 'STANDARD', 'FLEXIBLE', 'LONG_TERM']),
  urgencyLevel: z.enum(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']).default('NORMAL'),
  preferredStartDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = projectRequestSchema.parse(body);

    // Try to use Prisma if available, otherwise store in memory/log
    let savedRequest;

    try {
      // Dynamic import to avoid build errors if Prisma isn't configured
      const { prisma } = await import('@/lib/db/prisma');

      // Create or find lead
      let lead = await prisma.lead.findFirst({
        where: { email: validatedData.email },
      });

      if (!lead) {
        lead = await prisma.lead.create({
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            company: validatedData.company,
            website: validatedData.website,
            source: 'project_request',
          },
        });
      }

      // Create project request
      savedRequest = await prisma.projectRequest.create({
        data: {
          leadId: lead.id,
          serviceType: validatedData.serviceType,
          projectTitle: validatedData.projectTitle,
          description: validatedData.description,
          goals: validatedData.goals,
          targetAudience: validatedData.targetAudience,
          techPreferences: validatedData.techPreferences,
          integrations: validatedData.integrations,
          performanceReqs: validatedData.performanceReqs,
          budgetRange: validatedData.budgetRange,
          timeline: validatedData.timeline,
          urgencyLevel: validatedData.urgencyLevel,
          preferredStartDate: validatedData.preferredStartDate
            ? new Date(validatedData.preferredStartDate)
            : null,
          additionalNotes: validatedData.additionalNotes,
        },
      });

      // Log activity
      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          type: 'CREATED',
          description: `New project request submitted for ${validatedData.serviceType}`,
          metadata: {
            serviceType: validatedData.serviceType,
            budgetRange: validatedData.budgetRange,
            timeline: validatedData.timeline,
          },
        },
      });
    } catch (dbError) {
      // Database not available - log to console for now
      console.log('Project Request (DB not available):', validatedData);
      savedRequest = {
        id: `temp_${Date.now()}`,
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
    }

    // TODO: Send email notification
    // await sendNotificationEmail(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Project request submitted successfully',
        data: { id: savedRequest.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Project request error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit project request',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
