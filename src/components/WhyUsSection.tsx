// src/components/WhyUsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function WhyUsSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.whyUs');
  const tCommon = useSectionTranslations('common');

  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{tCommon('loading')}</p>
        </div>
      </section>
    );
  }

  const advantages = [
    {
      title: t('fastDelivery.title'),
      description: t('fastDelivery.description'),
      Icon: ClockIcon,
      metric: t('fastDelivery.metric')
    },
    {
      title: t('provenExpertise.title'),
      description: t('provenExpertise.description'),
      Icon: ShieldCheckIcon,
      metric: t('provenExpertise.metric')
    },
    {
      title: t('costEffective.title'),
      description: t('costEffective.description'),
      Icon: CurrencyDollarIcon,
      metric: t('costEffective.metric')
    },
    {
      title: t('support247.title'),
      description: t('support247.description'),
      Icon: ChatBubbleBottomCenterTextIcon,
      metric: t('support247.metric')
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute bottom-20 w-20 h-20 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.Icon;
            return (
              <motion.div
                key={advantage.title}
                variants={itemVariants}
                className="card text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Icon className="h-8 w-8 text-gray-700" />
                </div>

                {/* Title */}
                <h3 className="text-title text-gray-900 mb-3">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-body text-gray-600 mb-4 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Metric */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
                  <span className="text-sm font-medium text-gray-900">
                    {advantage.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}