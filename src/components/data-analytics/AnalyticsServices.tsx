'use client';

import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    PresentationChartLineIcon,
    TableCellsIcon,
    CpuChipIcon,
    CloudArrowUpIcon,
    DocumentChartBarIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsServices() {
    const services = [
        {
            title: 'BI Dashboards',
            description: 'Interactive business intelligence dashboards that consolidate your key metrics in real-time, providing instant visibility into performance across all departments.',
            icon: ChartBarIcon,
        },
        {
            title: 'Predictive Analytics',
            description: 'Leverage machine learning and statistical models to forecast trends, anticipate customer behavior, and make proactive business decisions.',
            icon: PresentationChartLineIcon,
        },
        {
            title: 'Data Visualization',
            description: 'Transform complex datasets into compelling visual stories with charts, graphs, and interactive reports that anyone can understand.',
            icon: TableCellsIcon,
        },
        {
            title: 'Real-time Reporting',
            description: 'Automated reporting systems that deliver up-to-the-minute insights directly to stakeholders, enabling faster and more informed decision-making.',
            icon: CpuChipIcon,
        },
        {
            title: 'Data Mining',
            description: 'Discover hidden patterns and correlations in your data using advanced algorithms that reveal opportunities for optimization and growth.',
            icon: CloudArrowUpIcon,
        },
        {
            title: 'Custom Reports',
            description: 'Tailored analytical reports designed specifically for your business needs, from executive summaries to detailed operational analyses.',
            icon: DocumentChartBarIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Comprehensive Analytics Solutions
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From data collection to actionable insights, we provide end-to-end analytics services that drive measurable business outcomes.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
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
