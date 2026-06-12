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

    // Send email notification
    try {
      await sendProjectRequestNotification(validatedData);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

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

// Email notification helper function
async function sendProjectRequestNotification(data: {
  name: string;
  email: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  company?: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log('Email service not configured. Skipping notifications.');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'paksoft3@gmail.com';

  // Send notification to admin
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'PakSoft <noreply@paksoft.com.tr>',
      to: [adminEmail],
      subject: `New Project Request: ${data.serviceType}`,
      html: `
        <h2>New Project Request Received</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
          ${data.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.serviceType}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.budgetRange}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline}</td></tr>
        </table>
        <h3>Project Description</h3>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.description.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This request was submitted from the PakSoft website.</p>
      `,
    }),
  });

  // Send confirmation to user
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'PakSoft <noreply@paksoft.com.tr>',
      to: [data.email],
      subject: 'We received your project request - PakSoft',
      html: `
        <h2>Thank you for your project request, ${data.name}!</h2>
        <p>We have received your project request and our team will review it within 24-48 hours.</p>
        <h3>What happens next?</h3>
        <ol>
          <li>Our team will review your requirements</li>
          <li>We'll prepare a preliminary proposal and estimate</li>
          <li>We'll schedule a call to discuss your project in detail</li>
        </ol>
        <p><strong>Your project summary:</strong></p>
        <ul>
          <li>Service Type: ${data.serviceType}</li>
          <li>Budget Range: ${data.budgetRange}</li>
          <li>Timeline: ${data.timeline}</li>
        </ul>
        <hr>
        <p>Best regards,<br>The PakSoft Team</p>
        <p style="color: #666; font-size: 12px;">
          PakSoft - Modern Digital Solutions<br>
          <a href="https://paksoft.com.tr">paksoft.com.tr</a>
        </p>
      `,
    }),
  });
}
