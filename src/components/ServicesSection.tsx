// src/components/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';

import {
  Cog6ToothIcon,
  ChartBarSquareIcon,
  CubeIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  ComputerDesktopIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  MegaphoneIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

const categories = [
  { key: 'automation', label: 'Automation' },
  { key: 'ai', label: 'AI Solutions' },
  { key: 'web', label: 'Development' },
  { key: 'design', label: 'Design & Marketing' },
  { key: 'infrastructure', label: 'Infrastructure' },
];

const services = [
  {
    title: 'Python Automation',
    icon: Cog6ToothIcon,
    description: 'Custom automation solutions with Python for streamlined business processes and data handling.',
    category: 'automation',
    features: ['Process Automation', 'Data Scraping', 'Bot Development', 'Workflow Integration']
  },
  {
    title: 'Data Analytics',
    icon: ChartBarSquareIcon,
    description: 'Transform raw data into actionable insights with advanced analytics and visualization.',
    category: 'automation',
    features: ['Data Visualization', 'Business Intelligence', 'Statistical Analysis', 'Report Generation']
  },
  {
    title: 'Machine Learning',
    icon: CubeIcon,
    description: 'Custom ML models and intelligent systems tailored to your business requirements.',
    category: 'ai',
    features: ['Predictive Analytics', 'Neural Networks', 'Computer Vision', 'NLP Solutions']
  },
  {
    title: 'AI Integration',
    icon: PhotoIcon,
    description: 'Seamlessly integrate AI capabilities into your existing systems and workflows.',
    category: 'ai',
    features: ['API Integration', 'Model Deployment', 'Performance Optimization', 'Monitoring']
  },
  {
    title: 'Conversational AI',
    icon: ChatBubbleBottomCenterTextIcon,
    description: 'Intelligent chatbots and virtual assistants for enhanced customer engagement.',
    category: 'ai',
    features: ['Natural Language Processing', 'Multi-language Support', 'Context Awareness', 'Learning Systems']
  },
  {
    title: 'API Development',
    icon: LinkIcon,
    description: 'Robust and scalable APIs for seamless system integration and data exchange.',
    category: 'web',
    features: ['RESTful APIs', 'GraphQL', 'Authentication', 'Documentation']
  },
  {
    title: 'Web Applications',
    icon: ComputerDesktopIcon,
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    category: 'web',
    features: ['React/Next.js', 'Responsive Design', 'Performance Optimization', 'SEO Ready']
  },
  {
    title: 'Full-Stack Development',
    icon: CodeBracketSquareIcon,
    description: 'Complete web solutions from database design to user interface implementation.',
    category: 'web',
    features: ['Frontend & Backend', 'Database Design', 'Security Implementation', 'Testing']
  },
  {
    title: 'Mobile Development',
    icon: DevicePhoneMobileIcon,
    description: 'Cross-platform mobile applications for iOS and Android using modern frameworks.',
    category: 'web',
    features: ['React Native', 'Cross-platform', 'Native Performance', 'App Store Deployment']
  },
  {
    title: 'UI/UX Design',
    icon: PencilSquareIcon,
    description: 'User-centered design solutions that prioritize usability and aesthetic appeal.',
    category: 'design',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    title: 'Digital Marketing',
    icon: MegaphoneIcon,
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    category: 'design',
    features: ['SEO Optimization', 'Content Strategy', 'Social Media', 'Analytics']
  },
  {
    title: 'E-Commerce Solutions',
    icon: ShoppingCartIcon,
    description: 'Complete e-commerce platforms with payment integration and inventory management.',
    category: 'infrastructure',
    features: ['Payment Processing', 'Inventory Management', 'Order Processing', 'Customer Portal']
  },
  {
    title: 'DevOps & Infrastructure',
    icon: CloudArrowUpIcon,
    description: 'Streamlined deployment pipelines and scalable cloud infrastructure solutions.',
    category: 'infrastructure',
    features: ['CI/CD Pipelines', 'Cloud Infrastructure', 'Monitoring', 'Security']
  },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const filteredServices = services.filter(service => service.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Proper Crescent Elements */}
      <div className="absolute top-32 right-16 w-28 h-28">
        <div className="crescent crescent-right crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Services"
          subtitle="We deliver comprehensive digital solutions that drive growth and efficiency for modern businesses."
          className="mb-16"
        />

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`
                px-6 py-3 text-sm font-medium border rounded-sm transition-all duration-250
                ${activeCategory === category.key
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="card group hover:border-gray-300"
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="w-8 h-0.5 bg-gray-200 group-hover:bg-gray-300 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-title text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-body text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-caption text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  variant="ghost"
                  size="sm"
                  rightIcon={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  className="w-full justify-between"
                >
                  Learn More
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Let's discuss your project and explore how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Project
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
            >
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}