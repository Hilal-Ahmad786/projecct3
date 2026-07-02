'use client';

import { useEffect, useState } from 'react';

// True below the lg breakpoint. SSR/first paint returns false (desktop
// behavior); flips after hydration. Used to switch off continuous
// animations (infinite SVG spins, scroll springs) that cause main-thread
// jank on phones — decorative-only work, so the SSR mismatch is harmless.
export function useIsMobile(query = '(max-width: 1023px)') {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return isMobile;
}
