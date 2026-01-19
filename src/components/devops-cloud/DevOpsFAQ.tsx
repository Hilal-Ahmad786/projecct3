'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function DevOpsFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is DevOps and how can it benefit my organization?',
            answer: 'DevOps is a set of practices that combines software development and IT operations to shorten the development lifecycle while delivering features, fixes, and updates frequently. It benefits organizations by improving deployment frequency, faster time to market, lower failure rate of new releases, and faster mean time to recovery.'
        },
        {
            question: 'Which cloud platforms do you work with?',
            answer: 'We are certified partners and experts in all major cloud platforms including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We also have experience with hybrid and multi-cloud architectures to meet your specific requirements.'
        },
        {
            question: 'How long does a typical cloud migration take?',
            answer: 'The timeline depends on the complexity and size of your infrastructure. A small to medium migration typically takes 2-4 months, while enterprise-level migrations can take 6-12 months. We follow a phased approach to minimize risk and ensure business continuity throughout the process.'
        },
        {
            question: 'What CI/CD tools do you implement?',
            answer: 'We work with a variety of CI/CD tools based on your needs, including Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure DevOps, and ArgoCD for GitOps workflows. We help you choose and implement the right tools for your technology stack and team.'
        },
        {
            question: 'How do you ensure security in DevOps practices?',
            answer: 'We implement DevSecOps practices that integrate security at every stage of the development pipeline. This includes automated security scanning, vulnerability assessments, secret management, compliance monitoring, and implementing the principle of least privilege across your infrastructure.'
        },
        {
            question: 'What is Infrastructure as Code and why is it important?',
            answer: 'Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code rather than manual processes. It enables version control, consistency across environments, faster provisioning, and easier disaster recovery. We use tools like Terraform, Ansible, and CloudFormation to implement IaC.'
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-sky-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
