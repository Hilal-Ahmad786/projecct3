// src/components/TechApproachSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const technologies = [
  { name: 'Next.js', logo: '/images/Tech/nextdotjs.svg', category: 'Frontend' },
  { name: 'React', logo: '/images/Tech/react.svg', category: 'Frontend' },
  { name: 'Node.js', logo: '/images/Tech/nodedotjs.svg', category: 'Backend' },
  { name: 'Python', logo: '/images/Tech/python.svg', category: 'Backend' },
  { name: 'MongoDB', logo: '/images/Tech/mongodb.svg', category: 'Database' },
  { name: 'PostgreSQL', logo: '/images/Tech/postgresql.svg', category: 'Database' },
  { name: 'AWS', logo: '/images/Tech/aws.png', category: 'Cloud' },
  { name: 'Docker', logo: '/images/Tech/docker.svg', category: 'DevOps' },
  { name: 'Kubernetes', logo: '/images/Tech/kubernetes.svg', category: 'DevOps' },
  { name: 'TensorFlow', logo: '/images/Tech/tensorflow.svg', category: 'AI/ML' },
  { name: 'PyTorch', logo: '/images/Tech/pytorch.svg', category: 'AI/ML' },
  { name: 'Shopify', logo: '/images/Tech/shopify.svg', category: 'E-Commerce' }
];

const approach = [
  {
    step: '01',
    title: 'Technology Assessment',
    description: 'We evaluate your current tech stack and recommend the best technologies for your specific needs and goals.'
  },
  {
    step: '02',
    title: 'Architecture Design',
    description: 'Our team designs scalable, maintainable architecture that can grow with your business requirements.'
  },
  {
    step: '03',
    title: 'Agile Development',
    description: 'We use agile methodologies with regular sprints, ensuring transparency and continuous improvement.'
  },
  {
    step: '04',
    title: 'Quality Assurance',
    description: 'Comprehensive testing including unit tests, integration tests, and user acceptance testing.'
  },
  {
    step: '05',
    title: 'Deployment & Monitoring',
    description: 'Seamless deployment with continuous monitoring and performance optimization post-launch.'
  }
];

export default function TechApproachSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Proper Crescent Elements */}
      <div className="absolute bottom-20 right-16 w-24 h-24">
        <div className="crescent crescent-right crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Technology & Process"
          title="Our Technical Approach"
          subtitle="We leverage cutting-edge technologies and proven methodologies to deliver exceptional digital solutions."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technologies */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className="text-overline">Technologies We Use</span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-6"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  className="group text-center"
                >
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-3 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-900 mb-1">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tech.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Process */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className="text-overline">Our Process</span>
            </div>

            <div className="space-y-6">
              {approach.map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {phase.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { value: '20+', label: 'Technologies' },
            { value: '5+', label: 'Years Experience' },
            { value: '99%', label: 'Uptime' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}