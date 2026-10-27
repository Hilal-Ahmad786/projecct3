// src/components/SecurityGuard.tsx
'use client';

import { useEffect } from 'react';
import { SecurityManager } from '@/lib/security';

// Reports signs of browser automation (navigator.webdriver etc.) once per tab
// session. Detection only — nothing is blocked here; real protection lives in
// middleware, reCAPTCHA and the API routes.
//
// The old DevTools check polled every 5s with a window-size heuristic that is
// also true for browser side panels and zoomed windows, and its interval was
// never cleared (the cleanup was returned from an async function and lost). In
// production that sent /api/security/log more often than pages were viewed, so
// it has been removed.
export default function SecurityGuard() {
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const runSecurityChecks = async () => {
      try {
        let fingerprint = sessionStorage.getItem('sec_fp');
        if (!fingerprint) {
          fingerprint = await SecurityManager.generateFingerprint();
          sessionStorage.setItem('sec_fp', fingerprint);
        }

        if (SecurityManager.detectSuspiciousBehavior()) {
          SecurityManager.trackSuspiciousActivity(
            'automation_detected',
            { ua: navigator.userAgent.substring(0, 50) },
            fingerprint
          );
        }
      } catch (error) {
        // Silent fail - don't break the app
        console.debug('Security check error:', error);
      }
    };

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => { void runSecurityChecks(); }, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(() => { void runSecurityChecks(); }, 100);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
