// src/lib/auth.ts
// Simple admin authentication utilities

import { cookies } from 'next/headers';
import { signSessionToken, verifySessionToken } from './auth-token';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Validate credentials against environment variables
export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    console.error('Admin credentials not configured in environment variables');
    return false;
  }

  // Simple comparison - in production, use bcrypt for password hashing
  return username === adminUser && password === adminPass;
}

// Create a session and set cookie
export async function createSession(): Promise<string> {
  const expiresAtMs = Date.now() + SESSION_DURATION;
  const token = await signSessionToken(expiresAtMs);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAtMs),
    path: '/',
  });

  return token;
}

// Check if user has a valid session
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);
    return await verifySessionToken(session?.value);
  } catch {
    return false;
  }
}

// Clear session (logout)
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

// Verify the admin session cookie on a raw Request (for API route handlers)
export async function verifyRequestAuth(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return false;

  const cookieList = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookieList.find(c => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  if (!sessionCookie) return false;

  const token = sessionCookie.slice(sessionCookie.indexOf('=') + 1);
  return verifySessionToken(token);
}
