'use client';

import { useEffect, useRef } from 'react';

// A scroll-linked progress bar is a few lines of vanilla DOM — no need for
// gsap + ScrollTrigger (~115KB) which this component used to pull in. We update
// a CSS transform on scroll via rAF, honoring prefers-reduced-motion.
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--heritage-turquoise, #0e7c7b)',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        zIndex: 9999,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
