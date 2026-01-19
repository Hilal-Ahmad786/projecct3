'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Price Monitoring',
        industry: 'Retail',
        description: 'Automated competitor price tracking system that monitors 50+ e-commerce sites daily, extracting pricing data and generating real-time alerts for price changes.',
        result: '40% faster pricing decisions',
        technologies: ['Scrapy', 'Selenium', 'PostgreSQL', 'FastAPI'],
        color: 'orange'
    },
    {
        id: 2,
        title: 'Financial Report Automation',
        industry: 'Finance',
        description: 'End-to-end automation of monthly financial reporting, pulling data from multiple sources, processing calculations, and generating PDF reports.',
        result: '20 hours saved per month',
        technologies: ['Pandas', 'OpenPyXL', 'ReportLab', 'Schedule'],
        color: 'blue'
    },
    {
        id: 3,
        title: 'Lead Generation Bot',
        industry: 'Marketing',
        description: 'Intelligent web scraping system that identifies and extracts potential leads from LinkedIn, industry directories, and company websites.',
        result: '5000+ qualified leads monthly',
        technologies: ['Beautiful Soup', 'Playwright', 'Redis', 'Celery'],
        color: 'green'
    },
    {
        id: 4,
        title: 'Inventory Sync Automation',
        industry: 'Supply Chain',
        description: 'Real-time inventory synchronization across multiple warehouses and sales channels, with automated reorder triggers and stock alerts.',
        result: '99.5% inventory accuracy',
        technologies: ['FastAPI', 'SQLAlchemy', 'Redis', 'Docker'],
        color: 'purple'
    }
];

export default function PortfolioPage() {
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
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Automation Case Studies
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Real-world Python automation projects that delivered measurable business impact for our clients.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Project Header */}
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors" />
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{project.industry}</span>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                                {/* Result Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    {project.result}
                                </div>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
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
            </div>
        </main>
    );
}
