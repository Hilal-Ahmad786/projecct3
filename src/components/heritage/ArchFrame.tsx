'use client';

// Modern Heritage: pointed-arch frame (Mughal/Ottoman silhouette) for
// images and visual content — the shape language replacement for plain
// rounded rectangles.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ArchFrameProps {
  children: React.ReactNode;
  /** Border color around the arch; defaults to saffron */
  borderColor?: string;
  /** Show the offset echo outline behind the arch */
  echo?: boolean;
  /** Rise/fade in when scrolled into view */
  animate?: boolean;
  className?: string;
}

const ARCH_CLIP =
  'polygon(0% 100%, 0% 28%, 2% 21%, 6% 14%, 12% 8%, 20% 4%, 30% 1.5%, 40% 0.3%, 50% 0%, 60% 0.3%, 70% 1.5%, 80% 4%, 88% 8%, 94% 14%, 98% 21%, 100% 28%, 100% 100%)';

export default function ArchFrame({
  children,
  borderColor = 'var(--heritage-saffron)',
  echo = true,
  animate = true,
  className = '',
}: ArchFrameProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {echo && (
        <div
          className="absolute inset-0 translate-x-3 translate-y-3"
          style={{ clipPath: ARCH_CLIP, border: `1.5px solid ${borderColor}`, opacity: 0.5 }}
          aria-hidden="true"
        />
      )}
      <div className="relative overflow-hidden" style={{ clipPath: ARCH_CLIP }}>
        {children}
      </div>
    </motion.div>
  );
}
