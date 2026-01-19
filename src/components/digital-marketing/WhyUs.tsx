'use client';

import { motion } from 'framer-motion';
import {
    ChartBarSquareIcon,
    UserGroupIcon,
    BoltIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Data-Driven Results',
        description: 'Every decision backed by analytics and real performance metrics for maximum ROI.',
        icon: ChartBarSquareIcon,
    },
    {
        title: 'Targeted Audience',
        description: 'Precision targeting to reach your ideal customers across all digital channels.',
        icon: UserGroupIcon,
    },
    {
        title: 'Fast Execution',
        description: 'Agile campaigns that adapt quickly to market changes and opportunities.',
        icon: BoltIcon,
    },
    {
        title: 'Brand Protection',
        description: 'Consistent brand messaging and reputation management across all platforms.',
        icon: ShieldCheckIcon,
    },
];

export default function WhyUs() {
    return (
        <section className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Section Header */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-overline mb-4 text-rose-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Marketing excellence <br />
                                that drives growth.
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We don't just run campaigns; we build growth engines. Our marketing philosophy
                                prioritizes measurable results, audience engagement, and sustainable brand building.
                            </p>
                            <div className="h-1 w-20 bg-rose-500" />
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-rose-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-rose-600 transition-colors" />
                                    </div>
                                    <h4 className="text-title font-medium text-gray-900 mb-3">{feature.title}</h4>
                                    <p className="text-body text-gray-500">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
