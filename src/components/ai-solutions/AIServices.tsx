'use client';

import { motion } from 'framer-motion';
import {
    ChatBubbleLeftRightIcon,
    ChartBarSquareIcon,
    CpuChipIcon,
    EyeIcon,
    DocumentMagnifyingGlassIcon,
    CogIcon
} from '@heroicons/react/24/outline';

export default function AIServices() {
    const services = [
        {
            title: 'AI Consulting',
            description: 'Strategic guidance to identify AI opportunities, assess feasibility, and create a roadmap for successful AI adoption in your organization.',
            icon: ChatBubbleLeftRightIcon,
        },
        {
            title: 'Custom AI Development',
            description: 'Bespoke AI solutions built from the ground up to address your unique business challenges and requirements.',
            icon: CpuChipIcon,
        },
        {
            title: 'Process Automation',
            description: 'Intelligent automation solutions that streamline workflows, reduce manual tasks, and increase operational efficiency.',
            icon: CogIcon,
        },
        {
            title: 'Computer Vision',
            description: 'Advanced image and video analysis systems for object detection, facial recognition, quality control, and visual inspection.',
            icon: EyeIcon,
        },
        {
            title: 'Intelligent Analytics',
            description: 'AI-powered analytics platforms that transform raw data into actionable insights and predictive intelligence.',
            icon: ChartBarSquareIcon,
        },
        {
            title: 'Natural Language Processing',
            description: 'Text analysis, sentiment detection, chatbots, and document processing solutions powered by state-of-the-art NLP models.',
            icon: DocumentMagnifyingGlassIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Comprehensive AI Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From strategy to implementation, we offer end-to-end AI services to transform your business operations.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
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
