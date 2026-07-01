// src/components/animations/ProjectsHeroAnimation.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function ProjectsHeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();

  const projects = [
    { color: 'from-blue-500 to-cyan-500', label: 'E-Commerce', icon: '🛒' },
    { color: 'from-purple-500 to-pink-500', label: 'SaaS App', icon: '☁️' },
    { color: 'from-emerald-500 to-teal-500', label: 'Mobile App', icon: '📱' },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Main Gallery Stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Stacked Project Cards */}
        {projects.map((project, index) => (
          <motion.div
            key={project.label}
            className="absolute"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              x: (index - 1) * (dir === 'rtl' ? -30 : 30),
              rotate: (index - 1) * 5,
            }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <motion.div
              className={`w-44 h-56 rounded-2xl bg-gradient-to-br ${project.color} shadow-xl overflow-hidden cursor-pointer`}
              style={{ zIndex: 3 - index }}
              whileHover={{ scale: 1.05, rotate: 0, y: -10 }}
              animate={{
                y: [0, index % 2 === 0 ? -5 : 5, 0],
              }}
              transition={{
                y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Card Content */}
              <div className="p-4 h-full flex flex-col">
                {/* Browser Dots */}
                <div className="flex gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                </div>

                {/* Mockup Content */}
                <div className="flex-1 bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="h-2 bg-white/40 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-white/30 rounded mb-2 w-1/2" />
                  <div className="h-8 bg-white/20 rounded mt-3" />
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <div className="h-6 bg-white/20 rounded" />
                    <div className="h-6 bg-white/20 rounded" />
                  </div>
                </div>

                {/* Project Label */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl">{project.icon}</span>
                  <span className="text-xs font-medium text-white/90">{project.label}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Stats Card */}
      <motion.div
        className="absolute z-20"
        style={{
          right: dir === 'rtl' ? 'auto' : '2%',
          left: dir === 'rtl' ? '2%' : 'auto',
          top: '5%'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.4 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[110px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Projects</div>
          <div className="flex items-end gap-1">
            <motion.span
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              100+
            </motion.span>
            <span className="text-[10px] text-emerald-600 font-medium mb-1">Delivered</span>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Floating */}
      <motion.div
        className="absolute z-20"
        style={{
          left: dir === 'rtl' ? 'auto' : '2%',
          right: dir === 'rtl' ? '2%' : 'auto',
          bottom: '15%'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[100px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Tech Stack</div>
          <div className="flex flex-wrap gap-1">
            {['React', 'Node', 'AWS', 'AI'].map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2 py-0.5 text-[8px] bg-gray-100 text-gray-700 rounded font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Client Satisfaction */}
      <motion.div
        className="absolute z-20"
        style={{
          right: dir === 'rtl' ? 'auto' : '10%',
          left: dir === 'rtl' ? '10%' : 'auto',
          bottom: '5%'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 3, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
          <div className="flex -space-x-2">
            {['🧑‍💻', '👨‍💼', '👩‍💻'].map((emoji, i) => (
              <motion.div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
          <div>
            <div className="text-[9px] text-gray-500">Satisfaction</div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gray-900">98%</span>
              <span className="text-amber-500 text-xs">⭐</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Project Button */}
      <motion.div
        className="absolute z-30 left-1/2 -translate-x-1/2"
        style={{ bottom: '28%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button
          className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View All</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40"
          style={{
            background: `linear-gradient(135deg, ${['#1a3a6b', '#8B5CF6', '#0e7c7b', '#F59E0B', '#EC4899'][i]}, transparent)`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            x: [-4, 4, -4],
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
