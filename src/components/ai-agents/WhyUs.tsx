'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'Agent Architecture Experts',
            description: 'Deep expertise in agent frameworks including LangGraph, CrewAI, AutoGPT, and custom architectures.',
        },
        {
            title: 'Enterprise-Ready',
            description: 'We build agents with proper error handling, fallbacks, and human escalation for production reliability.',
        },
        {
            title: 'Tool Integration Masters',
            description: 'Extensive experience connecting agents to APIs, databases, and external services securely.',
        },
        {
            title: 'Autonomous & Controlled',
            description: 'We balance agent autonomy with guardrails to ensure predictable, safe behavior in your workflows.',
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
                            <div className="w-8 h-0.5 bg-emerald-600"></div>
                            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            AI Agents That Deliver
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            We've built autonomous agents that handle complex workflows across industries.
                            Our agents don't just complete tasks—they reason, adapt, and improve over time,
                            all while maintaining the reliability your business demands.
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
                                className="p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
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
