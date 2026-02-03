'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, EyeIcon } from '@heroicons/react/24/solid';
import ParticleNetwork from '@/components/ParticleNetwork';

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

const colorClasses: Record<string, { gradient: string; accent: string; light: string; dark: string }> = {
  emerald: { gradient: 'from-emerald-500 to-teal-600', accent: 'text-emerald-600', light: 'bg-emerald-50', dark: 'bg-emerald-600' },
  blue: { gradient: 'from-blue-500 to-indigo-600', accent: 'text-blue-600', light: 'bg-blue-50', dark: 'bg-blue-600' },
  violet: { gradient: 'from-violet-500 to-purple-600', accent: 'text-violet-600', light: 'bg-violet-50', dark: 'bg-violet-600' },
  amber: { gradient: 'from-amber-500 to-orange-600', accent: 'text-amber-600', light: 'bg-amber-50', dark: 'bg-amber-600' },
  rose: { gradient: 'from-rose-500 to-pink-600', accent: 'text-rose-600', light: 'bg-rose-50', dark: 'bg-rose-600' },
  gray: { gradient: 'from-gray-600 to-gray-800', accent: 'text-gray-700', light: 'bg-gray-50', dark: 'bg-gray-700' },
};

export default function PortfolioPageClient({
  serviceName,
  serviceSlug,
  serviceColor = 'emerald',
  portfolio,
  locale
}: PortfolioPageClientProps) {
  const colors = colorClasses[serviceColor] || colorClasses.emerald;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get unique categories
  const categories = [...new Set(portfolio.map(p => p.category))];
  const filteredPortfolio = selectedCategory
    ? portfolio.filter(p => p.category === selectedCategory)
    : portfolio;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 pb-32">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="opacity-20" />
        </div>

        {/* Floating Project Previews */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {portfolio.slice(0, 4).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
              className="absolute w-48 h-32 rounded-lg overflow-hidden shadow-2xl"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <span className="text-4xl opacity-50">🖼️</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href={`/${locale}/services`} className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-white transition-colors">{serviceName}</Link>
            <span>/</span>
            <span className="text-white">Portfolio</span>
          </motion.nav>

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors.gradient} mb-6`}
            >
              <BriefcaseIcon className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Our Work</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {serviceName}
              <br />
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                Portfolio & Case Studies
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed"
            >
              Explore our successful projects and see how we've helped businesses like yours achieve their goals with {serviceName.toLowerCase()}.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">{portfolio.length}</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{categories.length}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {portfolio.length === 0 ? (
            <div className="text-center py-16">
              <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Portfolio Coming Soon</h2>
              <p className="text-gray-600">We're preparing case studies for this service.</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center justify-center gap-3 mb-12"
                >
                  <FunnelIcon className="w-5 h-5 text-gray-400" />
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? `bg-gradient-to-r ${colors.gradient} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    All Projects
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? `bg-gradient-to-r ${colors.gradient} text-white`
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Portfolio Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredPortfolio.map((item, index) => (
                    <motion.div
                      key={item.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <span className="text-7xl opacity-30">🖼️</span>
                          </div>
                        )}

                        {/* Overlay */}
                        <motion.div
                          initial={false}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                          className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-90 flex items-center justify-center`}
                        >
                          <div className="text-center text-white p-6">
                            <EyeIcon className="w-12 h-12 mx-auto mb-4" />
                            <p className="font-medium">View Project</p>
                          </div>
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.technologies.slice(0, 3).map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                {tech}
                              </span>
                            ))}
                            {item.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                +{item.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm font-medium ${colors.accent} hover:opacity-80 transition-opacity`}
                          >
                            Visit Project
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </a>
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

      {/* Results Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Results That <span className="font-semibold">Speak</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our portfolio isn't just about aesthetics—it's about delivering measurable results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: '150+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Retention' },
                { value: '40%', label: 'Avg. Performance Boost' },
                { value: '5/5', label: 'Average Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-bold ${colors.accent} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 bg-gradient-to-br ${colors.gradient}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to See Your Project Here?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Let's create something amazing together. Join our portfolio of successful projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your Project
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/services/${serviceSlug}/faq`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
