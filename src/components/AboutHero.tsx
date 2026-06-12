// src/components/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import AboutHeroAnimation from '@/components/animations/AboutHeroAnimation';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function AboutHero() {
  const { dir, isLoading, t: tGlobal, t: tNav } = useTranslations();
  const t = useSectionTranslations('about.hero');

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="hero-section relative gradient-bg-vibrant overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tGlobal('common.loading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section relative gradient-bg-vibrant overflow-hidden" dir={dir}>

      {/* Proper Crescent Elements */}
      <div className={`absolute top-32 w-32 h-32 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className={`absolute bottom-32 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-600`} />
      </div>

      <div className="container mx-auto">
        <Breadcrumbs className="pt-6 mb-6" items={[{ label: tNav('navbar.home') as string, href: '/' }, { label: tNav('navbar.about') as string }]} />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`space-y-8 ${dir === 'rtl' ? 'lg:order-2' : ''}`}
          >
            {/* Overline */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className="text-overline">{t('eyebrow')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-display font-light text-gray-900 leading-none">
              {t('title')}
              <br />
              <span className="text-gray-600">{t('titleAccent')}</span>
            </h1>

            {/* Description */}
            <p className="text-body text-gray-600 max-w-lg leading-relaxed">
              {t('description')}
            </p>

            {/* CTA */}
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                </svg>
              }
            >
              {t('getInTouch')}
            </Button>
          </motion.div>

          {/* Enhanced Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <AboutHeroAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}