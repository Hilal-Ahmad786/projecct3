'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'How much data do I need for a successful ML project?',
        answer: 'The data requirements vary significantly by use case and model type. Simple classification tasks might work with a few thousand examples, while deep learning models typically need tens of thousands to millions of data points. During our discovery phase, we thoroughly assess your existing data and recommend strategies including data augmentation, transfer learning, synthetic data generation, or active learning if your dataset is limited. We also help identify additional data sources that could improve model performance.'
    },
    {
        question: 'How long does it take to develop and deploy an ML model?',
        answer: 'Timeline depends on project complexity, data quality, and integration requirements. A typical proof of concept takes 4-8 weeks, while production-ready solutions range from 2-6 months. We use agile methodologies to deliver value incrementally, often deploying a working MVP within the first 6-8 weeks that can be refined based on real-world feedback. Complex projects involving multiple models or extensive infrastructure may take longer.'
    },
    {
        question: 'Can ML models integrate with our existing systems?',
        answer: 'Absolutely. We design ML solutions with integration as a core requirement, providing REST APIs, GraphQL endpoints, webhooks, and connectors for popular platforms like Salesforce, SAP, and various databases. Our solutions work with your existing tech stack, cloud infrastructure, and data pipelines. We also support on-premise deployments for organizations with strict data residency requirements.'
    },
    {
        question: 'How do you ensure model accuracy and fairness?',
        answer: 'We implement rigorous testing including k-fold cross-validation, A/B testing, and comprehensive bias detection across different demographic groups. Our models undergo validation across diverse data subsets to ensure consistent performance. We use explainable AI techniques (SHAP, LIME) to understand model decisions and implement fairness metrics. In production, we continuously monitor for model drift and implement automated retraining pipelines when performance degrades.'
    },
    {
        question: 'What about data privacy and security?',
        answer: 'Data security is paramount in everything we do. We implement encryption at rest and in transit, role-based access controls, comprehensive audit logging, and secure model serving. We can deploy solutions on-premise, in private cloud environments, or use federated learning approaches where data never leaves your infrastructure. Our team is experienced with GDPR, HIPAA, SOC 2, and other compliance requirements, and we can work with your security team to meet any specific requirements.'
    },
    {
        question: 'Do you provide ongoing support after deployment?',
        answer: 'Yes, all our packages include post-launch support ranging from 30 days to ongoing SLA-based support for enterprise clients. This includes model monitoring dashboards, performance optimization, scheduled retraining, incident response, and technical assistance. We also offer fully managed ML services for organizations that prefer to outsource model operations, including 24/7 monitoring and automatic scaling.'
    },
    {
        question: 'What is the typical ROI for ML projects?',
        answer: 'ROI varies by use case, but our clients typically see 3-10x return on their ML investment within 12-18 months. Common benefits include 20-50% reduction in operational costs, 15-40% improvement in prediction accuracy over rule-based systems, and significant time savings through automation. We work with you to define clear KPIs and success metrics before starting any project, ensuring measurable business impact.'
    },
    {
        question: 'Can you work with our internal data science team?',
        answer: 'Absolutely. We offer flexible engagement models including full project delivery, team augmentation, advisory services, and training programs. We can complement your existing team with specialized expertise in areas like deep learning, MLOps, or specific domains. We also provide knowledge transfer throughout the engagement, ensuring your team can maintain and extend the solutions we build together.'
    },
    {
        question: 'What industries do you have experience in?',
        answer: 'We have deep experience across multiple industries including financial services, healthcare, manufacturing, retail, e-commerce, logistics, energy, and telecommunications. Each industry has unique challenges and regulatory requirements - our team understands these nuances and brings relevant domain expertise to every project. We also leverage cross-industry insights to bring innovative solutions to traditional problems.'
    },
    {
        question: 'How do you handle model explainability and transparency?',
        answer: 'Explainability is built into our ML development process from day one. We use interpretable models where possible and apply explainability techniques (SHAP values, LIME, attention visualization) for complex deep learning models. We provide documentation explaining how models make decisions, which is essential for regulatory compliance, stakeholder trust, and debugging. For high-stakes applications, we can implement human-in-the-loop systems where model predictions are reviewed before action.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Machine Learning Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Answers to frequently asked questions about our machine learning services, methodology, and approach to AI solutions.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-violet-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-violet-600 flex-shrink-0" />
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

                {/* Contact CTA */}
                <div className="max-w-3xl mx-auto mt-12 text-center p-8 bg-violet-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">Can&apos;t find the answer you&apos;re looking for? Our ML experts would be happy to discuss your specific requirements.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
                    >
                        Contact Our ML Team
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
}
