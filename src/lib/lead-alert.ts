// Central lead alerting — every inbound lead must reach a human through at
// least one channel: the admin notification bell (DB) and/or an email to the
// admin inbox. Each channel fails soft on its own, but callers can inspect the
// result to respond honestly when NO channel worked (instead of showing the
// visitor a fake success screen while the lead vanished).
//
// Email requires RESEND_API_KEY and a sender domain verified in Resend
// (paksofts.com). Until both are configured, email silently no-ops and the
// bell notification is the only alert channel.

const FROM_ADDRESS = 'PakSoft <noreply@paksofts.com>';

function adminEmail() {
  return process.env.ADMIN_EMAIL || 'paksoft3@gmail.com';
}

/** Send an email via Resend. Returns true only if the API accepted it. */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to: [to], subject, html }),
    });
    if (!res.ok) {
      console.error('[lead-alert] Resend rejected email:', res.status, await res.text().catch(() => ''));
    }
    return res.ok;
  } catch (err) {
    console.error('[lead-alert] email send failed:', err);
    return false;
  }
}

/**
 * Alert the admin about a new lead via bell notification + email.
 * Returns whether at least one channel succeeded — when the DB is down
 * (e.g. Neon over quota) the bell write fails and email is the only path.
 */
export async function alertAdminOfLead(opts: {
  title: string;
  message: string;
  emailSubject: string;
  emailHtml: string;
  metadata?: Record<string, unknown>;
}): Promise<boolean> {
  let bell = false;
  try {
    const { createNotification } = await import('@/lib/admin/database/queries');
    await createNotification({
      type: 'lead',
      priority: 'high',
      title: opts.title,
      message: opts.message,
      actionUrl: '/admin/leads',
      metadata: opts.metadata,
    });
    bell = true;
  } catch (err) {
    console.error('[lead-alert] bell notification failed:', err);
  }
  const mail = await sendEmail(adminEmail(), opts.emailSubject, opts.emailHtml);
  return bell || mail;
}

/** Render a plain key/value HTML table for admin lead emails. */
export function leadDetailsHtml(fields: Record<string, string | undefined | null>): string {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;"><strong>${k}</strong></td><td style="padding:8px;border:1px solid #ddd;">${String(v).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');
  return `<table style="border-collapse:collapse;width:100%;">${rows}</table>`;
}
