'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { toHeritageHex } from '@/lib/heritage-accents';
import LocalizedLink from '@/components/LocalizedLink';
import { useRef } from 'react';
import { CheckIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import {
  SubPageBgPattern,
  FloatingDecorations,
  SubPageHeroVisual,
  type SubPageAnimation
} from '@/components/services/subpage-animations';
import { useTranslations } from '@/hooks/useTranslations';

interface FeaturesPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  features: string[];
  featureStyle?: string;
  animation?: SubPageAnimation;
  locale: string;
}

export default function FeaturesPageClient({
  serviceName,
  serviceSlug,
  features,
  featureStyle,
  animation,
  locale
}: FeaturesPageClientProps) {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Get animation config or use defaults for features page
  const rawConfig = animation || {
    heroVisual: 'layers-stack' as const,
    bgPattern: 'grid' as const,
    decorations: 'squares' as const,
    motion: 'cascade' as const,
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
  };
  const config = { ...rawConfig, primaryColor: toHeritageHex(rawConfig.primaryColor), secondaryColor: rawConfig.secondaryColor ? toHeritageHex(rawConfig.secondaryColor) : undefined };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section with Service-Specific Animation */}
      <section className="relative min-h-[80vh] pt-[140px] pb-24 overflow-hidden">
        {/* Background Pattern */}
        <SubPageBgPattern pattern={config.bgPattern} opacity={0.06} />

        {/* Floating Decorations */}
        <FloatingDecorations type={config.decorations} accentColor={config.primaryColor} />

        {/* Hero Visual - Large and Prominent */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <SubPageHeroVisual
              type={config.heroVisual}
              motionType={config.motion}
              primaryColor={config.primaryColor}
              secondaryColor={config.secondaryColor}
            />
          </motion.div>
        </div>

        {/* Animated Accent Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-40 right-[45%] w-64 h-64 border border-gray-100 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-[35%] w-4 h-4 rounded-full hidden lg:block"
          style={{ backgroundColor: config.primaryColor }}
        />

        {/* Breadcrumb - Outside fading container */}
        <div className="container mx-auto px-4 relative z-20 mb-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <LocalizedLink href="/services" className="hover:text-gray-900 transition-colors">{t('services.detail.breadcrumb.services')}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <LocalizedLink href={`/services/${serviceSlug}`} className="hover:text-gray-900 transition-colors">{serviceName}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{t('services.detail.breadcrumb.features')}</span>
          </motion.nav>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-3xl">
            {/* Eyebrow with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + '20' }}
              >
                <SparklesIcon className="w-5 h-5" style={{ color: config.primaryColor }} />
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: config.primaryColor }}>
                {t('services.detail.features.title')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display font-light text-gray-900 mb-8 leading-none"
            >
              {serviceName}
              <br />
              <span className="font-semibold" style={{ color: config.primaryColor }}>{t('services.detail.features.heroTitleAccent')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
            >
              {t('services.detail.features.heroDescription')}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-16 border-t border-gray-100 pt-8"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="text-5xl font-light"
                  style={{ color: config.primaryColor }}
                >
                  {features.length}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.features.coreFeatures')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">100%</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.features.customizable')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">∞</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.features.scalability')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid - Animated Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {features.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 border-2 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: config.primaryColor }}
              >
                <CheckIcon className="w-10 h-10" style={{ color: config.primaryColor }} />
              </motion.div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.features.comingSoon')}</h2>
              <p className="text-gray-500">{t('services.detail.features.preparingInfo')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass bg-white p-10 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group cursor-default relative overflow-hidden transition-all duration-300"
                >
                  {/* Animated Background on Hover */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundColor: config.primaryColor }}
                  />

                  {/* Feature Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: index * 0.05 + 0.2 }}
                    className="text-xs font-bold mb-6"
                    style={{ color: config.primaryColor }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Feature Icon - Animated Line */}
                  <motion.div
                    className="w-10 h-1 mb-6 origin-left rounded-full"
                    style={{ backgroundColor: config.primaryColor }}
                    whileInView={{ scaleX: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 + 0.3 }}
                  />

                  {/* Feature Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:translate-x-1 transition-transform">
                    {feature}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-sm font-medium text-gray-500 leading-relaxed relative z-10">
                    {t('services.detail.features.featureCardDesc')}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-8 right-8"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-gray-900 transition-colors">
                      <ArrowRightIcon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why These Features - Animated Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-900" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.features.philosophy.eyebrow')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-light text-gray-900 mb-6"
                >
                  {t('services.detail.features.philosophy.title')}
                  <br />
                  <span className="font-semibold" style={{ color: config.primaryColor }}>{t('services.detail.features.philosophy.titleAccent')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 leading-relaxed"
                >
                  {t('services.detail.features.philosophy.description')}
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  { label: t('services.detail.features.philosophy.goalOriented'), desc: t('services.detail.features.philosophy.goalDescription') },
                  { label: t('services.detail.features.philosophy.performance'), desc: t('services.detail.features.philosophy.performanceDescription') },
                  { label: t('services.detail.features.philosophy.maintainable'), desc: t('services.detail.features.philosophy.maintainableDescription') },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:translate-x-0.5 transition-transform">
                        {item.label}
                      </h3>
                      <p className="text-sm font-medium text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-40 -top-40 w-96 h-96 rounded-full border border-gray-800"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full border border-gray-800"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              {t('services.detail.features.cta.title')}
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              {t('services.detail.features.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105"
                style={{ backgroundColor: config.primaryColor }}
              >
                {t('services.detail.features.cta.startProject')}
                <ArrowRightIcon className="w-5 h-5" />
              </LocalizedLink>
              <LocalizedLink
                href={`/services/${serviceSlug}/process`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 rounded-full text-white font-bold hover:bg-white/5 transition-colors"
              >
                {t('services.detail.features.cta.viewProcess')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
