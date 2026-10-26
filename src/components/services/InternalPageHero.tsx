'use client';

// Shared hero for service internal pages (pricing, blog, …).
// Breadcrumbs + standardized display typography + a page-type scene.

import React from 'react';
import Breadcrumbs, { type Crumb } from '@/components/Breadcrumbs';
import { useTranslations } from '@/hooks/useTranslations';

interface InternalPageHeroProps {
  serviceName: string;
  /** The accent word after the service name (e.g. localized "Pricing") */
  accentWord: string;
  subtitle: string;
  crumbs: Crumb[];
  /** Page-type scene rendered on the right at xl+ */
  scene?: React.ReactNode;
  /** Heritage accent hex for the title accent */
  accentHex?: string;
  /** Optional exact localized heading for a page. */
  heading?: string;
  /** Optional page-specific calls to action below the introduction. */
  actions?: React.ReactNode;
}

export default function InternalPageHero({
  serviceName,
  accentWord,
  subtitle,
  crumbs,
  scene,
  accentHex = 'var(--heritage-turquoise)',
  heading,
  actions,
}: InternalPageHeroProps) {
  const { dir } = useTranslations();

  return (
    <section className="relative pt-[var(--navbar-h,64px)] pb-16 overflow-hidden girih-bg girih-bg-fade" dir={dir}>
      {/* heritage washes */}
      <div className={`absolute top-0 w-[480px] h-[480px] rounded-full blur-[120px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'right-0' : 'left-0'}`} style={{ background: 'var(--accent-emerald-light)' }} />
      <div className={`absolute bottom-0 w-[380px] h-[380px] rounded-full blur-[100px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'left-0' : 'right-0'}`} style={{ background: 'var(--heritage-sand)' }} />

      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumbs className="mb-8" items={crumbs} />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* Entrance uses the shared CSS hero-enter classes (globals.css), like
                the service landing hero: the text is visible in the server HTML
                and animates at first paint; reduced motion disables it. */}
            {/* eyebrow */}
            <div className="hero-enter flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: accentHex }} />
              <span className="text-overline" style={{ color: accentHex }}>{accentWord}</span>
            </div>

            {/* title */}
            <h1
              className="hero-enter text-display font-light text-gray-900 leading-none mb-6"
              style={{ animationDelay: '0.1s' }}
            >
              {heading ? heading : <>{serviceName}<br /><span className="font-semibold" style={{ color: accentHex }}>{accentWord}</span></>}
            </h1>

            <p
              className="hero-enter text-body text-gray-600 leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              {subtitle}
            </p>

            {actions && <div className="hero-enter mt-6 flex flex-wrap gap-3" style={{ animationDelay: '0.3s' }}>{actions}</div>}
          </div>

          {scene && (
            <div className="hero-enter-side hidden lg:block">
              {scene}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
