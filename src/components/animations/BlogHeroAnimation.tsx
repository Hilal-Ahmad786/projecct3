// src/components/animations/BlogHeroAnimation.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function BlogHeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();

  const articles = [
    { title: 'AI Trends 2024', category: 'Technology', color: 'bg-blue-500', readTime: '5 min' },
    { title: 'React Best Practices', category: 'Development', color: 'bg-emerald-500', readTime: '8 min' },
    { title: 'Cloud Architecture', category: 'DevOps', color: 'bg-purple-500', readTime: '6 min' },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Central Book/Article Stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main Article Card */}
        <motion.div
          className="relative w-48 h-60 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Image Area */}
          <div className="h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 left-2 w-6 h-6 border-2 border-white/40 rounded" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-2 border-white/40 rounded-full" />
            </div>
            {/* Play Button (for video content) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
            </motion.div>
          </div>

          {/* Article Content */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[9px] bg-blue-100 text-blue-700 rounded-full font-medium">
                Featured
              </span>
              <span className="text-[9px] text-gray-400">5 min read</span>
            </div>
            <motion.div
              className="h-2 bg-gray-200 rounded mb-2 w-full"
              animate={{ width: ['90%', '100%', '90%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="h-2 bg-gray-100 rounded mb-2 w-3/4" />
            <div className="h-2 bg-gray-100 rounded w-1/2" />

            {/* Author */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
              <div className="flex-1">
                <div className="h-1.5 bg-gray-200 rounded w-16" />
                <div className="h-1 bg-gray-100 rounded w-12 mt-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Cards (Stacked Effect) */}
        {[-1, 1].map((offset) => (
          <motion.div
            key={offset}
            className="absolute w-44 h-56 bg-white/80 rounded-xl shadow-md border border-gray-100"
            style={{
              transform: `translateX(${offset * (dir === 'rtl' ? -15 : 15)}px) scale(0.95)`,
              zIndex: -1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
          />
        ))}
      </div>

      {/* Floating Article Previews */}
      {articles.map((article, index) => {
        const positions = [
          { top: '5%', left: dir === 'rtl' ? 'auto' : '0%', right: dir === 'rtl' ? '0%' : 'auto' },
          { top: '30%', right: dir === 'rtl' ? 'auto' : '0%', left: dir === 'rtl' ? '0%' : 'auto' },
          { bottom: '15%', left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto' },
        ];

        return (
          <motion.div
            key={article.title}
            className="absolute z-10"
            style={positions[index]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, index % 2 === 0 ? -5 : 5, 0],
            }}
            transition={{
              opacity: { delay: 0.4 + index * 0.15, duration: 0.4 },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="w-[120px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg p-2.5 cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-2 h-2 rounded-full ${article.color}`} />
                <span className="text-[8px] text-gray-500">{article.category}</span>
              </div>
              <div className="text-[10px] font-medium text-gray-800 leading-tight mb-1">
                {article.title}
              </div>
              <div className="text-[8px] text-gray-400">{article.readTime}</div>
            </div>
          </motion.div>
        );
      })}

      {/* Stats Widget */}
      <motion.div
        className="absolute z-20"
        style={{
          right: dir === 'rtl' ? 'auto' : '5%',
          left: dir === 'rtl' ? '5%' : 'auto',
          bottom: '5%'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 3, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[100px] rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl p-3">
          <div className="text-[10px] text-gray-500 mb-1">Monthly Reads</div>
          <div className="flex items-end gap-1">
            <span className="text-xl font-bold text-gray-900">50K+</span>
          </div>
          <div className="flex gap-0.5 mt-2">
            {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                style={{ height: `${h / 4}px` }}
                initial={{ height: 0 }}
                animate={{ height: `${h / 4}px` }}
                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subscribe Widget */}
      <motion.div
        className="absolute z-20"
        style={{
          top: '60%',
          right: dir === 'rtl' ? 'auto' : '0%',
          left: dir === 'rtl' ? '0%' : 'auto'
        }}
        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-[110px] rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-xl p-3">
          <div className="text-[10px] text-gray-300 mb-2">Newsletter</div>
          <div className="flex items-center gap-1.5 mb-2">
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[9px] text-emerald-400">2.5K+ subscribers</span>
          </div>
          <motion.button
            className="w-full py-1.5 bg-white text-gray-900 text-[9px] font-medium rounded"
            whileHover={{ scale: 1.02 }}
          >
            Subscribe →
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Reading Elements */}
      {['📖', '💡', '🎯', '✨'].map((emoji, i) => {
        const positions = [
          { top: '15%', left: '25%' },
          { top: '70%', right: '25%' },
          { bottom: '30%', left: '15%' },
          { top: '40%', left: '10%' },
        ];

        return (
          <motion.div
            key={i}
            className="absolute text-lg opacity-50"
            style={positions[i]}
            animate={{
              y: [-5, 5, -5],
              rotate: [-5, 5, -5],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        );
      })}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="blogLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
          </linearGradient>
        </defs>
        <motion.path
          d={dir === 'rtl'
            ? "M100,100 Q150,150 210,210 T320,320"
            : "M320,100 Q270,150 210,210 T100,320"
          }
          stroke="url(#blogLineGrad)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}
