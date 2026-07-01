// src/components/animations/service-animations/AIAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function AIAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Neural Network Brain */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[200px] h-[200px]">
          {/* Brain Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 opacity-20" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 opacity-30" />
          <div className="absolute inset-4 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl" />

          {/* Neural Nodes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 70 + 100;
            const y = Math.sin(angle) * 70 + 100;
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ left: x - 6, top: y - 6 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}

          {/* Center Core */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(139, 92, 246, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-1 rounded-full bg-white/30" />
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = Math.cos(angle) * 70 + 100;
              const y = Math.sin(angle) * 70 + 100;
              return (
                <motion.line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={x}
                  y2={y}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#1a3a6b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* AI Processing Card */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '5%', left: dir === 'rtl' ? '5%' : 'auto', top: '10%' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[120px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Processing</div>
          <div className="space-y-1.5">
            {['NLP', 'Vision', 'Learning'].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="text-[10px] font-medium text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Data Flow Card */}
      <motion.div
        className="absolute z-20"
        style={{ left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto', bottom: '15%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Data Flow</div>
          <div className="space-y-2">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI Icons */}
      {['🤖', '🧠', '⚡'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-50"
          style={{
            left: `${15 + i * 30}%`,
            top: `${75 + (i % 2) * 10}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
