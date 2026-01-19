'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, CodeBracketSquareIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Discovery & Planning',
            description: 'We analyze your requirements, research your market, and create a comprehensive project roadmap tailored to your business goals.',
            icon: MagnifyingGlassIcon,
        },
        {
            number: '02',
            title: 'Design & Development',
            description: 'Our team crafts stunning UI/UX designs and transforms them into clean, performant code using modern technologies.',
            icon: CodeBracketSquareIcon,
        },
        {
            number: '03',
            title: 'Testing & Launch',
            description: 'Rigorous quality assurance ensures a flawless product. We handle deployment and provide ongoing support for your success.',
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-gray-50 opacity-50 group-hover:text-gray-100 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
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
