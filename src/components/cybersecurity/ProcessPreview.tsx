'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ShieldCheckIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

export default function ProcessPreview() {
    const steps = [
        {
            number: '01',
            title: 'Security Assessment',
            description: 'We conduct comprehensive vulnerability assessments and penetration testing to identify security gaps in your infrastructure, applications, and processes.',
            icon: MagnifyingGlassIcon,
        },
        {
            number: '02',
            title: 'Strategy & Implementation',
            description: 'Based on our findings, we develop a tailored security strategy and implement robust defense mechanisms including firewalls, encryption, and access controls.',
            icon: ShieldCheckIcon,
        },
        {
            number: '03',
            title: 'Monitoring & Response',
            description: 'Our 24/7 security operations center continuously monitors your systems for threats and provides rapid incident response when security events occur.',
            icon: DocumentCheckIcon,
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
                            className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-red-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 right-8 text-6xl font-bold text-gray-50 opacity-50 group-hover:text-red-50 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                                    <step.icon className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors" />
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
