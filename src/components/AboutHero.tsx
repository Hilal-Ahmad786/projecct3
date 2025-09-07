// src/components/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function AboutHero() {
  return (
    <section className="hero-section relative bg-white overflow-hidden">
      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Proper Crescent Elements */}
      <div className="absolute top-32 right-20 w-28 h-28">
        <div className="crescent crescent-right crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Overline */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className="text-overline">About Us</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-display font-light text-gray-900 leading-none">
              Building Digital
              <br />
              <span className="text-gray-600">Excellence</span>
            </h1>

            {/* Description */}
            <p className="text-body text-gray-600 max-w-lg leading-relaxed">
              We are a team of passionate technologists dedicated to creating 
              exceptional digital experiences. Our mission is to transform ideas 
              into powerful, scalable solutions that drive business growth.
            </p>

            {/* CTA */}
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-900 rounded-sm flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-white"
                      style={{ clipPath: 'circle(35% at 65% 35%)' }}
                    />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-20 h-16 bg-white border border-gray-200 rounded-sm shadow-soft p-3"
              >
                <div className="w-full h-1 bg-gray-200 rounded mb-2" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute bottom-8 left-8 w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm shadow-soft p-3"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}