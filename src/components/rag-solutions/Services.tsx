'use client';

import { motion } from 'framer-motion';
import {
    CircleStackIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const services = [
        {
            title: 'Knowledge Base Development',
            description: 'Build intelligent knowledge bases from your documents, wikis, and databases with optimized chunking and embedding strategies.',
            icon: CircleStackIcon,
        },
        {
            title: 'Semantic Search Implementation',
            description: 'Implement powerful semantic search that understands intent and context, not just keywords, for accurate information retrieval.',
            icon: MagnifyingGlassIcon,
        },
        {
            title: 'Document Q&A Systems',
            description: 'Create question-answering systems that can extract precise answers from large document collections with source citations.',
            icon: DocumentTextIcon,
        },
        {
            title: 'Conversational RAG',
            description: 'Build chatbots and assistants that combine conversational AI with real-time knowledge retrieval for accurate responses.',
            icon: ChatBubbleLeftRightIcon,
        },
        {
            title: 'Enterprise RAG Security',
            description: 'Implement access controls, data governance, and audit trails to ensure secure, compliant RAG deployments.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Continuous Knowledge Updates',
            description: 'Automated pipelines to keep your knowledge base current with new documents, updates, and data sources.',
            icon: ArrowPathIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        RAG Solutions Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Unlock the power of your organizational knowledge with Retrieval-Augmented Generation systems.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
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
