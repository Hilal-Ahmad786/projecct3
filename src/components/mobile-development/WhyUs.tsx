'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
    const reasons = [
        {
            title: 'Expert Developers',
            description: 'Our team consists of certified iOS and Android developers with years of experience building successful apps.',
        },
        {
            title: 'Agile Development',
            description: 'We use agile methodologies with regular sprints, demos, and feedback cycles to keep you informed and involved.',
        },
        {
            title: 'Quality Focused',
            description: 'Rigorous testing, code reviews, and quality assurance ensure your app performs flawlessly in production.',
        },
        {
            title: 'Ongoing Support',
            description: 'We provide continuous maintenance, updates, and support to keep your app secure and up-to-date.',
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
                            <div className="w-8 h-0.5 bg-blue-600"></div>
                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            Your Trusted Mobile Development Partner
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            We combine technical expertise with creative design thinking to deliver mobile apps that not only look stunning but also provide exceptional user experiences. Our commitment to quality and innovation sets us apart.
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
                                className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                            >
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
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
