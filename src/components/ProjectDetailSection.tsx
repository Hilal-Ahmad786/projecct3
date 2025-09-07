// src/components/ProjectDetailSection.tsx
'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { 
  CodeBracketIcon,
  ClockIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export default function ProjectDetailSection() {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Modern Technology',
      description: 'We use cutting-edge technologies and frameworks to build scalable, maintainable solutions that stand the test of time.',
      details: ['React/Next.js', 'Node.js', 'Python', 'Cloud Infrastructure']
    },
    {
      icon: ClockIcon,
      title: 'Efficient Delivery',
      description: 'Our agile development process ensures timely delivery without compromising on quality or functionality.',
      details: ['Agile Methodology', 'Sprint Planning', 'Regular Updates', 'On-time Delivery']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality control processes ensure your project meets the highest standards.',
      details: ['Code Reviews', 'Automated Testing', 'Security Audits', 'Performance Optimization']
    },
    {
      icon: CogIcon,
      title: 'Ongoing Support',
      description: 'Comprehensive maintenance and support services to keep your systems running smoothly.',
      details: ['24/7 Monitoring', 'Regular Updates', 'Bug Fixes', 'Feature Enhancements']
    }
  ]

  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '50+', label: 'Satisfied Clients' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'Support Available' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute bottom-20 left-16 w-32 h-32 opacity-[0.02]">
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(45% at 30% 70%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Our Approach"
          title="Why Choose PakTechnology"
          subtitle="We combine technical expertise with strategic thinking to deliver solutions that drive real business results."
          className="mb-16"
        />

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="card group"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-title text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-body text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  {feature.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-caption text-gray-500">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-gray-900" />
                <span className="text-overline">Our Process</span>
              </div>
              
              <h3 className="text-headline text-gray-900 mb-6">
                From Concept to Completion
              </h3>
              
              <p className="text-body text-gray-600 mb-8 leading-relaxed">
                We follow a structured approach that ensures every project is delivered 
                on time, within budget, and exceeds expectations. Our process is designed 
                to be transparent, collaborative, and results-driven.
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Discovery & Planning', desc: 'Understanding requirements and defining project scope' },
                  { step: '02', title: 'Design & Prototyping', desc: 'Creating user-centered designs and interactive prototypes' },
                  { step: '03', title: 'Development & Testing', desc: 'Building robust solutions with comprehensive testing' },
                  { step: '04', title: 'Deployment & Support', desc: 'Launching your project with ongoing maintenance' }
                ].map((phase) => (
                  <div key={phase.step} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">{phase.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{phase.title}</h4>
                      <p className="text-caption text-gray-500">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="w-full h-full border border-gray-300"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px'
                    }}
                  />
                </div>

                {/* Central Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-50 border-2 border-gray-200 rounded-sm flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-900 rounded-sm flex items-center justify-center relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-white"
                        style={{ clipPath: 'circle(35% at 65% 35%)' }}
                      />
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-16 right-16 w-16 h-12 bg-white border border-gray-200 rounded-sm shadow-soft p-2"
                >
                  <div className="w-full h-1 bg-gray-200 rounded mb-1" />
                  <div className="w-2/3 h-1 bg-gray-300 rounded" />
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-16 left-16 w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm shadow-soft p-2"
                >
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Let's discuss your requirements and explore how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              rightIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              Get Started
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            >
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}