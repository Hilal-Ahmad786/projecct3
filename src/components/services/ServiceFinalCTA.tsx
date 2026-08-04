'use client';

// Final conversion band for service detail pages: a visually distinct dark
// panel with heritage accents — headline, "Get Free Quote" primary, WhatsApp
// secondary, and the three existing reassurance bullets. Reuses the
// cta.serviceRequest translation keys already present in all 5 locales.

import { motion } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import WhatsAppButton from './WhatsAppButton';

export default function ServiceFinalCTA({ serviceSlug }: { serviceSlug?: string }) {
  const { dir } = useTranslations();
  const t = useSectionTranslations('cta.serviceRequest');
  const quoteHref = serviceSlug ? `/start-project?service=${serviceSlug}` : '/start-project';

  return (
    <section className="py-16 md:py-20 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto rounded-3xl bg-gray-950 overflow-hidden px-6 py-12 sm:px-10 md:px-14 md:py-16 text-center"
        >
          {/* Heritage accent glows */}
          <div aria-hidden className="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-heritage-turquoise/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-heritage-saffron-bright/10 blur-3xl" />

          <div className="relative z-10">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 bg-heritage-turquoise-soft rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-300">{t('badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-8">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LocalizedLink
                href={quoteHref}
                className="inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3 text-base font-medium
                  bg-heritage-turquoise text-white border border-heritage-turquoise
                  hover:bg-heritage-turquoise-deep hover:border-heritage-turquoise-deep
                  focus:outline-none focus:ring-2 focus:ring-heritage-turquoise focus:ring-offset-2 focus:ring-offset-gray-950
                  transition-all duration-250 hover:-translate-y-0.5"
              >
                {t('getQuote')}
              </LocalizedLink>
              <WhatsAppButton source="service_final_cta" variant="solid" size="lg" />
            </div>

            {/* Reassurance bullets (existing trustIndicator1..3 keys) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-gray-400">
              {(['trustIndicator1', 'trustIndicator2', 'trustIndicator3'] as const).map((key) => (
                <span key={key} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-heritage-turquoise-soft flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t(key)}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
