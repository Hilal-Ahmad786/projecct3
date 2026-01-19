'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const categories = [
        {
            name: 'Cloud Providers',
            technologies: [
                { name: 'AWS', description: 'Amazon Web Services - industry leading cloud platform' },
                { name: 'Azure', description: 'Microsoft Azure cloud computing services' },
                { name: 'GCP', description: 'Google Cloud Platform for scalable infrastructure' },
                { name: 'DigitalOcean', description: 'Developer-friendly cloud infrastructure' }
            ]
        },
        {
            name: 'Containerization',
            technologies: [
                { name: 'Docker', description: 'Container platform for consistent deployments' },
                { name: 'Kubernetes', description: 'Container orchestration at scale' },
                { name: 'Helm', description: 'Kubernetes package manager' },
                { name: 'Podman', description: 'Daemonless container engine' }
            ]
        },
        {
            name: 'CI/CD Tools',
            technologies: [
                { name: 'GitHub Actions', description: 'Native GitHub workflow automation' },
                { name: 'Jenkins', description: 'Industry standard automation server' },
                { name: 'GitLab CI', description: 'Integrated CI/CD with GitLab' },
                { name: 'ArgoCD', description: 'Declarative GitOps for Kubernetes' }
            ]
        },
        {
            name: 'Infrastructure as Code',
            technologies: [
                { name: 'Terraform', description: 'Multi-cloud infrastructure provisioning' },
                { name: 'Ansible', description: 'Agentless automation platform' },
                { name: 'Pulumi', description: 'Infrastructure as real code' },
                { name: 'CloudFormation', description: 'AWS native IaC solution' }
            ]
        },
        {
            name: 'Monitoring & Observability',
            technologies: [
                { name: 'Prometheus', description: 'Metrics collection and alerting' },
                { name: 'Grafana', description: 'Visualization and dashboards' },
                { name: 'ELK Stack', description: 'Log aggregation and analysis' },
                { name: 'Datadog', description: 'Full-stack monitoring platform' }
            ]
        },
        {
            name: 'Security Tools',
            technologies: [
                { name: 'HashiCorp Vault', description: 'Secrets management solution' },
                { name: 'SonarQube', description: 'Code quality and security scanning' },
                { name: 'Trivy', description: 'Container vulnerability scanner' },
                { name: 'OWASP ZAP', description: 'Security testing automation' }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sky-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Technology
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our DevOps Tech Stack
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            We use industry-leading tools and platforms to build reliable, scalable infrastructure.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-12 max-w-6xl mx-auto mb-16">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-3">
                                <span className="w-8 h-0.5 bg-sky-500" />
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.technologies.map((tech, techIndex) => {
                                    const Icon = getTechIcon(tech.name);
                                    return (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                                            className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-sky-500 transition-all duration-300 group flex flex-col items-center text-center gap-4"
                                        >
                                            <div className="w-12 h-12 text-gray-400 group-hover:text-sky-400 transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <div>
                                                <span className="font-medium text-lg block mb-2 group-hover:text-sky-400 transition-colors">
                                                    {tech.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {tech.description}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gray-800 rounded-2xl p-12 max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Need a Custom Tech Stack?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        We tailor our technology choices to your specific needs, existing infrastructure, and team expertise.
                    </p>
                    <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-400 !border-sky-500">
                        Discuss Your Requirements
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
