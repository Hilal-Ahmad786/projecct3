// src/components/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

import {
  Cog6ToothIcon,
  ChartBarSquareIcon,
  CubeIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  ComputerDesktopIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  MegaphoneIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function ServicesSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('services.main');
  const tServices = useSectionTranslations('services.list');
  const tCommon = useSectionTranslations('common');

  const [activeCategory, setActiveCategory] = useState('automation');

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

  const categories = [
    { key: 'automation', label: t('categories.automation') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'web', label: t('categories.web') },
    { key: 'design', label: t('categories.design') },
    { key: 'infrastructure', label: t('categories.infrastructure') },
  ];

  const services = [
    {
      title: tServices('pythonAutomation.title'),
      icon: Cog6ToothIcon,
      description: tServices('pythonAutomation.description'),
      category: 'automation',
      features: tServices('pythonAutomation.features')
    },
    {
      title: tServices('dataAnalytics.title'),
      icon: ChartBarSquareIcon,
      description: tServices('dataAnalytics.description'),
      category: 'automation',
      features: tServices('dataAnalytics.features')
    },
    {
      title: tServices('machineLearning.title'),
      icon: CubeIcon,
      description: tServices('machineLearning.description'),
      category: 'ai',
      features: tServices('machineLearning.features')
    },
    {
      title: tServices('aiIntegration.title'),
      icon: PhotoIcon,
      description: tServices('aiIntegration.description'),
      category: 'ai',
      features: tServices('aiIntegration.features')
    },
    {
      title: tServices('conversationalAI.title'),
      icon: ChatBubbleBottomCenterTextIcon,
      description: tServices('conversationalAI.description'),
      category: 'ai',
      features: tServices('conversationalAI.features')
    },
    {
      title: tServices('apiDevelopment.title'),
      icon: LinkIcon,
      description: tServices('apiDevelopment.description'),
      category: 'web',
      features: tServices('apiDevelopment.features')
    },
    {
      title: tServices('webApplications.title'),
      icon: ComputerDesktopIcon,
      description: tServices('webApplications.description'),
      category: 'web',
      features: tServices('webApplications.features')
    },
    {
      title: tServices('fullStackDevelopment.title'),
      icon: CodeBracketSquareIcon,
      description: tServices('fullStackDevelopment.description'),
      category: 'web',
      features: tServices('fullStackDevelopment.features')
    },
    {
      title: tServices('mobileDevelopment.title'),
      icon: DevicePhoneMobileIcon,
      description: tServices('mobileDevelopment.description'),
      category: 'web',
      features: tServices('mobileDevelopment.features')
    },
    {
      title: tServices('uiuxDesign.title'),
      icon: PencilSquareIcon,
      description: tServices('uiuxDesign.description'),
      category: 'design',
      features: tServices('uiuxDesign.features')
    },
    {
      title: tServices('digitalMarketing.title'),
      icon: MegaphoneIcon,
      description: tServices('digitalMarketing.description'),
      category: 'design',
      features: tServices('digitalMarketing.features')
    },
    {
      title: tServices('ecommerceSolutions.title'),
      icon: ShoppingCartIcon,
      description: tServices('ecommerceSolutions.description'),
      category: 'infrastructure',
      features: tServices('ecommerceSolutions.features')
    },
    {
      title: tServices('devopsInfrastructure.title'),
      icon: CloudArrowUpIcon,
      description: tServices('devopsInfrastructure.description'),
      category: 'infrastructure',
      features: tServices('devopsInfrastructure.features')
    },
  ];

  const filteredServices = services.filter(service => service.category === activeCategory);

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
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute top-32 w-28 h-28 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`
                px-6 py-3 text-sm font-medium border rounded-sm transition-all duration-250
                ${activeCategory === category.key
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="card group hover:border-gray-300"
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="w-8 h-0.5 bg-gray-200 group-hover:bg-gray-300 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-title text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-body text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {Array.isArray(service.features) ? (
                    service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span className="text-caption text-gray-500">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-caption text-gray-500">{service.features}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Button
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  variant="ghost"
                  size="sm"
                  rightIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d={dir === 'rtl' ? "M11 17l-5-5m0 0l5-5m-5 5h12" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
                    </svg>
                  }
                  className="w-full justify-between"
                >
                  {tCommon('learnMore')}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            {t('readyToStart')}
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            {t('readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              {t('startProject')}
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
            >
              {t('viewWork')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}