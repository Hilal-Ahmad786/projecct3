// src/components/animations/service-animations/EcommerceAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function EcommerceAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Shopping Interface */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[300px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Store Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="text-white font-bold text-sm">Store</div>
          <div className="flex items-center gap-2">
            <span className="text-white text-lg">🔍</span>
            <div className="relative">
              <span className="text-white text-lg">🛒</span>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-white text-orange-500 rounded-full text-[10px] flex items-center justify-center font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                3
              </motion.div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="bg-gray-50 rounded-lg p-2 border border-gray-100"
                whileHover={{ scale: 1.02 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: item * 0.2 }}
              >
                <div className="h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-2" />
                <div className="h-1.5 bg-gray-200 rounded w-3/4 mb-1" />
                <div className="flex justify-between items-center">
                  <div className="h-2 bg-orange-400 rounded w-10" />
                  <div className="w-4 h-4 bg-orange-500 rounded text-white text-[8px] flex items-center justify-center">
                    +
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Promo Banner */}
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-white"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-[10px] font-bold">🎉 Flash Sale!</div>
            <div className="text-[8px] opacity-80">Up to 50% off</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Cart Summary Card */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Cart Total</div>
          <motion.div
            className="text-xl font-bold text-gray-900"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            $299
          </motion.div>
          <div className="text-[9px] text-green-500 mt-1">Free shipping!</div>
        </div>
      </motion.div>

      {/* Payment Methods */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[100px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Payments</div>
          <div className="flex flex-wrap gap-1">
            {['💳', '🏦', '📱'].map((icon, i) => (
              <motion.div
                key={i}
                className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Badge */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '10%', left: dir === 'rtl' ? '10%' : 'auto', bottom: '25%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-green-500 text-white rounded-lg px-3 py-2 shadow-lg">
          <div className="text-[10px] font-bold">+127%</div>
          <div className="text-[8px] opacity-80">Sales Growth</div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🛍️', '💰', '📦'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-50"
          style={{
            left: `${15 + i * 30}%`,
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
