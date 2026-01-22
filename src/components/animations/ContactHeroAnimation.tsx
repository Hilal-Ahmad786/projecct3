// src/components/animations/ContactHeroAnimation.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function ContactHeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Central Message Envelope */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Envelope Body */}
          <motion.div
            className="w-32 h-24 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Envelope Flap */}
            <motion.div
              className="absolute -top-1 left-0 right-0 h-14 bg-gradient-to-b from-gray-100 to-white"
              style={{
                clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
              }}
              animate={{ rotateX: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Message Lines */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
              <motion.div
                className="h-1.5 bg-gray-200 rounded-full w-3/4"
                animate={{ width: ['60%', '75%', '60%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="h-1.5 bg-gray-200 rounded-full w-1/2"
                animate={{ width: ['40%', '50%', '40%'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Animated Check Mark */}
          <motion.div
            className="absolute -right-4 -top-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Orbiting Contact Methods */}
      {[
        { icon: '📧', label: 'Email', angle: -30, color: 'from-blue-500 to-cyan-500' },
        { icon: '📱', label: 'Phone', angle: 60, color: 'from-emerald-500 to-teal-500' },
        { icon: '💬', label: 'Chat', angle: 150, color: 'from-purple-500 to-pink-500' },
        { icon: '📍', label: 'Location', angle: 240, color: 'from-amber-500 to-orange-500' },
      ].map((item, index) => {
        const radius = 130;
        const angle = (item.angle * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const adjustedX = dir === 'rtl' ? -x : x;

        return (
          <motion.div
            key={item.label}
            className="absolute left-1/2 top-1/2 z-10"
            style={{
              transform: `translate(calc(-50% + ${adjustedX}px), calc(-50% + ${y}px))`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, index % 2 === 0 ? -6 : 6, 0],
            }}
            transition={{
              opacity: { delay: 0.2 + index * 0.1, duration: 0.4 },
              y: { duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Form Preview Card */}
      <motion.div
        className="absolute z-20"
        style={{
          left: dir === 'rtl' ? 'auto' : '5%',
          right: dir === 'rtl' ? '5%' : 'auto',
          top: '8%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[130px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Quick Contact</div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-100 rounded-md flex items-center px-2">
              <span className="text-[9px] text-gray-400">Your name...</span>
            </div>
            <div className="h-6 bg-gray-100 rounded-md flex items-center px-2">
              <span className="text-[9px] text-gray-400">Email...</span>
            </div>
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-900 to-gray-700 rounded-md flex items-center justify-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[9px] text-white font-medium">Send →</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Response Time Card */}
      <motion.div
        className="absolute z-20"
        style={{
          right: dir === 'rtl' ? 'auto' : '5%',
          left: dir === 'rtl' ? '5%' : 'auto',
          bottom: '12%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[110px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] text-emerald-600 font-medium">Online Now</span>
          </div>
          <div className="text-[9px] text-gray-500">Avg. Response</div>
          <div className="text-lg font-bold text-gray-900">&lt; 24h</div>
        </div>
      </motion.div>

      {/* Connection Waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-blue-200"
            style={{ width: 80 + ring * 60, height: 80 + ring * 60 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ring * 0.5,
            }}
          />
        ))}
      </div>

      {/* Flying Message Icons */}
      {[...Array(4)].map((_, i) => {
        const startX = dir === 'rtl' ? '90%' : '10%';
        const endX = dir === 'rtl' ? '10%' : '90%';

        return (
          <motion.div
            key={i}
            className="absolute text-lg opacity-40"
            style={{ top: `${20 + i * 20}%` }}
            animate={{
              x: [startX, endX],
              y: [0, -20, 0, 20, 0],
              opacity: [0, 0.6, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
          >
            ✉️
          </motion.div>
        );
      })}

      {/* Decorative Dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-40"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [-6, 6, -6],
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
