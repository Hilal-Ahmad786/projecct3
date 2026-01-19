'use client';

import { motion } from 'framer-motion';
import {
    ArrowPathIcon,
    CloudIcon,
    CubeIcon,
    CodeBracketSquareIcon,
    ChartBarIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function DevOpsServices() {
    const services = [
        {
            title: 'CI/CD Pipelines',
            description: 'Automate your build, test, and deployment processes with robust continuous integration and delivery pipelines that accelerate your release cycles.',
            icon: ArrowPathIcon,
        },
        {
            title: 'Cloud Migration',
            description: 'Seamlessly migrate your applications and data to AWS, Azure, or GCP with minimal downtime and maximum security throughout the transition.',
            icon: CloudIcon,
        },
        {
            title: 'Container Orchestration',
            description: 'Deploy and manage containerized applications at scale using Kubernetes and Docker, ensuring high availability and efficient resource utilization.',
            icon: CubeIcon,
        },
        {
            title: 'Infrastructure as Code',
            description: 'Define and provision your infrastructure using Terraform, Ansible, and CloudFormation for consistent, version-controlled environments.',
            icon: CodeBracketSquareIcon,
        },
        {
            title: 'Monitoring & Observability',
            description: 'Gain deep insights into your systems with comprehensive monitoring, logging, and alerting using Prometheus, Grafana, and ELK stack.',
            icon: ChartBarIcon,
        },
        {
            title: 'Security & Compliance',
            description: 'Implement DevSecOps practices with automated security scanning, vulnerability management, and compliance monitoring built into your pipeline.',
            icon: ShieldCheckIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Our DevOps & Cloud Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Comprehensive solutions to modernize your infrastructure and accelerate software delivery
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-sky-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
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
