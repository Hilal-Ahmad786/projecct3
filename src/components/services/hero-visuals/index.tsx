'use client';

import { motion } from 'framer-motion';

// ── Animation Types ──────────────────────────────────────────────────
export type HeroVisualType =
  | 'code-editor' | 'terminal' | 'mobile-device' | 'dashboard' | 'globe'
  | 'brain-network' | 'chart-graph' | 'palette-canvas' | 'shield-lock' | 'cloud-stack'
  | 'workflow-diagram' | 'data-flow' | 'shopping-cart-3d' | 'megaphone-3d' | 'rocket-launch'
  | 'puzzle-pieces' | 'circuit-board' | 'satellite' | 'microscope' | 'lightbulb'
  | 'gear-system' | 'network-nodes' | 'layers-stack' | 'target-bullseye' | 'chat-bubbles';

export type BgPattern = 'grid' | 'dots' | 'waves' | 'diagonal-lines' | 'hexagons' | 'circles' | 'none';
export type DecorationType = 'circles' | 'squares' | 'triangles' | 'hexagons' | 'dots' | 'lines' | 'mixed';
export type MotionType = 'float' | 'pulse' | 'orbit' | 'wave' | 'morph' | 'type' | 'cascade' | 'spin-slow';
export type FeatureStyle = 'icon-top' | 'icon-left' | 'numbered' | 'bordered' | 'gradient-border' | 'minimal';
export type ProcessLayout = 'timeline' | 'cards' | 'steps-horizontal' | 'zigzag';

export interface ServiceAnimation {
  heroVisual: HeroVisualType;
  bgPattern: BgPattern;
  decorations: DecorationType;
  motion: MotionType;
  featureStyle: FeatureStyle;
  processLayout: ProcessLayout;
  // Enhanced options
  particleCount?: number;
  glowIntensity?: 'none' | 'subtle' | 'medium' | 'strong';
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'gradient';
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

// ── Motion Presets ───────────────────────────────────────────────────
export function getMotionProps(motionType: MotionType) {
  switch (motionType) {
    case 'float':
      return { animate: { y: [0, -12, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'pulse':
      return { animate: { scale: [1, 1.05, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'orbit':
      return { animate: { rotate: 360 }, transition: { duration: 20, repeat: Infinity, ease: 'linear' as const } };
    case 'wave':
      return { animate: { y: [0, -8, 0, 8, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'morph':
      return { animate: { borderRadius: ['20%', '40%', '20%'] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'type':
      return { animate: { opacity: [0, 1, 1, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'cascade':
      return { animate: { y: [0, -6, 0], opacity: [0.8, 1, 0.8] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } };
    case 'spin-slow':
      return { animate: { rotate: [0, 360] }, transition: { duration: 30, repeat: Infinity, ease: 'linear' as const } };
    default:
      return { animate: { y: [0, -12, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const } };
  }
}

// ── Particle System ──────────────────────────────────────────────────
function ParticleField({ count = 20, color = 'blue' }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 3,
  }));

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-400',
    emerald: 'bg-emerald-400',
    violet: 'bg-violet-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${colorMap[color] || 'bg-blue-400'} opacity-20`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Glow Effect ──────────────────────────────────────────────────────
function GlowEffect({ intensity = 'medium', color = 'blue' }: { intensity?: 'subtle' | 'medium' | 'strong'; color?: string }) {
  const sizes = { subtle: 'w-32 h-32', medium: 'w-48 h-48', strong: 'w-64 h-64' };
  const opacities = { subtle: 'opacity-10', medium: 'opacity-20', strong: 'opacity-30' };
  const colors: Record<string, string> = {
    blue: 'from-blue-400 to-cyan-400',
    emerald: 'from-emerald-400 to-teal-400',
    violet: 'from-violet-400 to-purple-400',
    amber: 'from-amber-400 to-orange-400',
    rose: 'from-rose-400 to-pink-400',
  };

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizes[intensity]} rounded-full bg-gradient-radial ${colors[color] || colors.blue} ${opacities[intensity]} blur-3xl`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Background Patterns ─────────────────────────────────────────────
export function BgPatternRenderer({ pattern: _ }: { pattern: BgPattern }) {
  return null;
}

// ── Floating Decorations ────────────────────────────────────────────
export function DecorationRenderer({ type, accentColor }: { type: DecorationType; accentColor: string }) {
  const items = getDecorationItems(type, accentColor);
  return <>{items}</>;
}

function getDecorationItems(type: DecorationType, color: string) {
  const positions = [
    { top: '10%', left: '5%', size: 'w-3 h-3', delay: 0 },
    { top: '20%', right: '10%', size: 'w-4 h-4', delay: 0.5 },
    { bottom: '30%', left: '8%', size: 'w-2 h-2', delay: 1 },
    { bottom: '15%', right: '15%', size: 'w-3 h-3', delay: 1.5 },
    { top: '50%', left: '3%', size: 'w-2 h-2', delay: 2 },
    { top: '70%', right: '5%', size: 'w-3 h-3', delay: 2.5 },
    { top: '35%', left: '12%', size: 'w-2 h-2', delay: 3 },
    { bottom: '40%', right: '8%', size: 'w-4 h-4', delay: 3.5 },
  ];

  return positions.map((pos, i) => {
    const style: React.CSSProperties = {};
    if (pos.top) style.top = pos.top;
    if (pos.bottom) style.bottom = pos.bottom;
    if (pos.left) style.left = pos.left;
    if (pos.right) style.right = pos.right;

    const shapeClass = getShapeClass(type, i);

    return (
      <motion.div
        key={i}
        className={`absolute ${pos.size} ${color} ${shapeClass} opacity-20`}
        style={style}
        animate={{
          y: [0, -15, 0],
          opacity: [0.1, 0.35, 0.1],
          rotate: [0, type === 'triangles' ? 180 : 0, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
      />
    );
  });
}

function getShapeClass(type: DecorationType, index: number): string {
  switch (type) {
    case 'circles': return 'rounded-full';
    case 'squares': return 'rounded-sm';
    case 'triangles': return 'rounded-none' + (index % 2 === 0 ? ' rotate-45' : ' rotate-12');
    case 'hexagons': return 'rounded-lg rotate-45';
    case 'dots': return 'rounded-full scale-75';
    case 'lines': return 'rounded-full w-8 !h-0.5';
    case 'mixed':
      return index % 3 === 0 ? 'rounded-full' : index % 3 === 1 ? 'rounded-sm' : 'rounded-lg rotate-45';
    default: return 'rounded-full';
  }
}

// ── Hero Visual Components (Enhanced with detailed animations) ───────
interface HeroVisualProps {
  motionType: MotionType;
  accentClass: string;
}

function CodeEditorVisual({ motionType, accentClass }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const codeLines = [
    { keyword: 'import', text: "{ useState, useEffect }", from: 'react', color: 'text-purple-400' },
    { keyword: 'import', text: "{ motion }", from: 'framer-motion', color: 'text-purple-400' },
    { keyword: 'const', text: 'App', equals: '() =>', color: 'text-blue-400' },
  ];

  return (
    <motion.div {...mp} className="w-full max-w-md mx-auto relative">
      <GlowEffect intensity="subtle" color="blue" />
      <ParticleField count={15} color="blue" />
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 relative z-10">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 backdrop-blur border-b border-gray-700/50">
          <div className="flex gap-1.5">
            <motion.div className="w-3 h-3 rounded-full bg-red-500" whileHover={{ scale: 1.2 }} />
            <motion.div className="w-3 h-3 rounded-full bg-yellow-500" whileHover={{ scale: 1.2 }} />
            <motion.div className="w-3 h-3 rounded-full bg-green-500" whileHover={{ scale: 1.2 }} />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400 font-mono">App.tsx</span>
            <motion.div className="w-2 h-2 rounded-full bg-blue-400" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </div>
        {/* Code Content */}
        <div className="p-4 font-mono text-sm space-y-2 relative">
          {/* Line Numbers */}
          <div className="absolute left-4 top-4 text-gray-600 text-xs space-y-2 select-none">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n}>{n}</div>)}
          </div>
          <div className="pl-8 space-y-2">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2 flex-wrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <span className={line.color}>{line.keyword}</span>
                <span className="text-gray-300">{line.text}</span>
                {line.from && <>
                  <span className="text-purple-400">from</span>
                  <span className="text-green-400">&apos;{line.from}&apos;</span>
                </>}
                {line.equals && <span className="text-gray-400">{line.equals} {'{'}</span>}
              </motion.div>
            ))}
            <motion.div className="pl-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-purple-400">const</span>
              <span className="text-gray-300"> [data, setData] = </span>
              <span className="text-yellow-300">useState</span>
              <span className="text-gray-400">([])</span>
            </motion.div>
            <div className="pl-4 flex items-center">
              <span className="text-purple-400">return</span>
              <span className="text-gray-400"> (</span>
              <motion.span
                className="text-blue-400 ml-1"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >|</motion.span>
            </div>
          </div>
          {/* Minimap */}
          <div className="absolute right-2 top-4 w-12 h-24 bg-gray-800/50 rounded overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 my-0.5 bg-gray-600/50 rounded"
                style={{ width: `${40 + Math.random() * 50}%`, marginLeft: '4px' }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-blue-600 text-white text-xs">
          <div className="flex items-center gap-3">
            <span>TypeScript React</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <span>Ln 4, Col 28</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TerminalVisual({ motionType, accentClass }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const commands = [
    { prompt: '$', cmd: 'npm run build', output: null },
    { prompt: '>', cmd: 'Building production bundle...', output: null },
    { prompt: '✓', cmd: 'Compiled successfully in 2.4s', output: 'success' },
    { prompt: '$', cmd: 'npm run test', output: null },
    { prompt: '✓', cmd: '42 tests passed', output: 'success' },
    { prompt: '$', cmd: 'npm run deploy', output: null },
  ];

  return (
    <motion.div {...mp} className="w-full max-w-md mx-auto relative">
      <GlowEffect intensity="subtle" color="emerald" />
      <ParticleField count={12} color="emerald" />
      <div className="bg-gray-950 rounded-xl shadow-2xl overflow-hidden border border-gray-800 relative z-10">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-500 font-mono">zsh — 80×24</span>
          </div>
        </div>
        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm space-y-1.5">
          {commands.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-2"
            >
              <span className={line.output === 'success' ? 'text-emerald-400' : 'text-green-400'}>{line.prompt}</span>
              <span className={line.output === 'success' ? 'text-emerald-300' : 'text-gray-300'}>{line.cmd}</span>
            </motion.div>
          ))}
          {/* Active Line with Cursor */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-400">$</span>
            <motion.span
              className="text-gray-300"
              animate={{ opacity: [1, 1, 1] }}
            >
              Deploying to production
              <motion.span
                className="inline-block ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >...</motion.span>
            </motion.span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
              initial={{ width: '0%' }}
              animate={{ width: '75%' }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
          <motion.div
            className="text-emerald-400 text-xs mt-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ▋ Uploading artifacts...
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileDeviceVisual({ motionType, accentClass }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="relative">
      <GlowEffect intensity="medium" color="violet" />
      <ParticleField count={10} color="violet" />
      <div className="w-52 mx-auto relative z-10">
        <div className="bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border border-gray-800">
          {/* Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-20" />
          <div className="bg-white rounded-[2rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="bg-gray-100 px-6 py-2 flex items-center justify-between relative z-10">
              <span className="text-[10px] font-medium text-gray-700">9:41</span>
              <div className="flex items-center gap-1">
                <motion.div className="flex gap-0.5">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gray-800 rounded-sm"
                      style={{ height: 4 + i * 2 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
                <div className="w-5 h-2.5 border border-gray-800 rounded-sm ml-1 relative">
                  <motion.div
                    className="absolute inset-0.5 bg-green-500 rounded-sm"
                    animate={{ width: ['100%', '60%', '100%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            {/* App Content */}
            <div className="px-4 py-4 space-y-3">
              {/* Header */}
              <motion.div
                className="h-3 bg-gray-200 rounded-full w-3/4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="h-2 bg-gray-100 rounded-full w-1/2" />
              {/* Hero Card */}
              <motion.div
                className="h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg relative overflow-hidden"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
                <div className="p-3 text-white">
                  <div className="text-xs font-medium opacity-80">Balance</div>
                  <motion.div
                    className="text-lg font-bold"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >$12,450.00</motion.div>
                </div>
              </motion.div>
              {/* Quick Actions */}
              <div className="flex gap-2">
                {['Send', 'Request', 'More'].map((label, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gray-100 rounded-xl py-2 text-center"
                    whileHover={{ scale: 1.05 }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-violet-100" />
                    <span className="text-[8px] text-gray-600">{label}</span>
                  </motion.div>
                ))}
              </div>
              {/* List Items */}
              {[1, 2].map(i => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 py-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded w-20" />
                    <div className="h-1.5 bg-gray-100 rounded w-14 mt-1" />
                  </div>
                  <div className="text-[10px] text-gray-500">-$24</div>
                </motion.div>
              ))}
            </div>
            {/* Bottom Nav */}
            <div className="flex items-center justify-around py-3 border-t border-gray-100">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className={`w-6 h-6 rounded-lg ${i === 1 ? 'bg-violet-500' : 'bg-gray-200'}`}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Home Indicator */}
        <div className="w-24 h-1 bg-gray-300 rounded-full mx-auto mt-2" />
      </div>
    </motion.div>
  );
}

function DashboardVisual({ motionType, accentClass }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  return (
    <motion.div {...mp} className="w-full max-w-md mx-auto relative">
      <GlowEffect intensity="subtle" color="emerald" />
      <ParticleField count={15} color="emerald" />
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-5 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-white text-sm">📊</span>
            </motion.div>
            <span className="font-semibold text-gray-800">Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-emerald-600 font-medium">Live</span>
          </div>
        </div>
        {/* Stats */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Revenue', value: '$84.2k', change: '+24%', color: 'emerald' },
              { label: 'Users', value: '12,847', change: '+18%', color: 'blue' },
              { label: 'Orders', value: '3,241', change: '+32%', color: 'violet' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 rounded-xl p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</div>
                <div className="text-lg font-bold text-gray-900 mt-0.5">{stat.value}</div>
                <div className={`text-[10px] font-medium text-${stat.color}-600 flex items-center gap-1 mt-1`}>
                  <span>↑</span>{stat.change}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Chart */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-700">Monthly Trend</span>
              <div className="flex gap-2">
                {['1W', '1M', '1Y'].map((period, i) => (
                  <button
                    key={i}
                    className={`text-[10px] px-2 py-0.5 rounded ${i === 1 ? 'bg-emerald-500 text-white' : 'text-gray-500'}`}
                  >{period}</button>
                ))}
              </div>
            </div>
            <div className="h-24 flex items-end gap-1 px-1">
              {chartData.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >{h}%</motion.div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[8px] text-gray-400">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GlobeVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="strong" color="blue" />
      <ParticleField count={25} color="blue" />
      {/* Orbital Rings */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-blue-200"
          style={{
            transform: `rotateX(${60 + i * 10}deg) rotateZ(${i * 30}deg)`,
            opacity: 0.3 - i * 0.08
          }}
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* Main Globe */}
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 shadow-inner"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* Continents (simplified) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.ellipse cx="30" cy="40" rx="12" ry="8" fill="#60a5fa" opacity="0.3"
            animate={{ cx: [30, 70, 30] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.ellipse cx="65" cy="55" rx="15" ry="10" fill="#60a5fa" opacity="0.25"
            animate={{ cx: [65, 25, 65] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.ellipse cx="50" cy="30" rx="8" ry="6" fill="#60a5fa" opacity="0.2"
            animate={{ cy: [30, 70, 30] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        </svg>
      </motion.div>
      {/* Orbiting Satellites */}
      {[0, 120, 240].map((startAngle, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-3 h-3"
          animate={{
            x: [Math.cos((startAngle * Math.PI) / 180) * 60, Math.cos(((startAngle + 360) * Math.PI) / 180) * 60],
            y: [Math.sin((startAngle * Math.PI) / 180) * 60, Math.sin(((startAngle + 360) * Math.PI) / 180) * 60],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
        >
          <motion.div
            className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Trail */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      ))}
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {[[60, 80, 140, 70], [80, 130, 130, 90], [100, 60, 100, 140]].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#60a5fa"
            strokeWidth="0.5"
            strokeDasharray="4 2"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

function BrainNetworkVisual({ motionType }: HeroVisualProps) {
  const nodes = [
    { x: 100, y: 80, r: 10, pulse: true },
    { x: 50, y: 50, r: 6 },
    { x: 150, y: 50, r: 6 },
    { x: 60, y: 120, r: 7 },
    { x: 140, y: 120, r: 7 },
    { x: 100, y: 150, r: 8, pulse: true },
    { x: 30, y: 90, r: 5 },
    { x: 170, y: 90, r: 5 },
  ];
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 6], [2, 7], [3, 5], [4, 5], [1, 3], [2, 4],
  ];

  return (
    <div className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="medium" color="violet" />
      <ParticleField count={20} color="violet" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        {/* Connections with animated pulses */}
        {connections.map(([from, to], i) => (
          <g key={`conn-${i}`}>
            <motion.line
              x1={nodes[from].x} y1={nodes[from].y}
              x2={nodes[to].x} y2={nodes[to].y}
              stroke="url(#neuralGradient)"
              strokeWidth="1.5"
              opacity="0.4"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
            {/* Traveling pulse */}
            <motion.circle
              r="2"
              fill="#a78bfa"
              animate={{
                cx: [nodes[from].x, nodes[to].x],
                cy: [nodes[from].y, nodes[to].y],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}
        {/* Gradient */}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Glow effect for pulsing nodes */}
            {node.pulse && (
              <motion.circle
                cx={node.x} cy={node.y} r={node.r * 2}
                fill="#a78bfa"
                opacity="0.2"
                animate={{ r: [node.r * 1.5, node.r * 2.5, node.r * 1.5], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <motion.circle
              cx={node.x} cy={node.y} r={node.r}
              fill="url(#neuralGradient)"
              animate={{ r: [node.r, node.r + 1.5, node.r] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            <circle cx={node.x} cy={node.y} r={node.r * 0.4} fill="white" opacity="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function ChartGraphVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const barData = [35, 55, 45, 75, 60, 90, 70, 85, 65, 95, 80, 88];
  const lineData = [40, 50, 35, 65, 55, 75, 60, 70, 55, 80, 70, 82];

  return (
    <motion.div {...mp} className="w-full max-w-sm mx-auto relative">
      <GlowEffect intensity="subtle" color="emerald" />
      <ParticleField count={12} color="emerald" />
      <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Performance</h3>
            <p className="text-xs text-gray-500">Last 12 months</p>
          </div>
          <motion.div
            className="flex items-center gap-1 text-emerald-600 text-xs font-medium"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>↑ 24%</span>
          </motion.div>
        </div>

        {/* Chart Area */}
        <div className="relative h-36">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="border-t border-gray-100 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-1 px-1">
            {barData.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-sm relative group cursor-pointer"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {h}k users
                </div>
              </motion.div>
            ))}
          </div>

          {/* Line Chart Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={lineData.map((d, i) => `${(i / (lineData.length - 1)) * 100}%,${100 - d}%`).join(' ')}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            {/* Dots on line */}
            {lineData.map((d, i) => (
              <motion.circle
                key={i}
                cx={`${(i / (lineData.length - 1)) * 100}%`}
                cy={`${100 - d}%`}
                r="3"
                fill="#6366f1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-emerald-500 to-emerald-300" />
            <span className="text-gray-600">Users</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-gray-600">Revenue</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PaletteCanvasVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const colors = [
    { bg: 'bg-rose-400', name: 'Rose', hex: '#FB7185' },
    { bg: 'bg-amber-400', name: 'Amber', hex: '#FBBF24' },
    { bg: 'bg-emerald-400', name: 'Green', hex: '#34D399' },
    { bg: 'bg-blue-400', name: 'Blue', hex: '#60A5FA' },
    { bg: 'bg-violet-400', name: 'Violet', hex: '#A78BFA' },
    { bg: 'bg-pink-400', name: 'Pink', hex: '#F472B6' },
  ];

  return (
    <motion.div {...mp} className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="medium" color="rose" />
      <ParticleField count={15} color="rose" />
      <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-sm font-medium text-gray-700">Color Palette</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="w-4 h-4 rounded bg-gray-100"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-3 gap-2 flex-1">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              className={`${color.bg} rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden`}
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
              <span className="text-white text-[10px] font-medium z-10">{color.name}</span>
              <span className="text-white/70 text-[8px] z-10">{color.hex}</span>
            </motion.div>
          ))}
        </div>

        {/* Preview Bar */}
        <div className="mt-3 h-3 rounded-full overflow-hidden flex">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              className={`flex-1 ${color.bg}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ShieldLockVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-72 h-72 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="strong" color="amber" />
      <ParticleField count={18} color="amber" />

      {/* Scanning rings */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-amber-300"
          style={{ width: `${120 + i * 40}px`, height: `${120 + i * 40}px` }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: i % 2 === 0 ? 360 : -360
          }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Main shield */}
      <motion.div
        className="relative z-10 bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 shadow-2xl border border-amber-200/50"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-20 h-20 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
        </svg>

        {/* Checkmark animation */}
        <motion.div
          className="absolute top-3 right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white text-sm">✓</span>
        </motion.div>
      </motion.div>

      {/* Security data points */}
      {[[45, 30], [160, 50], [30, 140], [175, 130]].map(([x, y], i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-400 rounded-lg p-2 shadow-lg text-[10px] text-white font-medium"
          style={{ left: x, top: y }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        >
          {['AES-256', 'TLS 1.3', 'OAuth2', 'JWT'][i]}
        </motion.div>
      ))}
    </motion.div>
  );
}

function CloudStackVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const layers = [
    { color: 'from-blue-400 to-blue-600', label: 'CDN', icon: '🌐', status: 'active' },
    { color: 'from-emerald-400 to-emerald-600', label: 'Load Balancer', icon: '⚖️', status: 'active' },
    { color: 'from-violet-400 to-violet-600', label: 'App Servers', icon: '🖥️', status: 'scaling' },
    { color: 'from-amber-400 to-amber-600', label: 'Database', icon: '💾', status: 'active' },
  ];

  return (
    <motion.div {...mp} className="w-72 mx-auto relative" style={{ height: '280px' }}>
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={15} color="blue" />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 288 280">
        {[0, 1, 2].map(i => (
          <motion.line
            key={i}
            x1="144" y1={50 + i * 65}
            x2="144" y2={90 + i * 65}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="5 3"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>

      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ top: `${i * 65 + 10}px` }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            className={`w-56 h-14 bg-gradient-to-r ${layer.color} rounded-xl shadow-lg flex items-center justify-between px-4 relative overflow-hidden`}
            whileHover={{ scale: 1.03 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, white 50%)', backgroundSize: '20px 100%' }}
              animate={{ x: [0, 20] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center gap-2 z-10">
              <span className="text-lg">{layer.icon}</span>
              <span className="text-white text-sm font-medium">{layer.label}</span>
            </div>

            <div className="flex items-center gap-1 z-10">
              <motion.div
                className={`w-2 h-2 rounded-full ${layer.status === 'active' ? 'bg-green-300' : 'bg-yellow-300'}`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-white/80 text-[10px] capitalize">{layer.status}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function WorkflowDiagramVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const steps = [
    { label: 'Input', icon: '📥', color: 'bg-blue-500' },
    { label: 'Process', icon: '⚙️', color: 'bg-violet-500' },
    { label: 'Validate', icon: '✓', color: 'bg-emerald-500' },
    { label: 'Output', icon: '📤', color: 'bg-amber-500' },
  ];

  return (
    <motion.div {...mp} className="w-full max-w-sm mx-auto relative">
      <GlowEffect intensity="subtle" color="violet" />
      <ParticleField count={12} color="violet" />

      <div className="flex items-center justify-center gap-2 relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className={`${step.color} rounded-xl p-4 shadow-lg relative`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-2xl">{step.icon}</span>
              <div className="text-white text-[10px] font-medium mt-1 text-center">{step.label}</div>

              {/* Pulse ring */}
              <motion.div
                className={`absolute inset-0 ${step.color} rounded-xl`}
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              />
            </motion.div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <motion.div className="flex items-center mx-1">
                <motion.div
                  className="w-6 h-0.5 bg-gray-300"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.5, delay: i * 0.4 + 0.3 }}
                />
                <motion.div
                  className="w-0 h-0 border-l-4 border-l-gray-300 border-y-4 border-y-transparent"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Process flow animation */}
      <motion.div
        className="absolute top-1/2 left-0 w-3 h-3 bg-blue-500 rounded-full shadow-lg"
        animate={{
          x: [0, 320],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function DataFlowVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={20} color="blue" />

      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* Flow paths */}
        {[
          { d: 'M20,60 C60,20 140,20 180,60 C180,100 180,140 140,160 C100,180 60,160 40,120 C20,80 20,60 20,60', color: 'url(#flowGrad1)' },
          { d: 'M30,100 Q80,40 130,100 Q180,160 130,140 Q80,120 30,100', color: 'url(#flowGrad2)' },
        ].map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
          />
        ))}

        {/* Data nodes */}
        {[
          { x: 20, y: 60, label: 'Source', color: '#60a5fa' },
          { x: 100, y: 30, label: 'Transform', color: '#a78bfa' },
          { x: 180, y: 100, label: 'Process', color: '#34d399' },
          { x: 100, y: 170, label: 'Output', color: '#f472b6' },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x} cy={node.y} r="20"
              fill={node.color}
              opacity="0.2"
              animate={{ r: [20, 25, 20] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <motion.circle
              cx={node.x} cy={node.y} r="12"
              fill={node.color}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <circle cx={node.x} cy={node.y} r="5" fill="white" opacity="0.5" />
          </g>
        ))}

        {/* Floating data particles */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.circle
            key={`particle-${i}`}
            r="3"
            fill="#60a5fa"
            animate={{
              cx: [20 + i * 10, 180, 100, 20 + i * 10],
              cy: [60, 100, 170, 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </svg>
    </div>
  );
}

function ShoppingCart3dVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-64 h-64 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="strong" color="emerald" />
      <ParticleField count={15} color="emerald" />

      <div className="relative z-10">
        <motion.div
          className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl p-8 shadow-2xl relative"
          animate={{ rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Floating products */}
          {[
            { emoji: '📱', x: -20, y: -30, delay: 0 },
            { emoji: '👕', x: 30, y: -20, delay: 0.5 },
            { emoji: '👟', x: 20, y: 25, delay: 1 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ left: `calc(50% + ${item.x}px)`, top: `calc(50% + ${item.y}px)` }}
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: item.delay }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Cart badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-white text-sm font-bold">3</span>
        </motion.div>

        {/* Price tag */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1 shadow-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-emerald-600 font-bold text-sm">$299.99</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Megaphone3dVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-64 h-64 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="strong" color="rose" />
      <ParticleField count={18} color="rose" />

      <div className="relative z-10">
        <motion.div
          className="bg-gradient-to-br from-rose-400 to-pink-600 rounded-3xl p-8 shadow-2xl"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
          </svg>
        </motion.div>

        {/* Sound waves */}
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="absolute top-1/2 right-0 -translate-y-1/2 border-2 border-rose-300 rounded-full"
            style={{ width: `${60 + i * 30}px`, height: `${40 + i * 20}px` }}
            animate={{
              opacity: [0.5, 0, 0.5],
              scale: [0.8, 1.2, 0.8],
              x: [0, 30, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Message bubbles */}
        {[
          { text: '🔥 Sale!', x: 80, y: -40 },
          { text: '50% OFF', x: 90, y: 20 },
          { text: '⭐ New', x: 70, y: 60 },
        ].map((msg, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-lg px-2 py-1 shadow-lg text-xs font-bold text-rose-600"
            style={{ left: msg.x, top: msg.y }}
            animate={{
              x: [0, 20, 0],
              opacity: [0, 1, 0],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RocketLaunchVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-64 h-72 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="strong" color="blue" />
      <ParticleField count={25} color="blue" />

      {/* Stars background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="relative z-10">
        <motion.div
          className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl p-8 shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </motion.div>

        {/* Flame exhaust */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 origin-top"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <div className="w-full h-20 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white via-orange-300 to-transparent rounded-b-full opacity-50"
            animate={{ scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        </motion.div>

        {/* Speed lines */}
        {[-30, -15, 15, 30].map((x, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: '2px',
              height: '40px',
              left: `calc(50% + ${x}px)`,
              bottom: '-60px'
            }}
            animate={{ y: [0, 60], opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Launch metrics */}
        <motion.div
          className="absolute -right-16 top-0 bg-white rounded-lg px-3 py-2 shadow-lg"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-[10px] text-gray-500">Speed</div>
          <div className="text-sm font-bold text-blue-600">28,000 km/h</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Simple fallback components for remaining visuals
function PuzzlePiecesVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const pieces = [
    { x: 0, y: 0, color: 'from-blue-400 to-blue-600' },
    { x: 70, y: 0, color: 'from-emerald-400 to-emerald-600' },
    { x: 0, y: 70, color: 'from-violet-400 to-violet-600' },
    { x: 70, y: 70, color: 'from-amber-400 to-amber-600' },
  ];
  return (
    <motion.div {...mp} className="w-56 h-56 mx-auto relative">
      <GlowEffect intensity="medium" color="violet" />
      <ParticleField count={12} color="violet" />
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute w-20 h-20 bg-gradient-to-br ${p.color} rounded-2xl shadow-xl`}
          style={{ left: p.x + 20, top: p.y + 20 }}
          animate={{
            x: [0, i % 2 === 0 ? 5 : -5, 0],
            y: [0, i < 2 ? 5 : -5, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          whileHover={{ scale: 1.1 }}
        />
      ))}
    </motion.div>
  );
}

function CircuitBoardVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="medium" color="emerald" />
      <ParticleField count={15} color="emerald" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        {['M40,100 L80,100 L80,60 L120,60', 'M40,140 L100,140 L100,100 L160,100', 'M80,60 L80,40 L140,40 L140,80', 'M120,60 L160,60 L160,140 L120,140'].map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="8 4"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }} />
        ))}
        {[[40,100],[80,60],[120,60],[160,100],[100,140],[140,40],[160,60],[120,140],[40,140],[80,100]].map(([cx,cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="6" fill="#10b981"
            animate={{ r: [6, 8, 6], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </svg>
    </div>
  );
}

function SatelliteVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-56 h-56 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={15} color="blue" />
      <motion.div className="absolute w-44 h-44 rounded-full border-2 border-blue-200 opacity-40"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-36 h-36 rounded-full border border-blue-300 opacity-30"
        animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
      <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-6 shadow-xl z-10">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424-7.424l-7.424 7.424zM2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12z" />
        </svg>
      </div>
    </motion.div>
  );
}

function MicroscopeVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-56 h-56 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="medium" color="violet" />
      <ParticleField count={12} color="violet" />
      <div className="bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl p-8 shadow-xl z-10">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
        </svg>
      </div>
    </motion.div>
  );
}

function LightbulbVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-56 h-56 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="strong" color="amber" />
      <ParticleField count={15} color="amber" />
      <motion.div className="absolute w-40 h-40 bg-amber-200 rounded-full opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }} />
      <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 shadow-xl z-10">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      </div>
    </motion.div>
  );
}

function GearSystemVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={15} color="blue" />
      <motion.div className="absolute" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
        <svg className="w-28 h-28 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </motion.div>
      <motion.div className="absolute translate-x-14 translate-y-12" animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        <svg className="w-20 h-20 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </motion.div>
    </div>
  );
}

function NetworkNodesVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative">
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={20} color="blue" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        {[[100,100,40,60],[100,100,160,60],[100,100,60,160],[100,100,140,160],[40,60,160,60],[60,160,140,160]].map(([x1,y1,x2,y2], i) => (
          <motion.line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2"
            strokeDasharray="5 3"
            animate={{ strokeDashoffset: [0, -16], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
        {[[100,100,14,'#3b82f6'],[40,60,10,'#34d399'],[160,60,10,'#a78bfa'],[60,160,10,'#fbbf24'],[140,160,10,'#f472b6']].map(([cx,cy,r,fill], i) => (
          <motion.circle key={`n${i}`} cx={cx as number} cy={cy as number} r={r as number} fill={fill as string}
            animate={{ r: [(r as number), (r as number) + 3, (r as number)] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </svg>
    </div>
  );
}

function LayersStackVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  const layers = [
    { color: 'from-blue-500 to-blue-600', label: 'Presentation' },
    { color: 'from-emerald-500 to-emerald-600', label: 'Business Logic' },
    { color: 'from-violet-500 to-violet-600', label: 'Data Access' },
    { color: 'from-amber-500 to-amber-600', label: 'Database' },
  ];
  return (
    <motion.div {...mp} className="w-72 mx-auto relative" style={{ height: '260px' }}>
      <GlowEffect intensity="subtle" color="blue" />
      <ParticleField count={12} color="blue" />
      {layers.map((layer, i) => (
        <motion.div key={i} className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: `${i * 60 + 10}px` }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>
          <div className={`w-56 h-14 bg-gradient-to-r ${layer.color} rounded-xl shadow-xl flex items-center justify-center`}>
            <span className="text-white text-sm font-medium">{layer.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function TargetBullseyeVisual({ motionType }: HeroVisualProps) {
  return (
    <div className="w-72 h-72 mx-auto relative flex items-center justify-center">
      <GlowEffect intensity="medium" color="rose" />
      <ParticleField count={15} color="rose" />
      {[140, 110, 80, 50, 20].map((size, i) => (
        <motion.div key={i}
          className={`absolute rounded-full ${i === 4 ? 'bg-rose-500' : i % 2 === 0 ? 'border-2 border-rose-400' : 'border-2 border-rose-200'}`}
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      <motion.div className="absolute w-2 h-2 bg-white rounded-full z-10 shadow-lg"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
    </div>
  );
}

function ChatBubblesVisual({ motionType }: HeroVisualProps) {
  const mp = getMotionProps(motionType);
  return (
    <motion.div {...mp} className="w-72 mx-auto relative">
      <GlowEffect intensity="medium" color="blue" />
      <ParticleField count={10} color="blue" />
      <div className="space-y-3 relative z-10">
        <motion.div className="flex justify-end" animate={{ x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[200px] shadow-lg">
            <div className="flex items-center gap-2">
              <span>How can we help?</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>💬</motion.span>
            </div>
          </div>
        </motion.div>
        <motion.div className="flex justify-start" animate={{ x: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}>
          <div className="bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[200px] shadow-lg">
            I need a custom app built
          </div>
        </motion.div>
        <motion.div className="flex justify-end" animate={{ x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[200px] shadow-lg flex items-center gap-2">
            <span>Let&apos;s build it together!</span>
            <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>🚀</motion.span>
          </div>
        </motion.div>
        {/* Typing indicator */}
        <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 2 }}>
          <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-sm flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Export: HeroVisual Component ────────────────────────────────
export function HeroVisual({ type, motionType, accentClass }: { type: HeroVisualType; motionType: MotionType; accentClass: string }) {
  const props: HeroVisualProps = { motionType, accentClass };

  switch (type) {
    case 'code-editor': return <CodeEditorVisual {...props} />;
    case 'terminal': return <TerminalVisual {...props} />;
    case 'mobile-device': return <MobileDeviceVisual {...props} />;
    case 'dashboard': return <DashboardVisual {...props} />;
    case 'globe': return <GlobeVisual {...props} />;
    case 'brain-network': return <BrainNetworkVisual {...props} />;
    case 'chart-graph': return <ChartGraphVisual {...props} />;
    case 'palette-canvas': return <PaletteCanvasVisual {...props} />;
    case 'shield-lock': return <ShieldLockVisual {...props} />;
    case 'cloud-stack': return <CloudStackVisual {...props} />;
    case 'workflow-diagram': return <WorkflowDiagramVisual {...props} />;
    case 'data-flow': return <DataFlowVisual {...props} />;
    case 'shopping-cart-3d': return <ShoppingCart3dVisual {...props} />;
    case 'megaphone-3d': return <Megaphone3dVisual {...props} />;
    case 'rocket-launch': return <RocketLaunchVisual {...props} />;
    case 'puzzle-pieces': return <PuzzlePiecesVisual {...props} />;
    case 'circuit-board': return <CircuitBoardVisual {...props} />;
    case 'satellite': return <SatelliteVisual {...props} />;
    case 'microscope': return <MicroscopeVisual {...props} />;
    case 'lightbulb': return <LightbulbVisual {...props} />;
    case 'gear-system': return <GearSystemVisual {...props} />;
    case 'network-nodes': return <NetworkNodesVisual {...props} />;
    case 'layers-stack': return <LayersStackVisual {...props} />;
    case 'target-bullseye': return <TargetBullseyeVisual {...props} />;
    case 'chat-bubbles': return <ChatBubblesVisual {...props} />;
    default: return null;
  }
}
