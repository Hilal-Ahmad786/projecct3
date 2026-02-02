'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface PortfolioItem {
    title: string;
    category: string;
    image: string;
}

export default function ServicePortfolio({ portfolio }: { portfolio: PortfolioItem[] }) {
    if (!portfolio || portfolio.length === 0) return null

    return (
        <section id="portfolio" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Projects</h2>
                    <p className="text-gray-600">See what we've built for our clients.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {portfolio.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-100">
                                {/* Placeholder for actual images - using a colored div if image fails */}
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                    Image Placeholder
                                </div>
                                {/* 
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-medium px-6 py-2 border border-white rounded-sm">
                                        View Case Study
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
                            <p className="text-emerald-600 text-sm font-medium">{project.category}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
