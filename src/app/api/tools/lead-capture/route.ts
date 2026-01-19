import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  tool: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  data: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { tool, name, email, company, data } = validation.data;

    // Try to save to database
    try {
      const { getPrisma } = await import('@/lib/db/prisma');
      const prisma = getPrisma();

      // Check if lead exists
      let lead = await prisma.lead.findFirst({ where: { email } });

      if (!lead) {
        // Create new lead
        lead = await prisma.lead.create({
          data: {
            name,
            email,
            company: company || null,
            source: `tool:${tool}`,
            notes: JSON.stringify({ tool, toolData: data }),
          },
        });
      } else {
        // Update existing lead with tool interaction
        const existingNotes = lead.notes ? JSON.parse(lead.notes as string) : {};
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            notes: JSON.stringify({
              ...existingNotes,
              [`${tool}_${Date.now()}`]: data,
            }),
          },
        });
      }

      // Create contact message for follow-up
      await prisma.contactMessage.create({
        data: {
          leadId: lead.id,
          name,
          email,
          subject: `Tool Lead: ${tool}`,
          message: `Lead captured from ${tool} tool.\n\nData: ${JSON.stringify(data, null, 2)}`,
        },
      });
    } catch (dbError) {
      // Log error but don't fail - we still want to respond to user
      console.error('Database error (continuing anyway):', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
