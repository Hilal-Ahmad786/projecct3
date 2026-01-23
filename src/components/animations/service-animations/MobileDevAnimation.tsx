// src/components/animations/service-animations/MobileDevAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function MobileDevAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Main Phone */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[180px] h-[360px] bg-gray-900 rounded-[36px] p-2 shadow-2xl">
          {/* Phone Frame */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="w-full h-full bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-500 rounded-[28px] overflow-hidden">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-2 text-white text-[8px]">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Content */}
            <div className="px-4 pt-4">
              {/* App Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-white/40 rounded w-20 mb-1" />
                  <div className="h-1.5 bg-white/20 rounded w-14" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-lg" />
              </div>

              {/* Cards */}
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="h-2 bg-white/40 rounded w-3/4 mb-2" />
                <div className="h-1.5 bg-white/20 rounded w-1/2 mb-3" />
                <div className="flex gap-2">
                  <div className="h-6 flex-1 bg-white/30 rounded-lg" />
                  <div className="h-6 flex-1 bg-white/30 rounded-lg" />
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="bg-white/15 rounded-lg p-2"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <div className="h-1.5 bg-white/30 rounded w-2/3 mb-1" />
                    <div className="h-3 bg-white/40 rounded w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm px-6 py-3">
              <div className="flex justify-around">
                {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                  <motion.span
                    key={i}
                    className="text-lg"
                    animate={{ scale: i === 0 ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Phone (tilted) */}
      <motion.div
        className="absolute z-[-1]"
        style={{
          left: dir === 'rtl' ? '60%' : '10%',
          top: '15%',
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
        animate={{ opacity: 0.6, x: 0, rotate: dir === 'rtl' ? 15 : -15 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="w-[120px] h-[240px] bg-gray-800 rounded-[24px] p-1.5 shadow-xl">
          <div className="w-full h-full bg-gradient-to-b from-emerald-500 to-teal-600 rounded-[20px]" />
        </div>
      </motion.div>

      {/* Platform Badges */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Platforms</div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🍎</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Card */}
      <motion.div
        className="absolute z-20"
        style={{ left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto', bottom: '10%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Features</div>
          <div className="space-y-1">
            {['Push Notify', 'Offline Mode', 'Biometrics'].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['📲', '🔔', '⚡'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-50"
          style={{
            left: `${20 + i * 30}%`,
            top: `${70 + (i % 2) * 15}%`,
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
