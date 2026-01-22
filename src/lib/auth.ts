// src/lib/auth.ts
// Simple admin authentication utilities

import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Generate a simple hash for session tokens (using Web Crypto API)
async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Hash password using SHA-256 (simple implementation, use bcrypt in production for password storage)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

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
  const token = await generateSessionToken();
  const expires = new Date(Date.now() + SESSION_DURATION);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });

  // Store session in a simple way (in production, use Redis or database)
  // For now, we'll validate by checking if the cookie exists and is valid format
  return token;
}

// Check if user has a valid session
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);

    if (!session?.value) {
      return false;
    }

    // Validate session token format (64 hex characters)
    const isValidFormat = /^[a-f0-9]{64}$/.test(session.value);
    return isValidFormat;
  } catch {
    return false;
  }
}

// Clear session (logout)
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

// Get session token for middleware (sync version using request)
export function getSessionFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));

  if (!sessionCookie) return null;

  const token = sessionCookie.split('=')[1];
  const isValidFormat = /^[a-f0-9]{64}$/.test(token);

  return isValidFormat ? token : null;
}
