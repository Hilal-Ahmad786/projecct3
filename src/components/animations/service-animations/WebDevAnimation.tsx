// src/components/animations/service-animations/WebDevAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function WebDevAnimation() {
  const { dir } = useTranslations();

  const codeLines = [
    { text: '<div className="app">', color: 'text-pink-400' },
    { text: '  <Header />', color: 'text-blue-400' },
    { text: '  <Main>', color: 'text-green-400' },
    { text: '    {children}', color: 'text-yellow-400' },
    { text: '  </Main>', color: 'text-green-400' },
    { text: '</div>', color: 'text-pink-400' },
  ];

  const techStack = [
    { name: 'React', color: 'from-cyan-500 to-blue-500' },
    { name: 'Next.js', color: 'from-gray-700 to-gray-900' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind', color: 'from-teal-400 to-cyan-500' },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Browser Window */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[280px] rounded-xl bg-white shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-2">
            <div className="h-6 bg-white rounded-md flex items-center px-3 text-[10px] text-gray-400">
              https://yoursite.com
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-white h-[140px]">
          {/* Mini Website Mockup */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
          <div className="h-2 bg-gray-100 rounded mb-1 w-full" />
          <div className="h-2 bg-gray-100 rounded mb-3 w-2/3" />
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Code Editor */}
      <motion.div
        className="absolute bottom-8 w-[200px] rounded-lg bg-gray-900 shadow-xl overflow-hidden"
        style={{ left: dir === 'rtl' ? 'auto' : '10%', right: dir === 'rtl' ? '10%' : 'auto' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.3, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 text-[9px] text-gray-400">App.tsx</span>
        </div>
        <div className="p-3 font-mono text-[9px] leading-relaxed">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className={line.color}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-3 bg-white ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Tech Stack Badges */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '5%', left: dir === 'rtl' ? '5%' : 'auto', bottom: '25%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Tech Stack</div>
          <div className="space-y-1.5">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color}`} />
                <span className="text-[10px] font-medium text-gray-700">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Responsive Indicator */}
      <motion.div
        className="absolute top-[45%] z-10"
        style={{ left: dir === 'rtl' ? '10%' : 'auto', right: dir === 'rtl' ? 'auto' : '10%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.4 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
          <span className="text-lg">📱</span>
          <span className="text-lg">💻</span>
          <span className="text-lg">🖥️</span>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
