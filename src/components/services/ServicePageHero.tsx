'use client';

import { motion } from 'framer-motion';
import { ComponentType } from 'react';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

interface ServicePageHeroProps {
  translationKey: string;
  accentColor?: 'gray' | 'emerald' | 'violet' | 'blue' | 'amber' | 'rose';
  ctaHref?: string;
  secondaryCtaHref?: string;
  AnimationComponent?: ComponentType;
}

import { accentColors } from '@/lib/heritage-accents';

export default function ServicePageHero({
  translationKey,
  accentColor = 'gray',
  ctaHref = '/contact',
  secondaryCtaHref,
  AnimationComponent,
}: ServicePageHeroProps) {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations(translationKey);
  const colors = accentColors[accentColor];
  const isRTL = dir === 'rtl';

  if (isLoading) {
    return (
      <section className="hero-section bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-16 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section relative overflow-hidden gradient-bg-vibrant" dir={dir}>
      {/* Crescent Decorations - RTL Aware - Hidden on mobile */}
      <div className={`hidden md:block absolute top-32 w-20 h-20 md:w-32 md:h-32 ${isRTL ? 'left-10 md:left-20' : 'right-10 md:right-20'}`}>
        <div className={`crescent ${isRTL ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>
      <div className={`hidden md:block absolute bottom-32 w-16 h-16 md:w-24 md:h-24 ${isRTL ? 'right-8 md:right-16' : 'left-8 md:left-16'}`}>
        <div className={`crescent ${isRTL ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-600`} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content (Right for RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`space-y-8 ${isRTL ? 'lg:order-2' : ''}`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className={`text-xs font-medium ${colors.eyebrow} uppercase tracking-wide`}>
                {t('eyebrow')}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-display font-light text-gray-900 leading-none">
                {t('title')}
                <br />
                <span className={`font-semibold ${colors.titleAccent}`}>
                  {t('titleAccent')}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-body text-gray-600 max-w-lg leading-relaxed">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href={ctaHref}
                variant="primary"
                size="lg"
                rightIcon={
                  <svg
                    className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                }
              >
                {t('cta')}
              </Button>
              {secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="secondary" size="lg">
                  {t('secondaryCta')}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right Column - Visual Element (Left for RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -32 : 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`relative ${isRTL ? 'lg:order-1' : ''}`}
          >
            {AnimationComponent ? (
              <AnimationComponent />
            ) : (
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Animated Background Blobs */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-72 h-72 ${colors.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-60`}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-72 h-72 ${colors.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-60`}
                />

                {/* Central Geometric Composition */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-80 h-80 rounded-full ring-1 ${colors.ring} opacity-40`}
                  />

                  {/* Inner Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    className={`absolute w-64 h-64 rounded-full ring-1 ${colors.ring} opacity-30`}
                  />

                  {/* Center Element */}
                  <div className={`relative w-48 h-48 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-2xl shadow-lg flex items-center justify-center`}>
                    {/* Icon or Abstract Shape */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-6xl"
                    >
                      <svg className="w-20 h-20 text-gray-700 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Floating Dots */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className={`absolute top-16 ${isRTL ? 'left-16' : 'right-16'} w-4 h-4 ${colors.dot} rounded-full opacity-60`}
                  />
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className={`absolute bottom-20 ${isRTL ? 'right-20' : 'left-20'} w-3 h-3 ${colors.dot} rounded-full opacity-40`}
                  />
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className={`absolute top-32 ${isRTL ? 'right-8' : 'left-8'} w-2 h-2 ${colors.dot} rounded-full opacity-50`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
