// src/components/PricingSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function PricingSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.pricing');
  const tCommon = useSectionTranslations('common');

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'subscription' | 'project'>('subscription');

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

  const subscriptionTiers = [
    {
      name: t('subscriptions.seoMarketing.title'),
      priceMonthly: 10000,
      priceAnnual: 90000,
      features: t('subscriptions.seoMarketing.features'),
    },
    {
      name: t('subscriptions.maintenanceSupport.title'),
      priceMonthly: 5000,
      priceAnnual: 45000,
      features: t('subscriptions.maintenanceSupport.features'),
    },
    {
      name: t('subscriptions.automationBot.title'),
      priceMonthly: 8000,
      priceAnnual: 72000,
      features: t('subscriptions.automationBot.features'),
    },
    {
      name: t('subscriptions.uiuxDesign.title'),
      priceMonthly: 7000,
      priceAnnual: 63000,
      features: t('subscriptions.uiuxDesign.features'),
    },
    {
      name: t('subscriptions.devopsCicd.title'),
      priceMonthly: 6000,
      priceAnnual: 54000,
      features: t('subscriptions.devopsCicd.features'),
    },
    {
      name: t('subscriptions.aiModelHosting.title'),
      priceMonthly: 12000,
      priceAnnual: 108000,
      features: t('subscriptions.aiModelHosting.features'),
    },
  ];

  const projectTiers = [
    {
      name: t('projects.corporateWebsite.title'),
      price: t('projects.corporateWebsite.price'),
      features: t('projects.corporateWebsite.features'),
    },
    {
      name: t('projects.ecommerceStore.title'),
      price: t('projects.ecommerceStore.price'),
      features: t('projects.ecommerceStore.features'),
    },
    {
      name: t('projects.mernApplication.title'),
      price: t('projects.mernApplication.price'),
      features: t('projects.mernApplication.features'),
    },
    {
      name: t('projects.mobileApplication.title'),
      price: t('projects.mobileApplication.price'),
      features: t('projects.mobileApplication.features'),
    },
    {
      name: t('projects.dataAnalyticsBi.title'),
      price: t('projects.dataAnalyticsBi.price'),
      features: t('projects.dataAnalyticsBi.features'),
    },
    {
      name: t('projects.devopsSetup.title'),
      price: t('projects.devopsSetup.price'),
      features: t('projects.devopsSetup.features'),
    },
    {
      name: t('projects.customEnterprise.title'),
      price: t('projects.customEnterprise.price'),
      features: t('projects.customEnterprise.features'),
    },
  ];

  const periodLabel = billingCycle === 'monthly' ? '/ay' : '/yıl';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
      {/* Swiss Grid Background (behind content) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
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

      {/* Proper Crescent Elements (behind content) */}
      <div className={`absolute top-20 w-28 h-28 pointer-events-none -z-10 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white border border-gray-200 rounded-sm p-1">
            <button
              type="button"
              onClick={() => setActiveCategory('subscription')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeCategory === 'subscription'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {t('subscriptionPackages')}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('project')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeCategory === 'project'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {t('projectServices')}
            </button>
          </div>
        </motion.div>

        {activeCategory === 'subscription' ? (
          <>
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-16"
            >
              <div className="bg-white border border-gray-200 rounded-sm p-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                    ${billingCycle === 'monthly'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {t('monthly')}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                    ${billingCycle === 'annual'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {t('annual')}
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-sm">
                    {t('annualDiscount')}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Subscription Grid */}
            <motion.div
              key={`grid-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {subscriptionTiers.map((tier) => {
                const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnual;
                return (
                  <motion.div
                    key={tier.name}
                    variants={itemVariants}
                    className="card group"
                  >
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <h3 className="text-title text-gray-900 mb-2">
                          {tier.name}
                        </h3>
                        <div className="pb-6 border-b border-gray-200">
                          <span className="text-3xl font-light text-gray-900">
                            {price.toLocaleString('tr-TR')}₺
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            {periodLabel}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <div className="text-caption text-gray-500 uppercase tracking-wide">
                          Neler Dahil
                        </div>
                        <ul className="space-y-3">
                          {Array.isArray(tier.features) ? (
                            tier.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckIcon className="h-3 w-3 text-gray-600" />
                                </div>
                                <span className="text-body text-gray-600 leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckIcon className="h-3 w-3 text-gray-600" />
                              </div>
                              <span className="text-body text-gray-600 leading-relaxed">
                                {tier.features}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-6">
                        <Button
                          href="/contact"
                          variant="primary"
                          size="lg"
                          className="w-full"
                        >
                          {tCommon('getQuote')}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-caption text-gray-500"
            >
              {t('guarantee')}
            </motion.p>
          </>
        ) : (
          <>
            {/* Project Grid */}
            <motion.div
              key={`grid-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projectTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={itemVariants}
                  className="card group"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="text-title text-gray-900 mb-2">
                        {tier.name}
                      </h3>
                      <div className="pb-6 border-b border-gray-200">
                        <span className="text-2xl font-light text-gray-900">
                          {tier.price}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="text-caption text-gray-500 uppercase tracking-wide">
                        Proje Kapsamı
                      </div>
                      <ul className="space-y-3">
                        {Array.isArray(tier.features) ? (
                          tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                              <span className="text-body text-gray-600 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start gap-3">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                            <span className="text-body text-gray-600 leading-relaxed">
                              {tier.features}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                      <Button
                        href="/contact"
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        Detaylı Teklif
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-caption text-gray-500"
            >
              {t('projectGuarantee')}
            </motion.p>
          </>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            {t('customSolution')}
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            {t('customDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              {t('getCustomQuote')}
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              {t('viewProjects')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}