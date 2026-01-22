// src/components/animations/ServicesHeroAnimation.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function ServicesHeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();

  const services = [
    { icon: '💻', label: 'Web Dev', color: 'from-blue-500 to-cyan-500', angle: 0 },
    { icon: '📱', label: 'Mobile', color: 'from-purple-500 to-pink-500', angle: 60 },
    { icon: '🤖', label: 'AI/ML', color: 'from-emerald-500 to-teal-500', angle: 120 },
    { icon: '⚡', label: 'Automation', color: 'from-amber-500 to-orange-500', angle: 180 },
    { icon: '🎨', label: 'Design', color: 'from-violet-500 to-purple-500', angle: 240 },
    { icon: '☁️', label: 'Cloud', color: 'from-sky-500 to-blue-500', angle: 300 },
  ];

  const codeLines = [
    'const build = async () => {',
    '  await deploy(services);',
    '  return success;',
    '};',
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Central Hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-48 h-48"
          animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {/* Orbital Ring */}
          <div className="absolute inset-0 rounded-full border border-gray-200/50" />
          <div className="absolute inset-4 rounded-full border border-gray-200/30" />
          <div className="absolute inset-8 rounded-full border border-dashed border-gray-300/40" />
        </motion.div>

        {/* Center Icon */}
        <motion.div
          className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-xl flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 10px 40px rgba(0,0,0,0.2)',
              '0 15px 50px rgba(0,0,0,0.3)',
              '0 10px 40px rgba(0,0,0,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-3xl">🚀</span>
        </motion.div>
      </div>

      {/* Floating Service Cards */}
      {services.map((service, index) => {
        const radius = 140;
        const angle = (service.angle * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const adjustedX = dir === 'rtl' ? -x : x;

        return (
          <motion.div
            key={service.label}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${adjustedX}px), calc(-50% + ${y}px))`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, index % 2 === 0 ? -8 : 8, 0],
            }}
            transition={{
              opacity: { delay: index * 0.1, duration: 0.5 },
              scale: { delay: index * 0.1, duration: 0.5 },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="text-lg">{service.icon}</span>
              </div>
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{service.label}</span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Code Snippet Card */}
      <motion.div
        className="absolute z-20"
        style={{
          left: dir === 'rtl' ? '5%' : 'auto',
          right: dir === 'rtl' ? 'auto' : '5%',
          top: '10%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[140px] rounded-lg bg-gray-900 shadow-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="p-3 font-mono text-[9px] leading-relaxed">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.2 }}
              >
                <span className="text-purple-400">{line.includes('const') ? 'const ' : ''}</span>
                <span className="text-blue-400">{line.includes('async') ? 'async ' : ''}</span>
                <span className="text-emerald-400">{line.includes('await') ? 'await ' : ''}</span>
                <span className="text-gray-300">{line.replace(/const |async |await /g, '')}</span>
              </motion.div>
            ))}
            <motion.span
              className="inline-block w-1.5 h-3 bg-emerald-500 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Metrics Card */}
      <motion.div
        className="absolute z-20"
        style={{
          left: dir === 'rtl' ? 'auto' : '5%',
          right: dir === 'rtl' ? '5%' : 'auto',
          bottom: '10%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, 5, 0],
        }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[120px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Performance</div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] text-gray-600 mb-1">
                <span>Speed</span>
                <span className="text-emerald-600">98%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-gray-600 mb-1">
                <span>Quality</span>
                <span className="text-blue-600">95%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '95%' }}
                  transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M210,210 Q280,150 350,180"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M210,210 Q140,270 70,250"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}
