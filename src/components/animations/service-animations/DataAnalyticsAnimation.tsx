// src/components/animations/service-animations/DataAnalyticsAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function DataAnalyticsAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Main Dashboard */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600">
          <div className="text-white font-bold text-sm">Data Insights</div>
          <div className="text-white text-sm">📊</div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3">
          {/* Line Chart */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-[9px] text-gray-500 uppercase mb-2">Revenue Trend</div>
            <svg className="w-full h-16" viewBox="0 0 200 60">
              <motion.path
                d="M 0 50 L 25 45 L 50 48 L 75 30 L 100 35 L 125 20 L 150 25 L 175 10 L 200 15"
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 0 50 L 25 45 L 50 48 L 75 30 L 100 35 L 125 20 L 150 25 L 175 10 L 200 15 L 200 60 L 0 60 Z"
                fill="url(#area-gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#1a3a6b" />
                </linearGradient>
                <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Pie Chart + Stats */}
          <div className="grid grid-cols-2 gap-2">
            {/* Mini Pie Chart */}
            <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 40 40">
                <motion.circle
                  cx="20"
                  cy="20"
                  r="15"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="15"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="5"
                  strokeDasharray="94"
                  strokeDashoffset="94"
                  transform="rotate(-90 20 20)"
                  animate={{ strokeDashoffset: 30 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="15"
                  fill="none"
                  stroke="#1a3a6b"
                  strokeWidth="5"
                  strokeDasharray="94"
                  strokeDashoffset="94"
                  transform="rotate(145 20 20)"
                  animate={{ strokeDashoffset: 60 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </svg>
            </div>

            {/* Stats */}
            <div className="space-y-1.5">
              {[
                { label: 'Users', value: '24.5K', color: 'bg-indigo-500' },
                { label: 'Sessions', value: '89.2K', color: 'bg-blue-500' },
                { label: 'Events', value: '1.2M', color: 'bg-cyan-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                  <div className="flex-1">
                    <div className="text-[8px] text-gray-500">{stat.label}</div>
                    <div className="text-[10px] font-bold text-gray-900">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Card */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '5%', left: dir === 'rtl' ? '5%' : 'auto', top: '8%' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[100px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-1">Key KPI</div>
          <motion.div
            className="text-xl font-bold text-indigo-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +47%
          </motion.div>
          <div className="text-[8px] text-gray-500">vs last month</div>
        </div>
      </motion.div>

      {/* Data Sources Card */}
      <motion.div
        className="absolute z-20"
        style={{ left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto', bottom: '12%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Data Sources</div>
          <div className="space-y-1">
            {['SQL DB', 'API Feed', 'CSV Files'].map((source, i) => (
              <motion.div
                key={source}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="text-[9px] text-gray-700">{source}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['📈', '🔢', '💹'].map((emoji, i) => (
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
