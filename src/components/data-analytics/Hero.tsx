'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
            {/* Background - Minimalist Grid & Particles */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <ParticleNetwork className="opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Text Content - Swiss Typography */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Eyebrow - Strict Match */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-0.5 bg-cyan-500"></div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Data Analytics & Business Intelligence
                                </span>
                            </div>

                            <h1 className="text-display font-light text-gray-900 mb-8 leading-none">
                                Transform Data into <br />
                                <span className="font-semibold text-cyan-600">
                                    Actionable Insights
                                </span>
                            </h1>

                            <p className="text-body text-gray-600 mb-10 max-w-2xl leading-relaxed">
                                Turn your raw data into strategic decisions. Our advanced analytics solutions help you uncover hidden patterns, predict trends, and drive business growth with data-driven intelligence.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    href="/contact"
                                    variant="primary"
                                    size="lg"
                                    className="!bg-cyan-600 hover:!bg-cyan-700 !border-cyan-600"
                                    rightIcon={
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    }
                                >
                                    Start Your Analytics Journey
                                </Button>
                                <Button href="/services/data-analytics/portfolio" variant="secondary" size="lg">
                                    View Case Studies
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Abstract Visual - Swiss Geometry (CSS Only) */}
                    <div className="lg:col-span-5 hidden lg:block relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square max-w-lg mx-auto"
                        >
                            {/* Geometric Composition */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Main Circle */}
                                <div className="w-64 h-64 border border-cyan-200 rounded-full opacity-60" />

                                {/* Offset Square */}
                                <div className="absolute w-48 h-48 border border-cyan-500 opacity-10 transform rotate-12" />

                                {/* Solid Accent Circle */}
                                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-cyan-500 rounded-full opacity-10" />

                                {/* Data Chart Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-32 h-32 text-cyan-500 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                                />
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
