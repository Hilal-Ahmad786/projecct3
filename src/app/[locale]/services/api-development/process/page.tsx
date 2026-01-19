'use client';

import { motion } from 'framer-motion';
import {
    ClipboardDocumentListIcon,
    CubeTransparentIcon,
    CodeBracketSquareIcon,
    DocumentTextIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import APICTA from '@/components/api-development/APICTA';

export default function ProcessPage() {
    const steps = [
        {
            number: '01',
            title: 'Requirements Analysis',
            description: 'Understanding your business needs and API specifications.',
            icon: ClipboardDocumentListIcon,
            details: [
                'Stakeholder interviews and requirements gathering',
                'Data flow analysis and endpoint mapping',
                'Security requirements assessment',
                'Performance benchmarks definition'
            ]
        },
        {
            number: '02',
            title: 'Architecture Design',
            description: 'Designing scalable and maintainable API architecture.',
            icon: CubeTransparentIcon,
            details: [
                'RESTful or GraphQL architecture selection',
                'Database schema design',
                'Authentication strategy planning',
                'Versioning and scaling strategies'
            ]
        },
        {
            number: '03',
            title: 'Development & Testing',
            description: 'Building robust APIs with comprehensive test coverage.',
            icon: CodeBracketSquareIcon,
            details: [
                'Test-driven development approach',
                'Continuous integration setup',
                'Code reviews and quality gates',
                'Performance optimization'
            ]
        },
        {
            number: '04',
            title: 'Documentation',
            description: 'Creating developer-friendly documentation.',
            icon: DocumentTextIcon,
            details: [
                'Swagger/OpenAPI specification',
                'Interactive API playground',
                'Code samples in multiple languages',
                'Authentication guides'
            ]
        },
        {
            number: '05',
            title: 'Deployment & Monitoring',
            description: 'Launching with continuous monitoring and support.',
            icon: RocketLaunchIcon,
            details: [
                'Automated CI/CD deployment',
                'Health checks and alerting',
                'Performance monitoring',
                'Usage analytics dashboard'
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Methodology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our API Development Process
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        A structured approach to building high-quality, production-ready APIs.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative mb-12 last:mb-0"
                        >
                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-full bg-teal-100" />
                            )}

                            <div className="flex gap-8">
                                {/* Step Number */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                                        {step.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                                            <step.icon className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>

                                    <ul className="grid md:grid-cols-2 gap-3 mt-6">
                                        {step.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2 text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-20">
                <APICTA />
            </div>
        </main>
    );
}
