'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

export default function PortfolioPage() {
    const projects = [
        {
            title: 'Enterprise Kubernetes Migration',
            client: 'FinTech Corp',
            description: 'Migrated a monolithic banking application to a microservices architecture on Kubernetes, implementing GitOps workflows and automated scaling policies.',
            result: '99.99% Uptime Achieved',
            technologies: ['Kubernetes', 'AWS EKS', 'Terraform', 'ArgoCD'],
            image: '/images/portfolio/devops-1.jpg',
            color: 'from-sky-500 to-blue-600'
        },
        {
            title: 'CI/CD Pipeline Modernization',
            client: 'E-Commerce Giant',
            description: 'Designed and implemented a complete CI/CD pipeline with automated testing, security scanning, and blue-green deployments for 50+ microservices.',
            result: '10x Faster Deployments',
            technologies: ['GitHub Actions', 'AWS', 'Vault', 'SonarQube'],
            image: '/images/portfolio/devops-2.jpg',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'Multi-Cloud Infrastructure',
            client: 'Healthcare Startup',
            description: 'Built a HIPAA-compliant multi-cloud infrastructure spanning GCP and AWS with automated failover, data encryption, and comprehensive monitoring.',
            result: '60% Cost Reduction',
            technologies: ['GCP', 'Kubernetes', 'Prometheus', 'Terraform'],
            image: '/images/portfolio/devops-3.jpg',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            title: 'Legacy System Containerization',
            client: 'Manufacturing Leader',
            description: 'Containerized legacy .NET applications and migrated to Azure Kubernetes Service with full observability stack and automated incident response.',
            result: '75% Faster Recovery Time',
            technologies: ['Azure', 'Docker', 'Ansible', 'ELK Stack'],
            image: '/images/portfolio/devops-4.jpg',
            color: 'from-orange-500 to-red-600'
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
                            Case Studies
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            DevOps Success Stories
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Explore how we have helped organizations transform their infrastructure and accelerate their development workflows.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6 relative">
                                {/* Gradient Placeholder */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 w-fit mb-2">
                                        {project.result}
                                    </div>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white border border-white px-6 py-2 rounded-full flex items-center gap-2">
                                        View Case Study
                                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-sky-600 font-medium">{project.client}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
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
                    className="text-center bg-sky-50 rounded-2xl p-12 max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to Be Our Next Success Story?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let us help you achieve similar results with a tailored DevOps strategy for your organization.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500">
                            Start Your Project
                        </Button>
                        <Button href="/services/devops-cloud" variant="secondary" size="lg">
                            View All Services
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
