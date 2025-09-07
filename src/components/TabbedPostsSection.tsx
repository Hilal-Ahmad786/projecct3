// src/components/TabbedPostsSection.tsx
'use client';

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const posts = [
  {
    title: 'Next.js ile Çok Dilli E-Ticaret Platformu',
    image: '/images/Blogs/Next.png',
    excerpt:
      'ISR & SSR optimizasyonlarıyla performansı artırdığımız, Shopify entegrasyonlu çok dilli e-ticaret projesi.',
    href: '/blog/nextjs-cok-dilli-e-ticaret',
    date: '2025-07-01',
    views: 230,
    category: 'ecommerce',
  },
  {
    title: 'Python Botlarla Web Scraping Otomasyonu',
    image: '/images/Blogs/Python.png',
    excerpt:
      'Telegram ve Instagram botlarıyla veri toplama sürecini %80 hızlandırdık.',
    href: '/blog/python-web-scraping-otomasyonu',
    date: '2025-06-25',
    views: 180,
    category: 'automation',
  },
  {
    title: 'React Native ile Finans Uygulaması Geliştirme',
    image: '/images/Blogs/mobile.png',
    excerpt:
      '50K+ indirme başarısına ulaşan finans uygulamamızın mimarisi ve entegrasyonları.',
    href: '/blog/react-native-finans-uygulamasi',
    date: '2025-06-10',
    views: 310,
    category: 'mobile',
  },
  {
    title: 'Makine Öğrenmesi ile Talep Tahminleri',
    image: '/images/Blogs/Dashboard.png',
    excerpt:
      'Özelleştirilmiş ML modelleri kullanarak %95 doğrulukla satış tahminleri yaptık.',
    href: '/blog/machine-learning-tahmin-sistemleri',
    date: '2025-05-30',
    views: 145,
    category: 'ai',
  },
  {
    title: 'Headless CMS ile Çoklu Dil Yönetimi',
    image: '/images/Blogs/CMS.png',
    excerpt:
      'Next.js + Strapi entegrasyonu sayesinde içerikleri merkezi olarak yönettik.',
    href: '/blog/headless-cms-coklu-dil-yonetimi',
    date: '2025-05-15',
    views: 160,
    category: 'web',
  },
  {
    title: 'UI/UX Tasarımda En İyi Uygulamalar',
    image: '/images/Blogs/ui.png',
    excerpt:
      'Kullanıcı odaklı ara yüz tasarımlarında takip ettiğimiz 5 temel prensip.',
    href: '/blog/ui-ux-tasarim-prensipleri',
    date: '2025-05-01',
    views: 200,
    category: 'design',
  },
  {
    title: 'CI/CD Pipeline Kurulumu ile Süreç Otomasyonu',
    image: '/images/Blogs/devops.png',
    excerpt:
      'Jenkins ve GitHub Actions kullanarak otomatik test & deploy hattı kurduk.',
    href: '/blog/ci-cd-pipeline-otomasyonu',
    date: '2025-04-20',
    views: 175,
    category: 'devops',
  },
  {
    title: 'Shopify Performans Optimizasyon Tüyoları',
    image: '/images/Blogs/shopify.png',
    excerpt:
      'Sayfa yükleme sürelerini 0.5s’ye kadar düşüren 7 pratik ipucu.',
    href: '/blog/shopify-performance-ipuclari',
    date: '2025-04-05',
    views: 220,
    category: 'ecommerce',
  },
];

const categories = [
  { key: 'ecommerce', label: 'E-Ticaret' },
  { key: 'automation', label: 'Otomasyon' },
  { key: 'mobile', label: 'Mobil' },
  { key: 'ai', label: 'AI' },
  { key: 'web', label: 'Web & API' },
  { key: 'design', label: 'Tasarım' },
  { key: 'devops', label: 'DevOps' },
];

export default function TabbedPostsSection() {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular' | 'categories'>('latest');
  const [activeCategory, setActiveCategory] = useState(categories[0].key);

  // Memoized lists
  const latestPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 6),
    []
  );

  const popularPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.views - a.views)
        .slice(0, 6),
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

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-[#1E531B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Blog"
          title="Tüm Yazılar"
          className="text-center mb-8"
        />

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('latest')}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeTab === 'latest'
                ? 'bg-[#1E531B] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Son Eklenenler
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeTab === 'popular'
                ? 'bg-[#1E531B] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Popüler & Trend
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeTab === 'categories'
                ? 'bg-[#1E531B] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kategoriler
          </button>
        </div>

        {/* Category Filter Pills */}
        {activeTab === 'categories' && (
          <div className="flex flex-wrap justify-center mb-8 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition ${
                  activeCategory === cat.key
                    ? 'bg-[#1E531B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <div
              key={post.href}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-[#1E531B]">
                  {post.title}
                </h3>
                <p className="text-gray-600 flex-grow leading-snug">
                  {post.excerpt}
                </p>
                <div className="mt-4">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
