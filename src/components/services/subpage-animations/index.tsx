'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

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

export function SubPageHeroVisual({ type = 'code-editor', motionType = 'float', primaryColor, secondaryColor, className = '' }: HeroVisualProps) {
  const color1 = getColorClass(primaryColor);
  const color2 = getColorClass(secondaryColor || primaryColor);

  switch (type) {
    case 'code-editor':
      return <CodeEditorVisual color={color1} motionType={motionType} className={className} />;
    case 'terminal':
      return <TerminalVisual color={color1} motionType={motionType} className={className} />;
    case 'brain-network':
      return <BrainNetworkVisual color={color1} color2={color2} motionType={motionType} className={className} />;
    case 'mobile-device':
      return <MobileDeviceVisual color={color1} motionType={motionType} className={className} />;
    case 'dashboard':
      return <DashboardVisual color={color1} motionType={motionType} className={className} />;
    case 'globe':
      return <GlobeVisual color={color1} motionType={motionType} className={className} />;
    case 'chart-graph':
      return <ChartGraphVisual color={color1} motionType={motionType} className={className} />;
    case 'shield-lock':
      return <ShieldLockVisual color={color1} motionType={motionType} className={className} />;
    case 'cloud-stack':
      return <CloudStackVisual color={color1} motionType={motionType} className={className} />;
    case 'rocket-launch':
      return <RocketLaunchVisual color={color1} color2={color2} motionType={motionType} className={className} />;
    case 'gear-system':
      return <GearSystemVisual color={color1} motionType={motionType} className={className} />;
    case 'network-nodes':
      return <NetworkNodesVisual color={color1} motionType={motionType} className={className} />;
    case 'layers-stack':
      return <LayersStackVisual color={color1} color2={color2} motionType={motionType} className={className} />;
    case 'target-bullseye':
      return <TargetBullseyeVisual color={color1} motionType={motionType} className={className} />;
    case 'chat-bubbles':
      return <ChatBubblesVisual color={color1} color2={color2} motionType={motionType} className={className} />;
    case 'circuit-board':
      return <CircuitBoardVisual color={color1} motionType={motionType} className={className} />;
    case 'lightbulb':
      return <LightbulbVisual color={color1} motionType={motionType} className={className} />;
    case 'puzzle-pieces':
      return <PuzzlePiecesVisual color={color1} color2={color2} motionType={motionType} className={className} />;
    case 'data-flow':
      return <DataFlowVisual color={color1} motionType={motionType} className={className} />;
    case 'shopping-cart-3d':
      return <ShoppingCartVisual color={color1} motionType={motionType} className={className} />;
    case 'megaphone-3d':
      return <MegaphoneVisual color={color1} motionType={motionType} className={className} />;
    default:
      return <CodeEditorVisual color={color1} motionType={motionType} className={className} />;
  }
}

// Individual Visual Components
function CodeEditorVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-80 h-56 bg-gray-900 rounded-xl shadow-2xl overflow-hidden ${className}`}
    >
      {/* Window Chrome */}
      <div className="h-8 bg-gray-800 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-4 text-gray-500 text-xs">index.tsx</div>
      </div>
      {/* Code Lines */}
      <div className="p-4 font-mono text-sm space-y-2">
        <div className="flex gap-2">
          <span className="text-purple-400">const</span>
          <span className="text-blue-400">app</span>
          <span className="text-gray-500">=</span>
          <span className={color.text}>next</span>
          <span className="text-gray-500">();</span>
        </div>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex gap-2"
        >
          <span className="text-pink-400">export</span>
          <span className="text-purple-400">default</span>
          <span className="text-yellow-400">App</span>
        </motion.div>
        <div className="flex gap-2">
          <span className="text-gray-600">// Your code here</span>
        </div>
        <motion.div
          animate={{ width: ['0%', '60%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`h-4 ${color.bg} rounded opacity-30`}
        />
      </div>
    </motion.div>
  );
}

function TerminalVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-80 h-56 bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-800 ${className}`}
    >
      <div className="h-8 bg-gray-900 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-4 text-gray-500 text-xs">terminal</div>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="text-green-400 mb-2">$ npm run dev</div>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className={`${color.text}`}
        >
          &gt; Starting server...
        </motion.div>
        <div className="text-gray-500 mt-2">Ready on http://localhost:3000</div>
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-white mt-2"
        />
      </div>
    </motion.div>
  );
}

function BrainNetworkVisual({ color, color2, motionType, className }: { color: any; color2: any; motionType: MotionType; className: string }) {
  const nodes = [
    { x: 50, y: 30 }, { x: 80, y: 50 }, { x: 60, y: 70 },
    { x: 30, y: 60 }, { x: 20, y: 35 }, { x: 45, y: 50 },
    { x: 70, y: 30 }, { x: 35, y: 80 }, { x: 75, y: 75 },
  ];
  const connections = [
    [0, 1], [0, 4], [0, 5], [1, 2], [1, 6], [2, 3], [2, 8],
    [3, 4], [3, 7], [5, 6], [5, 3], [7, 8],
  ];

  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-72 h-72 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="4"
            className={i % 2 === 0 ? color.text : color2.text}
            fill="currentColor"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* Pulse Effect */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className={color.text}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

function MobileDeviceVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative ${className}`}
    >
      <div className="w-48 h-96 bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="h-8 bg-gray-100 flex items-center justify-center">
            <div className="w-24 h-5 bg-black rounded-full" />
          </div>
          {/* App Content */}
          <div className="p-4 space-y-3">
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`h-3 ${color.bg} rounded opacity-80`}
            />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-100 rounded-lg mt-4" />
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`h-16 ${color.bg} rounded-lg opacity-80`}
              />
              <div className="h-16 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`w-80 h-56 bg-white rounded-xl shadow-2xl p-4 ${className}`}
    >
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className={`h-12 ${i === 1 ? color.bg : 'bg-gray-100'} rounded-lg ${i === 1 ? 'opacity-80' : ''}`}
          />
        ))}
      </div>
      <div className="h-24 bg-gray-50 rounded-lg flex items-end p-2 gap-1">
        {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className={`flex-1 ${i === 3 ? color.bg : 'bg-gray-300'} rounded-t`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function GlobeVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-64 ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Globe Outline */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
          {/* Latitude Lines */}
          {[20, 35, 50, 65, 80].map((y, i) => (
            <ellipse key={i} cx="50" cy={y} rx="45" ry={10 - Math.abs(50 - y) / 5} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" />
          ))}
          {/* Longitude Lines */}
          {[0, 45, 90, 135].map((angle, i) => (
            <ellipse key={i} cx="50" cy="50" rx="5" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200" transform={`rotate(${angle} 50 50)`} />
          ))}
          {/* Points */}
          {[[30, 35], [70, 40], [50, 60], [40, 75]].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              className={color.text}
              fill="currentColor"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

function ChartGraphVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`w-72 h-56 bg-white rounded-xl shadow-2xl p-6 ${className}`}
    >
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {/* Grid */}
        {[0, 20, 40, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        {/* Line Chart */}
        <motion.path
          d="M 0 60 L 20 45 L 40 50 L 60 25 L 80 35 L 100 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={color.text}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        {/* Data Points */}
        {[[0, 60], [20, 45], [40, 50], [60, 25], [80, 35], [100, 10]].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            className={color.text}
            fill="currentColor"
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: i * 0.2 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function ShieldLockVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-48 h-56 ${className}`}
    >
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Shield */}
        <motion.path
          d="M 50 5 L 95 25 L 95 60 Q 95 100 50 115 Q 5 100 5 60 L 5 25 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={color.text}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Lock Body */}
        <rect x="35" y="55" width="30" height="25" rx="3" fill="currentColor" className="text-gray-700" />
        {/* Lock Shackle */}
        <path d="M 40 55 L 40 45 Q 40 35 50 35 Q 60 35 60 45 L 60 55" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-700" />
        {/* Keyhole */}
        <motion.circle
          cx="50"
          cy="65"
          r="4"
          className={color.text}
          fill="currentColor"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

function CloudStackVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-72 h-56 ${className}`}
    >
      {/* Cloud 1 */}
      <motion.svg
        viewBox="0 0 100 60"
        className="absolute top-0 left-0 w-48 h-28"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <path d="M 25 50 Q 5 50 5 35 Q 5 20 25 20 Q 30 5 50 5 Q 75 5 80 25 Q 95 25 95 40 Q 95 50 75 50 Z" fill="currentColor" className={`${color.text} opacity-30`} />
      </motion.svg>
      {/* Cloud 2 */}
      <motion.svg
        viewBox="0 0 100 60"
        className="absolute top-12 right-0 w-40 h-24"
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <path d="M 25 50 Q 5 50 5 35 Q 5 20 25 20 Q 30 5 50 5 Q 75 5 80 25 Q 95 25 95 40 Q 95 50 75 50 Z" fill="currentColor" className={`${color.text} opacity-20`} />
      </motion.svg>
      {/* Server Stack */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 space-y-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="w-32 h-8 bg-gray-800 rounded-sm flex items-center px-2 gap-1"
          >
            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-400' : 'bg-gray-600'}`} />
            <div className="flex-1 h-1 bg-gray-700 rounded" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RocketLaunchVisual({ color, color2, motionType, className }: { color: any; color2: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative w-48 h-64 ${className}`}
    >
      <svg viewBox="0 0 100 150" className="w-full h-full">
        {/* Flame */}
        <motion.ellipse
          cx="50"
          cy="130"
          rx="15"
          ry="20"
          className={color2.text}
          fill="currentColor"
          animate={{ ry: [15, 25, 15], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        {/* Rocket Body */}
        <path d="M 35 100 L 35 60 Q 35 20 50 10 Q 65 20 65 60 L 65 100 Z" fill="currentColor" className={color.text} />
        {/* Fins */}
        <path d="M 35 90 L 20 110 L 35 100 Z" fill="currentColor" className="text-gray-700" />
        <path d="M 65 90 L 80 110 L 65 100 Z" fill="currentColor" className="text-gray-700" />
        {/* Window */}
        <circle cx="50" cy="55" r="10" fill="white" />
        <circle cx="50" cy="55" r="7" fill="currentColor" className="text-sky-200" />
      </svg>
    </motion.div>
  );
}

function GearSystemVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-64 ${className}`}
    >
      {/* Large Gear */}
      <motion.svg
        viewBox="0 0 100 100"
        className={`absolute top-0 left-0 w-40 h-40 ${color.text}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M50 10 L55 20 L65 15 L62 28 L75 30 L68 42 L80 50 L68 58 L75 70 L62 72 L65 85 L55 80 L50 90 L45 80 L35 85 L38 72 L25 70 L32 58 L20 50 L32 42 L25 30 L38 28 L35 15 L45 20 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="15" fill="white" />
      </motion.svg>
      {/* Small Gear */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute bottom-0 right-0 w-28 h-28 text-gray-700"
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M50 15 L55 25 L65 22 L62 35 L75 40 L65 50 L75 60 L62 65 L65 78 L55 75 L50 85 L45 75 L35 78 L38 65 L25 60 L35 50 L25 40 L38 35 L35 22 L45 25 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="12" fill="white" />
      </motion.svg>
    </motion.div>
  );
}

function NetworkNodesVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  const nodes = [
    { x: 50, y: 50, main: true },
    { x: 20, y: 30 }, { x: 80, y: 30 },
    { x: 20, y: 70 }, { x: 80, y: 70 },
    { x: 50, y: 15 }, { x: 50, y: 85 },
  ];

  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-64 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {nodes.slice(1).map((node, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-300"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.main ? 12 : 6}
            className={node.main ? color.text : 'text-gray-400'}
            fill="currentColor"
            animate={node.main ? { scale: [1, 1.1, 1] } : { scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function LayersStackVisual({ color, color2, motionType, className }: { color: any; color2: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-48 ${className}`}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          className={`absolute left-1/2 -translate-x-1/2 w-48 h-10 rounded-lg ${
            i === 0 ? color.bg : i === 1 ? color2.bg + ' opacity-70' : 'bg-gray-300'
          }`}
          style={{ bottom: `${i * 28}px`, zIndex: 4 - i }}
        />
      ))}
    </motion.div>
  );
}

function TargetBullseyeVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-56 h-56 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[40, 30, 20, 10].map((r, i) => (
          <motion.circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill={i === 3 ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={i % 2 === 0 ? color.text : 'text-gray-300'}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* Arrow */}
        <motion.g
          animate={{ x: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <line x1="10" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="2" className="text-gray-700" />
          <polygon points="48,50 40,46 40,54" fill="currentColor" className="text-gray-700" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

function ChatBubblesVisual({ color, color2, motionType, className }: { color: any; color2: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-48 ${className}`}
    >
      {/* Bubble 1 */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute top-0 left-0 w-40 h-20 ${color.bg} rounded-2xl rounded-bl-none p-4`}
      >
        <div className="h-2 bg-white/30 rounded w-3/4 mb-2" />
        <div className="h-2 bg-white/30 rounded w-1/2" />
      </motion.div>
      {/* Bubble 2 */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className={`absolute bottom-0 right-0 w-36 h-16 ${color2.bg} rounded-2xl rounded-br-none p-4`}
      >
        <div className="h-2 bg-white/30 rounded w-full" />
      </motion.div>
      {/* Typing Indicator */}
      <div className="absolute bottom-8 left-12 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

function CircuitBoardVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-64 h-64 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Traces */}
        {[
          'M10 50 H40', 'M60 50 H90', 'M50 10 V40', 'M50 60 V90',
          'M20 20 L40 40', 'M80 20 L60 40', 'M20 80 L40 60', 'M80 80 L60 60',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        {/* Nodes */}
        {[[50, 50], [10, 50], [90, 50], [50, 10], [50, 90], [20, 20], [80, 20], [20, 80], [80, 80]].map(([x, y], i) => (
          <motion.rect
            key={i}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            className={i === 0 ? color.text : 'text-gray-400'}
            fill="currentColor"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function LightbulbVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-40 h-56 ${className}`}
    >
      <svg viewBox="0 0 100 140" className="w-full h-full">
        {/* Glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="currentColor"
          className={`${color.text} opacity-20`}
          animate={{ r: [40, 50, 40], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Bulb */}
        <ellipse cx="50" cy="45" rx="30" ry="35" fill="currentColor" className={color.text} />
        {/* Base */}
        <rect x="35" y="80" width="30" height="8" fill="currentColor" className="text-gray-600" />
        <rect x="38" y="90" width="24" height="6" fill="currentColor" className="text-gray-500" />
        <rect x="40" y="98" width="20" height="5" fill="currentColor" className="text-gray-400" />
        {/* Filament */}
        <motion.path
          d="M 40 55 Q 50 40 60 55"
          fill="none"
          stroke="white"
          strokeWidth="2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

function PuzzlePiecesVisual({ color, color2, motionType, className }: { color: any; color2: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-56 h-56 ${className}`}
    >
      {/* Piece 1 */}
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className={`absolute top-0 left-0 w-24 h-24 ${color.bg} rounded-lg`}
        style={{ clipPath: 'polygon(0 0, 70% 0, 70% 30%, 100% 30%, 100% 100%, 30% 100%, 30% 70%, 0 70%)' }}
      />
      {/* Piece 2 */}
      <motion.div
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className={`absolute top-0 right-0 w-24 h-24 ${color2.bg} rounded-lg`}
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 70%, 70% 70%, 70% 100%, 0 100%, 0 30%, 30% 30%)' }}
      />
      {/* Piece 3 */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-24 h-24 bg-gray-300 rounded-lg"
        style={{ clipPath: 'polygon(0 0, 70% 0, 70% 30%, 100% 30%, 100% 100%, 0 100%)' }}
      />
      {/* Piece 4 */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-0 right-0 w-24 h-24 bg-gray-400 rounded-lg"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%, 30% 30%)' }}
      />
    </motion.div>
  );
}

function DataFlowVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-72 h-48 ${className}`}
    >
      {/* Data Blocks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 200, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
          className={`absolute left-0 w-12 h-8 ${i === 0 ? color.bg : 'bg-gray-400'} rounded`}
          style={{ top: `${20 + i * 50}px` }}
        />
      ))}
      {/* Flow Lines */}
      <div className="absolute inset-0 flex flex-col justify-around py-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-px bg-gray-200 relative">
            <motion.div
              animate={{ x: [0, 250] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className={`absolute top-0 left-0 w-8 h-px ${color.bg}`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ShoppingCartVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-48 h-48 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Cart Body */}
        <path d="M20 25 L30 25 L45 70 L85 70 L95 35 L35 35" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-700" />
        {/* Wheels */}
        <circle cx="50" cy="85" r="8" fill="currentColor" className="text-gray-600" />
        <circle cx="78" cy="85" r="8" fill="currentColor" className="text-gray-600" />
        {/* Items */}
        <motion.rect
          x="45"
          y="42"
          width="15"
          height="20"
          rx="2"
          className={color.text}
          fill="currentColor"
          animate={{ y: [42, 38, 42] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.rect
          x="65"
          y="45"
          width="12"
          height="17"
          rx="2"
          fill="currentColor"
          className="text-gray-400"
          animate={{ y: [45, 41, 45] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}

function MegaphoneVisual({ color, motionType, className }: { color: any; motionType: MotionType; className: string }) {
  return (
    <motion.div
      animate={getMotionAnimation(motionType)}
      transition={getMotionTransition(motionType)}
      className={`relative w-56 h-48 ${className}`}
    >
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Megaphone */}
        <path d="M20 35 L20 65 L40 70 L40 30 L20 35 Z" fill="currentColor" className={color.text} />
        <path d="M40 25 L100 10 L100 90 L40 75 Z" fill="currentColor" className={color.text} />
        {/* Sound Waves */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M105 ${40 + i * 10} Q${115 + i * 8} 50 105 ${60 - i * 10}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
            animate={{ opacity: [0, 1, 0], x: [0, 10, 20] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// Helper functions
function getMotionAnimation(type: MotionType) {
  switch (type) {
    case 'float': return { y: [0, -15, 0] };
    case 'pulse': return { scale: [1, 1.05, 1] };
    case 'orbit': return { rotate: 360 };
    case 'wave': return { y: [0, -10, 0, 10, 0] };
    case 'morph': return { borderRadius: ['10%', '30%', '10%'] };
    case 'cascade': return { y: [0, -8, 0], opacity: [0.8, 1, 0.8] };
    case 'spin-slow': return { rotate: [0, 360] };
    default: return { y: [0, -15, 0] };
  }
}

function getMotionTransition(type: MotionType) {
  switch (type) {
    case 'float': return { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };
    case 'pulse': return { duration: 3, repeat: Infinity, ease: 'easeInOut' as const };
    case 'orbit': return { duration: 20, repeat: Infinity, ease: 'linear' as const };
    case 'wave': return { duration: 5, repeat: Infinity, ease: 'easeInOut' as const };
    case 'morph': return { duration: 6, repeat: Infinity, ease: 'easeInOut' as const };
    case 'cascade': return { duration: 3, repeat: Infinity, ease: 'easeInOut' as const };
    case 'spin-slow': return { duration: 30, repeat: Infinity, ease: 'linear' as const };
    default: return { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT - Sub Page Hero with all animations
// ═══════════════════════════════════════════════════════════════════════════════

interface SubPageHeroProps {
  animation?: SubPageAnimation;
  pageType: 'features' | 'process' | 'tech-stack' | 'portfolio' | 'faq';
  serviceName: string;
  children?: ReactNode;
}

export function SubPageHero({ animation, pageType, serviceName, children }: SubPageHeroProps) {
  // Default animations per page type if no service animation provided
  const defaultAnimations: Record<string, SubPageAnimation> = {
    features: { heroVisual: 'layers-stack', bgPattern: 'grid', decorations: 'squares', motion: 'cascade', primaryColor: '#10B981' },
    process: { heroVisual: 'workflow-diagram', bgPattern: 'diagonal-lines', decorations: 'circles', motion: 'float', primaryColor: '#3B82F6' },
    'tech-stack': { heroVisual: 'circuit-board', bgPattern: 'hexagons', decorations: 'hexagons', motion: 'pulse', primaryColor: '#8B5CF6' },
    portfolio: { heroVisual: 'target-bullseye', bgPattern: 'dots', decorations: 'mixed', motion: 'wave', primaryColor: '#F59E0B' },
    faq: { heroVisual: 'chat-bubbles', bgPattern: 'circles', decorations: 'dots', motion: 'float', primaryColor: '#EC4899' },
  };

  const config = animation || defaultAnimations[pageType];

  return (
    <section className="relative min-h-[70vh] pt-32 pb-24 overflow-hidden bg-white">
      {/* Background Pattern */}
      <SubPageBgPattern pattern={config.bgPattern} opacity={0.05} />

      {/* Floating Decorations */}
      <FloatingDecorations type={config.decorations} accentColor={config.primaryColor} />

      {/* Hero Visual - Positioned absolutely on the right */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden xl:block opacity-80">
        <SubPageHeroVisual
          type={config.heroVisual}
          motionType={config.motion}
          primaryColor={config.primaryColor}
          secondaryColor={config.secondaryColor}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
}
