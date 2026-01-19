'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';

const features = [
    {
        title: 'CI/CD Pipeline Automation',
        description: 'Automated build, test, and deployment pipelines using Jenkins, GitHub Actions, GitLab CI, and Azure DevOps.'
    },
    {
        title: 'Infrastructure as Code (IaC)',
        description: 'Manage and provision infrastructure using Terraform, Pulumi, and CloudFormation for consistent deployments.'
    },
    {
        title: 'Container Orchestration',
        description: 'Deploy and manage containerized applications with Kubernetes, Docker Swarm, and Amazon ECS.'
    },
    {
        title: 'Cloud Migration & Architecture',
        description: 'Seamless migration to AWS, Azure, or GCP with optimized cloud-native architecture design.'
    },
    {
        title: 'Monitoring & Observability',
        description: 'Real-time monitoring with Prometheus, Grafana, Datadog, and custom alerting systems.'
    },
    {
        title: 'Security & Compliance',
        description: 'DevSecOps practices including vulnerability scanning, secrets management, and compliance automation.'
    },
    {
        title: 'Auto-Scaling & Load Balancing',
        description: 'Dynamic resource scaling based on demand with intelligent load distribution for high availability.'
    },
    {
        title: 'Disaster Recovery & Backup',
        description: 'Automated backup strategies and disaster recovery planning with minimal RTO and RPO.'
    },
    {
        title: 'Configuration Management',
        description: 'Consistent environment configurations using Ansible, Chef, and Puppet across all environments.'
    },
    {
        title: 'Cost Optimization',
        description: 'Cloud cost analysis and optimization strategies to reduce infrastructure expenses by up to 40%.'
    }
];

export default function FeaturesPage() {
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
                            Capabilities
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            DevOps & Cloud Infrastructure Features
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Enterprise-grade DevOps solutions to accelerate your development lifecycle and optimize cloud infrastructure.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500">
                        Start Your DevOps Journey
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
