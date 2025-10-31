// src/components/ReCaptcha.tsx
'use client';

import Script from 'next/script';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export default function ReCaptcha() {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
    </>
  );
}

// Hook to execute reCAPTCHA
export const useReCaptcha = () => {
  const executeReCaptcha = async (action: string): Promise<string> => {
    if (typeof window === 'undefined' || !(window as any).grecaptcha) {
      return '';
    }

    try {
      const token = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return '';
    }
  };

  return { executeReCaptcha };
};