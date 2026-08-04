'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQPageProps {
  serviceSlug: string;
  accentColor: string;
}

import { richColorMap as colorMap } from '@/lib/heritage-accents';

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
  colors,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  colors: { bg: string; bgLight: string; text: string; gradient: string; border: string; ring: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? `${colors.border} ${colors.bgLight} shadow-sm` : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-start transition-colors"
      >
        <span className="font-semibold text-base md:text-lg text-gray-900 leading-snug">{item.question}</span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? `${colors.bg} text-white` : 'bg-gray-100 text-gray-500'}`}>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-6">
              <div className={`w-12 h-0.5 bg-gradient-to-r ${colors.gradient} mb-4`} />
              <p className="text-gray-600 text-[15px] md:text-base leading-7 md:leading-8">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServiceFAQPage({
  serviceSlug,
  accentColor,
}: ServiceFAQPageProps) {
  const { translations, t } = useTranslations();
  const data = translations?.serviceSubpages?.[serviceSlug];
  const faqData = data?.faq;
  const serviceName = data?.serviceName || serviceSlug;
  const headline = faqData?.headline || '';
  const subtitle = faqData?.subtitle || '';
  const description = faqData?.description || '';
  const faq = faqData?.categories || [];

  const colors = colorMap[accentColor] || colorMap.purple;
  const categories = faq.map((f) => f.category);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const activeItems = useMemo(() => {
    const categoryItems = faq.find((f) => f.category === activeCategory)?.items || [];
    if (!searchQuery.trim()) return categoryItems;
    const query = searchQuery.toLowerCase();
    return categoryItems.filter(
      (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
    );
  }, [faq, activeCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-[calc(var(--navbar-h,64px)+2.5rem)] pb-20 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 blur-3xl`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header — no initial opacity:0, this is above the fold */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-3 mb-4">
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
            <span className={`${colors.text} font-semibold tracking-widest uppercase text-xs`}>
              {subtitle}
            </span>
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
          </span>
          <h1 className="text-display font-light text-gray-900 leading-none mb-6">
            {headline}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <svg className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder={t('serviceSubpages.common.searchQuestions')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(0);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === category
                    ? `${colors.bg} text-white border-transparent shadow-sm`
                    : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {activeItems.length > 0 ? (
                activeItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    index={index}
                    colors={colors}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('serviceSubpages.common.noMatchingQuestions')}</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`mt-4 ${colors.text} font-medium hover:underline`}
                  >
                    {t('serviceSubpages.common.clearSearch')}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <div className={`${colors.bgLight} rounded-2xl p-8 md:p-12 border ${colors.border}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('serviceSubpages.common.stillHaveQuestions')}</h3>
            <p className="text-gray-600 mb-6">
              {t('serviceSubpages.common.stillHaveQuestionsDesc')}
            </p>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3 ${colors.bg} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
            >
              {t('serviceSubpages.common.contactUs')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="mt-20">
        <ServiceRequestCTA serviceType={serviceName} />
      </div>
    </main>
  );
}
