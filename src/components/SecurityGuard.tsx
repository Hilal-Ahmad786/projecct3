// src/components/SecurityGuard.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SecurityManager } from '@/lib/security';

export default function SecurityGuard() {
  const fingerprintRef = useRef<string>('');
  const hasInitialized = useRef(false);

  // Debounce function for performance
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  useEffect(() => {
    // Only run once
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Run after page is fully loaded (non-blocking)
    if (document.readyState === 'complete') {
      initializeSecurity();
    } else {
      window.addEventListener('load', initializeSecurity);
      return () => window.removeEventListener('load', initializeSecurity);
    }
  }, []);

  const initializeSecurity = useCallback(() => {
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        runSecurityChecks();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(runSecurityChecks, 100);
    }
  }, []);

  const runSecurityChecks = async () => {
    try {
      // Generate fingerprint (cached)
      const cachedFingerprint = sessionStorage.getItem('sec_fp');
      if (cachedFingerprint) {
        fingerprintRef.current = cachedFingerprint;
      } else {
        const fp = await SecurityManager.generateFingerprint();
        fingerprintRef.current = fp;
        sessionStorage.setItem('sec_fp', fp);
      }

      // Light-weight suspicious behavior check
      if (SecurityManager.detectSuspiciousBehavior()) {
        SecurityManager.trackSuspiciousActivity(
          'automation_detected',
          { ua: navigator.userAgent.substring(0, 50) }, // Truncate for performance
          fingerprintRef.current
        );
      }

      // Optional: DevTools detection (debounced)
      const debouncedDevToolsCheck = debounce(() => {
        const threshold = 160;
        const devToolsOpen = 
          (window.outerWidth - window.innerWidth > threshold) ||
          (window.outerHeight - window.innerHeight > threshold);
        
        if (devToolsOpen) {
          SecurityManager.trackSuspiciousActivity(
            'devtools_detected',
            {},
            fingerprintRef.current
          );
        }
      }, 2000);

      // Check only every 5 seconds (not every second)
      const devToolsInterval = setInterval(debouncedDevToolsCheck, 5000);

      // Cleanup
      return () => clearInterval(devToolsInterval);
    } catch (error) {
      // Silent fail - don't break the app
      console.debug('Security check error:', error);
    }
  };

  return null;
}