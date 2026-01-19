'use client';

import { motion } from 'framer-motion';
import { BeakerIcon, CpuChipIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Assessment & Discovery',
            description: 'We analyze your business processes, data infrastructure, and goals to identify the most impactful AI opportunities.',
            icon: BeakerIcon,
        },
        {
            number: '02',
            title: 'AI Development',
            description: 'Our experts design and build custom AI models tailored to your specific requirements using cutting-edge technologies.',
            icon: CpuChipIcon,
        },
        {
            number: '03',
            title: 'Integration & Optimization',
            description: 'We seamlessly integrate AI solutions into your existing systems and continuously optimize for peak performance.',
            icon: ChartBarIcon,
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-indigo-50 opacity-50 group-hover:text-indigo-100 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
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
