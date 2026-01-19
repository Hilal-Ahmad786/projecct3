'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'State-of-the-Art Models',
            description: 'We leverage the latest architectures—YOLO, SAM, CLIP, and transformers—for superior accuracy.',
        },
        {
            title: 'Edge Deployment',
            description: 'Optimized models that run efficiently on edge devices, from NVIDIA Jetson to mobile phones.',
        },
        {
            title: 'Real-Time Processing',
            description: 'High-throughput video analysis systems capable of processing multiple streams simultaneously.',
        },
        {
            title: 'Custom Training',
            description: 'We train models on your specific data for domain-specific accuracy that generic models can\'t match.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-rose-600"></div>
                            <span className="text-xs font-medium text-rose-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            Vision AI Experts
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Computer vision is transforming industries from manufacturing to healthcare.
                            Our team has deployed vision systems that inspect products, count inventory,
                            ensure safety, and enable new experiences—all with the accuracy and speed
                            your applications demand.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center mb-4">
                                    <CheckIcon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {reason.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {reason.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
