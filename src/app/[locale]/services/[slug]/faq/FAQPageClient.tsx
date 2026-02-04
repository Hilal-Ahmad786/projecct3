'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  faq: FAQItem[];
  locale: string;
}

export default function FAQPageClient({
  serviceName,
  serviceSlug,
  faq,
  locale
}: FAQPageClientProps) {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const isFaqInView = useInView(faqRef, { once: true, margin: '-50px' });

  // Swiss minimalist emerald accent
  const accentColor = '#16a085';

  // Filter FAQ based on search
  const filteredFaq = searchQuery
    ? faq.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faq;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section - Swiss Minimalist */}
      <section className="relative min-h-[80vh] pt-32 pb-24 overflow-hidden">
        {/* Wave Lines Pattern - FAQ Unique */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="wave-lines" width="100" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M0 10 Q 25 0, 50 10 T 100 10"
                  stroke="#1a1a1a"
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-lines)" />
          </svg>
        </div>

        {/* Floating Question Mark Shapes - FAQ Unique */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-48 right-[15%] text-8xl font-extralight hidden lg:block"
          style={{ color: '#e5e7eb' }}
        >
          ?
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-72 right-[28%] text-5xl font-extralight hidden lg:block"
          style={{ color: '#f3f4f6' }}
        >
          ?
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-40 right-[20%] text-6xl font-extralight hidden lg:block"
          style={{ color: accentColor + '20' }}
        >
          ?
        </motion.div>

        {/* Speech Bubble Decorations */}
        <div className="absolute right-[8%] top-1/3 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Stacked Speech Bubbles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                className="absolute border border-gray-200 bg-white rounded-lg"
                style={{
                  width: 140 - i * 25,
                  height: 60 - i * 10,
                  top: i * 20,
                  left: i * 15,
                  zIndex: 3 - i,
                }}
              >
                <div className="absolute inset-3 flex items-center gap-1">
                  {[0, 1, 2].map((j) => (
                    <motion.div
                      key={j}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.2 + i * 0.3 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  ))}
                </div>
                {/* Speech bubble tail */}
                <div
                  className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b border-r border-gray-200"
                  style={{ transform: 'rotate(45deg)' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Expanding Ripple Animation */}
        <div className="absolute right-[25%] bottom-32 hidden lg:block">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.3, 0.1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut'
              }}
              className="absolute w-16 h-16 border rounded-full"
              style={{ borderColor: accentColor, top: 0, left: 0 }}
            />
          ))}
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Vertical Line Accent */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-[8%] top-48 w-px bg-gray-200 hidden lg:block"
        />

        {/* Breadcrumb - Outside fading container */}
        <div className="container mx-auto px-4 relative z-20 mb-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <Link href={`/${locale}/services`} className="hover:text-gray-900 transition-colors">{t('services.detail.breadcrumb.services')}</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-gray-900 transition-colors">{serviceName}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{t('services.detail.breadcrumb.faq')}</span>
          </motion.nav>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: accentColor }}
              >
                <span className="text-lg font-light" style={{ color: accentColor }}>?</span>
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: accentColor }}>
                {t('services.detail.faq.title')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-[1.1] tracking-tight"
            >
              {t('services.detail.faq.heroTitle')}
              <br />
              <span className="font-semibold" style={{ color: accentColor }}>{t('services.detail.faq.heroTitleAccent')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
            >
              {t('services.detail.faq.heroDescription').replace('{serviceName}', serviceName.toLowerCase())}
            </motion.p>

            {/* Stats */}
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
                  style={{ color: accentColor }}
                >
                  {faq.length}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.faq.stats.questions')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">24/7</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.faq.stats.support')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">&lt;2h</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.faq.stats.response')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <input
                type="text"
                placeholder={t('services.detail.faq.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                style={{ borderColor: searchQuery ? accentColor : undefined }}
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div ref={faqRef} className="max-w-3xl mx-auto">
            {faq.length === 0 ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-20 h-20 border-2 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ borderColor: accentColor }}
                >
                  <span className="text-4xl font-light" style={{ color: accentColor }}>?</span>
                </motion.div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.breadcrumb.faq')} {t('services.detail.features.comingSoon').replace('Features', '')}</h2>
                <p className="text-gray-500">{t('services.detail.faq.preparingAnswers')}</p>
              </div>
            ) : filteredFaq.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-light text-gray-300">∅</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.faq.search.noResults')}</h2>
                <p className="text-gray-500 mb-4">{t('services.detail.faq.search.noResultsDesc')}</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sm transition-colors"
                  style={{ color: accentColor }}
                >
                  {t('services.detail.faq.search.clearSearch')}
                </button>
              </div>
            ) : (
              <div className="space-y-1 bg-gray-100">
                {filteredFaq.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isFaqInView ? {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    } : {}}
                    className="bg-white"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-start gap-6 p-8 text-left group hover:bg-gray-50 transition-colors"
                    >
                      {/* Question Number with Bounce Animation */}
                      <motion.div
                        animate={{
                          scale: openIndex === index ? 1.1 : 1,
                          y: openIndex === index ? [0, -2, 0] : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-8 h-8 border flex items-center justify-center text-xs font-mono transition-colors"
                        style={{
                          borderColor: openIndex === index ? accentColor : '#e5e7eb',
                          color: openIndex === index ? accentColor : '#9ca3af',
                          backgroundColor: openIndex === index ? accentColor + '10' : 'transparent'
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>

                      {/* Question Text */}
                      <div className="flex-1 pt-1">
                        <span
                          className="text-lg font-medium transition-colors"
                          style={{ color: openIndex === index ? accentColor : '#374151' }}
                        >
                          {item.question}
                        </span>
                      </div>

                      {/* Toggle Icon with Rotation */}
                      <motion.div
                        animate={{
                          rotate: openIndex === index ? 45 : 0,
                          scale: openIndex === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                        className="flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-colors"
                        style={{
                          borderColor: openIndex === index ? accentColor : '#e5e7eb',
                          backgroundColor: openIndex === index ? accentColor : 'transparent',
                        }}
                      >
                        <PlusIcon className={`w-4 h-4 ${openIndex === index ? 'text-white' : 'text-gray-400'}`} />
                      </motion.div>
                    </button>

                    {/* Answer with Slide Animation */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8">
                            <motion.div
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="relative pl-14"
                            >
                              {/* Accent Line */}
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="absolute left-0 top-0 w-px"
                                style={{ backgroundColor: accentColor }}
                              />
                              <p className="text-gray-500 leading-relaxed pl-6">
                                {item.answer}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Info Section - Swiss Minimal */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-900" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.faq.quickInfo.eyebrow')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-light text-gray-900 mb-6"
                >
                  {t('services.detail.faq.quickInfo.title')}
                  <br />
                  <span className="font-semibold" style={{ color: accentColor }}>{t('services.detail.faq.quickInfo.titleAccent')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 leading-relaxed"
                >
                  {t('services.detail.faq.quickInfo.description').replace('{serviceName}', serviceName.toLowerCase())}
                </motion.p>
              </div>

              {/* Info Cards with Staggered Reveal */}
              <div className="grid grid-cols-1 gap-1 bg-gray-200">
                {[
                  { labelKey: 'gettingStarted', descKey: 'gettingStartedDesc' },
                  { labelKey: 'timeline', descKey: 'timelineDesc' },
                  { labelKey: 'pricing', descKey: 'pricingDesc' },
                  { labelKey: 'support', descKey: 'supportDesc' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ x: 5, backgroundColor: '#fafafa' }}
                    className="bg-white p-8 group transition-all cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-2 h-2 mt-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">
                          {t(`services.detail.faq.quickInfo.${item.labelKey}`)}
                        </h3>
                        <p className="text-sm text-gray-500">{t(`services.detail.faq.quickInfo.${item.descKey}`)}</p>
                      </div>
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
        {/* Animated Circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-32 -top-32 w-80 h-80 rounded-full border border-gray-800"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full border border-gray-800"
        />

        {/* Floating Question Marks */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute right-[15%] top-[20%] text-6xl font-light text-gray-700"
        >
          ?
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute left-[20%] bottom-[30%] text-4xl font-light text-gray-700"
        >
          ?
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center mx-auto mb-8"
            >
              <span className="text-2xl font-light" style={{ color: accentColor }}>?</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              {t('services.detail.faq.cta.title')}
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              {t('services.detail.faq.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium transition-all hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                {t('services.detail.faq.cta.contactUs')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/services/${serviceSlug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium hover:bg-white/5 transition-colors"
              >
                {t('services.detail.faq.cta.backToService')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
