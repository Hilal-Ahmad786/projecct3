// src/lib/auth-token.ts
// Signed admin session tokens (HMAC-SHA256, Web Crypto only — safe for Edge middleware).
// Token format: "<expiresAtMs>.<hmacHex>"

const TOKEN_REGEX = /^(\d{10,16})\.([a-f0-9]{64})$/;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASS;
  if (!secret) {
    console.error('ADMIN_SESSION_SECRET / ADMIN_PASS not configured — admin sessions cannot be verified');
    return '';
  }
  return secret;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function signSessionToken(expiresAtMs: number): Promise<string> {
  const secret = getSecret();
  const payload = String(expiresAtMs);
  const signature = await hmacHex(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const match = TOKEN_REGEX.exec(token);
  if (!match) return false;

  const [, payload, signature] = match;
  const expiresAtMs = Number(payload);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs < Date.now()) return false;

  const expected = await hmacHex(payload, secret);
  return timingSafeEqualHex(signature, expected);
}
