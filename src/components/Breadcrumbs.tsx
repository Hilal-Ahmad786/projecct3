'use client';

// Shared breadcrumb trail — used on every inner page for orientation and
// BreadcrumbList structured data. RTL-aware, heritage-styled.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslations } from '@/hooks/useTranslations';

export interface Crumb {
  label: string;
  href?: string; // last crumb usually has no href
}

const baseUrl = 'https://www.paksoft.com.tr';

export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const { dir, locale } = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const isRTL = dir === 'rtl';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}/${locale}${item.href === '/' ? '' : item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <motion.nav
        aria-label="Breadcrumb"
        {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } })}
        className={`flex items-center flex-wrap gap-1.5 text-xs text-gray-400 ${className}`}
        dir={dir}
      >
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <svg
                className={`w-3 h-3 text-heritage-turquoise/40 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <LocalizedLink href={item.href} className="hover:text-heritage-turquoise transition-colors">
                {item.label}
              </LocalizedLink>
            ) : (
              <span className="text-gray-600 font-medium" aria-current="page">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </motion.nav>
    </>
  );
}
