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
    let dbOk = true;
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
      console.error('Tool lead DB write failed:', dbError);
      dbOk = false;
    }

    // Alert the admin (bell + email). These are the highest-intent leads on
    // the site (visitor completed a tool AND left contact details) — if the
    // DB write failed, the admin email is the only place the lead survives,
    // so an unreachable admin means we must NOT claim success.
    const { alertAdminOfLead, leadDetailsHtml } = await import('@/lib/lead-alert');
    const alerted = await alertAdminOfLead({
      title: `New Tool Lead: ${tool}`,
      message: `${name} (${email}) completed the ${tool} tool`,
      emailSubject: `New tool lead (${tool}): ${name}${dbOk ? '' : ' — ⚠️ DB DOWN, not saved'}`,
      emailHtml: `<h2>New lead from the ${tool} tool</h2>
        ${dbOk ? '' : '<p><strong>⚠️ The database write failed — this lead exists ONLY in this email.</strong></p>'}
        ${leadDetailsHtml({ Name: name, Email: email, Company: company, Tool: tool, Data: JSON.stringify(data, null, 2) })}`,
      metadata: { source: `tool:${tool}` },
    });

    if (!dbOk && !alerted) {
      return NextResponse.json(
        {
          success: false,
          message:
            'We could not process your request right now. Please reach us on WhatsApp (+90 552 567 71 64) — we respond quickly.',
        },
        { status: 503 }
      );
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
