'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { HeroVisual, type HeroVisualType as MainHeroVisualType } from '@/components/services/hero-visuals';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type HeroVisualType =
  | 'code-editor' | 'terminal' | 'mobile-device' | 'dashboard' | 'globe'
  | 'brain-network' | 'chart-graph' | 'palette-canvas' | 'shield-lock' | 'cloud-stack'
  | 'workflow-diagram' | 'data-flow' | 'shopping-cart-3d' | 'megaphone-3d' | 'rocket-launch'
  | 'puzzle-pieces' | 'circuit-board' | 'satellite' | 'microscope' | 'lightbulb'
  | 'gear-system' | 'network-nodes' | 'layers-stack' | 'target-bullseye' | 'chat-bubbles';

export type BgPattern = 'grid' | 'dots' | 'waves' | 'diagonal-lines' | 'hexagons' | 'circles' | 'none';
export type DecorationType = 'circles' | 'squares' | 'triangles' | 'hexagons' | 'dots' | 'lines' | 'mixed';
export type MotionType = 'float' | 'pulse' | 'orbit' | 'wave' | 'morph' | 'type' | 'cascade' | 'spin-slow';

export interface SubPageAnimation {
  heroVisual?: HeroVisualType;
  bgPattern?: BgPattern;
  decorations?: DecorationType;
  motion?: MotionType;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  particleCount?: number;
  glowIntensity?: 'none' | 'subtle' | 'medium' | 'strong';
}

// Color mapping
const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  '#3B82F6': { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', glow: 'shadow-blue-500/30' },
  '#10B981': { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500', glow: 'shadow-emerald-500/30' },
  '#8B5CF6': { bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500', glow: 'shadow-violet-500/30' },
  '#EC4899': { bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-500', glow: 'shadow-pink-500/30' },
  '#F59E0B': { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500', glow: 'shadow-amber-500/30' },
  '#06B6D4': { bg: 'bg-cyan-500', text: 'text-cyan-500', border: 'border-cyan-500', glow: 'shadow-cyan-500/30' },
  '#EF4444': { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', glow: 'shadow-red-500/30' },
};

function getColorClass(hex?: string) {
  return colorClasses[hex || '#10B981'] || colorClasses['#10B981'];
}

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND PATTERNS - More prominent versions
// ═══════════════════════════════════════════════════════════════════════════════

export function SubPageBgPattern({ pattern, opacity = 0.06 }: { pattern?: BgPattern; opacity?: number }) {
  switch (pattern) {
    case 'grid':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      );
    case 'dots':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#1a1a1a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-pattern)" />
          </svg>
        </div>
      );
    case 'waves':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <pattern id="waves-pattern" width="200" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 Q50 0 100 20 Q150 40 200 20" fill="none" stroke="#1a1a1a" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-pattern)" />
          </svg>
        </div>
      );
    case 'diagonal-lines':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="diag-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M-5,5 l10,-10 M0,30 l30,-30 M25,35 l10,-10" stroke="#1a1a1a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag-pattern)" />
          </svg>
        </div>
      );
    case 'hexagons':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hex-pattern" width="80" height="92" patternUnits="userSpaceOnUse">
                <polygon points="40,0 80,23 80,69 40,92 0,69 0,23" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-pattern)" />
          </svg>
        </div>
      );
    case 'circles':
      return (
        <div className="absolute inset-0" style={{ opacity }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="circles-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="15" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#1a1a1a" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles-pattern)" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING DECORATIONS - Service-specific
// ═══════════════════════════════════════════════════════════════════════════════

interface FloatingDecorationProps {
  type?: DecorationType;
  accentColor?: string;
}

export function FloatingDecorations({ type = 'mixed', accentColor }: FloatingDecorationProps) {
  const color = getColorClass(accentColor);

  switch (type) {
    case 'circles':
      return (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-32 right-[15%] w-32 h-32 rounded-full border-2 ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className={`absolute bottom-40 left-[10%] w-24 h-24 rounded-full border ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-1/2 right-[8%] w-4 h-4 rounded-full ${color.bg} hidden lg:block`}
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute top-1/3 left-[5%] w-3 h-3 rounded-full ${color.bg} opacity-60 hidden lg:block`}
          />
        </>
      );
    case 'squares':
      return (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className={`absolute top-40 right-[12%] w-24 h-24 border-2 ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className={`absolute bottom-32 left-[8%] w-16 h-16 border ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-1/3 right-[5%] w-4 h-4 ${color.bg} hidden lg:block`}
          />
        </>
      );
    case 'triangles':
      return (
        <>
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-40 right-[15%] w-32 h-32 hidden lg:block"
            viewBox="0 0 100 100"
          >
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" className={color.text} />
          </motion.svg>
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-40 left-[10%] w-20 h-20 hidden lg:block"
            viewBox="0 0 100 100"
          >
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" className={color.text} />
          </motion.svg>
        </>
      );
    case 'hexagons':
      return (
        <>
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute top-32 right-[12%] w-40 h-40 hidden lg:block"
            viewBox="0 0 200 200"
          >
            <polygon points="100,10 190,50 190,150 100,190 10,150 10,50" fill="none" stroke="currentColor" strokeWidth="1.5" className={color.text} />
          </motion.svg>
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-40 left-[8%] w-28 h-28 hidden lg:block"
            viewBox="0 0 200 200"
          >
            <polygon points="100,10 190,50 190,150 100,190 10,150 10,50" fill="none" stroke="currentColor" strokeWidth="1" className={color.text} />
          </motion.svg>
        </>
      );
    case 'dots':
      return (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              className={`absolute w-2 h-2 rounded-full ${color.bg} hidden lg:block`}
              style={{
                top: `${20 + (i * 10) % 60}%`,
                [i % 2 === 0 ? 'left' : 'right']: `${5 + (i * 3) % 15}%`,
              }}
            />
          ))}
        </>
      );
    case 'lines':
      return (
        <>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '150px' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`absolute top-40 right-[10%] h-px ${color.bg} hidden lg:block`}
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '120px' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            className={`absolute top-1/3 left-[8%] w-px ${color.bg} hidden lg:block`}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
            className={`absolute bottom-40 right-[20%] h-px ${color.bg} opacity-60 hidden lg:block`}
          />
        </>
      );
    default: // mixed
      return (
        <>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className={`absolute top-40 right-[12%] w-28 h-28 border ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute bottom-32 left-[10%] w-20 h-20 rounded-full border ${color.border} hidden lg:block`}
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-1/2 right-[5%] w-3 h-3 ${color.bg} hidden lg:block`}
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute top-1/3 left-[5%] w-2 h-2 ${color.bg} rounded-full hidden lg:block`}
          />
        </>
      );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROMINENT HERO VISUALS - 25 Types
// ═══════════════════════════════════════════════════════════════════════════════

interface HeroVisualProps {
  type?: HeroVisualType;
  motionType?: MotionType;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

// Delegates to the Modern Heritage scene registry so subpages share the
// same advanced animated scenes as the main service pages.
export function SubPageHeroVisual({ type = 'code-editor', className = '' }: HeroVisualProps) {
  return (
    <div className={`scale-90 origin-center ${className}`}>
      <HeroVisual type={type as MainHeroVisualType} />
    </div>
  );
}
