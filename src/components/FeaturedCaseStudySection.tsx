// src/components/FeaturedCaseStudySection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function FeaturedCaseStudySection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.caseStudy');
  const tStats = useSectionTranslations('stats');

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case study...</p>
        </div>
      </section>
    );
  }

  // Get solution features from translations with fallback
  const getSolutionFeatures = () => {
    try {
      const features = t('solutionFeatures');
      if (Array.isArray(features)) {
        return features;
      }
      // If it's an object, convert to array
      if (features && typeof features === 'object') {
        return Object.values(features);
      }
    } catch (error) {
      console.error('Error loading solution features:', error);
    }

    // Fallback features
    return [
      'Next.js with server-side rendering for optimal performance',
      'Shopify integration for robust e-commerce functionality',
      'Mobile-first design with progressive web app features',
      'Advanced analytics and reporting dashboard'
    ];
  };

  const solutionFeatures = getSolutionFeatures();

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute top-20 w-32 h-32 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`space-y-8 ${dir === 'rtl' ? 'lg:order-2' : ''}`}
          >
            {/* Challenge */}
            <div>
              <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-0.5 bg-red-500" />
                <span className="text-overline">{t('challenge')}</span>
              </div>
              <h3 className="text-title text-gray-900 mb-4">
                {t('challengeTitle')}
              </h3>
              <p className="text-body text-gray-600 leading-relaxed">
                {t('challengeText')}
              </p>
            </div>

            {/* Solution */}
            <div>
              <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-0.5 bg-emerald-500" />
                <span className="text-overline">{t('solution')}</span>
              </div>
              <h3 className="text-title text-gray-900 mb-4">
                {t('solutionTitle')}
              </h3>
              <div className="space-y-3 text-body text-gray-600">
                {solutionFeatures.map((feature, index) => (
                  <div key={index} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {tStats('salesIncrease300')}
                </div>
                <div className="text-caption text-gray-500">
                  {t('results.salesIncrease')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {tStats('loadTime08s')}
                </div>
                <div className="text-caption text-gray-500">
                  {t('results.loadTime')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {tStats('mobileScore95')}
                </div>
                <div className="text-caption text-gray-500">
                  {t('results.mobileScore')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {tStats('costReduction50')}
                </div>
                <div className="text-caption text-gray-500">
                  {t('results.costReduction')}
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              href="/projects/ecommerce-platform"
              variant="primary"
              size="lg"
              rightIcon={
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: dir === 'rtl' ? -4 : 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                  </svg>
                </motion.div>
              }
            >
              {t('readFullCaseStudy')}
            </Button>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            {/* Main Image */}
            <div className="relative">
              <img
                src="/images/Demo/ShopifyBot.png"
                alt={t('title')}
                className="w-full rounded-sm shadow-lg"
                loading="lazy"
              />
              
              {/* Floating Metrics */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className={`absolute -bottom-6 bg-white p-4 rounded-sm shadow-lg border border-gray-200 ${dir === 'rtl' ? '-right-6' : '-left-6'}`}
              >
                <div className="text-lg font-light text-gray-900">{tStats('salesIncrease300')}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {t('results.salesIncrease')}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className={`absolute -top-6 bg-white p-4 rounded-sm shadow-lg border border-gray-200 ${dir === 'rtl' ? '-left-6' : '-right-6'}`}
              >
                <div className="text-lg font-light text-gray-900">{tStats('loadTime08s')}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {t('results.loadTime')}
                </div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className={`absolute -z-10 top-8 w-full h-full bg-gray-100 rounded-sm ${dir === 'rtl' ? 'left-8' : 'right-8'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}