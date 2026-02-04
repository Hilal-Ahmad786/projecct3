'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import { useRef } from 'react';
import { ArrowRightIcon, ArrowDownIcon, ClockIcon } from '@heroicons/react/24/outline';
import {
  SubPageBgPattern,
  FloatingDecorations,
  SubPageHeroVisual,
  type SubPageAnimation
} from '@/components/services/subpage-animations';
import { useTranslations } from '@/hooks/useTranslations';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  steps: ProcessStep[];
  processLayout?: string;
  animation?: SubPageAnimation;
  locale: string;
}

// Process step icons
const stepIcons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path strokeLinecap="round" strokeWidth="1.5" d="M12 8v4l2 2"/></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  <svg key="6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
];

export default function ProcessPageClient({
  serviceName,
  serviceSlug,
  steps,
  processLayout,
  animation,
  locale
}: ProcessPageClientProps) {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  // Get animation config or use defaults for process page
  const config = animation || {
    heroVisual: 'workflow-diagram' as const,
    bgPattern: 'diagonal-lines' as const,
    decorations: 'circles' as const,
    motion: 'float' as const,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-32 pb-24 overflow-hidden">
        {/* Background Pattern */}
        <SubPageBgPattern pattern={config.bgPattern} opacity={0.05} />

        {/* Floating Decorations */}
        <FloatingDecorations type={config.decorations} accentColor={config.primaryColor} />

        {/* Hero Visual */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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

        {/* Animated Vertical Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '50%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute left-1/2 top-32 w-px hidden lg:block"
          style={{ backgroundColor: config.primaryColor + '30' }}
        />

        {/* Step indicators floating */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {steps.slice(0, 5).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i === 0 ? config.primaryColor : '#e5e7eb' }}
            />
          ))}
        </div>

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
            <span className="text-gray-900">{t('services.detail.breadcrumb.process')}</span>
          </motion.nav>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + '20' }}
              >
                <ClockIcon className="w-5 h-5" style={{ color: config.primaryColor }} />
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: config.primaryColor }}>
                {t('services.detail.process.eyebrow')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-[1.1] tracking-tight"
            >
              {t('services.detail.process.heroTitle')}
              <br />
              <span className="font-semibold" style={{ color: config.primaryColor }}>{serviceName}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
            >
              {t('services.detail.process.heroDescription')}
            </motion.p>

            {/* Process Stats */}
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
                  {steps.length}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.process.stats.clearSteps')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">{t('services.detail.process.stats.agile')}</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.process.stats.methodology')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">100%</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.process.stats.transparency')}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDownIcon className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Process Steps - Vertical Timeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          {steps.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 border-2 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: config.primaryColor }}
              >
                <span className="text-3xl font-light" style={{ color: config.primaryColor }}>1</span>
              </motion.div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.process.comingSoon')}</h2>
              <p className="text-gray-500">{t('services.detail.process.preparingDocs')}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-100 hidden md:block" />
              <motion.div
                style={{ height: lineProgress }}
                className="absolute left-8 top-0 w-px hidden md:block"
                initial={{ backgroundColor: config.primaryColor }}
                animate={{ backgroundColor: config.primaryColor }}
              />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-0 md:pl-24 pb-20 last:pb-0"
                >
                  {/* Step Number Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute left-0 top-0 hidden md:flex items-center justify-center w-16 h-16 bg-white border-2 rounded-full z-10 transition-all"
                    style={{ borderColor: config.primaryColor }}
                  >
                    <span className="text-lg font-medium" style={{ color: config.primaryColor }}>
                      {String(step.step).padStart(2, '0')}
                    </span>
                  </motion.div>

                  {/* Step Content */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="p-10 transition-all duration-300 group"
                    style={{ backgroundColor: '#fafafa' }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="md:hidden text-xs font-mono" style={{ color: config.primaryColor }}>
                        {String(step.step).padStart(2, '0')}
                      </span>
                      <motion.div
                        className="w-12 h-12 border flex items-center justify-center"
                        style={{ borderColor: config.primaryColor + '40' }}
                        whileHover={{ scale: 1.05, borderColor: config.primaryColor }}
                      >
                        <span style={{ color: config.primaryColor }}>
                          {stepIcons[(step.step - 1) % stepIcons.length]}
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 h-px bg-gray-200"
                      />
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:translate-x-1 transition-transform">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-xl">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-900" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.process.expectations.eyebrow')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-light text-gray-900 mb-6"
                >
                  {t('services.detail.process.expectations.title')}
                  <br />
                  <span className="font-semibold" style={{ color: config.primaryColor }}>{t('services.detail.process.expectations.titleAccent')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 leading-relaxed"
                >
                  {t('services.detail.process.expectations.description')}
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-1 bg-gray-200">
                {[
                  { label: t('services.detail.process.expectations.weeklyUpdates'), desc: t('services.detail.process.expectations.weeklyUpdatesDesc') },
                  { label: t('services.detail.process.expectations.directAccess'), desc: t('services.detail.process.expectations.directAccessDesc') },
                  { label: t('services.detail.process.expectations.milestones'), desc: t('services.detail.process.expectations.milestonesDesc') },
                  { label: t('services.detail.process.expectations.documentation'), desc: t('services.detail.process.expectations.documentationDesc') },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="w-2 h-2 rounded-full mb-4"
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-32 -top-32 w-80 h-80 rounded-full border border-gray-800"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              {t('services.detail.process.cta.title')}
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              {t('services.detail.process.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-900 font-medium transition-all hover:scale-105"
                style={{ backgroundColor: config.primaryColor }}
              >
                {t('services.detail.process.cta.startProject')}
                <ArrowRightIcon className="w-4 h-4" />
              </LocalizedLink>
              <LocalizedLink
                href={`/services/${serviceSlug}/tech-stack`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium hover:bg-white/5 transition-colors"
              >
                {t('services.detail.process.cta.viewTechStack')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
