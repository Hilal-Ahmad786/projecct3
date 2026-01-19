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

export default function ServiceRequestCTA({
  serviceType,
  variant = 'default',
}: ServiceRequestCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dir, isLoading } = useTranslations();
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
          <Button variant="primary" onClick={openModal} className="bg-white text-gray-900 hover:bg-gray-100">
            {t('getQuote')}
          </Button>
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
          <Button variant="primary" size="lg" onClick={openModal} className="bg-white text-gray-900 hover:bg-gray-100 whitespace-nowrap">
            {t('startProject')}
          </Button>
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
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {t('title')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
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
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
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
