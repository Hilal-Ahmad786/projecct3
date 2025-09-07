// src/components/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import AboutRightExcellence from '@/components/AboutRightExcellence';

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

          {/* Enhanced Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <AboutRightExcellence />
          </motion.div>
        </div>
      </div>
    </section>
  );
}