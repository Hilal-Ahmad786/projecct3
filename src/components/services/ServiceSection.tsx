'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

interface ServiceSectionProps {
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'gradient' | 'dark';
  className?: string;
  id?: string;
}

const backgrounds = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
  dark: 'bg-gray-900 text-white',
};

export default function ServiceSection({
  children,
  background = 'white',
  className = '',
  id,
}: ServiceSectionProps) {
  const { dir } = useTranslations();

  return (
    <section id={id} className={`py-20 md:py-24 ${backgrounds[background]} ${className}`} dir={dir}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

// Section Header component for consistent styling
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function ServiceSectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  centered = false,
  dark = false,
  className = '',
}: SectionHeaderProps) {
  const { dir } = useTranslations();
  const isRTL = dir === 'rtl';

  return (
    <div className={`mb-12 ${centered ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}>
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex items-center gap-3 mb-4 ${
            centered ? 'justify-center' : isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <div className={`w-8 h-0.5 ${dark ? 'bg-white' : 'bg-gray-900'}`}></div>
          <span
            className={`text-xs font-medium uppercase tracking-wide ${
              dark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {eyebrow}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-3xl md:text-4xl font-light ${dark ? 'text-white' : 'text-gray-900'}`}
      >
        {title}{' '}
        {titleAccent && (
          <span className={`font-semibold ${dark ? 'text-emerald-400' : 'text-gray-900'}`}>
            {titleAccent}
          </span>
        )}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-4 text-lg ${dark ? 'text-gray-400' : 'text-gray-600'} ${
            centered ? '' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// Stats section for service pages
interface StatItem {
  value: string;
  label: string;
}

interface ServiceStatsProps {
  stats: StatItem[];
  dark?: boolean;
}

export function ServiceStats({ stats, dark = false }: ServiceStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div
            className={`text-4xl md:text-5xl font-bold mb-2 ${
              dark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {stat.value}
          </div>
          <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
