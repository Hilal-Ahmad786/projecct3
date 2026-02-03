'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  description?: string;
  link?: string;
}

interface PortfolioPageClientProps {
  serviceName: string;
  portfolio: PortfolioItem[];
}

export default function PortfolioPageClient({ serviceName, portfolio }: PortfolioPageClientProps) {
  if (portfolio.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{serviceName} Portfolio</h1>
          <p className="text-gray-600">No portfolio items available for this service yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-900" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Our Work
            </span>
            <div className="w-8 h-0.5 bg-gray-900" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {serviceName} Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our successful projects and see how we've helped businesses achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolio.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-6xl opacity-30">🖼️</span>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    View Project
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Want to See Your Project Here?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can help bring your vision to life with our {serviceName.toLowerCase()} expertise.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
