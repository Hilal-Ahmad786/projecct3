'use client';

import { motion } from 'framer-motion';
import APICTA from '@/components/api-development/APICTA';
import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    const categories = [
        {
            title: 'Backend Frameworks',
            description: 'Industry-leading frameworks for building robust APIs',
            technologies: [
                { name: 'Node.js', description: 'High-performance JavaScript runtime' },
                { name: 'Express.js', description: 'Minimalist web framework for Node.js' },
                { name: 'FastAPI', description: 'Modern Python framework with auto docs' },
                { name: 'NestJS', description: 'Progressive Node.js framework' }
            ]
        },
        {
            title: 'API Protocols',
            description: 'Modern standards for API communication',
            technologies: [
                { name: 'REST', description: 'Standard HTTP-based architecture' },
                { name: 'GraphQL', description: 'Flexible query language for APIs' },
                { name: 'gRPC', description: 'High-performance RPC framework' },
                { name: 'WebSocket', description: 'Real-time bidirectional communication' }
            ]
        },
        {
            title: 'Databases',
            description: 'Reliable data storage solutions',
            technologies: [
                { name: 'PostgreSQL', description: 'Advanced relational database' },
                { name: 'MongoDB', description: 'Flexible document database' },
                { name: 'Redis', description: 'In-memory data store and cache' },
                { name: 'Elasticsearch', description: 'Search and analytics engine' }
            ]
        },
        {
            title: 'Infrastructure & DevOps',
            description: 'Scalable deployment and monitoring',
            technologies: [
                { name: 'Docker', description: 'Container platform' },
                { name: 'Kubernetes', description: 'Container orchestration' },
                { name: 'AWS', description: 'Cloud infrastructure' },
                { name: 'Nginx', description: 'Reverse proxy and load balancer' }
            ]
        },
        {
            title: 'Documentation & Testing',
            description: 'Quality assurance and developer experience',
            technologies: [
                { name: 'Swagger/OpenAPI', description: 'API specification standard' },
                { name: 'Postman', description: 'API development platform' },
                { name: 'Jest', description: 'JavaScript testing framework' },
                { name: 'Pytest', description: 'Python testing framework' }
            ]
        },
        {
            title: 'Security',
            description: 'Enterprise-grade security measures',
            technologies: [
                { name: 'OAuth 2.0', description: 'Authorization framework' },
                { name: 'JWT', description: 'Token-based authentication' },
                { name: 'HTTPS/TLS', description: 'Transport layer security' },
                { name: 'Rate Limiting', description: 'API abuse prevention' }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-teal-900 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-teal-300 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our API Tech Stack
                    </h1>
                    <p className="text-xl text-teal-200 leading-relaxed">
                        We leverage industry-leading technologies to build secure, scalable, and performant APIs.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                                <p className="text-teal-300">{category.description}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.technologies.map((tech, techIndex) => {
                                    const Icon = getTechIcon(tech.name);
                                    return (
                                        <motion.div
                                            key={techIndex}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                                            className="p-6 bg-teal-800/50 rounded-xl border border-teal-700 hover:border-teal-500 hover:bg-teal-800 transition-all duration-300 group flex flex-col items-center text-center gap-4"
                                        >
                                            <div className="w-12 h-12 text-teal-300 group-hover:text-white transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-teal-300 transition-colors">
                                                    {tech.name}
                                                </h3>
                                                <p className="text-sm text-teal-300">
                                                    {tech.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div>
                        <div className="text-4xl font-bold text-teal-300 mb-2">20+</div>
                        <div className="text-teal-400">Technologies</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-teal-300 mb-2">100+</div>
                        <div className="text-teal-400">APIs Built</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-teal-300 mb-2">99.9%</div>
                        <div className="text-teal-400">Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-teal-300 mb-2">&lt;100ms</div>
                        <div className="text-teal-400">Avg Response</div>
                    </div>
                </motion.div>
            </div>

            <div className="mt-20">
                <APICTA />
            </div>
        </main>
    );
}
