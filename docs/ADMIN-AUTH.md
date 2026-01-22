# Admin Authentication

This document describes the admin authentication system for the PakSoft admin dashboard.

## Overview

The admin panel is protected by a session-based authentication system using secure cookies.

## Security Features

- **HttpOnly Cookies** - Session token cannot be accessed via JavaScript
- **Secure Flag** - Cookie only sent over HTTPS in production
- **SameSite=Lax** - Protection against CSRF attacks
- **64-character Hex Token** - Cryptographically secure session tokens
- **Rate Limiting** - Delays on failed login attempts
- **Defense in Depth** - Both middleware and layout-level auth checks
- **noindex/nofollow** - Admin pages excluded from search engines

## Configuration

### Environment Variables

Add these to your `.env` or `.env.local`:

```bash
ADMIN_USER=your_admin_username
ADMIN_PASS=your_secure_password
```

**Important:** Use strong, unique credentials in production.

### Rotating Credentials

1. Update `ADMIN_USER` and `ADMIN_PASS` in environment variables
2. Redeploy the application
3. All existing sessions will be invalidated (users must log in again)

## How It Works

### Login Flow

1. User visits `/admin` (any admin route)
2. Middleware checks for valid session cookie
3. If no session, redirects to `/admin/login`
4. User enters credentials
5. POST to `/api/admin/auth/login`
6. Server validates credentials against env vars
7. If valid, creates 64-char hex session token
8. Sets HttpOnly cookie with 24-hour expiration
9. Redirects to `/admin`

### Logout Flow

1. User clicks Logout button
2. POST to `/api/admin/auth/logout`
3. Server clears session cookie
4. Redirects to `/admin/login`

### Session Validation

- Session tokens must be exactly 64 hexadecimal characters
- Cookie is validated on every admin page request
- Invalid or missing cookies result in redirect to login

## Files

- `src/lib/auth.ts` - Authentication utilities
- `src/middleware.ts` - Route protection middleware
- `src/app/admin/login/page.tsx` - Login page
- `src/app/admin/layout.tsx` - Layout with auth check
- `src/app/api/admin/auth/login/route.ts` - Login API
- `src/app/api/admin/auth/logout/route.ts` - Logout API

## Manual Verification

1. Clear all cookies
2. Visit `https://paksoft.com.tr/admin`
3. Should redirect to `/admin/login`
4. Enter invalid credentials
5. Should see "Invalid credentials" error
6. Enter valid credentials (from env vars)
7. Should redirect to `/admin` dashboard
8. Check Network tab - session cookie should be HttpOnly
9. View page source - should include `noindex, nofollow`
10. Check `/robots.txt` - should disallow `/admin`

## Security Best Practices

1. Never commit credentials to version control
2. Use strong, unique passwords (16+ characters)
3. Rotate credentials periodically
4. Monitor failed login attempts
5. Consider adding 2FA for production
6. Use HTTPS in production

## Future Improvements

- Add rate limiting per IP
- Implement session storage in Redis/database
- Add 2FA/MFA support
- Add audit logging for admin actions
- Implement password hashing with bcrypt
