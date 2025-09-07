// src/components/FeaturedPostsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { CalendarIcon, EyeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const featuredPosts = [
  {
    title: 'Next.js ile Çok Dilli E-Ticaret Platformu',
    image: '/images/Blogs/Next.png',
    excerpt: 'Next.js\'in ISR & SSR özellikleriyle performansı artırdığımız, Shopify entegrasyonlu çok dilli e-ticaret projemizin detayları.',
    href: '/blog/nextjs-cok-dilli-e-ticaret',
    date: '2025-01-15',
    views: 1250,
    category: 'E-Commerce',
    readTime: '8 min'
  },
  {
    title: 'Python Botlarla Web Scraping Otomasyonu',
    image: '/images/Blogs/Python.png',
    excerpt: 'Telegram, Instagram ve web siteleri için geliştirdiğimiz uçtan uca veri toplama botlarıyla %80 zaman tasarrufu sağladık.',
    href: '/blog/python-web-scraping-otomasyonu',
    date: '2025-01-10',
    views: 980,
    category: 'Automation',
    readTime: '12 min'
  },
  {
    title: 'React Native ile Finans Uygulaması Geliştirme',
    image: '/images/Blogs/mobile.png',
    excerpt: '50K+ indirme başarısına ulaşan mobil finans uygulamamızın mimarisi, entegrasyonları ve UI/UX süreci.',
    href: '/blog/react-native-finans-uygulamasi',
    date: '2025-01-05',
    views: 1580,
    category: 'Mobile Development',
    readTime: '15 min'
  },
];

export default function FeaturedPostsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Proper Crescent Elements */}
      <div className="absolute bottom-20 left-16 w-24 h-24">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Editor's Choice"
          title="Featured Articles"
          subtitle="Dive deep into our latest insights on technology, development practices, and industry trends that shape the digital landscape."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.href}
              variants={itemVariants}
              className="card group"
            >
              {/* Featured Image */}
              <div className="relative mb-6 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-caption text-gray-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-title text-gray-900 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-body text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Button
                  href={post.href}
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                  className="w-full justify-between"
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Want More Insights?
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Explore our complete collection of articles covering the latest in 
            technology, development, and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/blog"
              variant="primary"
              size="lg"
            >
              View All Articles
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            >
              Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}