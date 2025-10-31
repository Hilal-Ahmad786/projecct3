(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__dc15d093._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/middleware.ts
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
const locales = [
    'en',
    'tr',
    'de',
    'ur',
    'ar'
];
const defaultLocale = 'en';
// Lightweight rate limiting (use Vercel Edge Config or Redis in production)
const rateLimitMap = new Map();
// Only block known malicious IPs (keep this list small)
const blockedIPs = new Set([]);
// Lightweight bot detection (only critical patterns)
const criticalBotPatterns = [
    /curl/i,
    /wget/i,
    /scrapy/i
];
function getClientIP(request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
}
function isRateLimited(ip) {
    const now = Date.now();
    const key = `rl:${ip}`;
    // Auto-cleanup old entries (prevent memory leak)
    if (rateLimitMap.size > 10000) {
        const keysToDelete = [];
        rateLimitMap.forEach((value, k)=>{
            if (now > value.resetTime) keysToDelete.push(k);
        });
        keysToDelete.forEach((k)=>rateLimitMap.delete(k));
    }
    const record = rateLimitMap.get(key);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, {
            count: 1,
            resetTime: now + 60000
        });
        return false;
    }
    if (record.count >= 150) {
        return true;
    }
    record.count++;
    return false;
}
function isCriticalBot(userAgent) {
    if (!userAgent) return false; // Allow empty user agents (some mobile apps)
    return criticalBotPatterns.some((pattern)=>pattern.test(userAgent));
}
function getLocale(request) {
    const pathname = request.nextUrl.pathname;
    const pathnameLocale = locales.find((locale)=>pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
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
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const userAgent = request.headers.get('user-agent') || '';
    const clientIP = getClientIP(request);
    // ONLY CRITICAL SECURITY CHECKS (for performance)
    // 1. Check blocked IPs only
    if (blockedIPs.has(clientIP)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Access Denied', {
            status: 403
        });
    }
    // 2. Rate limiting (lightweight check)
    if (isRateLimited(clientIP)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60'
            }
        });
    }
    // 3. Only block critical bots (allow Googlebot, Bingbot, etc.)
    if (isCriticalBot(userAgent)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Access Denied', {
            status: 403
        });
    }
    // Response with optimized security headers
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Essential security headers only (lightweight)
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Locale handling (existing logic)
    const pathnameHasLocale = locales.some((locale)=>pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (pathnameHasLocale) {
        const locale = pathname.split('/')[1];
        response.cookies.set('NEXT_LOCALE', locale, {
            maxAge: 31536000,
            sameSite: 'lax'
        });
        return response;
    }
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    const redirectResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(newUrl);
    redirectResponse.cookies.set('NEXT_LOCALE', locale, {
        maxAge: 31536000,
        sameSite: 'lax'
    });
    // Copy headers
    response.headers.forEach((value, key)=>{
        redirectResponse.headers.set(key, value);
    });
    return redirectResponse;
}
const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dc15d093._.js.map