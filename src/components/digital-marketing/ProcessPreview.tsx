'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Strategy & Research',
            description: 'We analyze your market, competitors, and target audience to develop a comprehensive marketing strategy tailored to your goals.',
            icon: MagnifyingGlassIcon,
        },
        {
            number: '02',
            title: 'Campaign Execution',
            description: 'Our team implements multi-channel campaigns with precision targeting, compelling creative, and optimized budget allocation.',
            icon: ChartBarIcon,
        },
        {
            number: '03',
            title: 'Analytics & Optimization',
            description: 'Continuous monitoring and data analysis drive ongoing improvements, maximizing ROI and campaign performance.',
            icon: RocketLaunchIcon,
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-rose-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-rose-50 opacity-50 group-hover:text-rose-100 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-rose-500 group-hover:text-rose-600 transition-colors" />
                                </div>

                                <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
