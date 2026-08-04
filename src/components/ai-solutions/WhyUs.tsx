'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'Expert AI Team',
            description: 'Our team includes PhD researchers, data scientists, and ML engineers with deep expertise in cutting-edge AI technologies.',
        },
        {
            title: 'Proven Track Record',
            description: 'Successfully delivered AI projects across healthcare, finance, retail, and manufacturing industries.',
        },
        {
            title: 'Scalable Solutions',
            description: 'We build AI systems designed to scale with your business, from proof-of-concept to enterprise-grade deployments.',
        },
        {
            title: 'Ongoing Support',
            description: 'Comprehensive maintenance, monitoring, and continuous improvement to ensure your AI solutions perform optimally.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-indigo-600"></div>
                            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            Your Trusted AI Partner
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            We combine deep technical expertise with business acumen to deliver AI solutions
                            that drive real results. Our collaborative approach ensures your AI investment
                            aligns with your strategic goals and delivers measurable ROI.
                        </p>
                    </motion.div>

                    {/* Right - Reasons Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
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
