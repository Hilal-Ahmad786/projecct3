'use client';

import { motion } from 'framer-motion';
import { CircleStackIcon, CpuChipIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Data Assessment',
            description: 'We analyze your data sources, quality, and volume to determine the best ML approach for your specific use case and business objectives.',
            icon: CircleStackIcon,
        },
        {
            number: '02',
            title: 'Model Development',
            description: 'Our experts select and train the optimal algorithms, fine-tuning models through rigorous testing to achieve maximum accuracy and performance.',
            icon: CpuChipIcon,
        },
        {
            number: '03',
            title: 'Deployment & Monitoring',
            description: 'We deploy your ML solution to production with continuous monitoring, ensuring it adapts and improves over time with new data.',
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-violet-50 opacity-50 group-hover:text-violet-100 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-violet-50 flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors" />
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
