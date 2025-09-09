// src/components/SuccessMetricsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import {
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function SuccessMetricsSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.successMetrics');
  const tStats = useSectionTranslations('stats');
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

  const metrics = [
    {
      value: tStats('projects150'),
      label: t('metrics.0.label'),
      Icon: CheckBadgeIcon,
      description: t('metrics.0.description')
    },
    {
      value: tStats('avgROI300'),
      label: t('metrics.1.label'),
      Icon: ArrowTrendingUpIcon,
      description: t('metrics.1.description')
    },
    {
      value: tStats('timeSavings80'),
      label: t('metrics.2.label'),
      Icon: ClockIcon,
      description: t('metrics.2.description')
    },
    {
      value: tStats('clients50'),
      label: t('metrics.3.label'),
      Icon: UserGroupIcon,
      description: t('metrics.3.description')
    },
    {
      value: tStats('uptime99'),
      label: t('metrics.4.label'),
      Icon: ChartBarIcon,
      description: t('metrics.4.description')
    },
    {
      value: tStats('revenueGenerated2M'),
      label: t('metrics.5.label'),
      Icon: CurrencyDollarIcon,
      description: t('metrics.5.description')
    }
  ];

  const testimonialMetrics = [
    {
      metric: tStats('clientSatisfaction95'),
      label: 'Client Satisfaction',
      quote: 'Exceeded our expectations in every aspect',
      client: 'Tech Startup CEO'
    },
    {
      metric: tStats('responseTime24h'),
      label: 'Response Time',
      quote: 'Lightning-fast support when we need it',
      client: 'E-commerce Director'
    },
    {
      metric: tStats('onTimeDelivery100'),
      label: 'On-Time Delivery',
      quote: 'Always delivers on promises and deadlines',
      client: 'Project Manager'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute top-16 w-20 h-20 ${dir === 'rtl' ? 'right-20' : 'left-20'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Main Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.Icon;
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className="card text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Icon className="h-8 w-8 text-gray-700" />
                </div>

                {/* Value */}
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {metric.value}
                </div>

                {/* Label */}
                <div className="font-medium text-gray-900 mb-3">
                  {metric.label}
                </div>

                {/* Description */}
                <div className="text-caption text-gray-500 leading-relaxed">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonial Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-sm border border-gray-200 p-8"
        >
          <div className="text-center mb-12">
            <h3 className="text-title text-gray-900 mb-4">
              {t('whatClientsAsk')}
            </h3>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              {t('whatClientsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialMetrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl font-light text-gray-900 mb-2">
                  {item.metric}
                </div>
                <div className="font-medium text-gray-900 mb-3">
                  {item.label}
                </div>
                <blockquote className="text-sm text-gray-600 italic mb-2">
                  "{item.quote}"
                </blockquote>
                <cite className="text-xs text-gray-500 not-italic">
                  — {item.client}
                </cite>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            {t('readyForResults')}
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            {t('readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              {t('startSuccessStory')}
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              {t('viewCaseStudies')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}