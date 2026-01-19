'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
            {/* Background - Neural Network Style */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <ParticleNetwork className="opacity-30" />
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
                                <div className="w-8 h-0.5 bg-indigo-600"></div>
                                <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                                    Custom AI Solutions
                                </span>
                            </div>

                            <h1 className="text-display font-light text-gray-900 mb-8 leading-none">
                                Transform Your Business with <br />
                                <span className="font-semibold text-indigo-600">
                                    Artificial Intelligence
                                </span>
                            </h1>

                            <p className="text-body text-gray-600 mb-10 max-w-2xl leading-relaxed">
                                Leverage the power of AI to automate processes, gain actionable insights,
                                and drive innovation. Our custom AI solutions are designed to solve your
                                unique business challenges and unlock new opportunities for growth.
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
                                    Start Your AI Project
                                </Button>
                                <Button href="/services/ai-solutions/portfolio" variant="secondary" size="lg">
                                    View Case Studies
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Abstract Visual - AI/Neural Network Style */}
                    <div className="lg:col-span-5 hidden lg:block relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square max-w-lg mx-auto"
                        >
                            {/* Neural Network Visualization */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Main Circle - Brain */}
                                <div className="w-48 h-48 border-2 border-indigo-200 rounded-full opacity-60" />

                                {/* Inner circles - Neural layers */}
                                <div className="absolute w-32 h-32 border border-indigo-300 rounded-full opacity-40" />
                                <div className="absolute w-16 h-16 bg-indigo-600 rounded-full opacity-10" />

                                {/* Connection nodes */}
                                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400 rounded-full opacity-30" />
                                <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full opacity-40" />
                                <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-indigo-300 rounded-full opacity-35" />
                                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30" />

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-80"
                                />
                                <motion.div
                                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-80"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
