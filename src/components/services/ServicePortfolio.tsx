'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/useTranslations'
import { useState } from 'react'

interface PortfolioItem {
    title: string;
    category: string;
    image: string;
    url?: string;
}

export default function ServicePortfolio({ portfolio }: { portfolio: PortfolioItem[] }) {
    const { t } = useTranslations();

    if (!portfolio || portfolio.length === 0) return null

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
                    >
                        {t('services.detail.portfolio.eyebrow') || 'Our Work'}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        {t('services.detail.portfolio.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        {t('services.detail.portfolio.description')}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolio.slice(0, 6).map((project, index) => (
                        <PortfolioCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PortfolioCard({ project, index }: { project: PortfolioItem; index: number }) {
    const { t } = useTranslations();
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
        if (project.url) {
            window.open(project.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={handleClick}
            className="group cursor-pointer"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                {!imageError && project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-30">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                        {t('services.detail.portfolio.viewProject') || 'View Project'}
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
            <p className="text-emerald-600 text-sm font-medium">{project.category}</p>
        </motion.div>
    )
}
