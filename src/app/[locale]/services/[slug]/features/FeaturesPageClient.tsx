'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface FeaturesPageClientProps {
  serviceName: string;
  features: string[];
  featureStyle?: string;
}

export default function FeaturesPageClient({ serviceName, features, featureStyle }: FeaturesPageClientProps) {
  const style = featureStyle || 'icon-top';

  if (features.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{serviceName} Features</h1>
          <p className="text-gray-600">No features available for this service yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-900" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Features
            </span>
            <div className="w-8 h-0.5 bg-gray-900" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {serviceName} Features
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Comprehensive solutions tailored to your specific needs.
          </p>
        </div>

        <div className={`grid gap-8 max-w-6xl mx-auto ${style === 'icon-left' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl transition-all duration-300 group hover:shadow-lg ${
                style === 'bordered' ? 'p-8 border-2 border-gray-200 hover:border-gray-400' :
                style === 'gradient-border' ? 'p-8 border border-gray-100 hover:border-transparent hover:ring-2 hover:ring-emerald-200' :
                style === 'minimal' ? 'p-6 border-0 shadow-none hover:bg-gray-100' :
                'p-8 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {style === 'icon-left' ? (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors duration-300">
                    <CheckCircleIcon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{feature}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Built with precision and scalability in mind.</p>
                  </div>
                </div>
              ) : style === 'numbered' ? (
                <>
                  <div className="text-3xl font-bold text-gray-100 mb-4 group-hover:text-gray-200 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature}</h3>
                  <p className="text-gray-500 leading-relaxed">Built with precision and scalability in mind.</p>
                </>
              ) : style === 'minimal' ? (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
                  <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                </div>
              ) : (
                /* icon-top (default), bordered, gradient-border */
                <>
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                    <CheckCircleIcon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature}</h3>
                  <p className="text-gray-500 leading-relaxed">Built with precision and scalability in mind.</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
