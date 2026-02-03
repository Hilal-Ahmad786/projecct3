'use client';

import { motion } from 'framer-motion';

interface Technology {
  name: string;
  icon: string;
}

interface TechStackPageClientProps {
  serviceName: string;
  technologies: Technology[];
}

// Tech icon mapping to emojis/symbols
const techIconMap: Record<string, string> = {
  react: '⚛️',
  nextjs: '▲',
  typescript: '🔷',
  javascript: '🟨',
  nodejs: '🟢',
  python: '🐍',
  django: '🎸',
  flask: '🧪',
  postgresql: '🐘',
  mongodb: '🍃',
  mysql: '🐬',
  redis: '🔴',
  docker: '🐳',
  kubernetes: '☸️',
  aws: '☁️',
  gcp: '🌐',
  azure: '🔵',
  graphql: '◈',
  rest: '🔗',
  tailwind: '💨',
  figma: '🎨',
  git: '🔀',
  github: '🐙',
  linux: '🐧',
  nginx: '🟩',
  terraform: '🏗️',
  ansible: '🔧',
  jenkins: '🤖',
  default: '⚙️',
};

function getTechIcon(iconName: string): string {
  const normalizedName = iconName.toLowerCase().replace(/[^a-z]/g, '');
  return techIconMap[normalizedName] || techIconMap.default;
}

export default function TechStackPageClient({ serviceName, technologies }: TechStackPageClientProps) {
  if (technologies.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{serviceName} Tech Stack</h1>
          <p className="text-gray-600">No technology information available for this service yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-900" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Technologies
            </span>
            <div className="w-8 h-0.5 bg-gray-900" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {serviceName} Tech Stack
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver robust, scalable, and maintainable solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {getTechIcon(tech.icon)}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{tech.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Why These Technologies?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our technology choices are driven by performance, scalability, and long-term maintainability.
              We stay current with industry best practices while ensuring stability and reliability for your projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
