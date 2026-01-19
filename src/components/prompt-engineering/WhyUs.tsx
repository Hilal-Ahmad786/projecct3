'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'LLM Expertise',
            description: 'Deep experience with GPT-4, Claude, Gemini, and open-source models. We know each model\'s strengths and limitations.',
        },
        {
            title: 'Proven Frameworks',
            description: 'Battle-tested prompt engineering methodologies developed from hundreds of production implementations.',
        },
        {
            title: 'Measurable Results',
            description: 'We use systematic evaluation to prove prompt improvements with metrics that matter to your business.',
        },
        {
            title: 'Production Ready',
            description: 'Prompts designed for reliability, edge cases, and scale—not just demos that work occasionally.',
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
                            <div className="w-8 h-0.5 bg-violet-600"></div>
                            <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            Expert Prompt Engineers
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our team has engineered prompts for Fortune 500 companies and startups alike.
                            We bring systematic, scientific rigor to the art of communicating with LLMs,
                            ensuring your AI applications perform reliably at scale.
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
                                className="p-6 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
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
