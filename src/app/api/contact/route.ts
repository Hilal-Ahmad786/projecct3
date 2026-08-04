import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyCaptchaToken } from '@/lib/captcha';

// Force dynamic rendering to avoid build-time Prisma issues
export const dynamic = 'force-dynamic';

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Lazy import to avoid build-time issues
    const { createContactMessage, createLead, getLeadByEmail } = await import('@/lib/admin/database/queries');

    const body = await request.json();

    // reCAPTCHA check — only rejects when a token was sent AND positively
    // failed verification; unset keys / missing token skip it entirely.
    if (!(await verifyCaptchaToken(body.captchaToken))) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Your submission could not be verified. Please try again, or reach us directly on WhatsApp (+90 552 567 71 64).',
        },
        { status: 400 }
      );
    }

    // Validate the request body
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // Check if lead already exists, if not create one
    let lead = await getLeadByEmail(email);

    if (!lead) {
      lead = await createLead({
        name,
        email,
        phone: phone || undefined,
        source: 'contact_form',
        notes: `Initial contact via contact form. Subject: ${subject}`,
      });
    }

    // Create the contact message
    const contactMessage = await createContactMessage({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      leadId: lead.id,
    });

    // Alert the admin (bell notification + email) and confirm to the user.
    try {
      const { alertAdminOfLead, sendEmail, leadDetailsHtml } = await import('@/lib/lead-alert');
      await alertAdminOfLead({
        title: 'New Contact Message',
        message: `${name} (${email}) — ${subject}`,
        emailSubject: `New Contact Form Submission: ${subject}`,
        emailHtml: `<h2>New Contact Form Submission</h2>${leadDetailsHtml({ Name: name, Email: email, Phone: phone, Subject: subject, Message: message })}`,
        metadata: { source: 'contact_form', messageId: contactMessage.id },
      });
      await sendUserConfirmation(sendEmail, name, email, subject, message);
    } catch (emailError) {
      console.error('Failed to send notifications:', emailError);
      // Don't fail the request — the message is already stored.
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
        data: {
          id: contactMessage.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Confirmation email back to the visitor (no-ops until RESEND_API_KEY +
// verified paksofts.com sender domain are configured in Resend).
async function sendUserConfirmation(
  sendEmail: (to: string, subject: string, html: string) => Promise<boolean>,
  name: string,
  email: string,
  subject: string,
  message: string
) {
  await sendEmail(
    email,
    'We received your message - PakSoft',
    `
      <h2>Thank you for contacting us, ${name}!</h2>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Your message summary:</strong></p>
      <p><em>Subject:</em> ${subject}</p>
      <p><em>Message:</em> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
      <hr>
      <p>Best regards,<br>The PakSoft Team</p>
      <p style="color: #666; font-size: 12px;">
        PakSoft - Modern Digital Solutions<br>
        <a href="https://www.paksofts.com">paksofts.com</a>
      </p>
    `
  );
}
