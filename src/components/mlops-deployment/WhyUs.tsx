'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'Platform Agnostic',
            description: 'Expertise across AWS, GCP, Azure, and on-premise deployments with portable, vendor-neutral solutions.',
        },
        {
            title: 'Battle-Tested Pipelines',
            description: 'MLOps architectures proven in production across healthcare, finance, and e-commerce industries.',
        },
        {
            title: 'Cost Optimization',
            description: 'We design for efficiency—optimizing compute, storage, and inference costs without sacrificing performance.',
        },
        {
            title: 'Team Enablement',
            description: 'We don\'t just build pipelines—we train your team to own and evolve your ML infrastructure.',
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
                            <div className="w-8 h-0.5 bg-amber-600"></div>
                            <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            MLOps Excellence
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Getting ML models to production is hard. Keeping them running reliably is harder.
                            We've solved these challenges for dozens of companies, building MLOps platforms
                            that make machine learning a sustainable, scalable capability.
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
                                className="p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
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
