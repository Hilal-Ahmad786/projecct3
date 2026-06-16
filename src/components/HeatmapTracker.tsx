'use client';

// Lightweight click capture for the admin heatmap ("sıcak haritası").
// Records where visitors click as a fraction of viewport width and full-page
// height, batches them, and ships them to /api/tracking/click via sendBeacon.
// Fire-and-forget — never blocks the UI and fails silently.

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = '/api/tracking/click';
const BATCH = 12;
const FLUSH_MS = 10000;

export default function HeatmapTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Strip the locale prefix so all languages of a page share one heatmap.
    const page = (pathname || '/').replace(/^\/(en|tr|de|ur|ar)(?=\/|$)/, '') || '/';

    let sid = '';
    try {
      sid = sessionStorage.getItem('pk_sid') || '';
      if (!sid) {
        sid = 'h-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        sessionStorage.setItem('pk_sid', sid);
      }
    } catch { /* private mode — ignore */ }

    const device = window.matchMedia('(max-width: 767px)').matches
      ? 'Mobile'
      : window.matchMedia('(max-width: 1024px)').matches ? 'Tablet' : 'Desktop';

    const beacon = (url: string, data: object) => {
      const payload = JSON.stringify(data);
      try {
        if (navigator.sendBeacon) navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
        else fetch(url, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
      } catch { /* ignore */ }
    };

    // One pageview per navigation → populates the admin Analytics/Traffic stats.
    beacon('/api/tracking/pageview', { page, device, sessionId: sid, referrer: document.referrer || null });

    let buffer: { xpct: number; ypct: number; tag: string }[] = [];

    const flush = () => {
      if (!buffer.length) return;
      const payload = JSON.stringify({ page, device, sessionId: sid, vw: window.innerWidth, points: buffer });
      buffer = [];
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
        } else {
          fetch(ENDPOINT, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
        }
      } catch { /* ignore */ }
    };

    const onClick = (e: MouseEvent) => {
      const vw = window.innerWidth || 1;
      const docH = document.documentElement.scrollHeight || 1;
      const xpct = Math.min(1, Math.max(0, e.clientX / vw));
      const ypct = Math.min(1, Math.max(0, (window.scrollY + e.clientY) / docH));
      const tag = ((e.target as HTMLElement)?.tagName || '').toLowerCase();
      buffer.push({ xpct: +xpct.toFixed(4), ypct: +ypct.toFixed(4), tag });
      if (buffer.length >= BATCH) flush();
    };

    const onHide = () => { if (document.visibilityState === 'hidden') flush(); };

    document.addEventListener('click', onClick, true);
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    const iv = window.setInterval(flush, FLUSH_MS);

    return () => {
      flush();
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      window.clearInterval(iv);
    };
  }, [pathname]);

  return null;
}
