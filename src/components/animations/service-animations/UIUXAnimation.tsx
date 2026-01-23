// src/components/animations/service-animations/UIUXAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function UIUXAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Design Canvas */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[280px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Design Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[9px] text-gray-400">Design.fig</span>
        </div>

        {/* Canvas Content */}
        <div className="p-4 bg-[#F5F5F5] h-full">
          {/* Artboard */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-3 h-[180px]"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Mobile Mockup */}
            <div className="flex gap-3">
              <div className="w-16 h-28 bg-gray-100 rounded-lg border border-gray-200 p-1">
                <div className="h-2 bg-gray-200 rounded mb-1" />
                <div className="h-1 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-1" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="flex-1 space-y-2">
                <motion.div
                  className="h-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded"
                  animate={{ width: ['80%', '100%', '80%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="h-2 bg-gray-200 rounded w-3/4" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
                <div className="flex gap-2 pt-2">
                  <motion.div
                    className="h-6 flex-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="h-6 flex-1 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="flex gap-1 mt-3 justify-center">
              {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'].map((color, i) => (
                <motion.div
                  key={color}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Design Tools Panel */}
      <motion.div
        className="absolute z-20"
        style={{ left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto', top: '15%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.3, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-2 w-[50px]">
          <div className="space-y-2">
            {['V', '□', '○', 'T', '✎'].map((tool, i) => (
              <motion.div
                key={i}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm ${
                  i === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                animate={i === 0 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Specs Card */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '5%', left: dir === 'rtl' ? '5%' : 'auto', bottom: '15%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Specs</div>
          <div className="space-y-1.5">
            {[
              { label: 'Width', value: '375px' },
              { label: 'Padding', value: '16px' },
              { label: 'Radius', value: '12px' },
            ].map((spec, i) => (
              <div key={spec.label} className="flex justify-between text-[9px]">
                <span className="text-gray-500">{spec.label}</span>
                <span className="text-gray-900 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🎨', '✨', '📐'].map((emoji, i) => (
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
