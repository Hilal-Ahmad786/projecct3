'use client';

import { useEffect } from 'react';
import IkasMotionScope from '@/components/ikas/IkasMotionScope';

/** One-time decorative entrances; server-rendered content is visible by default. Also mounts the shared Codex-visual observer (IkasMotionScope). */
export default function CustomEcommerceMotionScope() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-custom-ecom-reveal]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('custom-ecom-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -24px 0px' });
    nodes.forEach((node) => {
      node.style.setProperty('--custom-ecom-delay', `${Number(node.dataset.customEcomDelay || 0)}ms`);
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.style.removeProperty('--custom-ecom-delay'));
    };
  }, []);
  return <IkasMotionScope />;
}
