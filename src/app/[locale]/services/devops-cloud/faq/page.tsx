'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is DevOps and why does my business need it?',
            answer: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle while delivering features, fixes, and updates frequently and reliably. Your business needs DevOps to improve deployment frequency, achieve faster time to market, lower failure rate of new releases, and reduce the time between fixes.'
        },
        {
            question: 'How long does it take to implement a CI/CD pipeline?',
            answer: 'The timeline for implementing a CI/CD pipeline depends on your current infrastructure complexity and requirements. A basic pipeline can be set up in 2-4 weeks, while a comprehensive enterprise-grade pipeline with multiple environments, security scanning, and automated testing typically takes 6-12 weeks. We provide a detailed timeline during our initial assessment.'
        },
        {
            question: 'What cloud platforms do you work with?',
            answer: 'We are experts in all major cloud platforms including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We also work with DigitalOcean for smaller projects and can implement multi-cloud or hybrid cloud architectures based on your specific needs and existing infrastructure.'
        },
        {
            question: 'How do you ensure zero-downtime deployments?',
            answer: 'We implement zero-downtime deployments using various strategies including blue-green deployments, canary releases, and rolling updates. These techniques allow us to deploy new versions of your application while the old version continues to serve traffic, then gradually shift users to the new version while monitoring for issues.'
        },
        {
            question: 'What is Infrastructure as Code and why is it important?',
            answer: 'Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code rather than manual processes. It is important because it ensures consistency across environments, enables version control for infrastructure changes, allows for rapid disaster recovery, and makes infrastructure changes reviewable and auditable.'
        },
        {
            question: 'How do you handle security in DevOps (DevSecOps)?',
            answer: 'Security is integrated throughout our DevOps process, not added as an afterthought. We implement security scanning in CI/CD pipelines, manage secrets securely using tools like HashiCorp Vault, conduct regular vulnerability assessments, implement least-privilege access controls, and ensure compliance with industry standards like SOC 2, HIPAA, and PCI-DSS.'
        },
        {
            question: 'What monitoring and alerting solutions do you recommend?',
            answer: 'We typically recommend a comprehensive observability stack including Prometheus for metrics collection, Grafana for visualization, the ELK Stack (Elasticsearch, Logstash, Kibana) for log aggregation, and Datadog or New Relic for application performance monitoring. The specific choice depends on your scale, budget, and existing tooling.'
        },
        {
            question: 'Can you help migrate our existing infrastructure to Kubernetes?',
            answer: 'Yes, we specialize in Kubernetes migrations. Our process includes assessing your current applications for containerization readiness, creating Docker containers, designing Kubernetes architecture, implementing GitOps workflows with tools like ArgoCD, and executing a phased migration to minimize risk and ensure business continuity.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sky-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            FAQ
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            DevOps & Cloud FAQ
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Common questions about our DevOps and cloud services answered by our experts.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-sky-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-sky-600 flex-shrink-0" />
                                ) : (
                                    <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions? */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-white rounded-2xl p-12 max-w-3xl mx-auto border border-gray-200"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Can not find the answer you are looking for? Our DevOps experts are here to help you with any questions about infrastructure, deployments, or cloud services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500">
                            Contact Our Team
                        </Button>
                        <Button href="/services/devops-cloud/pricing" variant="secondary" size="lg">
                            View Pricing
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
