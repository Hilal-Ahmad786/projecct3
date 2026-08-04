'use client';

import { motion } from 'framer-motion';
import { getTechIcon } from '@/components/icons/TechIcons';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface ServiceTechStackPageProps {
  serviceSlug: string;
  accentColor: string;
}

import { richColorMap as colorMap } from '@/lib/heritage-accents';

export default function ServiceTechStackPage({
  serviceSlug,
  accentColor,
}: ServiceTechStackPageProps) {
  const { translations, dir } = useTranslations();
  const data = translations?.serviceSubpages?.[serviceSlug];
  const techData = data?.techStack;
  const serviceName = data?.serviceName || serviceSlug;
  const headline = techData?.headline || '';
  const subtitle = techData?.subtitle || '';
  const description = techData?.description || '';
  const techStack = techData?.categories || [];

  const colors = colorMap[accentColor] || colorMap.purple;

  return (
    <main className="min-h-screen pt-[calc(var(--navbar-h,64px)+2.5rem)] pb-20 bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Soft accent background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 blur-3xl`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header — no initial opacity:0, this is above the fold */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-3 mb-4">
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
            <span className={`${colors.text} font-semibold tracking-widest uppercase text-xs`}>
              {subtitle}
            </span>
            <span className={`w-8 h-px ${colors.bg} opacity-40`} />
          </span>
          <h1 className="text-display font-light text-gray-900 leading-none mb-6">
            {headline}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Tech categories */}
        <div className="max-w-6xl mx-auto space-y-14">
          {techStack.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: Math.min(catIndex, 3) * 0.08 }}
            >
              {/* Category header — eyebrow pattern */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-8 h-px ${colors.bg} opacity-50`} />
                <h2 className={`text-sm font-semibold ${colors.text} uppercase tracking-widest`}>
                  {category.category}
                </h2>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Tech chips grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {category.items.map((tech, techIndex) => {
                  const Icon = getTechIcon(tech.name);
                  return (
                    <div
                      key={techIndex}
                      title={tech.description}
                      className={`group flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-gray-100 ${colors.hoverBorder} hover:shadow-md transition-all duration-300 cursor-default`}
                    >
                      <div className={`w-8 h-8 shrink-0 ${colors.text} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}>
                        <Icon className="w-full h-full" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 container mx-auto px-4">
        <ServiceRequestCTA serviceType={serviceName} variant="compact" />
      </div>
    </main>
  );
}
