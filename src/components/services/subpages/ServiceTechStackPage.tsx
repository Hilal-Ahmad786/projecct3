'use client';

import { motion } from 'framer-motion';
import { getTechIcon } from '@/components/icons/TechIcons';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface ServiceTechStackPageProps {
  serviceSlug: string;
  accentColor: string;
}

import { darkColorMap as colorMap } from '@/lib/heritage-accents';

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
    <main className="min-h-screen pt-[calc(var(--navbar-h,64px)+2.5rem)] pb-20 bg-gray-900 text-white relative overflow-hidden">
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
          <h1 className="text-display font-light leading-none mb-6">
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
