'use client';

// Modern Heritage: animated girih (Islamic geometric) pattern.
// An octagonal star tessellation that draws itself in when scrolled
// into view — the signature motion of the design system.

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GirihPatternProps {
  /** Number of motif columns */
  columns?: number;
  /** Number of motif rows */
  rows?: number;
  /** Stroke color; defaults to İznik turquoise */
  color?: string;
  /** Overall opacity of the pattern */
  opacity?: number;
  /** Size of one motif tile in px */
  tile?: number;
  /** Draw-in animation on scroll into view */
  animate?: boolean;
  className?: string;
}

// One girih motif: octagonal star with inner octagon and connecting rays
function motifPaths(s: number): string[] {
  const c = s / 2;
  const outer = 0.42 * s;
  const inner = 0.25 * s;
  const point = (r: number, i: number) => {
    const a = (Math.PI / 4) * i - Math.PI / 2;
    return `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  };
  const ring = (r: number) =>
    'M ' + Array.from({ length: 8 }, (_, i) => point(r, i)).join(' L ') + ' Z';
  const rays = Array.from(
    { length: 8 },
    (_, i) => `M ${point(outer, i)} L ${point(inner, i)}`
  ).join(' ');
  return [ring(outer), ring(inner), rays];
}

export default function GirihPattern({
  columns = 6,
  rows = 1,
  color = 'var(--heritage-turquoise)',
  opacity = 0.35,
  tile = 96,
  animate = true,
  className = '',
}: GirihPatternProps) {
  const prefersReduced = useReducedMotion();
  const paths = useMemo(() => motifPaths(tile), [tile]);
  const shouldAnimate = animate && !prefersReduced;

  return (
    <svg
      className={className}
      width={columns * tile}
      height={rows * tile}
      viewBox={`0 0 ${columns * tile} ${rows * tile}`}
      fill="none"
      style={{ opacity, maxWidth: '100%', height: 'auto' }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => (
          <g key={`${row}-${col}`} transform={`translate(${col * tile}, ${row * tile})`}>
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={color}
                strokeWidth={1.2}
                initial={shouldAnimate ? { pathLength: 0 } : false}
                whileInView={shouldAnimate ? { pathLength: 1 } : undefined}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 1.2,
                  delay: (col + row) * 0.12 + i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </g>
        ))
      )}
    </svg>
  );
}
