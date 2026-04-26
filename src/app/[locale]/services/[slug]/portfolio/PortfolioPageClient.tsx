'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import LocalizedLink from '@/components/LocalizedLink';
import Image from 'next/image';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  description?: string;
  link?: string;
  technologies?: string[];
}

interface PortfolioPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  portfolio: PortfolioItem[];
  locale: string;
}

export default function PortfolioPageClient({
  serviceName,
  serviceSlug,
  portfolio,
  locale
}: PortfolioPageClientProps) {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const isGridInView = useInView(gridRef, { once: true, margin: '-100px' });

  // Swiss minimalist emerald accent
  const accentColor = '#16a085';

  // Get unique categories
  const categories = [...new Set(portfolio.map(p => p.category))];
  const filteredPortfolio = selectedCategory
    ? portfolio.filter(p => p.category === selectedCategory)
    : portfolio;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section - Swiss Minimalist */}
      <section className="relative min-h-[80vh] pt-[140px] pb-24 overflow-hidden">
        {/* Swiss Cross Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="cross-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M32 24v16M24 32h16" stroke="#1a1a1a" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cross-pattern)" />
          </svg>
        </div>

        {/* Floating Diamond Shapes - Portfolio Unique */}
        <motion.div
          animate={{ rotate: 45, y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-48 right-[12%] w-24 h-24 border border-gray-200 hidden lg:block"
        />
        <motion.div
          animate={{ rotate: 45, y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-72 right-[25%] w-16 h-16 border border-gray-100 hidden lg:block"
        />
        <motion.div
          animate={{ rotate: 45, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 right-[18%] w-8 h-8 hidden lg:block"
          style={{ backgroundColor: accentColor + '15' }}
        />

        {/* Image Frame Decorations */}
        <div className="absolute right-[8%] top-1/3 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Stacked Frames Effect */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
                className="absolute border border-gray-200 bg-white"
                style={{
                  width: 160 - i * 20,
                  height: 120 - i * 15,
                  top: i * 12,
                  left: i * 12,
                  zIndex: 3 - i,
                }}
              >
                <div className="absolute inset-4 bg-gray-50 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="w-8 h-1"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Vertical Line Accent */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 120 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-[8%] top-48 w-px bg-gray-200 hidden lg:block"
        />

        {/* Breadcrumb - Outside fading container */}
        <div className="container mx-auto px-4 relative z-20 mb-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <LocalizedLink href="/services" className="hover:text-gray-900 transition-colors">{t('services.detail.breadcrumb.services')}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <LocalizedLink href={`/services/${serviceSlug}`} className="hover:text-gray-900 transition-colors">{serviceName}</LocalizedLink>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{t('services.detail.breadcrumb.portfolio')}</span>
          </motion.nav>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 45, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 border flex items-center justify-center"
                style={{ borderColor: accentColor }}
              >
                <div className="w-3 h-3" style={{ backgroundColor: accentColor }} />
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: accentColor }}>
                {t('services.detail.portfolio.eyebrow')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-[1.1] tracking-tight"
            >
              {t('services.detail.portfolio.heroTitle')}
              <br />
              <span className="font-semibold" style={{ color: accentColor }}>{t('services.detail.portfolio.heroTitleAccent')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
            >
              {t('services.detail.portfolio.heroDescription')}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-16 border-t border-gray-100 pt-8"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="text-5xl font-light"
                  style={{ color: accentColor }}
                >
                  {portfolio.length}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.portfolio.stats.projects')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">{categories.length}</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.portfolio.stats.categories')}</div>
              </div>
              <div>
                <div className="text-5xl font-light text-gray-900">100%</div>
                <div className="text-sm text-gray-400 mt-1">{t('services.detail.portfolio.stats.satisfaction')}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          {portfolio.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 45 }}
                className="w-20 h-20 border-2 flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: accentColor }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6"
                  style={{ backgroundColor: accentColor }}
                />
              </motion.div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">{t('services.detail.breadcrumb.portfolio')} {t('services.detail.features.comingSoon').replace('Features', '')}</h2>
              <p className="text-gray-500">{t('services.detail.portfolio.preparingCaseStudies')}</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center justify-center gap-2 mb-16"
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-6 py-3 text-sm font-bold rounded-full transition-all ${
                      selectedCategory === null
                        ? 'text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                    }`}
                    style={selectedCategory === null ? { backgroundColor: accentColor } : {}}
                  >
                    {t('services.detail.portfolio.filters.all')}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-3 text-sm font-bold rounded-full transition-all ${
                        selectedCategory === cat
                          ? 'text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                      }`}
                      style={selectedCategory === cat ? { backgroundColor: accentColor } : {}}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Portfolio Grid - Staggered Masonry Reveal */}
              <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                <AnimatePresence mode="popLayout">
                  {filteredPortfolio.map((item, index) => (
                    <motion.div
                      key={item.title}
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={isGridInView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.08,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      } : {}}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`glass bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer ${
                        index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                    >
                      {/* Image Container with Parallax */}
                      <div className={`relative overflow-hidden ${
                        index % 5 === 0 ? 'aspect-square' : 'aspect-[4/3]'
                      }`}>
                        {item.image ? (
                          <motion.div
                            className="absolute inset-0"
                            animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ) : (
                          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <motion.div
                                animate={{ rotate: 45 }}
                                className="w-16 h-16 border mx-auto mb-2 flex items-center justify-center"
                                style={{ borderColor: accentColor + '30' }}
                              >
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-4 h-4"
                                  style={{ backgroundColor: accentColor + '40' }}
                                />
                              </motion.div>
                              <span className="text-xs text-gray-400 uppercase tracking-wider">{t('services.detail.portfolio.preview')}</span>
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay with Slide Animation */}
                        <motion.div
                          initial={{ y: '100%' }}
                          animate={{ y: hoveredIndex === index ? 0 : '100%' }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute inset-0 bg-gray-900/90 flex items-end"
                        >
                          <div className="p-8 w-full">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                                {item.category}
                              </div>
                              <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                  {item.description}
                                </p>
                              )}
                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm transition-colors"
                                  style={{ color: accentColor }}
                                >
                                  {t('services.detail.portfolio.viewProject')}
                                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                </a>
                              )}
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Corner Index with Animation */}
                        <motion.div
                          animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                          className="absolute top-4 left-4 text-xs font-mono text-gray-400 z-10"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.div>
                      </div>

                      {/* Content Below Image */}
                      <div className="p-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3
                              className="font-medium text-gray-900 transition-colors"
                              style={{ color: hoveredIndex === index ? accentColor : undefined }}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">{item.category}</p>
                          </div>
                          <motion.div
                            animate={{
                              x: hoveredIndex === index ? 4 : 0,
                              rotate: hoveredIndex === index ? -45 : 0
                            }}
                            className="w-8 h-8 border flex items-center justify-center transition-colors"
                            style={{
                              borderColor: hoveredIndex === index ? accentColor : '#e5e7eb',
                              backgroundColor: hoveredIndex === index ? accentColor : 'transparent',
                            }}
                          >
                            <ArrowRightIcon className={`w-4 h-4 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'}`} />
                          </motion.div>
                        </div>

                        {/* Technologies with Staggered Animation */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.technologies.slice(0, 3).map((tech, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.08 + i * 0.05 + 0.3 }}
                                className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5"
                              >
                                {tech}
                              </motion.span>
                            ))}
                            {item.technologies.length > 3 && (
                              <span className="text-xs text-gray-400">
                                +{item.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Results Section - Swiss Minimal */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-px bg-gray-900" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {t('services.detail.portfolio.impact.eyebrow')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-light text-gray-900 mb-6"
                >
                  {t('services.detail.portfolio.impact.title')}
                  <br />
                  <span className="font-semibold" style={{ color: accentColor }}>{t('services.detail.portfolio.impact.titleAccent')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 leading-relaxed"
                >
                  {t('services.detail.portfolio.impact.description')}
                </motion.p>
              </div>

              {/* Stats Grid with Sequential Reveal */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: '150+', labelKey: 'projectsDelivered' },
                  { value: '98%', labelKey: 'clientRetention' },
                  { value: '40%', labelKey: 'performanceGain' },
                  { value: '5.0', labelKey: 'averageRating' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ y: -4 }}
                    className="glass bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="text-4xl font-bold mb-2"
                      style={{ color: accentColor }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm font-medium text-gray-500">{t(`services.detail.portfolio.stats.${stat.labelKey}`)}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Rotating Diamond */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -top-20 w-80 h-80 border border-gray-800"
          style={{ transform: 'rotate(45deg)' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-16 -bottom-16 w-48 h-48 border border-gray-800"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              {t('services.detail.portfolio.cta.title')}
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              {t('services.detail.portfolio.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                {t('services.detail.portfolio.cta.startProject')}
                <ArrowRightIcon className="w-5 h-5" />
              </LocalizedLink>
              <LocalizedLink
                href={`/services/${serviceSlug}/faq`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 rounded-full text-white font-bold hover:bg-white/5 transition-colors"
              >
                {t('services.detail.portfolio.cta.haveQuestions')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
