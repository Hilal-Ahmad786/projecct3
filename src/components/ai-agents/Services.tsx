'use client';

import { motion } from 'framer-motion';
import {
    CpuChipIcon,
    ArrowsRightLeftIcon,
    WrenchScrewdriverIcon,
    CircleStackIcon,
    UserGroupIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const services = [
        {
            title: 'Custom AI Agent Development',
            description: 'Build intelligent agents tailored to your business workflows, capable of autonomous decision-making and complex task execution.',
            icon: CpuChipIcon,
        },
        {
            title: 'Multi-Agent Orchestration',
            description: 'Design and implement multi-agent systems where specialized agents collaborate to solve complex problems efficiently.',
            icon: ArrowsRightLeftIcon,
        },
        {
            title: 'Tool & API Integration',
            description: 'Equip your agents with the ability to use external tools, APIs, and services to perform real-world actions.',
            icon: WrenchScrewdriverIcon,
        },
        {
            title: 'Memory & Context Systems',
            description: 'Implement long-term memory, conversation history, and context management for persistent, intelligent interactions.',
            icon: CircleStackIcon,
        },
        {
            title: 'Human-in-the-Loop Workflows',
            description: 'Design hybrid systems where agents escalate to humans when needed, ensuring quality and compliance.',
            icon: UserGroupIcon,
        },
        {
            title: 'Agent Analytics & Monitoring',
            description: 'Track agent performance, decision patterns, and outcomes with comprehensive dashboards and alerting.',
            icon: ChartBarIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        AI Agents Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Build autonomous AI systems that can reason, plan, and execute complex tasks on behalf of your organization.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
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
