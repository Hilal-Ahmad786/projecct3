// Server-side reCAPTCHA v3 verification, shared by form API routes.
//
// Degrades gracefully by design: verification only rejects a request when the
// secret key is configured, a token was actually sent, AND Google says the
// token is invalid or scored below the threshold. If reCAPTCHA is not
// configured (current production state), never loaded on the client, or
// Google itself is unreachable, submissions proceed exactly as before.

const SCORE_THRESHOLD = 0.5;

/**
 * Returns false only when a provided token positively fails verification.
 * Missing config, missing token, or a network error all "fail open".
 */
export async function verifyCaptchaToken(token: unknown): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true; // captcha not configured — skip verification
  if (typeof token !== 'string' || !token) return true; // client couldn't load reCAPTCHA — don't block

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json();

    if (!data.success) return false;
    if (typeof data.score === 'number' && data.score < SCORE_THRESHOLD) return false;
    return true;
  } catch (error) {
    // Google unreachable — never block a real visitor because of that.
    console.error('[captcha] verification request failed:', error);
    return true;
  }
}
