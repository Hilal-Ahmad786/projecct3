'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import { FaqScene } from '@/components/services/hero-visuals/scenes-internal';
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
  const faqRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const isFaqInView = useInView(faqRef, { once: true, margin: '-50px' });

  // Swiss minimalist emerald accent
  const accentColor = '#0e7c7b';

  // Filter FAQ based on search
  const filteredFaq = searchQuery
    ? faq.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faq;

  return (
    <div className="min-h-screen bg-white">
      <InternalPageHero
        serviceName={serviceName}
        accentWord={t('services.detail.breadcrumb.faq') as string}
        subtitle={(t('services.detail.faq.heroDescription') as string).replace('{serviceName}', serviceName.toLowerCase())}
        accentHex={accentColor}
        crumbs={[
          { label: t('navbar.home') as string, href: '/' },
          { label: t('services.detail.breadcrumb.services') as string, href: '/services' },
          { label: serviceName, href: `/services/${serviceSlug}` },
          { label: t('services.detail.breadcrumb.faq') as string },
        ]}
        scene={<FaqScene accent={accentColor} />}
      />

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
                className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-full focus:outline-none shadow-sm transition-all focus:shadow-md text-gray-900 placeholder:text-gray-400"
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
              <div className="space-y-4">
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
                    className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                        className="flex-shrink-0 w-8 h-8 border rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
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
                        className="flex-shrink-0 w-8 h-8 border rounded-full flex items-center justify-center transition-colors"
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
              <div className="grid grid-cols-1 gap-4">
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
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group transition-all duration-300 cursor-default"
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
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                {t('services.detail.faq.cta.contactUs')}
                <ArrowRightIcon className="w-5 h-5" />
              </LocalizedLink>
              <LocalizedLink
                href={`/services/${serviceSlug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 rounded-full text-white font-bold hover:bg-white/5 transition-colors"
              >
                {t('services.detail.faq.cta.backToService')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
