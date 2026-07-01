// src/components/animations/service-animations/DevOpsAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function DevOpsAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* CI/CD Pipeline */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[280px] h-[200px]">
          {/* Pipeline Steps */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between">
            {[
              { icon: '📝', label: 'Code', color: 'from-blue-500 to-blue-600' },
              { icon: '🔨', label: 'Build', color: 'from-orange-500 to-orange-600' },
              { icon: '🧪', label: 'Test', color: 'from-purple-500 to-purple-600' },
              { icon: '🚀', label: 'Deploy', color: 'from-green-500 to-green-600' },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl shadow-lg flex flex-col items-center justify-center`}
                  animate={{
                    boxShadow: [
                      '0 4px 6px rgba(0,0,0,0.1)',
                      '0 8px 20px rgba(0,0,0,0.2)',
                      '0 4px 6px rgba(0,0,0,0.1)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="text-xl">{step.icon}</span>
                </motion.div>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 whitespace-nowrap">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Connecting Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.g key={i}>
                <motion.line
                  x1={50 + i * 75}
                  y1="100"
                  x2={90 + i * 75}
                  y2="100"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  markerEnd="url(#pipeline-arrow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
                />
                <motion.circle
                  cx={70 + i * 75}
                  cy="100"
                  r="3"
                  fill="#1a3a6b"
                  initial={{ scale: 0 }}
                  animate={{
                    x: [0, 20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              </motion.g>
            ))}
            <defs>
              <marker
                id="pipeline-arrow"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
              </marker>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Cloud Services Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Cloud</div>
          <div className="flex flex-wrap gap-1">
            {['☁️', '🔷', '🟠'].map((icon, i) => (
              <motion.div
                key={i}
                className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <span className="text-sm">{icon}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Metrics Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Metrics</div>
          <div className="space-y-1.5">
            {[
              { label: 'Uptime', value: '99.99%' },
              { label: 'Deploy', value: '< 5min' },
              { label: 'Recovery', value: '< 1hr' },
            ].map((metric, i) => (
              <div key={metric.label} className="flex justify-between text-[9px]">
                <span className="text-gray-500">{metric.label}</span>
                <span className="text-gray-900 font-medium">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Container Badge */}
      <motion.div
        className="absolute z-20"
        style={{ right: dir === 'rtl' ? 'auto' : '15%', left: dir === 'rtl' ? '15%' : 'auto', bottom: '25%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-blue-600 text-white rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
          <span className="text-lg">🐳</span>
          <div>
            <div className="text-[8px] opacity-80">Containers</div>
            <div className="text-sm font-bold">12 Running</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['⚙️', '🔒', '📊'].map((emoji, i) => (
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
