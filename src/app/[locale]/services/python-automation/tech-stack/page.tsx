'use client';

import { motion } from 'framer-motion';

const techCategories = [
    {
        category: 'Web Scraping',
        technologies: ['Selenium', 'Beautiful Soup', 'Scrapy', 'Playwright', 'Requests']
    },
    {
        category: 'Data Processing',
        technologies: ['Pandas', 'NumPy', 'Polars', 'OpenPyXL', 'csv']
    },
    {
        category: 'Automation',
        technologies: ['PyAutoGUI', 'Keyboard', 'Schedule', 'APScheduler', 'Celery']
    },
    {
        category: 'APIs & Web',
        technologies: ['FastAPI', 'Flask', 'Requests', 'httpx', 'aiohttp']
    },
    {
        category: 'Databases',
        technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLAlchemy', 'SQLite']
    },
    {
        category: 'DevOps & Deployment',
        technologies: ['Docker', 'GitHub Actions', 'AWS Lambda', 'Cron', 'Supervisor']
    }
];

import { getTechIcon } from '@/components/icons/TechIcons';

export default function TechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-orange-400 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Technology
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Python Tech Stack
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        We use the most reliable and powerful Python libraries and tools to build robust automation solutions.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {techCategories.map((cat, catIndex) => (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-orange-400 mb-4">{cat.category}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {cat.technologies.map((tech, techIndex) => {
                                    const Icon = getTechIcon(tech);
                                    return (
                                        <motion.div
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                                            className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-4 hover:border-orange-500 hover:bg-gray-800/80 transition-all duration-300 group"
                                        >
                                            <div className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors">
                                                <Icon className="w-full h-full" />
                                            </div>
                                            <span className="font-medium text-white">{tech}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Python Logo Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-800 rounded-2xl border border-gray-700">
                        <svg className="w-12 h-12 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-2xl font-bold text-white">Python 3.10+</div>
                            <div className="text-gray-400">Modern Python for maximum performance</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
