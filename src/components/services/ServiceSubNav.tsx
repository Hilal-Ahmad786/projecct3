'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from '@/hooks/useTranslations';
import LocalizedLink from '@/components/LocalizedLink';
import { delocalizePath } from '@/lib/routes';
import type { Locale } from '@/lib/i18n';

export interface SubNavSection {
  id: string;
  label: string;
  href: string;
}

interface Props {
  sections: SubNavSection[];
  ctaLabel: string;
  ctaHref: string;
  /** The English path of the "main" page for this section (e.g. '/services/web-development').
   *  On that page the sub-nav is hidden until the user scrolls past 120px.
   *  On any deeper sub-page it is always visible. */
  mainPageHref: string;
}

export default function ServiceSubNav({ sections, ctaLabel, ctaHref, mainPageHref }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();
  const locale = useLocale();
  const isRTL = dir === 'rtl';
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── Determine English path for current page ── */
  const rawPath = pathname.replace(`/${locale}`, '') || '/';
  const englishPath = delocalizePath(rawPath, locale as Locale);
  const isMainPage = englishPath === mainPageHref;

  /* ── Visibility: always on sub-pages, scroll-triggered on main page ── */
  const [scrolledPast, setScrolledPast] = useState(false);
  useEffect(() => {
    if (!isMainPage) return;
    const onScroll = () => setScrolledPast(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMainPage]);

  const visible = !isMainPage || scrolledPast;

  /* ── Determine active section by matching current path ── */
  const activeId =
    [...sections]
      .reverse()
      .find(s => {
        if (s.href === '/') return englishPath === '/';
        return englishPath === s.href || englishPath.startsWith(s.href + '/');
      })?.id ?? sections[0]?.id ?? '';

  /* ── Scroll active pill into view on mobile ── */
  useEffect(() => {
    const el = scrollRef.current?.querySelector(
      `[data-id="${activeId}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="subnav"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-[var(--navbar-h,64px)] left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/60 will-change-transform"
          style={{ height: 48 }}
          dir={dir}
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
            {/* Pill row — scrollable on mobile */}
            <div
              ref={scrollRef}
              className="flex items-center gap-0.5 overflow-x-auto scrollbar-none flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sections.map(({ id, label, href }) => {
                const isActive = activeId === id;
                return (
                  <LocalizedLink
                    key={id}
                    href={href}
                    data-id={id}
                    className="relative flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                    style={{ color: isActive ? '#111827' : '#6b7280' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="subnav-pill"
                        className="absolute inset-0 bg-gray-100 rounded-full"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 400, damping: 35 }
                        }
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </LocalizedLink>
                );
              })}
            </div>

            {/* CTA — hidden on mobile */}
            <LocalizedLink
              href={ctaHref}
              className="hidden md:flex flex-shrink-0 items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
            >
              {ctaLabel}
              <svg
                className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </LocalizedLink>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
