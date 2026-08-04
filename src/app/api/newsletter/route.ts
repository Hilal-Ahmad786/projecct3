import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Try to save to database (dedupe by email — mirror tools/lead-capture)
    let dbOk = true;
    try {
      const { getPrisma } = await import('@/lib/db/prisma');
      const prisma = getPrisma();

      const lead = await prisma.lead.findFirst({ where: { email } });

      if (!lead) {
        await prisma.lead.create({
          data: {
            name: email.split('@')[0],
            email,
            source: 'newsletter',
            notes: 'Subscribed to the newsletter via the site footer.',
          },
        });
      } else if (!(lead.notes || '').includes('newsletter')) {
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            notes: `${lead.notes ? `${lead.notes}\n` : ''}[${new Date().toISOString()}] Subscribed to the newsletter via the site footer.`,
          },
        });
      }
    } catch (dbError) {
      console.error('Newsletter DB write failed:', dbError);
      dbOk = false;
    }

    // Alert the admin (bell + email). If the DB write failed, the admin email
    // is the only place the subscriber survives — so an unreachable admin
    // means we must NOT claim success.
    const { alertAdminOfLead, leadDetailsHtml } = await import('@/lib/lead-alert');
    const alerted = await alertAdminOfLead({
      title: 'New Newsletter Signup',
      message: `${email} subscribed to the newsletter`,
      emailSubject: `New newsletter signup: ${email}${dbOk ? '' : ' — ⚠️ DB DOWN, not saved'}`,
      emailHtml: `<h2>New newsletter signup</h2>
        ${dbOk ? '' : '<p><strong>⚠️ The database write failed — this subscriber exists ONLY in this email.</strong></p>'}
        ${leadDetailsHtml({ Email: email, Source: 'Footer newsletter form' })}`,
      metadata: { source: 'newsletter' },
    });

    if (!dbOk && !alerted) {
      return NextResponse.json(
        {
          success: false,
          message:
            'We could not process your subscription right now. Please try again later or reach us on WhatsApp (+90 552 567 71 64).',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
