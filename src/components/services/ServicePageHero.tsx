'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

interface ServicePageHeroProps {
  translationKey: string;
  accentColor?: 'gray' | 'emerald' | 'violet' | 'blue' | 'amber' | 'rose';
  showParticles?: boolean;
  ctaHref?: string;
  secondaryCtaHref?: string;
}

const accentColors = {
  gray: {
    eyebrow: 'text-gray-500',
    titleAccent: 'text-gray-900',
    circle: 'border-gray-200',
    square: 'border-gray-900',
    dot: 'bg-gray-900',
    blob1: 'bg-gray-50',
    blob2: 'bg-gray-100',
  },
  emerald: {
    eyebrow: 'text-emerald-600',
    titleAccent: 'text-emerald-600',
    circle: 'border-emerald-200',
    square: 'border-emerald-600',
    dot: 'bg-emerald-600',
    blob1: 'bg-emerald-50',
    blob2: 'bg-emerald-100',
  },
  violet: {
    eyebrow: 'text-violet-600',
    titleAccent: 'text-violet-600',
    circle: 'border-violet-200',
    square: 'border-violet-600',
    dot: 'bg-violet-600',
    blob1: 'bg-violet-50',
    blob2: 'bg-violet-100',
  },
  blue: {
    eyebrow: 'text-blue-600',
    titleAccent: 'text-blue-600',
    circle: 'border-blue-200',
    square: 'border-blue-600',
    dot: 'bg-blue-600',
    blob1: 'bg-blue-50',
    blob2: 'bg-blue-100',
  },
  amber: {
    eyebrow: 'text-amber-600',
    titleAccent: 'text-amber-600',
    circle: 'border-amber-200',
    square: 'border-amber-600',
    dot: 'bg-amber-600',
    blob1: 'bg-amber-50',
    blob2: 'bg-amber-100',
  },
  rose: {
    eyebrow: 'text-rose-600',
    titleAccent: 'text-rose-600',
    circle: 'border-rose-200',
    square: 'border-rose-600',
    dot: 'bg-rose-600',
    blob1: 'bg-rose-50',
    blob2: 'bg-rose-100',
  },
};

export default function ServicePageHero({
  translationKey,
  accentColor = 'gray',
  showParticles = true,
  ctaHref = '/contact',
  secondaryCtaHref,
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
    <section className="hero-section relative overflow-hidden bg-white" dir={dir}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        {showParticles && <ParticleNetwork className="opacity-20" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      {/* Crescent Decorations - RTL Aware */}
      <div
        className={`absolute top-20 ${isRTL ? 'left-10' : 'right-10'} w-32 h-32 crescent ${
          isRTL ? 'crescent-left' : 'crescent-right'
        } crescent-subtle text-gray-900`}
      />
      <div
        className={`absolute bottom-40 ${isRTL ? 'right-20' : 'left-20'} w-24 h-24 crescent ${
          isRTL ? 'crescent-right' : 'crescent-left'
        } crescent-subtle text-gray-900`}
      />

      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className={`lg:col-span-7 ${isRTL ? 'lg:order-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-0.5 bg-gray-900"></div>
                <span className={`text-xs font-medium ${colors.eyebrow} uppercase tracking-wide`}>
                  {t('eyebrow')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-display font-light text-gray-900 mb-8 leading-none">
                {t('title')} <br />
                <span className={`font-semibold ${colors.titleAccent}`}>{t('titleAccent')}</span>
              </h1>

              {/* Description */}
              <p className="text-body text-gray-600 mb-10 max-w-2xl leading-relaxed">
                {t('description')}
              </p>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
          </div>

          {/* Abstract Visual - Swiss Geometry */}
          <div className={`lg:col-span-5 hidden lg:block relative ${isRTL ? 'lg:order-1' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              {/* Geometric Composition */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main Circle */}
                <div className={`w-64 h-64 border ${colors.circle} rounded-full opacity-60`} />

                {/* Offset Square */}
                <div
                  className={`absolute w-48 h-48 border ${colors.square} opacity-10 transform rotate-12`}
                />

                {/* Solid Accent Circle */}
                <div
                  className={`absolute top-1/4 ${isRTL ? 'left-1/4' : 'right-1/4'} w-12 h-12 ${
                    colors.dot
                  } rounded-full opacity-5`}
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 ${
                    colors.blob1
                  } rounded-full mix-blend-multiply filter blur-xl opacity-70`}
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-40 h-40 ${
                    colors.blob2
                  } rounded-full mix-blend-multiply filter blur-xl opacity-70`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
