'use client';

import { motion } from 'framer-motion';
import {
    EyeIcon,
    HeartIcon,
    LightBulbIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: 'User-Centered Design',
        description: 'Every pixel is crafted with your users in mind, ensuring intuitive experiences that delight.',
        icon: EyeIcon,
    },
    {
        title: 'Emotional Connection',
        description: 'We create designs that resonate emotionally with your audience, building brand loyalty.',
        icon: HeartIcon,
    },
    {
        title: 'Innovative Thinking',
        description: 'Fresh perspectives and creative solutions that set your product apart from the competition.',
        icon: LightBulbIcon,
    },
    {
        title: 'Data-Driven Decisions',
        description: 'Design choices backed by research, analytics, and user testing for optimal results.',
        icon: ChartBarIcon,
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
                            <h2 className="text-overline mb-4 text-pink-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Design excellence <br />
                                that drives results.
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We blend creativity with strategy to create designs that not only look stunning
                                but also achieve your business goals. Our process is collaborative, iterative,
                                and focused on delivering exceptional user experiences.
                            </p>
                            <div className="h-1 w-20 bg-pink-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-pink-600 transition-colors" />
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
