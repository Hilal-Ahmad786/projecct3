// src/components/CtaBanner.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function CtaBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="
        relative overflow-hidden pt-28 pb-36
        bg-gradient-to-br from-[#1E531B]/10 via-white/80 to-[#FFB800]/10
        text-[#1E531B]
      "
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern-diagonal.svg')] opacity-5 pointer-events-none" />

      {/* Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C600,100 600,100 1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-[#FFB800]/20"
          />
        </svg>
      </div>

      {/* Blurred blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#FFB800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-[#1E531B]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative container mx-auto px-6 text-center z-10">
        <motion.h2
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
        >
          Projeyi Birlikte Hayata Geçirelim!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
        >
          Modüler otomasyon ve e-ticaret altyapısıyla işinizi hızlandırın.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="inline-flex items-center space-x-3 px-8 py-4"
          >
            <span>Hemen İletişime Geç</span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
