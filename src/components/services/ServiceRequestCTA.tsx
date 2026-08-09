'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import ProjectRequestForm from '@/components/forms/ProjectRequestForm';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import BackgroundBlobs from '@/components/BackgroundBlobs';

interface ServiceRequestCTAProps {
  serviceType?: string;
  variant?: 'default' | 'compact' | 'banner';
}

const WHATSAPP_URL = 'https://wa.me/905525677164';

const WHATSAPP_LABEL: Record<string, string> = {
  en: 'Chat on WhatsApp',
  tr: "WhatsApp'tan Yazın",
  de: 'Per WhatsApp schreiben',
  ur: 'WhatsApp پر بات کریں',
  ar: 'تواصل عبر واتساب',
};

function WhatsAppLink({ locale, className = '' }: { locale: string; className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${className}`}
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span>{WHATSAPP_LABEL[locale] || WHATSAPP_LABEL.en}</span>
    </a>
  );
}

export default function ServiceRequestCTA({
  serviceType,
  variant = 'default',
}: ServiceRequestCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dir, locale, isLoading } = useTranslations();
  const t = useSectionTranslations('cta.serviceRequest');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <div className="h-64 bg-gray-50 animate-pulse rounded-2xl" />;
  }

  if (variant === 'compact') {
    return (
      <>
        <div
          className="bg-gray-900 rounded-2xl p-8 text-center"
          dir={dir}
        >
          <h3 className="text-xl font-semibold text-white mb-4">{t('compactTitle')}</h3>
          <p className="text-gray-300 mb-6">{t('compactDescription')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" onClick={openModal}>
              {t('getQuote')}
            </Button>
            <WhatsAppLink locale={locale} className="text-emerald-400 hover:text-emerald-300" />
          </div>
        </div>
        <RequestModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceType={serviceType}
          dir={dir}
        />
      </>
    );
  }

  if (variant === 'banner') {
    return (
      <>
        <div
          className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          dir={dir}
        >
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            <h3 className="text-2xl font-bold text-white mb-2">{t('bannerTitle')}</h3>
            <p className="text-gray-300">{t('bannerDescription')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button variant="secondary" size="lg" onClick={openModal} className="whitespace-nowrap">
              {t('startProject')}
            </Button>
            <WhatsAppLink locale={locale} className="text-emerald-400 hover:text-emerald-300 whitespace-nowrap" />
          </div>
        </div>
        <RequestModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceType={serviceType}
          dir={dir}
        />
      </>
    );
  }

  // Default variant
  return (
    <>
      <section className="relative py-24 overflow-hidden" dir={dir}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        <BackgroundBlobs variant="soft" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/5 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-600">{t('badge')}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              {t('title')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto"
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" onClick={openModal}>
                {t('getQuote')}
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                {t('scheduleCall')}
              </Button>
              <WhatsAppLink
                locale={locale}
                className="px-6 py-3 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
              />
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('trustIndicator1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('trustIndicator2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('trustIndicator3')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceType={serviceType}
        dir={dir}
      />
    </>
  );
}

// Modal Component
interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
  dir: 'ltr' | 'rtl';
}

function RequestModal({ isOpen, onClose, serviceType, dir }: RequestModalProps) {
  const t = useSectionTranslations('forms.projectRequest');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            dir={dir}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <ProjectRequestForm
                prefilledService={serviceType}
                onSuccess={onClose}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
