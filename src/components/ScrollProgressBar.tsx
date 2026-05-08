'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { initGSAP } from '@/lib/gsap';

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !barRef.current) return;

    initGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: '#16a085',
        transformOrigin: 'left center',
        zIndex: 9999,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
