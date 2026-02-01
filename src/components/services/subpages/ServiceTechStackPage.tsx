'use client';

import { motion } from 'framer-motion';
import { getTechIcon } from '@/components/icons/TechIcons';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface ServiceTechStackPageProps {
  serviceSlug: string;
  accentColor: string;
}

const colorMap: Record<string, { text: string; textDark: string; gradient: string; border: string; bgCard: string }> = {
  purple: { text: 'text-purple-400', textDark: 'text-purple-300', gradient: 'from-purple-600 to-purple-800', border: 'border-purple-500/30', bgCard: 'hover:bg-purple-900/30' },
  teal: { text: 'text-teal-400', textDark: 'text-teal-300', gradient: 'from-teal-600 to-teal-800', border: 'border-teal-500/30', bgCard: 'hover:bg-teal-900/30' },
  blue: { text: 'text-blue-400', textDark: 'text-blue-300', gradient: 'from-blue-600 to-blue-800', border: 'border-blue-500/30', bgCard: 'hover:bg-blue-900/30' },
  emerald: { text: 'text-emerald-400', textDark: 'text-emerald-300', gradient: 'from-emerald-600 to-emerald-800', border: 'border-emerald-500/30', bgCard: 'hover:bg-emerald-900/30' },
  orange: { text: 'text-orange-400', textDark: 'text-orange-300', gradient: 'from-orange-600 to-orange-800', border: 'border-orange-500/30', bgCard: 'hover:bg-orange-900/30' },
  rose: { text: 'text-rose-400', textDark: 'text-rose-300', gradient: 'from-rose-600 to-rose-800', border: 'border-rose-500/30', bgCard: 'hover:bg-rose-900/30' },
  cyan: { text: 'text-cyan-400', textDark: 'text-cyan-300', gradient: 'from-cyan-600 to-cyan-800', border: 'border-cyan-500/30', bgCard: 'hover:bg-cyan-900/30' },
  amber: { text: 'text-amber-400', textDark: 'text-amber-300', gradient: 'from-amber-600 to-amber-800', border: 'border-amber-500/30', bgCard: 'hover:bg-amber-900/30' },
  indigo: { text: 'text-indigo-400', textDark: 'text-indigo-300', gradient: 'from-indigo-600 to-indigo-800', border: 'border-indigo-500/30', bgCard: 'hover:bg-indigo-900/30' },
  violet: { text: 'text-violet-400', textDark: 'text-violet-300', gradient: 'from-violet-600 to-violet-800', border: 'border-violet-500/30', bgCard: 'hover:bg-violet-900/30' },
  red: { text: 'text-red-400', textDark: 'text-red-300', gradient: 'from-red-600 to-red-800', border: 'border-red-500/30', bgCard: 'hover:bg-red-900/30' },
  pink: { text: 'text-pink-400', textDark: 'text-pink-300', gradient: 'from-pink-600 to-pink-800', border: 'border-pink-500/30', bgCard: 'hover:bg-pink-900/30' },
};

export default function ServiceTechStackPage({
  serviceSlug,
  accentColor,
}: ServiceTechStackPageProps) {
  const { translations } = useTranslations();
  const data = translations?.serviceSubpages?.[serviceSlug];
  const techData = data?.techStack;
  const serviceName = data?.serviceName || serviceSlug;
  const headline = techData?.headline || '';
  const subtitle = techData?.subtitle || '';
  const description = techData?.description || '';
  const techStack = techData?.categories || [];

  const colors = colorMap[accentColor] || colorMap.purple;

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br ${colors.gradient} rounded-full opacity-10 blur-[120px] animate-pulse`} />
        <div className={`absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${colors.gradient} rounded-full opacity-10 blur-[120px] animate-pulse`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${colors.text} opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <span className={`${colors.text} font-medium tracking-wider uppercase text-sm mb-4 block`}>
            {subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {headline}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Tech categories */}
        <div className="max-w-6xl mx-auto space-y-16">
          {techStack.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${colors.border} to-transparent`} />
                <h2 className={`text-lg font-semibold ${colors.text} uppercase tracking-wider`}>
                  {category.category}
                </h2>
                <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${colors.border} to-transparent`} />
              </div>

              {/* Tech cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((tech, techIndex) => {
                  const Icon = getTechIcon(tech.name);
                  return (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className={`group relative p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 ${colors.bgCard} hover:border-gray-600 transition-all duration-300 cursor-default`}
                      style={{ perspective: '1000px' }}
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className={`w-12 h-12 text-gray-400 group-hover:${colors.textDark} transition-colors duration-300`}>
                          <Icon className="w-full h-full" />
                        </div>
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          {tech.name}
                        </span>
                        {/* Description on hover */}
                        <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
                          <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {tech.description}
                          </p>
                        </div>
                      </div>

                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20">
        <ServiceRequestCTA serviceType={serviceName} variant="compact" />
      </div>
    </main>
  );
}
