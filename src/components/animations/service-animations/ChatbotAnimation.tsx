// src/components/animations/service-animations/ChatbotAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function ChatbotAnimation() {
  const { dir } = useTranslations();

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square" dir={dir}>
      {/* Chat Interface */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
          <motion.div
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl">🤖</span>
          </motion.div>
          <div>
            <div className="text-white font-bold text-sm">AI Assistant</div>
            <div className="flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-white/80 text-[10px]">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-3 space-y-3 h-[200px] overflow-hidden">
          {/* User Message */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-blue-500 text-white rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%]">
              <p className="text-[10px]">How can you help me?</p>
            </div>
          </motion.div>

          {/* Bot Message */}
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
              <p className="text-[10px] text-gray-700">
                I can assist with customer support, answer questions, and automate tasks 24/7!
              </p>
            </div>
          </motion.div>

          {/* Typing Indicator */}
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-200">
              <motion.span
                className="text-[10px] text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Type a message...
              </motion.span>
            </div>
            <motion.button
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white text-sm">→</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Features Card */}
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Features</div>
          <div className="space-y-1">
            {['NLP', 'Multi-lang', '24/7'].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] text-gray-700">{feature}</span>
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
          <div className="text-[9px] text-gray-500 uppercase tracking-wide mb-2">Response</div>
          <motion.div
            className="text-xl font-bold text-green-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {'<'}1s
          </motion.div>
          <div className="text-[8px] text-gray-500">Avg. Time</div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {['💬', '🎯', '⚡'].map((emoji, i) => (
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
