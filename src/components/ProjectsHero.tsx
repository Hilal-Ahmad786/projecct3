// src/components/ProjectsHero.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';
import ProjectsHeroAnimation from '@/components/animations/ProjectsHeroAnimation';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function ProjectsHero() {
  const { dir, isLoading, t: tGlobal } = useTranslations();
  const t = useSectionTranslations('projects.hero');
  const tStats = useSectionTranslations('stats');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <section className="hero-section relative gradient-bg-vibrant overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section relative gradient-bg-vibrant overflow-hidden" dir={dir}>
      {/* Particle Network Background */}
      <ParticleNetwork className="opacity-60" />

      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Proper Crescent Elements */}
      <div className={`absolute top-32 w-32 h-32 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className={`absolute bottom-32 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-600`} />
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 32 : -32 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : (dir === 'rtl' ? 32 : -32) }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`space-y-8 ${dir === 'rtl' ? 'lg:order-2' : ''}`}
          >
            {/* Overline */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className="text-overline">{t('eyebrow')}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-display font-light text-gray-900 leading-none">
                {t('title')}
                <br />
                <span className="text-gray-600">{t('titleAccent')}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-body text-gray-600 max-w-lg leading-relaxed">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="#portfolio"
                variant="primary"
                size="lg"
                rightIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                }
              >
                {t('viewPortfolio')}
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                {t('startProject')}
              </Button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              {[
                { value: tStats('projects150'), label: t('stats.projects') },
                { value: tStats('clients50'), label: t('stats.clients') },
                { value: tStats('successRate98'), label: t('stats.successRate') },
                { value: tStats('support247'), label: t('stats.support') }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-2xl font-light text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-caption text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Animation */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : (dir === 'rtl' ? -32 : 32) }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <ProjectsHeroAnimation />
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
          <span className="text-xs font-medium uppercase tracking-wide">{tGlobal('common.scroll')}</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
