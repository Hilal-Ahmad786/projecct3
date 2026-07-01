// src/components/animations/service-animations/CybersecurityAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function CybersecurityAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Shield Center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 w-[200px] h-[200px] rounded-full border-4 border-green-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <motion.div
                key={angle}
                className="absolute w-3 h-3 bg-green-500 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-100px) translateX(-50%)`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
              />
            ))}
          </motion.div>

          {/* Shield */}
          <motion.div
            className="w-[200px] h-[200px] flex items-center justify-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative">
              <svg width="120" height="140" viewBox="0 0 120 140">
                <motion.path
                  d="M60 10 L110 35 L110 80 C110 110 85 130 60 135 C35 130 10 110 10 80 L10 35 Z"
                  fill="url(#shield-gradient)"
                  stroke="#0e7c7b"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <defs>
                  <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0e7c7b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Lock Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <span className="text-4xl">🔒</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0 w-[200px] h-[200px] overflow-hidden rounded-full"
            style={{ clipPath: 'circle(50% at 50% 50%)' }}
          >
            <motion.div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Threat Monitor Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Threats</div>
          <div className="space-y-1.5">
            {[
              { type: 'Blocked', count: '1,247', color: 'text-red-500' },
              { type: 'Scanned', count: '45.2K', color: 'text-blue-500' },
              { type: 'Safe', count: '100%', color: 'text-green-500' },
            ].map((item, i) => (
              <div key={item.type} className="flex justify-between items-center">
                <span className="text-[9px] text-gray-500">{item.type}</span>
                <motion.span
                  className={`text-[10px] font-bold ${item.color}`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.count}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Security Status Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Protection</div>
          <div className="space-y-1.5">
            {['Firewall', 'Encryption', 'Auth 2FA'].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <motion.div
                  className="w-4 h-4 bg-green-100 rounded flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="text-[10px]">✓</span>
                </motion.div>
                <span className="text-[9px] text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Alert Badge */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '15%', left: dir === 'rtl' ? '15%' : 'auto', bottom: '28%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-green-500 text-white rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
          <span className="text-lg">✅</span>
          <div>
            <div className="text-[10px] font-bold">Secure</div>
            <div className="text-[8px] opacity-80">All systems</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🛡️', '🔐', '⚠️'].map((emoji, i) => (
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
