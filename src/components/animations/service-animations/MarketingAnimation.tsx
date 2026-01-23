// src/components/animations/service-animations/MarketingAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function MarketingAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Analytics Dashboard */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[240px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dashboard Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-white font-bold text-sm">Analytics</div>
          <div className="flex gap-2">
            <span className="text-white text-sm">📊</span>
            <span className="text-white text-sm">📈</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 space-y-3">
          {/* Growth Chart */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] text-gray-500 uppercase">Traffic Growth</span>
              <motion.span
                className="text-[10px] text-green-500 font-bold"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                +156%
              </motion.span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[30, 45, 35, 60, 50, 75, 65, 90].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Visitors', value: '12.4K', trend: '+12%' },
              { label: 'Leads', value: '847', trend: '+28%' },
              { label: 'Conv.', value: '6.8%', trend: '+5%' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                className="bg-gray-50 rounded-lg p-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="text-[8px] text-gray-500">{metric.label}</div>
                <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                <div className="text-[8px] text-green-500">{metric.trend}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social Media Card */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[100px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Channels</div>
          <div className="flex gap-1">
            {['📱', '📧', '🔍', '📢'].map((icon, i) => (
              <motion.div
                key={i}
                className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Campaign Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Active Campaigns</div>
          <div className="space-y-1.5">
            {['SEO Boost', 'Email Flow', 'PPC Ads'].map((campaign, i) => (
              <motion.div
                key={campaign}
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
                <span className="text-[9px] text-gray-700">{campaign}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ROI Badge */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '15%', left: dir === 'rtl' ? '15%' : 'auto', bottom: '25%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-2 shadow-lg">
          <div className="text-[8px] opacity-80">ROI</div>
          <div className="text-lg font-bold">340%</div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🎯', '💡', '🚀'].map((emoji, i) => (
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
