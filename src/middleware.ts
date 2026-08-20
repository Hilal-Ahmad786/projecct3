// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/auth-token'

const locales = ['en', 'tr', 'de', 'ur', 'ar']
// Must stay in sync with defaultLocale in @/lib/i18n — duplicated rather than
// imported to keep the edge middleware bundle minimal. See the note there.
const defaultLocale = 'tr'

// Admin session cookie name (must match auth.ts)
const ADMIN_SESSION_COOKIE = 'admin_session';

// Lightweight rate limiting (use Vercel Edge Config or Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Only block known malicious IPs (keep this list small)
const blockedIPs = new Set<string>([
  // Add only confirmed malicious IPs
]);

// Lightweight bot detection (only critical patterns).
// NOTE: this is cosmetic, not security — a scraper changes its UA in one line.
// Its real cost is blocking uptime monitors and curl-based health checks, so
// keep the list short and never let it catch a crawler (see ALLOWED_CRAWLERS).
const criticalBotPatterns = [
  /curl/i,
  /wget/i,
  /scrapy/i,
];

// Crawlers that must NEVER be rate-limited or UA-blocked.
//
// Two distinct groups, both load-bearing:
//   · Search engines — Googlebot crawls this site's ~6,800 sitemap URLs. Every
//     one of them passes through this middleware (only sitemap.xml, robots.txt
//     and static assets are excluded by the matcher below), so a crawl burst can
//     exceed the per-minute cap and earn 429s. Google backs off hard on 429 and
//     the site is trying to get indexed after a domain migration — that is the
//     single most expensive failure this file can cause.
//   · Social/link preview fetchers — WhatsApp, LinkedIn, Facebook and X fetch a
//     URL to build the preview card. Blocking them means links shared in the
//     social campaign render as bare grey boxes with no title or image.
//
// This is a User-Agent check, so it is spoofable. That is an acceptable trade
// here: the limiter below cannot reliably stop a determined attacker anyway
// (see isRateLimited), while blocking Googlebot has a direct, lasting cost.
const ALLOWED_CRAWLERS =
  /(googlebot|google-inspectiontool|storebot-google|google-extended|adsbot-google|mediapartners-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex(bot|images)|applebot|petalbot|sogou|facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|pinterest|redditbot|embedly)/i;

function isAllowedCrawler(userAgent: string): boolean {
  return ALLOWED_CRAWLERS.test(userAgent);
}

// Returns null when the client IP cannot be determined. Callers must treat that
// as "do not rate limit" rather than bucketing under a shared 'unknown' key —
// the old behaviour put every header-less request into ONE counter, so 150 of
// them collectively tripped the limit and everyone after that got a 429.
function getClientIP(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded;
  const real = request.headers.get('x-real-ip')?.trim();
  if (real) return real;
  return null;
}

// Per-instance, in-memory counter.
//
// Honest limitation: on Vercel this Map lives inside a single serverless/edge
// instance. Instances are created and torn down constantly and requests fan out
// across them, so this neither counts a visitor's real request rate nor stops a
// distributed attacker — it only catches a single client that happens to keep
// hitting the same warm instance. Real protection needs a shared store (Vercel
// KV / Upstash) or the platform's own WAF. It is kept here as a cheap backstop
// against accidental request storms; do not rely on it as a security control.
function isRateLimited(ip: string | null): boolean {
  if (!ip) return false; // unknown client — see getClientIP
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

// Check if admin session is valid (HMAC-signed token, verified cryptographically)
async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
  return verifySessionToken(sessionCookie?.value);
}

// Admin API endpoints reachable without a session (login itself)
const PUBLIC_ADMIN_API = ['/api/admin/auth/login', '/api/admin/auth/logout'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = getClientIP(request);

  // ONLY CRITICAL SECURITY CHECKS (for performance)

  // Search engines and link-preview fetchers skip the throttling and UA checks
  // entirely. Ordered first so a crawl burst can never be turned away by the
  // counter below. Explicitly blocked IPs are still enforced (below), so a
  // spoofed crawler UA does not buy an exemption from that.
  const isCrawler = isAllowedCrawler(userAgent);

  // 1. Check blocked IPs only
  if (clientIP && blockedIPs.has(clientIP)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  if (!isCrawler) {
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
  }

  // Response with optimized security headers
  const response = NextResponse.next();

  // Essential security headers only (lightweight)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // SAMEORIGIN (not DENY) so the admin heatmap can iframe site pages
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ADMIN API AUTHENTICATION — every /api/admin/* route requires a valid session
  if (pathname.startsWith('/api/admin')) {
    if (PUBLIC_ADMIN_API.includes(pathname)) {
      return response;
    }
    if (!(await isAdminAuthenticated(request))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return response;
  }

  // Redirect localized admin paths to /admin
  if (locales.some(locale => pathname.startsWith(`/${locale}/admin`))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // ADMIN AUTHENTICATION CHECK
  // Allow access to login page first (before any other admin checks)
  if (pathname === '/admin/login') {
    // If already authenticated, redirect to admin dashboard
    if (await isAdminAuthenticated(request)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Add noindex header for admin login page
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  if (pathname.startsWith('/admin')) {
    // Check authentication for all admin routes (except login which is handled above)
    if (!(await isAdminAuthenticated(request))) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Add noindex header for all admin pages
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }


  // Locale handling (existing logic)
  // Note: Path rewriting for localized URLs (e.g., /tr/hizmetler → /tr/services)
  // is handled by rewrites in next.config.ts
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
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)',
    '/api/admin/:path*',
  ],
}