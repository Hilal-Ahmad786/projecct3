'use client';

// Service pricing page — quote-first when no packages exist (most
// services), package grid when they do; always closes with the CTA.

import React from 'react';
import { motion } from 'framer-motion';
import InternalPageHero from '@/components/services/InternalPageHero';
import { PricingTiersScene } from '@/components/services/hero-visuals/scenes-internal';
import { useTranslations } from '@/hooks/useTranslations';
import { toHeritageHex } from '@/lib/heritage-accents';

interface Props {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string | null;
  hasPackages: boolean;
}

export default function PricingPageClient({ serviceName, serviceSlug, serviceColor, hasPackages }: Props) {
  const { t, dir } = useTranslations();
  const accent = toHeritageHex(serviceColor || undefined);
  const tp = (key: string, fallback: string) => {
    const v = t(`services.detail.pricingPage.${key}`);
    return typeof v === 'string' && !v.includes('pricingPage') ? v : fallback;
  };

  return (
    <>
      <InternalPageHero
        serviceName={serviceName}
        accentWord={tp('titleAccent', 'Pricing')}
        subtitle={tp('subtitle', 'Transparent pricing that scales with your project.')}
        accentHex={accent}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: serviceName, href: `/services/${serviceSlug}` },
          { label: tp('titleAccent', 'Pricing') },
        ]}
        scene={<PricingTiersScene accent={accent} />}
      />

      {/* Quote-first panel when the service has no fixed packages */}
      {!hasPackages && (
        <section className="py-16" dir={dir}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto rounded-2xl p-8 sm:p-10 heritage-section-ivory border"
              style={{ borderColor: 'var(--heritage-sand)' }}
            >
              <h2 className="text-headline text-gray-900 mb-3">{tp('quoteTitle', 'Every project is unique')}</h2>
              <p className="text-body text-gray-600 leading-relaxed mb-6">{tp('quoteDesc', 'Tell us your goals and we will send a detailed proposal within 48 hours.')}</p>
              <ul className="space-y-3">
                {['bullet1', 'bullet2', 'bullet3'].map((k, i) => (
                  <motion.li
                    key={k}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 16 : -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.45 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: accent }}>✓</span>
                    <span className="text-sm font-medium text-gray-700">{tp(k, '')}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
