'use client';

import { motion } from 'framer-motion';
import { CircleStackIcon, CpuChipIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Discovery & Data Collection',
            description: 'We analyze your existing data sources, identify key metrics, and establish data pipelines to gather comprehensive business intelligence.',
            icon: CircleStackIcon,
        },
        {
            number: '02',
            title: 'Data Modeling & Analysis',
            description: 'Our experts build robust data models, clean and transform your data, and apply advanced statistical methods to uncover valuable insights.',
            icon: CpuChipIcon,
        },
        {
            number: '03',
            title: 'Visualization & Implementation',
            description: 'We create intuitive dashboards and reports that make complex data accessible, enabling your team to make informed decisions quickly.',
            icon: PresentationChartLineIcon,
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-cyan-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-gray-50 opacity-50 group-hover:text-cyan-50 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-cyan-50 transition-colors">
                                    <step.icon className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition-colors" />
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
