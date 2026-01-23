// src/components/animations/service-animations/AutomationAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function AutomationAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Workflow Diagram */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[280px] h-[220px]">
          {/* Workflow Nodes */}
          {[
            { x: 30, y: 30, icon: '📥', label: 'Input' },
            { x: 180, y: 30, icon: '⚙️', label: 'Process' },
            { x: 30, y: 150, icon: '🔄', label: 'Loop' },
            { x: 180, y: 150, icon: '📤', label: 'Output' },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: node.x, top: node.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center"
                animate={i === 1 ? { rotate: [0, 360] } : { scale: [1, 1.05, 1] }}
                transition={{
                  duration: i === 1 ? 4 : 2,
                  repeat: Infinity,
                  ease: i === 1 ? 'linear' : 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                <span className="text-xl">{node.icon}</span>
                <span className="text-[8px] text-gray-500 mt-1">{node.label}</span>
              </motion.div>
            </motion.div>
          ))}

          {/* Connection Arrows */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Horizontal line top */}
            <motion.line
              x1="95" y1="55" x2="180" y2="55"
              stroke="#3B82F6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            {/* Vertical line right */}
            <motion.line
              x1="210" y1="95" x2="210" y2="150"
              stroke="#3B82F6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
            {/* Horizontal line bottom */}
            <motion.line
              x1="95" y1="175" x2="180" y2="175"
              stroke="#3B82F6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
            {/* Vertical line left */}
            <motion.line
              x1="55" y1="95" x2="55" y2="150"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4,4"
              markerEnd="url(#arrowhead-green)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
              </marker>
              <marker
                id="arrowhead-green"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
              </marker>
            </defs>
          </svg>

          {/* Animated Data Packet */}
          <motion.div
            className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg"
            animate={{
              x: [95, 180, 180, 95, 95],
              y: [55, 55, 175, 175, 55],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </motion.div>

      {/* Scripts Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Scripts</div>
          <div className="space-y-1">
            {['data_sync.py', 'backup.sh', 'monitor.py'].map((script, i) => (
              <motion.div
                key={script}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="text-[10px]">🐍</span>
                <span className="text-[9px] text-gray-700 font-mono">{script}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        className="absolute z-20"
        style={{ left: dir === 'rtl' ? 'auto' : '5%', right: dir === 'rtl' ? '5%' : 'auto', bottom: '10%' }}
        initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[100px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Saved</div>
          <motion.div
            className="text-xl font-bold text-green-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            40h
          </motion.div>
          <div className="text-[8px] text-gray-500">Per Week</div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🤖', '⏰', '🔧'].map((emoji, i) => (
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
