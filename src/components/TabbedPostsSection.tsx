// src/components/TabbedPostsSection.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { CalendarIcon, EyeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const posts = [
  {
    title: 'Next.js ile Çok Dilli E-Ticaret Platformu',
    image: '/images/Blogs/Next.png',
    excerpt: 'ISR & SSR optimizasyonlarıyla performansı artırdığımız, Shopify entegrasyonlu çok dilli e-ticaret projesi.',
    href: '/blog/nextjs-cok-dilli-e-ticaret',
    date: '2025-01-15',
    views: 1250,
    category: 'ecommerce',
    readTime: '8 min'
  },
  {
    title: 'Python Botlarla Web Scraping Otomasyonu',
    image: '/images/Blogs/Python.png',
    excerpt: 'Telegram ve Instagram botlarıyla veri toplama sürecini %80 hızlandırdık.',
    href: '/blog/python-web-scraping-otomasyonu',
    date: '2025-01-10',
    views: 980,
    category: 'automation',
    readTime: '12 min'
  },
  {
    title: 'React Native ile Finans Uygulaması Geliştirme',
    image: '/images/Blogs/mobile.png',
    excerpt: '50K+ indirme başarısına ulaşan finans uygulamamızın mimarisi ve entegrasyonları.',
    href: '/blog/react-native-finans-uygulamasi',
    date: '2025-01-05',
    views: 1580,
    category: 'mobile',
    readTime: '15 min'
  },
  {
    title: 'Makine Öğrenmesi ile Talep Tahminleri',
    image: '/images/Blogs/Dashboard.png',
    excerpt: 'Özelleştirilmiş ML modelleri kullanarak %95 doğrulukla satış tahminleri yaptık.',
    href: '/blog/machine-learning-tahmin-sistemleri',
    date: '2024-12-30',
    views: 856,
    category: 'ai',
    readTime: '10 min'
  },
  {
    title: 'Headless CMS ile Çoklu Dil Yönetimi',
    image: '/images/Blogs/CMS.png',
    excerpt: 'Next.js + Strapi entegrasyonu sayesinde içerikleri merkezi olarak yönettik.',
    href: '/blog/headless-cms-coklu-dil-yonetimi',
    date: '2024-12-25',
    views: 642,
    category: 'web',
    readTime: '7 min'
  },
  {
    title: 'UI/UX Tasarımda En İyi Uygulamalar',
    image: '/images/Blogs/ui.png',
    excerpt: 'Kullanıcı odaklı ara yüz tasarımlarında takip ettiğimiz 5 temel prensip.',
    href: '/blog/ui-ux-tasarim-prensipleri',
    date: '2024-12-20',
    views: 743,
    category: 'design',
    readTime: '9 min'
  },
  {
    title: 'CI/CD Pipeline Kurulumu ile Süreç Otomasyonu',
    image: '/images/Blogs/devops.png',
    excerpt: 'Jenkins ve GitHub Actions kullanarak otomatik test & deploy hattı kurduk.',
    href: '/blog/ci-cd-pipeline-otomasyonu',
    date: '2024-12-15',
    views: 591,
    category: 'devops',
    readTime: '14 min'
  },
  {
    title: 'Shopify Performans Optimizasyon Tüyoları',
    image: '/images/Blogs/shopify.png',
    excerpt: 'Sayfa yükleme sürelerini 0.5s\'ye kadar düşüren 7 pratik ipucu.',
    href: '/blog/shopify-performance-ipuclari',
    date: '2024-12-10',
    views: 1024,
    category: 'ecommerce',
    readTime: '11 min'
  },
];

const categories = [
  { key: 'ecommerce', label: 'E-Commerce', count: 2 },
  { key: 'automation', label: 'Automation', count: 1 },
  { key: 'mobile', label: 'Mobile', count: 1 },
  { key: 'ai', label: 'AI & ML', count: 1 },
  { key: 'web', label: 'Web Development', count: 1 },
  { key: 'design', label: 'Design & UX', count: 1 },
  { key: 'devops', label: 'DevOps', count: 1 },
];

type TabType = 'latest' | 'popular' | 'categories';

export default function TabbedPostsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('latest');
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].key);

  // Memoized lists
  const latestPosts = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    []
  );

  const popularPosts = useMemo(
    () => [...posts].sort((a, b) => b.views - a.views).slice(0, 6),
    []
  );

  const categorizedPosts = useMemo(
    () => posts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Choose which list to render
  let displayPosts = latestPosts;
  if (activeTab === 'popular') displayPosts = popularPosts;
  if (activeTab === 'categories') displayPosts = categorizedPosts;

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
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategory(categoryKey);
  };

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Swiss Grid Background */}
<div className="absolute inset-0 opacity-[0.02] pointer-events-none">
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
<div className="absolute top-16 right-20 w-24 h-24 pointer-events-none">
  <div className="crescent crescent-right crescent-subtle text-gray-900" />
</div>


      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Knowledge Hub"
          title="All Articles"
          subtitle="Explore our comprehensive collection of insights, tutorials, and industry analysis across different topics and technologies."
          className="mb-16"
        />

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white border border-gray-200 rounded-sm p-1">
            <button
              type="button"
              onClick={() => handleTabClick('latest')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeTab === 'latest'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              Latest Posts
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('popular')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeTab === 'popular'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              Most Popular
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('categories')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeTab === 'categories'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              By Category
            </button>
          </div>
        </motion.div>

        {/* Category Filter */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryClick(cat.key)}
                className={`
                  px-4 py-2 text-sm font-medium border rounded-sm transition-all duration-250 cursor-pointer
                  ${activeCategory === cat.key
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-75">({cat.count})</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Posts Grid */}
        <motion.div
          key={`${activeTab}-${activeCategory}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.href}
              variants={itemVariants}
              className="card group"
            >
              {/* Post Image */}
              <div className="relative mb-6 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Post Content */}
              <div className="space-y-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-caption text-gray-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                      {/* Date (force stable timezone) */}
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC',   // ✅ prevents SSR/CSR drift
                        })}
                      </span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" />
{/* Views (force stable locale) */}
<span>{post.views.toLocaleString('en-US')}</span>  {/* ✅ deterministic thousands sep */}
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
                  Continue Reading
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {displayPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-title text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-body text-gray-600">
              No articles found in this category. Try selecting a different category.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Stay Updated with Our Latest Insights
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter and get the latest articles, tutorials, 
            and industry insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/newsletter"
              variant="primary"
              size="lg"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            >
              Subscribe to Newsletter
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}