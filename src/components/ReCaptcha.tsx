// src/components/ReCaptcha.tsx
'use client';

import Script from 'next/script';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export default function ReCaptcha() {
  // No site key configured (current production state) — render nothing so
  // forms behave exactly as before.
  if (!RECAPTCHA_SITE_KEY) return null;

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      strategy="afterInteractive"
    />
  );
}

// Hook to execute reCAPTCHA. Always resolves — returns '' when reCAPTCHA is
// not configured, failed to load, or errored, so callers never block on it.
export const useReCaptcha = () => {
  const executeReCaptcha = async (action: string): Promise<string> => {
    if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') {
      return '';
    }
    const grecaptcha = (window as unknown as { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } }).grecaptcha;
    if (!grecaptcha) {
      return '';
    }

    try {
      await new Promise<void>((resolve) => grecaptcha.ready(resolve));
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token || '';
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return '';
    }
  };

  return { executeReCaptcha };
};
