// src/components/ProjectsGallerySection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function ProjectsGallerySection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.gallery');
  const tCommon = useSectionTranslations('common');

  const [activeCategory, setActiveCategory] = useState('all');

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
    { key: 'all', label: t('categories.all') },
    { key: 'web', label: t('categories.web') },
    { key: 'mobile', label: t('categories.mobile') },
    { key: 'ecommerce', label: t('categories.ecommerce') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'automation', label: t('categories.automation') },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      image: '/images/Projects/Ecomerece.png',
      summary: 'Modern online store with advanced features and seamless user experience.',
      href: '/projects/ecommerce-platform',
      category: 'ecommerce',
      tech: ['Next.js', 'Shopify', 'Stripe'],
      result: '300% sales increase'
    },
    {
      title: 'Business Automation Suite',
      image: '/images/Projects/PythonBot.png',
      summary: 'Comprehensive automation system that streamlined business operations.',
      href: '/projects/automation-suite',
      category: 'automation',
      tech: ['Python', 'APIs', 'Database'],
      result: '80% time savings'
    },
    {
      title: 'Mobile Finance App',
      image: '/images/Projects/Mobile.png',
      summary: 'Cross-platform mobile application for personal finance management.',
      href: '/projects/finance-app',
      category: 'mobile',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      result: '50K+ downloads'
    },
    {
      title: 'AI Analytics Dashboard',
      image: '/images/Projects/Data.png',
      summary: 'Machine learning powered analytics platform with predictive insights.',
      href: '/projects/ai-dashboard',
      category: 'ai',
      tech: ['Python', 'TensorFlow', 'React'],
      result: '95% accuracy'
    },
    {
      title: 'Corporate Website',
      image: '/images/Projects/Website.png',
      summary: 'Professional corporate website with modern design and CMS integration.',
      href: '/projects/corporate-website',
      category: 'web',
      tech: ['Next.js', 'Tailwind', 'Headless CMS'],
      result: '+150% traffic'
    },
    {
      title: 'UI/UX Design System',
      image: '/images/Projects/Ui.png',
      summary: 'Comprehensive design system and style guide for consistent branding.',
      href: '/projects/design-system',
      category: 'web',
      tech: ['Figma', 'React', 'Storybook'],
      result: '40% faster development'
    }
  ];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div className={`absolute bottom-16 w-28 h-28 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`
                px-4 py-2 text-sm font-medium border rounded-sm transition-all duration-250
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

        {/* Projects Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="card group"
            >
              {/* Project Image */}
              <div className="relative mb-6 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-title text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-body text-gray-600 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="text-caption text-gray-500 uppercase tracking-wide mb-2">
                    {t('technology')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
                  <div className="text-caption text-gray-500 uppercase tracking-wide mb-1">
                    {t('keyResult')}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {project.result}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  href={project.href}
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  className="w-full justify-between"
                >
                  {t('viewProject')}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            href="/projects"
            variant="secondary"
            size="lg"
          >
            {t('viewAllProjects')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}