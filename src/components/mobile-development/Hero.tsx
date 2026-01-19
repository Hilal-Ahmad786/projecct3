'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <ParticleNetwork className="opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Text Content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-0.5 bg-blue-600"></div>
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                    iOS & Android Development
                                </span>
                            </div>

                            <h1 className="text-display font-light text-gray-900 mb-8 leading-none">
                                Build Powerful <br />
                                <span className="font-semibold text-blue-600">
                                    Mobile Applications
                                </span>
                            </h1>

                            <p className="text-body text-gray-600 mb-10 max-w-2xl leading-relaxed">
                                Create seamless mobile experiences that users love. We specialize in native iOS, Android, and cross-platform development to bring your app ideas to life with exceptional performance and beautiful design.
                            </p>

                            <div className="flex flex-wrap gap-4">
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
                                    Start Your App Project
                                </Button>
                                <Button href="/services/mobile-development/portfolio" variant="secondary" size="lg">
                                    View Our Apps
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Abstract Visual - Mobile Phone Style */}
                    <div className="lg:col-span-5 hidden lg:block relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square max-w-lg mx-auto"
                        >
                            {/* Phone Frame Visualization */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Phone body */}
                                <div className="w-40 h-72 border-2 border-blue-200 rounded-[2rem] opacity-60 relative">
                                    {/* Notch */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-blue-100 rounded-full" />
                                    {/* Screen */}
                                    <div className="absolute top-8 left-2 right-2 bottom-8 bg-blue-50 rounded-2xl" />
                                </div>

                                {/* Secondary phone (offset) */}
                                <div className="absolute w-32 h-56 border border-blue-300 rounded-[1.5rem] opacity-30 transform -rotate-12 translate-x-16 -translate-y-4" />

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-4 right-4 w-16 h-16 bg-blue-100 rounded-xl opacity-50"
                                />
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-8 left-8 w-12 h-12 bg-blue-200 rounded-lg opacity-40"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
