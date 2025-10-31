// src/lib/security.ts

// Minimal bot patterns (only critical ones)
const CRITICAL_BOT_PATTERNS = [
  /curl/i,
  /wget/i,
  /scrapy/i,
  /python-requests/i,
];

export class SecurityManager {
  // Cached fingerprint
  private static fingerprintCache: string | null = null;

  // Lightweight bot detection
  static detectBot(userAgent: string): boolean {
    if (!userAgent) return false;
    return CRITICAL_BOT_PATTERNS.some(pattern => pattern.test(userAgent));
  }

  // Optimized fingerprint generation (cached)
  static async generateFingerprint(): Promise<string> {
    if (typeof window === 'undefined') return '';
    
    // Return cached if available
    if (this.fingerprintCache) return this.fingerprintCache;

    try {
      // Minimal data collection for performance
      const data = {
        ua: navigator.userAgent,
        lang: navigator.language,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width}x${screen.height}`,
      };

      const fingerprint = JSON.stringify(data);
      const hash = await this.hashString(fingerprint);
      
      // Cache the result
      this.fingerprintCache = hash;
      return hash;
    } catch {
      return 'fallback';
    }
  }

  // Fast hash function
  static async hashString(str: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16); // Truncate for performance
    } catch {
      // Fallback to simple hash
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString(16);
    }
  }

  // Minimal suspicious behavior detection
  static detectSuspiciousBehavior(): boolean {
    if (typeof window === 'undefined') return false;

    return !!(
      navigator.webdriver ||
      (window as any).__selenium_unwrapped ||
      (window as any).callPhantom
    );
  }

  // Lightweight input sanitization
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .trim()
      .substring(0, 1000); // Limit length
  }

  // Async tracking (non-blocking)
  static trackSuspiciousActivity(
    type: string,
    details: any,
    fingerprint: string
  ): void {
    // Use setTimeout to make it non-blocking
    setTimeout(() => {
      try {
        // Use sendBeacon for performance (fire and forget)
        if ('sendBeacon' in navigator) {
          const data = JSON.stringify({ type, details, fingerprint, ts: Date.now() });
          navigator.sendBeacon('/api/security/log', data);
        } else {
          // Fallback to fetch with keepalive
          fetch('/api/security/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, details, fingerprint, ts: Date.now() }),
            keepalive: true
          }).catch(() => {}); // Silent fail
        }
      } catch {}
    }, 0);
  }
}