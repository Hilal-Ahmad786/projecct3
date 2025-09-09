// src/components/TechApproachSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

const technologies = [
  { name: 'Next.js', logo: '/images/Tech/nextdotjs.svg', category: 'Frontend' },
  { name: 'React', logo: '/images/Tech/react.svg', category: 'Frontend' },
  { name: 'Node.js', logo: '/images/Tech/nodedotjs.svg', category: 'Backend' },
  { name: 'Python', logo: '/images/Tech/python.svg', category: 'Backend' },
  { name: 'MongoDB', logo: '/images/Tech/mongodb.svg', category: 'Database' },
  { name: 'PostgreSQL', logo: '/images/Tech/postgresql.svg', category: 'Database' },
  { name: 'AWS', logo: '/images/Tech/aws.png', category: 'Cloud' },
  { name: 'Docker', logo: '/images/Tech/docker.svg', category: 'DevOps' },
  { name: 'Kubernetes', logo: '/images/Tech/kubernetes.svg', category: 'DevOps' },
  { name: 'TensorFlow', logo: '/images/Tech/tensorflow.svg', category: 'AI/ML' },
  { name: 'PyTorch', logo: '/images/Tech/pytorch.svg', category: 'AI/ML' },
  { name: 'Shopify', logo: '/images/Tech/shopify.svg', category: 'E-Commerce' }
];

export default function TechApproachSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.techApproach');
  const tStats = useSectionTranslations('stats');
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

  const approach = [
    {
      step: '01',
      title: t('processSteps.0.title'),
      description: t('processSteps.0.description')
    },
    {
      step: '02',
      title: t('processSteps.1.title'),
      description: t('processSteps.1.description')
    },
    {
      step: '03',
      title: t('processSteps.2.title'),
      description: t('processSteps.2.description')
    },
    {
      step: '04',
      title: t('processSteps.3.title'),
      description: t('processSteps.3.description')
    },
    {
      step: '05',
      title: t('processSteps.4.title'),
      description: t('processSteps.4.description')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute bottom-20 w-24 h-24 ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technologies */}
          <div className={dir === 'rtl' ? 'order-2' : 'order-1'}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className="text-overline">{t('technologiesWeUse')}</span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-6"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  className="group text-center"
                >
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-3 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-900 mb-1">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tech.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Process */}
          <div className={dir === 'rtl' ? 'order-1' : 'order-2'}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className="text-overline">{t('ourProcess')}</span>
            </div>

            <div className="space-y-6">
              {approach.map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {phase.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { value: '20+', label: t('techStats.technologies') },
            { value: tStats('years5'), label: t('techStats.yearsExperience') },
            { value: tStats('uptime99'), label: t('techStats.uptime') },
            { value: tStats('support247'), label: t('techStats.support') }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}