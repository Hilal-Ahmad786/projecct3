'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// A 0.15s opacity fade on route change does not need framer-motion (which this
// component pulled into the shared bundle of EVERY page). A keyed <div> whose
// CSS animation replays on remount gives the identical effect for ~0 JS.
// Reduced-motion is honored via the @media rule on `.page-fade` in globals.css.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
