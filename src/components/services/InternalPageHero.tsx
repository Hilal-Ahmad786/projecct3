'use client';

// Shared hero for service internal pages (pricing, blog, …).
// Breadcrumbs + standardized display typography + a page-type scene.

import React from 'react';
import { motion } from 'framer-motion';
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
}

export default function InternalPageHero({
  serviceName,
  accentWord,
  subtitle,
  crumbs,
  scene,
  accentHex = 'var(--heritage-turquoise)',
}: InternalPageHeroProps) {
  const { dir } = useTranslations();

  return (
    <section className="relative pt-[calc(var(--navbar-h,64px)+1.25rem)] pb-16 overflow-hidden girih-bg girih-bg-fade" dir={dir}>
      {/* heritage washes */}
      <div className={`absolute top-0 w-[480px] h-[480px] rounded-full blur-[120px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'right-0' : 'left-0'}`} style={{ background: 'var(--accent-emerald-light)' }} />
      <div className={`absolute bottom-0 w-[380px] h-[380px] rounded-full blur-[100px] opacity-40 pointer-events-none ${dir === 'rtl' ? 'left-0' : 'right-0'}`} style={{ background: 'var(--heritage-sand)' }} />

      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumbs className="mb-8" items={crumbs} />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-0.5" style={{ background: accentHex }} />
              <span className="text-overline" style={{ color: accentHex }}>{accentWord}</span>
            </motion.div>

            {/* title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display font-light text-gray-900 leading-none mb-6"
            >
              {serviceName}
              <br />
              <span className="font-semibold" style={{ color: accentHex }}>{accentWord}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-body text-gray-600 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {scene && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              {scene}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
