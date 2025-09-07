// src/components/FeaturedPostsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const featuredPosts = [
  {
    title: 'Next.js ile Çok Dilli E-Ticaret Platformu',
    image: '/images/Blogs/Next.png',
    excerpt:
      'Next.js’in ISR & SSR özellikleriyle performansı artırdığımız, Shopify entegrasyonlu çok dilli e-ticaret projemizin detayları.',
    href: '/blog/nextjs-cok-dilli-e-ticaret',
  },
  {
    title: 'Python Botlarla Web Scraping Otomasyonu',
    image: '/images/Blogs/Python.png',
    excerpt:
      'Telegram, Instagram ve web siteleri için geliştirdiğimiz uçtan uca veri toplama botlarıyla %80 zaman tasarrufu sağladık.',
    href: '/blog/python-web-scraping-otomasyonu',
  },
  {
    title: 'React Native ile Finans Uygulaması Geliştirme',
    image: '/images/Blogs/mobile.png',
    excerpt:
      '50K+ indirme başarısına ulaşan mobil finans uygulamamızın mimarisi, entegrasyonları ve UI/UX süreci.',
    href: '/blog/react-native-finans-uygulamasi',
  },
];

export default function FeaturedPostsSection() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-[#1E531B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <SectionHeader
          eyebrow="Editörün Seçtikleri"
          title="Öne Çıkan Yazılar"
          className="text-center mb-16"
        />

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, idx) => (
            <motion.div
              key={post.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-[#1E531B]">
                  {post.title}
                </h3>
                <p className="text-gray-600 flex-grow leading-snug">
                  {post.excerpt}
                </p>
                <div className="mt-6">
                  <Button
                    href={post.href}
                    variant="outline-primary"
                    size="sm"
                    className="inline-flex items-center space-x-2"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
