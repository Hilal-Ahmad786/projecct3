import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createContactMessage, createLead, getLeadByEmail } from '@/lib/admin/database/queries';

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
    const body = await request.json();

    // Validate the request body
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.errors.map((e) => ({
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

    // Send email notification (if email service is configured)
    try {
      await sendEmailNotifications(name, email, subject, message);
    } catch (emailError) {
      console.error('Failed to send email notifications:', emailError);
      // Don't fail the request if email fails
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

// Email notification helper function
async function sendEmailNotifications(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  // Check if email service is configured
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log('Email service not configured. Skipping email notifications.');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'info@paksoft.com';

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
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent from the PakSoft contact form.
        </p>
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
      to: [email],
      subject: 'We received your message - PakSoft',
      html: `
        <h2>Thank you for contacting us, ${name}!</h2>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message summary:</strong></p>
        <p><em>Subject:</em> ${subject}</p>
        <p><em>Message:</em> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
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
