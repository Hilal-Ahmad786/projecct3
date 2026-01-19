'use client';

import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    CpuChipIcon,
    EyeIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function MLServices() {
    const services = [
        {
            title: 'Deep Learning',
            description: 'Build sophisticated neural networks for complex pattern recognition, image classification, and advanced AI applications that push the boundaries of automation.',
            icon: CpuChipIcon,
        },
        {
            title: 'Natural Language Processing',
            description: 'Enable your systems to understand, interpret, and generate human language for chatbots, sentiment analysis, and intelligent document processing.',
            icon: ChatBubbleBottomCenterTextIcon,
        },
        {
            title: 'Computer Vision',
            description: 'Implement visual recognition systems for object detection, facial recognition, quality inspection, and automated visual analysis at scale.',
            icon: EyeIcon,
        },
        {
            title: 'Predictive Analytics',
            description: 'Forecast trends, customer behavior, and business outcomes using advanced statistical models and machine learning algorithms.',
            icon: ChartBarIcon,
        },
        {
            title: 'Recommendation Systems',
            description: 'Create personalized recommendation engines that boost engagement and revenue by suggesting relevant products, content, or actions.',
            icon: DocumentTextIcon,
        },
        {
            title: 'Anomaly Detection',
            description: 'Identify unusual patterns, fraud, and security threats in real-time using intelligent monitoring and automated alert systems.',
            icon: ArrowTrendingUpIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Machine Learning Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Comprehensive ML solutions tailored to transform your data into competitive advantage
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
