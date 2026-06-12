'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import SplitHeading from '@/components/SplitHeading';
import ScrollRevealText from '@/components/ScrollRevealText';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  centered?: boolean;
  animated?: boolean;
}

const eyebrowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  className = '',
  centered = true,
  animated = true,
}) => {
  const { dir } = useTranslations();
  const prefersReducedMotion = useReducedMotion();

  const alignClass = centered ? 'text-center' : dir === 'rtl' ? 'text-right' : 'text-left';

  if (!animated) {
    return (
      <div className={`${alignClass} ${className}`} dir={dir}>
        {eyebrow && (
          <div className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
            <div className="w-8 h-0.5 bg-heritage-turquoise" />
            <span className="text-overline text-heritage-turquoise">{eyebrow}</span>
            <div className="w-8 h-0.5 bg-heritage-turquoise" />
          </div>
        )}
        <h2 className="text-headline text-gray-900 mb-6">{title}</h2>
        {subtitle && (
          <p className={`text-body text-gray-600 leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? { opacity: 0 } : 'hidden'}
      whileInView={prefersReducedMotion ? { opacity: 1 } : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
      transition={prefersReducedMotion ? { duration: 0.4 } : undefined}
      className={`${alignClass} ${className}`}
      dir={dir}
    >
      {eyebrow && (
        <motion.div
          variants={prefersReducedMotion ? undefined : eyebrowVariants}
          className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : dir === 'rtl' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="w-8 h-0.5 bg-heritage-turquoise" />
          <span className="text-overline text-heritage-turquoise">{eyebrow}</span>
          <div className="w-8 h-0.5 bg-heritage-turquoise" />
        </motion.div>
      )}

      <SplitHeading
        tag="h2"
        text={title}
        className="text-headline text-gray-900 mb-6"
        delay={eyebrow ? 0.1 : 0}
      />

      {subtitle && (
        <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          <ScrollRevealText className="text-body text-gray-600 leading-relaxed">
            {subtitle}
          </ScrollRevealText>
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
