'use client';

import { useEffect } from 'react';

/** Adds one-time, ikas-only reveal classes without hiding server-rendered content. */
export default function IkasMotionScope() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;

    const reveal = [...document.querySelectorAll<HTMLElement>('[data-ikas-reveal]')];
    const loops = [...document.querySelectorAll<HTMLElement>('[data-ikas-loop]')];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add(element.hasAttribute('data-ikas-loop') ? 'ikas-in-view' : 'ikas-visible');
          if (!element.hasAttribute('data-ikas-loop')) observer.unobserve(element);
        } else if (element.hasAttribute('data-ikas-loop')) {
          element.classList.remove('ikas-in-view');
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    reveal.forEach((element, index) => {
      const explicitDelay = element.dataset.ikasDelay;
      element.style.setProperty('--ikas-delay', `${explicitDelay ? Number(explicitDelay) : (index % 6) * 55}ms`);
      observer.observe(element);
    });
    loops.forEach((element) => observer.observe(element));

    const syncVisibility = () => loops.forEach((element) => element.classList.toggle('ikas-tab-hidden', document.hidden));
    document.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
      reveal.forEach((element) => element.style.removeProperty('--ikas-delay'));
    };
  }, []);

  return null;
}
