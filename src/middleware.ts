// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'tr', 'de', 'ur', 'ar']
const defaultLocale = 'en'

// Lightweight rate limiting (use Vercel Edge Config or Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Only block known malicious IPs (keep this list small)
const blockedIPs = new Set<string>([
  // Add only confirmed malicious IPs
]);

// Lightweight bot detection (only critical patterns)
const criticalBotPatterns = [
  /curl/i,
  /wget/i,
  /scrapy/i,
];

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const key = `rl:${ip}`;

  // Auto-cleanup old entries (prevent memory leak)
  if (rateLimitMap.size > 10000) {
    const keysToDelete: string[] = [];
    rateLimitMap.forEach((value, k) => {
      if (now > value.resetTime) keysToDelete.push(k);
    });
    keysToDelete.forEach(k => rateLimitMap.delete(k));
  }

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (record.count >= 150) { // Increased from 100 to 150
    return true;
  }

  record.count++;
  return false;
}

function isCriticalBot(userAgent: string): boolean {
  if (!userAgent) return false; // Allow empty user agents (some mobile apps)
  return criticalBotPatterns.some(pattern => pattern.test(userAgent));
}

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = getClientIP(request);

  // ONLY CRITICAL SECURITY CHECKS (for performance)

  // 1. Check blocked IPs only
  if (blockedIPs.has(clientIP)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2. Rate limiting (lightweight check)
  if (isRateLimited(clientIP)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' }
    });
  }

  // 3. Only block critical bots (allow Googlebot, Bingbot, etc.)
  if (isCriticalBot(userAgent)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // Response with optimized security headers
  const response = NextResponse.next();

  // Essential security headers only (lightweight)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Redirect localized admin paths to /admin
  if (locales.some(locale => pathname.startsWith(`/${locale}/admin`))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Skip locale handling for admin routes
  if (pathname.startsWith('/admin')) {
    return response;
  }


  // Locale handling (existing logic)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 31536000, // 1 year
      sameSite: 'lax'
    });
    return response;
  }

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  const redirectResponse = NextResponse.redirect(newUrl);
  redirectResponse.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 31536000,
    sameSite: 'lax'
  });

  // Copy headers
  response.headers.forEach((value, key) => {
    redirectResponse.headers.set(key, value);
  });

  return redirectResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}