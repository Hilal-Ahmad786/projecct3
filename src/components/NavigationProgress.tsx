'use client';

// Instant feedback for internal link clicks. A route's RSC payload can take a
// moment to download and parse (especially on phones), and until it arrives
// the old page stays on screen — taps felt ignored. A thin top bar starts on
// click and finishes when the pathname changes. No dependency, ~1KB.

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setState('loading');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState('idle'), 12000); // safety net
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    setState((current) => (current === 'loading' ? 'done' : current));
    const t = setTimeout(() => setState((current) => (current === 'done' ? 'idle' : current)), 300);
    return () => clearTimeout(t);
  }, [pathname]);

  if (state === 'idle') return null;
  return <div aria-hidden="true" className={`nav-progress ${state === 'done' ? 'nav-progress--done' : ''}`} />;
}
