// src/components/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import SectionHeader from '@/components/SectionHeader';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { smoothSpring } from '@/lib/animations';

export default function FAQSection() {
  // Start with the first pill active
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  return (
    <section className="section bg-background-gray relative overflow-hidden py-24 lg:py-32" dir={dir}>
      <BackgroundBlobs className="opacity-30" />

      {/* Subtle decorative ring */}
      <div className={`absolute top-20 w-24 h-24 opacity-[0.02] ${dir === 'rtl' ? 'left-20' : 'right-20'} pointer-events-none`}>
        <div className="w-full h-full border border-gray-900" style={{ clipPath: 'circle(40% at 70% 30%)' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px]">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-12 md:mb-16" />

        {/* The Floating Pills Cloud */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : smoothSpring}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 sm:mb-16 relative z-10"
        >
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors duration-300 group ${
                  isActive ? 'text-white shadow-[0_4px_20px_rgba(26,26,26,0.3)]' : 'text-gray-600 hover:text-primary bg-white/50 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300'
                }`}
              >
                {/* Active Pill Highlight */}
                {isActive && !prefersReducedMotion && (
                  <motion.div
                    layoutId="faqPillHighlight"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    initial={false}
                    transition={smoothSpring}
                    style={{ zIndex: -1 }}
                  />
                )}
                {/* Fallback for reduced motion active state */}
                {isActive && prefersReducedMotion && (
                  <div className="absolute inset-0 bg-gray-900 rounded-full" style={{ zIndex: -1 }} />
                )}
                
                <span className="relative z-10">{faq.question}</span>
              </button>
            )
          })}
        </motion.div>

        {/* The Answer Stage */}
        <div className="max-w-4xl mx-auto relative z-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="glass bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-3xl p-8 sm:p-10 md:p-16 w-full"
            >
              <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
                
                {/* Decorative Avatar/Letter block */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200/80 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <ChatBubbleBottomCenterTextIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                </div>
                
                <div className="flex-grow text-center sm:text-left h-full">
                  <h3 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight ${dir === 'rtl' ? 'sm:text-right' : 'sm:text-left'}`}>
                    {faqs[activeIndex]?.question}
                  </h3>
                  
                  {/* Underline using primary brand color */}
                  <div className={`w-12 h-1 bg-primary rounded-full mb-6 mx-auto sm:mx-0 ${dir === 'rtl' ? 'sm:ml-auto' : 'sm:mr-auto'}`} />

                  <p className={`text-base sm:text-lg text-gray-600 leading-relaxed font-medium ${dir === 'rtl' ? 'sm:text-right' : 'sm:text-left'}`}>
                    {faqs[activeIndex]?.answer}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl mx-auto glass-strong rounded-2xl p-8 sm:p-10 text-center relative z-10"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">{t('stillHaveQuestions') || 'Still have questions?'}</h3>
          <p className="text-gray-600 mb-8">{t('stillHaveQuestionsDescription') || 'Can\'t find the answer you\'re looking for? Please chat to our friendly team.'}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                </svg>
              }
            >
              {t('contactUs') || 'Contact Us'}
            </Button>
            <Button
              href="mailto:paksoft3@gmail.com"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            >
              {t('sendEmail') || 'Send Email'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
