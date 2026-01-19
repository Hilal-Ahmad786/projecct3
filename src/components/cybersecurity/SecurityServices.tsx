'use client';

import { motion } from 'framer-motion';
import {
    ShieldCheckIcon,
    LockClosedIcon,
    EyeIcon,
    ServerStackIcon,
    BugAntIcon,
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function SecurityServices() {
    const services = [
        {
            title: 'Penetration Testing',
            description: 'Simulate real-world attacks to identify vulnerabilities before malicious actors do. Our ethical hackers use advanced techniques to test your defenses.',
            icon: BugAntIcon,
        },
        {
            title: 'Security Audits',
            description: 'Comprehensive evaluation of your security posture including network, application, and policy assessments aligned with industry standards.',
            icon: DocumentMagnifyingGlassIcon,
        },
        {
            title: 'Threat Detection',
            description: 'Advanced threat intelligence and real-time monitoring using AI-powered SIEM solutions to identify and neutralize threats instantly.',
            icon: EyeIcon,
        },
        {
            title: 'Incident Response',
            description: 'Rapid response team available 24/7 to contain, investigate, and remediate security breaches while minimizing business impact.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Compliance Management',
            description: 'Navigate complex regulatory requirements including GDPR, HIPAA, SOC 2, ISO 27001, and PCI-DSS with expert guidance and implementation.',
            icon: ServerStackIcon,
        },
        {
            title: 'Security Training',
            description: 'Empower your team with security awareness training and phishing simulations to build a human firewall against social engineering attacks.',
            icon: LockClosedIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Comprehensive Security Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        End-to-end cybersecurity solutions designed to protect your organization from evolving threats and ensure regulatory compliance.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
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
