// src/components/CtaBanner.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function CtaBanner() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('ctaBanner');

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
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
      <div className={`absolute top-16 w-32 h-32 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
      </div>

      <div className={`absolute bottom-16 w-20 h-20 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-600`} />
      </div>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Overline */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gray-900"></div>
            <span className="text-overline">{t('eyebrow')}</span>
            <div className="w-8 h-0.5 bg-gray-900"></div>
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-headline text-gray-900 mb-6"
          >
            {t('title')}
            <br />
            <span className="text-gray-600">{t('titleAccent')}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-body text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
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
              {t('startYourProject')}
            </Button>
            <Button
              href="/services"
              variant="secondary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            >
              {t('viewServices')}
            </Button>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-200"
          >
            {[
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: t('callUs.title'),
                description: t('callUs.description'),
                value: t('callUs.value'),
                href: `tel:${t('callUs.value').replace(/\s/g, '')}`
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: t('responseTime.title'),
                description: t('responseTime.description'),
                value: t('responseTime.value'),
                href: null
              }
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-sm mx-auto mb-4 flex items-center justify-center">
                  {method.icon}
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{method.title}</h4>
                <p className="text-caption text-gray-500 mb-2">{method.description}</p>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-body text-gray-700 hover:text-gray-900 transition-colors break-words"
                    dir={method.href.startsWith('mailto:') ? 'ltr' : dir}
                  >
                    {method.value}
                  </a>
                ) : (
                  <span className="text-body text-gray-700">{method.value}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}