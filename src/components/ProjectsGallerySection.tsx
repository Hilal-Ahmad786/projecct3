// src/components/ProjectsGallerySection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { Locale } from '@/lib/i18n';
import Button from '@/components/Button';

interface ProjectTranslation {
  locale: string;
  name: string;
  description?: string | null;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  client?: string | null;
  category?: string | null;
  industry?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  technologies: unknown[];
  projectUrl?: string | null;
  results?: unknown;
  translations: ProjectTranslation[];
}

interface ProjectsGallerySectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects: any[];
  locale: Locale;
}

export default function ProjectsGallerySection({ projects, locale }: ProjectsGallerySectionProps) {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.gallery');
  const tCommon = useSectionTranslations('common');

  const [activeCategory, setActiveCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

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

  // Get localized content for a project
  const getLocalizedProject = (project: Project) => {
    const translation = project.translations?.find((t) => t.locale === locale);
    return {
      ...project,
      name: translation?.name || project.name,
      description: translation?.description || project.description,
    };
  };

  // Extract unique categories from projects
  const uniqueCategories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  ) as string[];

  const categories = [
    { key: 'all', label: t('categories.all') || 'All' },
    ...uniqueCategories.map((cat) => ({
      key: cat.toLowerCase().replace(/\s+/g, '-'),
      label: cat,
    })),
  ];

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter(
          (project) =>
            project.category?.toLowerCase().replace(/\s+/g, '-') === activeCategory
        );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  const handleProjectClick = (projectUrl?: string | null) => {
    if (projectUrl) {
      window.open(projectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden" dir={dir}>
      {/* Proper Crescent Elements */}
      <div
        className={`absolute bottom-16 w-28 h-28 ${dir === 'rtl' ? 'left-20' : 'right-20'}`}
      >
        <div
          className={`crescent ${dir === 'rtl' ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow') || 'Portfolio'}
          title={t('title') || 'Featured Projects'}
          subtitle={t('subtitle') || 'Explore our diverse portfolio of successful digital solutions'}
          className="mb-16"
        />

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`
                  px-4 py-2 text-sm font-medium border rounded-sm transition-all duration-250
                  ${
                    activeCategory === category.key
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => {
              const localizedProject = getLocalizedProject(project);
              const hasImageError = imageErrors[project.id];

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="card group cursor-pointer"
                  onClick={() => handleProjectClick(project.projectUrl)}
                >
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-100 aspect-[16/10]">
                    {project.thumbnail && !hasImageError ? (
                      <Image
                        src={project.thumbnail}
                        alt={localizedProject.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(project.id)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-30">
                          {localizedProject.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      {project.projectUrl && (
                        <span className="text-white font-medium flex items-center gap-2">
                          {t('viewProject') || 'View Project'}
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-title text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {localizedProject.name}
                      </h3>
                      <p className="text-body text-gray-600 leading-relaxed line-clamp-2">
                        {localizedProject.description}
                      </p>
                    </div>

                    {/* Industry/Category Badge */}
                    {(project.industry || project.category) && (
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-700 font-medium">
                          {String(project.industry || project.category)}
                        </span>
                      </div>
                    )}

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <div className="text-caption text-gray-500 uppercase tracking-wide mb-2">
                          {t('technology') || 'Technology'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-600"
                            >
                              {String(tech)}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-sm text-xs text-gray-500">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Results */}
                    {project.results && Array.isArray(project.results) && project.results.length > 0 && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
                        <div className="text-caption text-gray-500 uppercase tracking-wide mb-1">
                          {t('keyResult') || 'Key Result'}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {(project.results[0] as { metric: string; value: string }).metric}: {(project.results[0] as { metric: string; value: string }).value}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-sm transition-all duration-250"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('viewProject') || 'View Live Site'}
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}

        {/* Load More / Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button href="/contact" variant="secondary" size="lg">
            {t('startProject') || 'Start Your Project'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
