// src/components/SectionHeader.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  centered?: boolean;
  animated?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  eyebrow,
  className = '',
  centered = true,
  animated = true
}) => {
  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const content = (
    <>
      {/* Swiss-style Overline */}
      {eyebrow && (
        <motion.div
          variants={animated ? itemVariants : {}}
          className={`
            flex items-center gap-3 mb-6
            ${centered ? 'justify-center' : 'justify-start'}
          `}
        >
          <div className="w-8 h-0.5 bg-gray-900" />
          <span className="text-overline">
            {eyebrow}
          </span>
          <div className="w-8 h-0.5 bg-gray-900" />
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        variants={animated ? itemVariants : {}}
        className="text-headline text-gray-900 mb-6"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={animated ? itemVariants : {}}
          className={`
            text-body text-gray-600 leading-relaxed max-w-2xl
            ${centered ? 'mx-auto' : ''}
          `}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );

  if (animated) {
    return (
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`
          ${centered ? 'text-center' : 'text-left'} 
          ${className}
        `}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      {content}
    </div>
  );
};

export default SectionHeader;