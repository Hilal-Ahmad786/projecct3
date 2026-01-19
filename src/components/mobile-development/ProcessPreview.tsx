'use client';

import { motion } from 'framer-motion';
import { PencilSquareIcon, DevicePhoneMobileIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Discovery & UX Design',
            description: 'We start by understanding your vision, target audience, and business goals. Our UX designers create wireframes and prototypes to ensure an intuitive user experience.',
            icon: PencilSquareIcon,
        },
        {
            number: '02',
            title: 'Development & Testing',
            description: 'Our developers build your app using the latest technologies and best practices. Rigorous testing ensures quality, performance, and security across all devices.',
            icon: DevicePhoneMobileIcon,
        },
        {
            number: '03',
            title: 'Launch & Support',
            description: 'We handle App Store and Play Store submissions, then provide ongoing maintenance, updates, and performance optimization to keep your app thriving.',
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-blue-50 opacity-50 group-hover:text-blue-100 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
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
