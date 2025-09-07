// src/components/BlogHero.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function BlogHero() {
  const [mounted, setMounted] = useState(false);
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('blog.hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="hero-section relative bg-white overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section relative bg-white overflow-hidden" dir={dir}>
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
      <div className={`absolute top-32 w-24 h-24 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 32 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Overline */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gray-900"></div>
            <span className="text-overline">{t('eyebrow')}</span>
            <div className="w-8 h-0.5 bg-gray-900"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-display font-light text-gray-900 leading-none mb-6">
            {t('title')}
            <br />
            <span className="text-gray-600">{t('titleAccent')}</span>
          </h1>

          {/* Description */}
          <p className="text-body text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#featured"
              variant="primary"
              size="lg"
              rightIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={dir === 'rtl' ? "M7 17l7-7 7 7M14 3v11" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                </svg>
              }
            >
              {t('browseArticles')}
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
            >
              {t('getConsultation')}
            </Button>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">
            {[
              { value: "50+", label: t('stats.articles') },
              { value: "10k+", label: t('stats.monthlyReaders') },
              { value: "Weekly", label: t('stats.newContent') }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="text-center"
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
      </div>
    </section>
  );
}