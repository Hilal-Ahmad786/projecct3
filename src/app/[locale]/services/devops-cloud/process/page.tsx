'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    CubeTransparentIcon,
    CogIcon,
    ArrowPathIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

export default function ProcessPage() {
    const steps = [
        {
            step: 1,
            title: 'Infrastructure Assessment',
            description: 'We conduct a comprehensive audit of your existing infrastructure, identifying bottlenecks, security vulnerabilities, and optimization opportunities to establish a solid foundation for improvement.',
            icon: MagnifyingGlassIcon,
            details: [
                'Infrastructure audit and assessment',
                'Security vulnerability analysis',
                'Performance bottleneck identification',
                'Cost optimization opportunities'
            ]
        },
        {
            step: 2,
            title: 'Architecture Design',
            description: 'Our architects design a cloud-native, scalable architecture tailored to your business needs, ensuring high availability, disaster recovery, and future growth capabilities.',
            icon: CubeTransparentIcon,
            details: [
                'Cloud-native architecture design',
                'High availability planning',
                'Disaster recovery strategy',
                'Scalability requirements'
            ]
        },
        {
            step: 3,
            title: 'Pipeline Implementation',
            description: 'We build robust CI/CD pipelines with automated testing, security scanning, and deployment workflows that accelerate your development cycles while maintaining quality.',
            icon: CogIcon,
            details: [
                'CI/CD pipeline implementation',
                'Infrastructure as Code setup',
                'Automated testing integration',
                'Deployment automation'
            ]
        },
        {
            step: 4,
            title: 'Migration & Deployment',
            description: 'Using proven methodologies, we execute zero-downtime migrations and deployments, ensuring business continuity throughout the transition to your new infrastructure.',
            icon: ArrowPathIcon,
            details: [
                'Zero-downtime migration strategy',
                'Data migration and validation',
                'Gradual traffic shifting',
                'Rollback procedures'
            ]
        },
        {
            step: 5,
            title: 'Monitoring & Optimization',
            description: 'We implement comprehensive monitoring, alerting, and logging solutions that provide real-time visibility into your systems and enable continuous performance optimization.',
            icon: ChartBarIcon,
            details: [
                'Metrics and alerting setup',
                'Log aggregation and analysis',
                'Performance dashboards',
                'Incident response automation'
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sky-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Methodology
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our DevOps Process
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            A proven 5-step methodology that ensures reliable, scalable, and secure infrastructure for your organization.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 mb-16">
                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 items-start bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-sky-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:bg-sky-600 transition-colors">
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <item.icon className="w-6 h-6 text-sky-600" />
                                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {item.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-sky-50 rounded-2xl p-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to Optimize Your Infrastructure?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let us analyze your current setup and create a tailored DevOps strategy for your organization.
                    </p>
                    <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500">
                        Schedule Assessment
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
