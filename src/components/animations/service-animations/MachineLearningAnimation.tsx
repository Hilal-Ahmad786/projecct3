// src/components/animations/service-animations/MachineLearningAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function MachineLearningAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Neural Network Visualization */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[260px] h-[220px]">
          {/* Network Layers */}
          <svg className="w-full h-full">
            {/* Input Layer */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={`input-${i}`}
                cx="40"
                cy={40 + i * 50}
                r="12"
                fill="#1a3a6b"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * i }}
              />
            ))}

            {/* Hidden Layer 1 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`hidden1-${i}`}
                cx="100"
                cy={25 + i * 42}
                r="10"
                fill="#8B5CF6"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.3 + 0.1 * i, duration: 2, repeat: Infinity }}
              />
            ))}

            {/* Hidden Layer 2 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`hidden2-${i}`}
                cx="160"
                cy={25 + i * 42}
                r="10"
                fill="#EC4899"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.5 + 0.1 * i, duration: 2, repeat: Infinity }}
              />
            ))}

            {/* Output Layer */}
            {[0, 1].map((i) => (
              <motion.circle
                key={`output-${i}`}
                cx="220"
                cy={80 + i * 60}
                r="14"
                fill="#0e7c7b"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + 0.1 * i }}
              />
            ))}

            {/* Connections - Input to Hidden 1 */}
            {[0, 1, 2, 3].map((i) =>
              [0, 1, 2, 3, 4].map((j) => (
                <motion.line
                  key={`conn1-${i}-${j}`}
                  x1="52"
                  y1={40 + i * 50}
                  x2="90"
                  y2={25 + j * 42}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.2 + i * 0.05 + j * 0.02 }}
                />
              ))
            )}

            {/* Connections - Hidden 1 to Hidden 2 */}
            {[0, 1, 2, 3, 4].map((i) =>
              [0, 1, 2, 3, 4].map((j) => (
                <motion.line
                  key={`conn2-${i}-${j}`}
                  x1="110"
                  y1={25 + i * 42}
                  x2="150"
                  y2={25 + j * 42}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.4 + i * 0.03 + j * 0.02 }}
                />
              ))
            )}

            {/* Connections - Hidden 2 to Output */}
            {[0, 1, 2, 3, 4].map((i) =>
              [0, 1].map((j) => (
                <motion.line
                  key={`conn3-${i}-${j}`}
                  x1="170"
                  y1={25 + i * 42}
                  x2="206"
                  y2={80 + j * 60}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.6 + i * 0.03 + j * 0.02 }}
                />
              ))
            )}

            {/* Animated Signal */}
            <motion.circle
              r="4"
              fill="#FBBF24"
              animate={{
                cx: [40, 100, 160, 220],
                cy: [90, 109, 67, 80],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Training Progress Card */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[110px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Training</div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-gray-500">Epoch</span>
                <span className="text-gray-900 font-medium">147/200</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  animate={{ width: ['0%', '73%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[9px]">
              <span className="text-gray-500">Accuracy</span>
              <motion.span
                className="text-green-500 font-bold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                96.4%
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Model Card */}
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
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3 w-[100px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Model</div>
          <div className="space-y-1">
            {['CNN', 'LSTM', 'Transformer'].map((model, i) => (
              <motion.div
                key={model}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-[9px] text-gray-700">{model}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['🧠', '📊', '🎯'].map((emoji, i) => (
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
