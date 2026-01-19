'use client';

import { motion } from 'framer-motion';
import {
    DocumentTextIcon,
    AdjustmentsHorizontalIcon,
    BeakerIcon,
    ClipboardDocumentListIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const services = [
        {
            title: 'Prompt Design & Optimization',
            description: 'Expert prompt engineering using advanced techniques like chain-of-thought, few-shot learning, and structured outputs for optimal LLM performance.',
            icon: DocumentTextIcon,
        },
        {
            title: 'Prompt Templates & Libraries',
            description: 'Build reusable prompt templates and libraries that ensure consistency, reduce errors, and accelerate development across your team.',
            icon: ClipboardDocumentListIcon,
        },
        {
            title: 'A/B Testing & Evaluation',
            description: 'Systematic prompt testing frameworks to measure quality, compare variations, and continuously improve output accuracy.',
            icon: BeakerIcon,
        },
        {
            title: 'Cost & Latency Optimization',
            description: 'Reduce API costs and response times through prompt compression, caching strategies, and model selection optimization.',
            icon: AdjustmentsHorizontalIcon,
        },
        {
            title: 'Safety & Guardrails',
            description: 'Implement robust safety measures, content filtering, and output validation to prevent hallucinations and ensure reliable responses.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Prompt Versioning & CI/CD',
            description: 'Professional prompt management with version control, automated testing, and deployment pipelines for production systems.',
            icon: ArrowPathIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Prompt Engineering Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Master the art and science of LLM communication with our comprehensive prompt engineering services.
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
