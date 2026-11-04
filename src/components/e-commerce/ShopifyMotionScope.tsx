'use client';

import { useEffect } from 'react';
import IkasMotionScope from '@/components/ikas/IkasMotionScope';

/**
 * Progressive enhancement for Shopify page motion. Content stays visible without JS.
 * - `data-shopify-reveal` / `data-shopify-reveal-group` children: one-time reveal.
 * - `data-shopify-loop`: ambient loop that only runs while on screen and the tab is visible.
 * The section illustrations are the shared Codex visuals (IkasVisual), so their
 * observer (IkasMotionScope) is mounted here as well.
 */
export default function ShopifyMotionScope() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const loops = [...document.querySelectorAll<HTMLElement>('[data-shopify-loop]')];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (target.hasAttribute('data-shopify-loop')) {
          target.classList.toggle('shopify-in-view', entry.isIntersecting);
          continue;
        }
        if (!entry.isIntersecting) continue;
        target.classList.add('shopify-motion-visible');
        observer.unobserve(target);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll<HTMLElement>('[data-shopify-reveal], [data-shopify-reveal-group] > *').forEach((element, index) => {
      const group = element.parentElement?.hasAttribute('data-shopify-reveal-group');
      const childIndex = group && element.parentElement ? Array.from(element.parentElement.children).indexOf(element) : 0;
      element.style.setProperty('--shopify-motion-delay', `${group && childIndex < 6 ? childIndex * 55 : Math.min(index, 5) * 45}ms`);
      observer.observe(element);
    });
    loops.forEach((element) => observer.observe(element));

    const syncVisibility = () => loops.forEach((element) => element.classList.toggle('shopify-tab-hidden', document.hidden));
    document.addEventListener('visibilitychange', syncVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
      document.querySelectorAll<HTMLElement>('[data-shopify-reveal], [data-shopify-reveal-group] > *').forEach((element) => element.style.removeProperty('--shopify-motion-delay'));
    };
  }, []);

  return <IkasMotionScope />;
}
