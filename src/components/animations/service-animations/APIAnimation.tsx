// src/components/animations/service-animations/APIAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function APIAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* API Terminal */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[220px] bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono">api-request.sh</span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-[10px] space-y-2">
          <motion.div
            className="text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            $ curl -X GET /api/v1/users
          </motion.div>

          <motion.div
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            → Fetching data...
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded p-2 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="text-purple-400">{'{'}</span>
            <br />
            <span className="text-blue-400 ml-2">"status"</span>
            <span className="text-gray-400">: </span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              200
            </motion.span>
            <span className="text-gray-400">,</span>
            <br />
            <span className="text-blue-400 ml-2">"data"</span>
            <span className="text-gray-400">: </span>
            <span className="text-yellow-400">[...]</span>
            <br />
            <span className="text-purple-400">{'}'}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-green-400">$</span>
            <motion.span
              className="w-2 h-4 bg-green-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Endpoint Card */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[120px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Endpoints</div>
          <div className="space-y-1">
            {[
              { method: 'GET', path: '/users', color: 'bg-green-500' },
              { method: 'POST', path: '/create', color: 'bg-blue-500' },
              { method: 'PUT', path: '/update', color: 'bg-orange-500' },
            ].map((endpoint, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className={`${endpoint.color} text-white text-[7px] px-1 rounded font-bold`}>
                  {endpoint.method}
                </span>
                <span className="text-[8px] text-gray-600 font-mono">{endpoint.path}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Status Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Status</div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-medium text-green-600">All Systems Go</span>
          </div>
          <div className="mt-2 text-[8px] text-gray-500">99.9% Uptime</div>
        </div>
      </motion.div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <motion.path
          d="M 100 200 Q 150 150 200 200"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating Elements */}
      {['🔗', '📡', '⚡'].map((emoji, i) => (
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
