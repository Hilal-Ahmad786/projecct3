'use client';

import { motion } from 'framer-motion';
import {
    DocumentTextIcon,
    TableCellsIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    ChartBarIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';

export default function AutomationServices() {
    const services = [
        {
            title: 'Web Scraping & Data Extraction',
            description: 'Extract valuable data from websites and online sources with intelligent scraping solutions that handle complex scenarios.',
            icon: GlobeAltIcon,
        },
        {
            title: 'Document Processing',
            description: 'Automate PDF parsing, form filling, report generation, and document conversion with precision and speed.',
            icon: DocumentTextIcon,
        },
        {
            title: 'Excel & Data Automation',
            description: 'Transform manual spreadsheet tasks into automated workflows for data cleaning, analysis, and reporting.',
            icon: TableCellsIcon,
        },
        {
            title: 'Email Automation',
            description: 'Streamline email workflows with automated sending, parsing, and response handling systems.',
            icon: EnvelopeIcon,
        },
        {
            title: 'Data Analysis & Reporting',
            description: 'Generate automated insights and reports from your data with scheduled analysis pipelines.',
            icon: ChartBarIcon,
        },
        {
            title: 'Custom Scripts & Tools',
            description: 'Bespoke Python applications tailored to your unique business processes and requirements.',
            icon: CommandLineIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Automation Services We Offer
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From simple scripts to complex automation systems, we build solutions that scale with your business.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-300" />
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
