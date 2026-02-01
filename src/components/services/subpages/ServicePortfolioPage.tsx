'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface ServicePortfolioPageProps {
  serviceSlug: string;
  accentColor: string;
}

const colorMap: Record<string, { bg: string; bgLight: string; text: string; gradient: string; gradientOverlay: string; hoverBorder: string }> = {
  purple: { bg: 'bg-purple-600', bgLight: 'bg-purple-50', text: 'text-purple-600', gradient: 'from-purple-600 to-purple-800', gradientOverlay: 'from-purple-600/90 to-purple-900/90', hoverBorder: 'hover:border-purple-300' },
  teal: { bg: 'bg-teal-600', bgLight: 'bg-teal-50', text: 'text-teal-600', gradient: 'from-teal-600 to-teal-800', gradientOverlay: 'from-teal-600/90 to-teal-900/90', hoverBorder: 'hover:border-teal-300' },
  blue: { bg: 'bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-600', gradient: 'from-blue-600 to-blue-800', gradientOverlay: 'from-blue-600/90 to-blue-900/90', hoverBorder: 'hover:border-blue-300' },
  emerald: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-50', text: 'text-emerald-600', gradient: 'from-emerald-600 to-emerald-800', gradientOverlay: 'from-emerald-600/90 to-emerald-900/90', hoverBorder: 'hover:border-emerald-300' },
  orange: { bg: 'bg-orange-600', bgLight: 'bg-orange-50', text: 'text-orange-600', gradient: 'from-orange-600 to-orange-800', gradientOverlay: 'from-orange-600/90 to-orange-900/90', hoverBorder: 'hover:border-orange-300' },
  rose: { bg: 'bg-rose-600', bgLight: 'bg-rose-50', text: 'text-rose-600', gradient: 'from-rose-600 to-rose-800', gradientOverlay: 'from-rose-600/90 to-rose-900/90', hoverBorder: 'hover:border-rose-300' },
  cyan: { bg: 'bg-cyan-600', bgLight: 'bg-cyan-50', text: 'text-cyan-600', gradient: 'from-cyan-600 to-cyan-800', gradientOverlay: 'from-cyan-600/90 to-cyan-900/90', hoverBorder: 'hover:border-cyan-300' },
  amber: { bg: 'bg-amber-600', bgLight: 'bg-amber-50', text: 'text-amber-600', gradient: 'from-amber-600 to-amber-800', gradientOverlay: 'from-amber-600/90 to-amber-900/90', hoverBorder: 'hover:border-amber-300' },
  indigo: { bg: 'bg-indigo-600', bgLight: 'bg-indigo-50', text: 'text-indigo-600', gradient: 'from-indigo-600 to-indigo-800', gradientOverlay: 'from-indigo-600/90 to-indigo-900/90', hoverBorder: 'hover:border-indigo-300' },
  violet: { bg: 'bg-violet-600', bgLight: 'bg-violet-50', text: 'text-violet-600', gradient: 'from-violet-600 to-violet-800', gradientOverlay: 'from-violet-600/90 to-violet-900/90', hoverBorder: 'hover:border-violet-300' },
  red: { bg: 'bg-red-600', bgLight: 'bg-red-50', text: 'text-red-600', gradient: 'from-red-600 to-red-800', gradientOverlay: 'from-red-600/90 to-red-900/90', hoverBorder: 'hover:border-red-300' },
  pink: { bg: 'bg-pink-600', bgLight: 'bg-pink-50', text: 'text-pink-600', gradient: 'from-pink-600 to-pink-800', gradientOverlay: 'from-pink-600/90 to-pink-900/90', hoverBorder: 'hover:border-pink-300' },
};

export default function ServicePortfolioPage({
  serviceSlug,
  accentColor,
}: ServicePortfolioPageProps) {
  const { translations, t } = useTranslations();
  const data = translations?.serviceSubpages?.[serviceSlug];
  const portfolioData = data?.portfolio;
  const serviceName = data?.serviceName || serviceSlug;
  const headline = portfolioData?.headline || '';
  const subtitle = portfolioData?.subtitle || '';
  const description = portfolioData?.description || '';
  const portfolio = portfolioData?.items || [];
  const aggregateStats = portfolioData?.aggregateStats || [];

  const colors = colorMap[accentColor] || colorMap.purple;
  const allLabel = t('serviceSubpages.common.all');
  const industries = [allLabel, ...Array.from(new Set(portfolio.map((p: any) => p.industry)))];
  const [activeFilter, setActiveFilter] = useState(allLabel);

  const filtered = activeFilter === allLabel ? portfolio : portfolio.filter((p: any) => p.industry === activeFilter);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 blur-3xl`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className={`${colors.text} font-medium tracking-wider uppercase text-sm mb-4 block`}>
            {subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {headline}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Filter tabs */}
        {industries.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === industry
                    ? `${colors.bg} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </motion.div>
        )}

        {/* Portfolio grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative bg-white rounded-2xl border border-gray-100 ${colors.hoverBorder} overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                >
                  {/* Gradient header */}
                  <div className={`relative h-48 bg-gradient-to-br ${colors.gradient} p-8 flex flex-col justify-end`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
                        {project.industry}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>

                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradientOverlay} opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center`}>
                      <span className="text-white border-2 border-white px-6 py-2.5 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors">
                        {t('serviceSubpages.common.viewDetails')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('serviceSubpages.common.challenge')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{project.challenge}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('serviceSubpages.common.solution')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{project.solution}</p>
                    </div>

                    {/* Key results */}
                    {project.results.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('serviceSubpages.common.keyResults')}</h4>
                        <ul className="space-y-2">
                          {project.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <svg className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stats */}
                    {project.stats.length > 0 && (
                      <div className={`grid grid-cols-${Math.min(project.stats.length, 3)} gap-4 pt-6 border-t border-gray-100`}>
                        {project.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className={`text-xl font-bold ${colors.text}`}>{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Aggregate stats */}
        {aggregateStats && aggregateStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-8 md:p-12`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {aggregateStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-20">
        <ServiceRequestCTA serviceType={serviceName} />
      </div>
    </main>
  );
}
