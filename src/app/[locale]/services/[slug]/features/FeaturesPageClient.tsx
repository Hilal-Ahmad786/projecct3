'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon, SparklesIcon, CubeTransparentIcon, BoltIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ParticleNetwork from '@/components/ParticleNetwork';

interface FeaturesPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  features: string[];
  featureStyle?: string;
  locale: string;
}

const colorClasses: Record<string, { gradient: string; accent: string; light: string; ring: string }> = {
  emerald: { gradient: 'from-emerald-500 to-teal-600', accent: 'text-emerald-600', light: 'bg-emerald-50', ring: 'ring-emerald-200' },
  blue: { gradient: 'from-blue-500 to-indigo-600', accent: 'text-blue-600', light: 'bg-blue-50', ring: 'ring-blue-200' },
  violet: { gradient: 'from-violet-500 to-purple-600', accent: 'text-violet-600', light: 'bg-violet-50', ring: 'ring-violet-200' },
  amber: { gradient: 'from-amber-500 to-orange-600', accent: 'text-amber-600', light: 'bg-amber-50', ring: 'ring-amber-200' },
  rose: { gradient: 'from-rose-500 to-pink-600', accent: 'text-rose-600', light: 'bg-rose-50', ring: 'ring-rose-200' },
  gray: { gradient: 'from-gray-600 to-gray-800', accent: 'text-gray-700', light: 'bg-gray-50', ring: 'ring-gray-200' },
};

const featureIcons = [
  <SparklesIcon key="sparkles" className="w-6 h-6" />,
  <CubeTransparentIcon key="cube" className="w-6 h-6" />,
  <BoltIcon key="bolt" className="w-6 h-6" />,
  <CheckCircleIcon key="check" className="w-6 h-6" />,
];

export default function FeaturesPageClient({
  serviceName,
  serviceSlug,
  serviceColor = 'emerald',
  features,
  featureStyle,
  locale
}: FeaturesPageClientProps) {
  const colors = colorClasses[serviceColor] || colorClasses.emerald;
  const style = featureStyle || 'icon-top';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="opacity-30" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-32 right-[15%] w-64 h-64 ${colors.light} rounded-full mix-blend-multiply filter blur-3xl opacity-60`}
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className={`absolute bottom-20 left-[10%] w-72 h-72 ${colors.light} rounded-full mix-blend-multiply filter blur-3xl opacity-50`}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href={`/${locale}/services`} className="hover:text-gray-900 transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-gray-900 transition-colors">{serviceName}</Link>
            <span>/</span>
            <span className={colors.accent}>Features</span>
          </motion.nav>

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6"
            >
              <SparklesIcon className={`w-4 h-4 ${colors.accent}`} />
              <span className="text-sm font-medium text-gray-700">What We Deliver</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight"
            >
              <span className="font-semibold">{serviceName}</span>
              <br />
              <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                Features & Capabilities
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed"
            >
              Discover the comprehensive features and capabilities that make our {serviceName.toLowerCase()} service stand out from the rest.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-8"
            >
              <div className="text-center">
                <div className={`text-3xl font-bold ${colors.accent}`}>{features.length}</div>
                <div className="text-sm text-gray-500">Key Features</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${colors.accent}`}>100%</div>
                <div className="text-sm text-gray-500">Customizable</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${colors.accent}`}>24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="relative w-96 h-96">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-0 rounded-full border ${colors.ring} opacity-${30 - i * 10}`}
                style={{
                  width: `${100 - i * 20}%`,
                  height: `${100 - i * 20}%`,
                  top: `${i * 10}%`,
                  left: `${i * 10}%`,
                }}
              />
            ))}
            <div className={`absolute inset-1/4 bg-gradient-to-br ${colors.gradient} rounded-2xl shadow-2xl flex items-center justify-center`}>
              <SparklesIcon className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {features.length === 0 ? (
            <div className="text-center py-16">
              <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Features Coming Soon</h2>
              <p className="text-gray-600">We're preparing detailed feature information for this service.</p>
            </div>
          ) : (
            <div className={`grid gap-8 ${style === 'icon-left' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative bg-white rounded-2xl transition-all duration-300 group hover:shadow-xl ${
                    style === 'bordered' ? 'p-8 border-2 border-gray-200 hover:border-gray-400' :
                    style === 'gradient-border' ? 'p-8 border border-gray-100 hover:border-transparent hover:ring-2 hover:ring-emerald-200' :
                    style === 'minimal' ? 'p-6' :
                    'p-8 border border-gray-100 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-300`} />

                  {style === 'icon-left' ? (
                    <div className="flex items-start gap-4 relative z-10">
                      <div className={`w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={colors.accent}>{featureIcons[index % featureIcons.length]}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800">{feature}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Built with precision, scalability, and your specific needs in mind.</p>
                      </div>
                    </div>
                  ) : style === 'numbered' ? (
                    <div className="relative z-10">
                      <div className={`text-5xl font-bold ${colors.light} ${colors.accent} bg-clip-text mb-4 opacity-30 group-hover:opacity-50 transition-opacity`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature}</h3>
                      <p className="text-gray-500 leading-relaxed">Built with precision, scalability, and your specific needs in mind.</p>
                    </div>
                  ) : style === 'minimal' ? (
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient} flex-shrink-0`} />
                      <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={colors.accent}>{featureIcons[index % featureIcons.length]}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature}</h3>
                      <p className="text-gray-500 leading-relaxed">Built with precision, scalability, and your specific needs in mind.</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why These Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Why These <span className="font-semibold">Features Matter</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every feature is designed to deliver measurable value and help you achieve your business goals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🎯', title: 'Goal-Oriented', desc: 'Each feature aligns with your business objectives' },
                { icon: '⚡', title: 'Performance', desc: 'Optimized for speed and efficiency at scale' },
                { icon: '🔒', title: 'Secure', desc: 'Built with security best practices from the ground up' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`max-w-4xl mx-auto bg-gradient-to-br ${colors.gradient} rounded-3xl p-12 text-center text-white relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Let's discuss how these features can transform your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start Your Project
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/services/${serviceSlug}/process`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  View Our Process
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
