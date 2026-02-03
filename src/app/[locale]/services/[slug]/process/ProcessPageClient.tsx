'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ClockIcon, CheckBadgeIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import ParticleNetwork from '@/components/ParticleNetwork';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  steps: ProcessStep[];
  processLayout?: string;
  locale: string;
}

const colorClasses: Record<string, { gradient: string; accent: string; light: string; dark: string }> = {
  emerald: { gradient: 'from-emerald-500 to-teal-600', accent: 'text-emerald-600', light: 'bg-emerald-50', dark: 'bg-emerald-600' },
  blue: { gradient: 'from-blue-500 to-indigo-600', accent: 'text-blue-600', light: 'bg-blue-50', dark: 'bg-blue-600' },
  violet: { gradient: 'from-violet-500 to-purple-600', accent: 'text-violet-600', light: 'bg-violet-50', dark: 'bg-violet-600' },
  amber: { gradient: 'from-amber-500 to-orange-600', accent: 'text-amber-600', light: 'bg-amber-50', dark: 'bg-amber-600' },
  rose: { gradient: 'from-rose-500 to-pink-600', accent: 'text-rose-600', light: 'bg-rose-50', dark: 'bg-rose-600' },
  gray: { gradient: 'from-gray-600 to-gray-800', accent: 'text-gray-700', light: 'bg-gray-50', dark: 'bg-gray-700' },
};

const processIcons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
  <svg key="6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
];

export default function ProcessPageClient({
  serviceName,
  serviceSlug,
  serviceColor = 'emerald',
  steps,
  processLayout,
  locale
}: ProcessPageClientProps) {
  const colors = colorClasses[serviceColor] || colorClasses.emerald;
  const layout = processLayout || 'cards';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
        </div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="process-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#process-grid)" />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-20 right-[20%] w-96 h-96 bg-gradient-to-r ${colors.gradient} rounded-full filter blur-[100px] opacity-20`}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-[10%] w-80 h-80 bg-blue-500 rounded-full filter blur-[100px] opacity-20"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href={`/${locale}/services`} className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-white transition-colors">{serviceName}</Link>
            <span>/</span>
            <span className="text-white">Process</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors.gradient} bg-opacity-20 mb-6`}
              >
                <ClockIcon className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Our Methodology</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                How We Build
                <br />
                <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {serviceName}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-xl mb-8 leading-relaxed"
              >
                Our proven process ensures consistent, high-quality results. From discovery to deployment, every step is designed for success.
              </motion.p>

              {/* Process Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-8"
              >
                <div>
                  <div className="text-3xl font-bold text-white">{steps.length}</div>
                  <div className="text-sm text-gray-400">Clear Steps</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Transparency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Agile</div>
                  <div className="text-sm text-gray-400">Methodology</div>
                </div>
              </motion.div>
            </div>

            {/* Process Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Circular Process Visualization */}
                <div className="relative w-80 h-80 mx-auto">
                  {steps.slice(0, 6).map((step, i) => {
                    const angle = (i * 360) / Math.min(steps.length, 6) - 90;
                    const radius = 120;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                        className="absolute w-16 h-16 -ml-8 -mt-8"
                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                      >
                        <div className={`w-full h-full ${colors.dark} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {processIcons[i % processIcons.length]}
                        </div>
                      </motion.div>
                    );
                  })}
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-gray-700"
                    />
                    <div className={`absolute w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-2xl`}>
                      <RocketLaunchIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {steps.length === 0 ? (
            <div className="text-center py-16">
              <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Process Details Coming Soon</h2>
              <p className="text-gray-600">We're preparing detailed process information for this service.</p>
            </div>
          ) : layout === 'timeline' ? (
            /* Timeline Layout */
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex items-start gap-8 mb-16 last:mb-0 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <div className={`inline-block px-3 py-1 ${colors.light} rounded-full text-sm font-medium ${colors.accent} mb-4`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 ${colors.dark} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {processIcons[(step.step - 1) % processIcons.length]}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`absolute top-16 left-1/2 w-0.5 h-16 ${colors.light}`} />
                    )}
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          ) : layout === 'steps-horizontal' ? (
            /* Horizontal Steps */
            <div className="overflow-x-auto pb-8">
              <div className="flex gap-6 min-w-max px-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex-shrink-0 w-72"
                  >
                    {/* Connector */}
                    {index < steps.length - 1 && (
                      <div className={`absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-1 bg-gradient-to-r ${colors.gradient}`} />
                    )}
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 mx-auto ${colors.dark} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}>
                        <span className="text-xl font-bold">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Cards Layout (default) */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Step Number Background */}
                  <div className="absolute top-6 right-6 text-7xl font-bold text-gray-50 opacity-50 group-hover:text-gray-100 transition-colors select-none">
                    {String(step.step).padStart(2, '0')}
                  </div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 ${colors.dark} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {processIcons[(step.step - 1) % processIcons.length]}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What You Can Expect Section */}
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
                What You Can <span className="font-semibold">Expect</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transparency and communication are at the heart of our process.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: '📅', title: 'Regular Updates', desc: 'Weekly progress reports and milestone reviews keep you informed every step of the way.' },
                { icon: '💬', title: 'Open Communication', desc: 'Direct access to your dedicated team through your preferred communication channels.' },
                { icon: '🔄', title: 'Iterative Feedback', desc: 'Review and provide feedback at each stage to ensure the final product exceeds expectations.' },
                { icon: '📊', title: 'Quality Assurance', desc: 'Rigorous testing and quality checks at every phase of development.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <CheckBadgeIcon className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Let's begin the journey together. Our team is ready to guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity`}
              >
                Start Your Project
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/services/${serviceSlug}/features`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                View Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
