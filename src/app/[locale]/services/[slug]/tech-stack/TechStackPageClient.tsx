'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { CpuChipIcon, ServerStackIcon, CloudIcon } from '@heroicons/react/24/solid';
import ParticleNetwork from '@/components/ParticleNetwork';

interface Technology {
  name: string;
  icon: string;
}

interface TechStackPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  technologies: Technology[];
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

const techIconMap: Record<string, string> = {
  react: '⚛️', nextjs: '▲', typescript: '🔷', javascript: '🟨', nodejs: '🟢',
  python: '🐍', django: '🎸', flask: '🧪', postgresql: '🐘', mongodb: '🍃',
  mysql: '🐬', redis: '🔴', docker: '🐳', kubernetes: '☸️', aws: '☁️',
  gcp: '🌐', azure: '🔵', graphql: '◈', rest: '🔗', tailwind: '💨',
  figma: '🎨', git: '🔀', github: '🐙', linux: '🐧', nginx: '🟩',
  terraform: '🏗️', ansible: '🔧', jenkins: '🤖', default: '⚙️',
};

function getTechIcon(iconName: string): string {
  const normalizedName = iconName.toLowerCase().replace(/[^a-z]/g, '');
  return techIconMap[normalizedName] || techIconMap.default;
}

// Categorize technologies
function categorizeTech(technologies: Technology[]) {
  const categories: Record<string, Technology[]> = {
    'Frontend': [],
    'Backend': [],
    'Database': [],
    'DevOps & Cloud': [],
    'Other': [],
  };

  const frontendKeywords = ['react', 'vue', 'angular', 'next', 'nuxt', 'svelte', 'tailwind', 'css', 'html', 'javascript', 'typescript', 'figma'];
  const backendKeywords = ['node', 'python', 'django', 'flask', 'express', 'fastapi', 'rails', 'laravel', 'php', 'java', 'spring', 'go', 'rust', 'graphql', 'rest', 'api'];
  const databaseKeywords = ['postgres', 'mysql', 'mongo', 'redis', 'sqlite', 'elasticsearch', 'cassandra', 'dynamo'];
  const devopsKeywords = ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'ansible', 'jenkins', 'github', 'gitlab', 'ci', 'cd', 'nginx', 'linux'];

  technologies.forEach(tech => {
    const name = tech.name.toLowerCase();
    if (frontendKeywords.some(k => name.includes(k))) {
      categories['Frontend'].push(tech);
    } else if (backendKeywords.some(k => name.includes(k))) {
      categories['Backend'].push(tech);
    } else if (databaseKeywords.some(k => name.includes(k))) {
      categories['Database'].push(tech);
    } else if (devopsKeywords.some(k => name.includes(k))) {
      categories['DevOps & Cloud'].push(tech);
    } else {
      categories['Other'].push(tech);
    }
  });

  return Object.entries(categories).filter(([, techs]) => techs.length > 0);
}

export default function TechStackPageClient({
  serviceName,
  serviceSlug,
  serviceColor = 'emerald',
  technologies,
  locale
}: TechStackPageClientProps) {
  const colors = colorClasses[serviceColor] || colorClasses.emerald;
  const categorizedTech = categorizeTech(technologies);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="opacity-30" />
        </div>

        {/* Animated Code Lines */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear'
              }}
              className={`absolute h-px bg-gradient-to-r ${colors.gradient} opacity-30`}
              style={{ top: `${10 + i * 8}%`, width: `${20 + Math.random() * 30}%` }}
            />
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {['⚛️', '🐳', '☁️', '🐍', '🔷', '🟢'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-4xl"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-slate-400 mb-8"
          >
            <Link href={`/${locale}/services`} className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-white transition-colors">{serviceName}</Link>
            <span>/</span>
            <span className="text-white">Tech Stack</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"
              >
                <CpuChipIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">Technology Stack</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Powered by
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Modern Technology
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-300 max-w-xl mb-8 leading-relaxed"
              >
                We use cutting-edge technologies and proven frameworks to build scalable, maintainable, and high-performance solutions for {serviceName.toLowerCase()}.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-8"
              >
                <div>
                  <div className="text-3xl font-bold text-white">{technologies.length}+</div>
                  <div className="text-sm text-slate-400">Technologies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Battle</div>
                  <div className="text-sm text-slate-400">Tested</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Scalable</div>
                  <div className="text-sm text-slate-400">Architecture</div>
                </div>
              </motion.div>
            </div>

            {/* Tech Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Hexagonal Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {technologies.slice(0, 12).map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all cursor-default"
                    >
                      {getTechIcon(tech.icon)}
                    </motion.div>
                  ))}
                </div>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-3xl opacity-20 -z-10`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {technologies.length === 0 ? (
            <div className="text-center py-16">
              <CpuChipIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Tech Stack Coming Soon</h2>
              <p className="text-gray-600">We're preparing detailed technology information for this service.</p>
            </div>
          ) : categorizedTech.length > 1 ? (
            /* Categorized View */
            <div className="space-y-16">
              {categorizedTech.map(([category, techs], catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    {category === 'Frontend' && <span className="text-2xl">🎨</span>}
                    {category === 'Backend' && <ServerStackIcon className="w-6 h-6 text-gray-600" />}
                    {category === 'Database' && <span className="text-2xl">🗄️</span>}
                    {category === 'DevOps & Cloud' && <CloudIcon className="w-6 h-6 text-gray-600" />}
                    {category === 'Other' && <span className="text-2xl">🔧</span>}
                    {category}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {techs.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group text-center"
                      >
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {getTechIcon(tech.icon)}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">{tech.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Simple Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group text-center"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getTechIcon(tech.icon)}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why These Technologies Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Why We Choose <span className="font-semibold">These Technologies</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our technology choices are driven by performance, reliability, and long-term maintainability.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🚀', title: 'Performance', desc: 'Optimized for speed and efficiency to deliver the best user experience.' },
                { icon: '🔄', title: 'Scalability', desc: 'Built to grow with your business, from startup to enterprise scale.' },
                { icon: '🛡️', title: 'Security', desc: 'Industry-standard security practices and regular updates.' },
                { icon: '📚', title: 'Community', desc: 'Strong community support and extensive documentation.' },
                { icon: '🔧', title: 'Maintainability', desc: 'Clean code practices for easy updates and long-term maintenance.' },
                { icon: '💰', title: 'Cost-Effective', desc: 'Balanced cost and value for sustainable technology investments.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl border border-gray-100"
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
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <CpuChipIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Let's leverage these technologies to create a powerful solution for your business.
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
                href={`/${locale}/services/${serviceSlug}/portfolio`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                View Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
