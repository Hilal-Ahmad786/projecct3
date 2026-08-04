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

const FALLBACK_GRADIENTS = [
    'from-blue-500 to-blue-700',
    'from-violet-500 to-violet-700',
    'from-emerald-500 to-teal-700',
    'from-orange-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-purple-700',
];

export default function ServicePortfolio({ portfolio }: { portfolio: PortfolioItem[] }) {
    const { t } = useTranslations();

    if (!portfolio || portfolio.length === 0) return null

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <div className="w-8 h-px bg-gray-300" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                            {t('services.detail.portfolio.eyebrow') || 'Case Studies'}
                        </span>
                        <div className="w-8 h-px bg-gray-300" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-light text-gray-900 mb-3"
                    >
                        {t('services.detail.portfolio.title') || 'Recent Projects'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-500 max-w-xl mx-auto"
                    >
                        {t('services.detail.portfolio.description') || "See what we've built for our clients."}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {portfolio.slice(0, 4).map((project, index) => (
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
    const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

    const handleClick = () => {
        if (project.url) {
            window.open(project.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            onClick={handleClick}
            className={`group ${project.url ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* Image / gradient thumbnail — subtle lift + shadow on hover */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                {!imageError && project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-600 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-white text-6xl font-bold opacity-20 select-none">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Always-visible category chip */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full shadow-sm">
                        {project.category}
                    </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                        {t('services.detail.portfolio.viewProject') || 'View Project'}
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Text below card */}
            <h3 className="text-lg font-semibold text-gray-900 mb-0.5 leading-snug group-hover:text-heritage-turquoise-deep transition-colors duration-200">
                {project.title}
            </h3>
            <p className="text-sm text-gray-400 font-medium">{project.category}</p>
        </motion.div>
    )
}
