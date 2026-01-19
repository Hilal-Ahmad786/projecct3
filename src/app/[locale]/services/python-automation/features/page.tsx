'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const features = [
    {
        title: 'Web Scraping & Data Extraction',
        description: 'Automated data collection from websites using Selenium, Beautiful Soup, and Scrapy for comprehensive data gathering.'
    },
    {
        title: 'Excel & Spreadsheet Automation',
        description: 'Automate repetitive Excel tasks, generate reports, and process large datasets with OpenPyXL and Pandas.'
    },
    {
        title: 'Email Automation',
        description: 'Automated email sending, parsing, and response handling with custom filters and templates.'
    },
    {
        title: 'File Management Automation',
        description: 'Organize, rename, move, and process files automatically based on custom rules and schedules.'
    },
    {
        title: 'Database Operations',
        description: 'Automated database backups, migrations, data synchronization, and report generation.'
    },
    {
        title: 'API Integration & Automation',
        description: 'Connect and automate workflows between different services using REST APIs and webhooks.'
    },
    {
        title: 'Browser Automation',
        description: 'Automate repetitive browser tasks, form submissions, and multi-step web processes.'
    },
    {
        title: 'Data Processing & ETL',
        description: 'Extract, transform, and load data pipelines for business intelligence and analytics.'
    },
    {
        title: 'Report Generation',
        description: 'Automated creation of PDF reports, dashboards, and data visualizations on schedule.'
    },
    {
        title: 'Task Scheduling & Monitoring',
        description: 'Set up automated tasks with scheduling, error handling, and real-time monitoring.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Python Automation Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Comprehensive automation solutions to streamline your business processes and boost productivity.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
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
            </div>
        </main>
    );
}
