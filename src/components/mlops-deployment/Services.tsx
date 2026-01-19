'use client';

import { motion } from 'framer-motion';
import {
    ArrowPathIcon,
    ServerStackIcon,
    ChartBarSquareIcon,
    ShieldCheckIcon,
    CpuChipIcon,
    CloudIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const services = [
        {
            title: 'ML Pipeline Automation',
            description: 'Build end-to-end automated pipelines for data processing, model training, validation, and deployment with proper versioning.',
            icon: ArrowPathIcon,
        },
        {
            title: 'Model Serving Infrastructure',
            description: 'Deploy models at scale with low-latency inference, auto-scaling, A/B testing, and canary deployments.',
            icon: ServerStackIcon,
        },
        {
            title: 'Model Monitoring & Observability',
            description: 'Comprehensive monitoring for model performance, data drift, prediction quality, and system health metrics.',
            icon: ChartBarSquareIcon,
        },
        {
            title: 'ML Security & Governance',
            description: 'Implement model access controls, audit trails, bias detection, and compliance frameworks for production ML.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Feature Store Implementation',
            description: 'Centralized feature management for consistent feature engineering, sharing, and real-time serving.',
            icon: CpuChipIcon,
        },
        {
            title: 'Cloud ML Platform Setup',
            description: 'Design and implement ML platforms on AWS, GCP, or Azure with infrastructure as code and best practices.',
            icon: CloudIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        MLOps & Deployment Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Operationalize your machine learning models with robust, scalable, and maintainable infrastructure.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
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
