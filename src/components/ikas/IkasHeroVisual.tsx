'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroVisual, type ServiceAnimation } from '@/components/services/hero-visuals';

/** Keeps the ikas product-scene loop paused unless visible, active, and motion is allowed. */
export default function IkasHeroVisual({ animation }: { animation: ServiceAnimation }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 639px)');
    if (!node || motion.matches || !('IntersectionObserver' in window)) return;
    let inView = false;
    const update = () => setActive(inView && !document.hidden && !motion.matches && !compact.matches);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    observer.observe(node);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    compact.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
      compact.removeEventListener('change', update);
    };
  }, []);

  return <div ref={ref}>
    <HeroVisual type={animation.heroVisual} motionType={animation.motion} accentClass="text-heritage-turquoise" hideRatings ambientMotion={active} />
  </div>;
}
