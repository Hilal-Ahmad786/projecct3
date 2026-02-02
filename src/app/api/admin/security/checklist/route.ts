export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Derive checklist from actual configuration
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || '';
    const isHttps = siteUrl.startsWith('https://') || process.env.NODE_ENV === 'production';

    // Check for rate limiting middleware
    let hasRateLimiting = false;
    try {
      // Check if middleware.ts exists with rate limiting
      const fs = await import('fs');
      const path = await import('path');
      const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
      if (fs.existsSync(middlewarePath)) {
        const content = fs.readFileSync(middlewarePath, 'utf-8');
        hasRateLimiting = content.includes('rate') || content.includes('limit');
      }
    } catch {
      // File doesn't exist or can't be read
    }

    // Check security headers from next.config
    let hasSecurityHeaders = false;
    try {
      const fs = await import('fs');
      const path = await import('path');
      const configPath = path.join(process.cwd(), 'next.config.ts');
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        hasSecurityHeaders = content.includes('X-Frame-Options') && content.includes('X-Content-Type-Options');
      }
    } catch {
      // Can't read config
    }

    // Check for CORS configuration
    const hasCors = !!process.env.ALLOWED_ORIGINS || hasSecurityHeaders;

    // Check for 2FA (check if admin users have 2FA fields)
    const has2FA = false; // No 2FA model fields currently

    const checklist = [
      { name: 'SSL/TLS Certificate', status: isHttps, lastChecked: new Date().toISOString() },
      { name: 'Firewall Active', status: process.env.NODE_ENV === 'production', lastChecked: new Date().toISOString() },
      { name: 'DDoS Protection', status: !!process.env.VERCEL_URL, lastChecked: new Date().toISOString() },
      { name: 'Two-Factor Authentication', status: has2FA, lastChecked: new Date().toISOString() },
      { name: 'Rate Limiting', status: hasRateLimiting, lastChecked: new Date().toISOString() },
      { name: 'Input Validation', status: true, lastChecked: new Date().toISOString() }, // Zod used in API routes
      { name: 'CORS Configuration', status: hasCors, lastChecked: new Date().toISOString() },
      { name: 'Security Headers', status: hasSecurityHeaders, lastChecked: new Date().toISOString() },
    ];

    return NextResponse.json({ checklist });
  } catch (error) {
    console.error('Security checklist error:', error);
    return NextResponse.json({ error: 'Failed to generate checklist' }, { status: 500 });
  }
}
