// src/components/animations/AboutHeroAnimation.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function AboutHeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();

  const teamMembers = [
    { initials: 'PK', color: 'from-blue-500 to-cyan-500', delay: 0 },
    { initials: 'AM', color: 'from-purple-500 to-pink-500', delay: 0.1 },
    { initials: 'SK', color: 'from-emerald-500 to-teal-500', delay: 0.2 },
    { initials: 'RD', color: 'from-amber-500 to-orange-500', delay: 0.3 },
  ];

  const values = [
    { icon: '🎯', label: 'Mission', value: 'Excellence' },
    { icon: '💡', label: 'Innovation', value: 'Creative' },
    { icon: '🤝', label: 'Trust', value: 'Reliable' },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Central Team Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer Rings */}
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-gray-200/30"
          animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-52 h-52 rounded-full border border-dashed border-gray-300/40"
          animate={{ rotate: prefersReducedMotion ? 0 : -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {/* Team Members Circle */}
        <div className="relative w-40 h-40">
          {teamMembers.map((member, index) => {
            const angle = (index * 90 - 45) * (Math.PI / 180);
            const radius = 70;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const adjustedX = dir === 'rtl' ? -x : x;

            return (
              <motion.div
                key={member.initials}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${adjustedX}px), calc(-50% + ${y}px))`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: member.delay, duration: 0.5 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-white`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                  whileHover={{ scale: 1.15 }}
                >
                  {member.initials}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center Logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-xl flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-2xl">🌟</span>
          </motion.div>
        </div>
      </div>

      {/* Growth Chart Card */}
      <motion.div
        className="absolute z-20"
        style={{
          right: dir === 'rtl' ? 'auto' : '0%',
          left: dir === 'rtl' ? '0%' : 'auto',
          top: '5%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[130px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Growth</span>
            <span className="text-[10px] text-emerald-600 font-semibold">+127%</span>
          </div>
          <svg className="w-full h-12" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="growthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,35 Q15,30 25,28 T50,20 T75,12 T100,5"
              fill="none"
              stroke="rgb(16,185,129)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
            />
            <motion.path
              d="M0,35 Q15,30 25,28 T50,20 T75,12 T100,5 V40 H0 Z"
              fill="url(#growthGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Timeline Card */}
      <motion.div
        className="absolute z-20"
        style={{
          left: dir === 'rtl' ? 'auto' : '0%',
          right: dir === 'rtl' ? '0%' : 'auto',
          bottom: '15%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[120px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Journey</div>
          <div className="space-y-2">
            {[
              { year: '2019', event: 'Founded' },
              { year: '2021', event: 'Expanded' },
              { year: '2024', event: 'Global' },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[9px] font-medium text-gray-900">{item.year}</span>
                <span className="text-[9px] text-gray-500">{item.event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Values Cards */}
      {values.map((value, index) => {
        const positions = [
          { top: '65%', right: dir === 'rtl' ? 'auto' : '5%', left: dir === 'rtl' ? '5%' : 'auto' },
          { top: '25%', left: dir === 'rtl' ? 'auto' : '10%', right: dir === 'rtl' ? '10%' : 'auto' },
          { bottom: '5%', right: dir === 'rtl' ? 'auto' : '30%', left: dir === 'rtl' ? '30%' : 'auto' },
        ];

        return (
          <motion.div
            key={value.label}
            className="absolute z-10"
            style={positions[index]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, index % 2 === 0 ? -6 : 6, 0],
            }}
            transition={{
              opacity: { delay: 0.3 + index * 0.15, duration: 0.4 },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-md">
              <span className="text-lg">{value.icon}</span>
              <div>
                <div className="text-[9px] text-gray-500">{value.label}</div>
                <div className="text-[10px] font-semibold text-gray-800">{value.value}</div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <defs>
          <linearGradient id="aboutLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
          </linearGradient>
        </defs>
        {/* Connecting lines between team members */}
        <motion.circle
          cx="210"
          cy="210"
          r="100"
          stroke="url(#aboutLineGrad)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="3,6"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 opacity-50"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            x: [-4, 4, -4],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
