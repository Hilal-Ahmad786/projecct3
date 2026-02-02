// src/components/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { smoothSpring, snappySpring } from '@/lib/animations';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { dir, isLoading, t: tGlobal } = useTranslations();
  const t = useSectionTranslations('faq');
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tGlobal('common.loading')}</p>
        </div>
      </section>
    );
  }

  const getFAQs = () => {
    try {
      const faqData = t('list');
      if (Array.isArray(faqData)) return faqData;
      if (faqData && typeof faqData === 'object') return Object.values(faqData);
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }
    return [
      { question: 'What services do you offer?', answer: 'We provide comprehensive digital solutions including web development, mobile applications, AI/ML solutions, automation, digital marketing, and DevOps services. Our team specializes in modern technologies and frameworks to deliver scalable, efficient solutions.' },
      { question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 8-16 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.' },
      { question: 'What is your development process?', answer: 'We follow an agile development methodology with regular sprints and client feedback cycles. Our process includes discovery, planning, design, development, testing, deployment, and ongoing support. We maintain transparent communication throughout each phase.' },
      { question: 'Do you provide ongoing support and maintenance?', answer: 'Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, bug fixes, and feature enhancements. We also provide 24/7 technical support for critical issues.' },
      { question: 'Can you work with existing systems?', answer: 'Absolutely. We have extensive experience integrating with existing systems, databases, and third-party services. We can modernize legacy systems, create APIs for integration, and ensure seamless data migration when needed.' },
      { question: 'What technologies do you specialize in?', answer: 'Our expertise includes React, Next.js, Node.js, Python, React Native, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, and various AI/ML frameworks. We stay current with emerging technologies and select the best tools for each project.' }
    ];
  };

  const faqs = getFAQs();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section gradient-bg-emerald relative overflow-hidden" dir={dir}>
      <div className={`absolute top-20 w-24 h-24 opacity-[0.02] ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className="w-full h-full border border-gray-900" style={{ clipPath: 'circle(40% at 70% 30%)' }} />
      </div>

      <div className="container mx-auto">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-16" />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={prefersReducedMotion ? {} : { x: dir === 'rtl' ? -3 : 3 }}
                  className="glass hover:glass-strong transition-all duration-300 rounded-lg overflow-hidden relative"
                >
                  {/* Active left border accent */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className={`absolute top-0 bottom-0 w-1 bg-gray-900 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : smoothSpring}
                        style={{ originY: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => toggle(index)}
                    className={`w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span className={`font-medium text-gray-900 ${dir === 'rtl' ? 'pl-4' : 'pr-4'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      className="flex-shrink-0"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : snappySpring}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : {
                          height: smoothSpring,
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <motion.p
                            className="text-gray-600 leading-relaxed pt-4"
                            initial={prefersReducedMotion ? {} : { filter: 'blur(4px)' }}
                            animate={{ filter: 'blur(0px)' }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 glass-strong rounded-lg p-8 text-center"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('stillHaveQuestions')}</h3>
            <p className="text-gray-600 mb-6">{t('stillHaveQuestionsDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                rightIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                  </svg>
                }
              >
                {t('contactUs')}
              </Button>
              <Button
                href="mailto:info@paktechnology.com"
                variant="secondary"
                size="lg"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                {t('sendEmail')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
