// src/components/VisionMissionSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { EyeIcon, FlagIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function VisionMissionSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('about.vision');
  const tValues = useSectionTranslations('about.values');
  const tCommon = useSectionTranslations('common');

  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const values = [
    {
      title: tValues('excellence.title'),
      description: tValues('excellence.description'),
      initial: 'E'
    },
    {
      title: tValues('innovation.title'),
      description: tValues('innovation.description'),
      initial: 'I'
    },
    {
      title: tValues('integrity.title'),
      description: tValues('integrity.description'),
      initial: 'I'
    },
    {
      title: tValues('partnership.title'),
      description: tValues('partnership.description'),
      initial: 'P'
    }
  ];

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Subtle geometric background */}
      <div className={`absolute top-16 w-24 h-24 opacity-[0.02] ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(40% at 70% 30%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          {/* Vision */}
          <motion.div
            variants={itemVariants}
            className="card relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-gray-700" />
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
            </div>

            <h3 className="text-title text-gray-900 mb-4">{t('visionTitle')}</h3>
            
            <p className="text-body text-gray-600 leading-relaxed">
              {t('visionText')}
            </p>

            {/* Visual accent */}
            <div className={`absolute top-6 w-2 h-2 bg-emerald-500 rounded-full opacity-60 ${dir === 'rtl' ? 'left-6' : 'right-6'}`} />
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="card relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                <FlagIcon className="h-6 w-6 text-gray-700" />
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
            </div>

            <h3 className="text-title text-gray-900 mb-4">{t('missionTitle')}</h3>
            
            <p className="text-body text-gray-600 leading-relaxed">
              {t('missionText')}
            </p>

            {/* Visual accent */}
            <div className={`absolute top-6 w-2 h-2 bg-red-500 rounded-full opacity-60 ${dir === 'rtl' ? 'left-6' : 'right-6'}`} />
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="text-center mb-12">
            <h3 className="text-headline text-gray-900 mb-4">{tValues('title')}</h3>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              {tValues('subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-sm mx-auto mb-4 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">
                    {value.initial}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{value.title}</h4>
                <p className="text-caption text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}