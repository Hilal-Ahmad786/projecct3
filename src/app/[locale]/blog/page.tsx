'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CalendarIcon,
  TagIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export const dynamic = 'force-dynamic';

interface BlogTranslation {
  locale: string;
  title: string;
  excerpt?: string;
  content: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt?: string;
  translations: BlogTranslation[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const categoryLabels: Record<string, Record<string, string>> = {
  general: { en: 'General', tr: 'Genel', de: 'Allgemein', ur: 'عام', ar: 'عام' },
  'web-development': { en: 'Web Development', tr: 'Web Geliştirme', de: 'Webentwicklung', ur: 'ویب ڈویلپمنٹ', ar: 'تطوير الويب' },
  'ai-ml': { en: 'AI & ML', tr: 'Yapay Zeka & ML', de: 'KI & ML', ur: 'AI & ML', ar: 'الذكاء الاصطناعي' },
  mobile: { en: 'Mobile', tr: 'Mobil', de: 'Mobil', ur: 'موبائل', ar: 'الجوال' },
  'e-commerce': { en: 'E-Commerce', tr: 'E-Ticaret', de: 'E-Commerce', ur: 'ای کامرس', ar: 'التجارة الإلكترونية' },
  devops: { en: 'DevOps', tr: 'DevOps', de: 'DevOps', ur: 'ڈیوآپس', ar: 'DevOps' },
  analytics: { en: 'Analytics', tr: 'Analitik', de: 'Analytik', ur: 'تجزیات', ar: 'التحليلات' },
  design: { en: 'Design', tr: 'Tasarım', de: 'Design', ur: 'ڈیزائن', ar: 'التصميم' },
  business: { en: 'Business', tr: 'İş', de: 'Geschäft', ur: 'کاروبار', ar: 'الأعمال' },
};

const pageTranslations: Record<string, Record<string, string>> = {
  title: {
    en: 'Blog',
    tr: 'Blog',
    de: 'Blog',
    ur: 'بلاگ',
    ar: 'المدونة',
  },
  subtitle: {
    en: 'Insights, tutorials, and updates from our team',
    tr: 'Ekibimizden içgörüler, eğitimler ve güncellemeler',
    de: 'Einblicke, Tutorials und Updates von unserem Team',
    ur: 'ہماری ٹیم کی طرف سے بصیرت، ٹیوٹوریلز اور اپڈیٹس',
    ar: 'رؤى ودروس وتحديثات من فريقنا',
  },
  readMore: {
    en: 'Read More',
    tr: 'Devamını Oku',
    de: 'Weiterlesen',
    ur: 'مزید پڑھیں',
    ar: 'اقرأ المزيد',
  },
  noPosts: {
    en: 'No blog posts yet',
    tr: 'Henüz blog yazısı yok',
    de: 'Noch keine Blogbeiträge',
    ur: 'ابھی کوئی بلاگ پوسٹ نہیں',
    ar: 'لا توجد مقالات بعد',
  },
  noPostsDesc: {
    en: 'Check back soon for updates and insights.',
    tr: 'Güncellemeler ve içgörüler için yakında tekrar kontrol edin.',
    de: 'Schauen Sie bald wieder vorbei für Updates und Einblicke.',
    ur: 'اپڈیٹس اور بصیرت کے لیے جلد واپس چیک کریں۔',
    ar: 'تحقق مرة أخرى قريبًا للحصول على التحديثات والرؤى.',
  },
  featured: {
    en: 'Featured',
    tr: 'Öne Çıkan',
    de: 'Empfohlen',
    ur: 'نمایاں',
    ar: 'مميز',
  },
  previous: {
    en: 'Previous',
    tr: 'Önceki',
    de: 'Vorherige',
    ur: 'پچھلا',
    ar: 'السابق',
  },
  next: {
    en: 'Next',
    tr: 'Sonraki',
    de: 'Nächste',
    ur: 'اگلا',
    ar: 'التالي',
  },
  page: {
    en: 'Page',
    tr: 'Sayfa',
    de: 'Seite',
    ur: 'صفحہ',
    ar: 'صفحة',
  },
  of: {
    en: 'of',
    tr: '/',
    de: 'von',
    ur: 'کا',
    ar: 'من',
  },
};

export default function BlogPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 9, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  const t = (key: string) => pageTranslations[key]?.[locale] || pageTranslations[key]?.en || key;
  const getCategoryLabel = (category: string) => categoryLabels[category]?.[locale] || categoryLabels[category]?.en || category;

  const fetchPosts = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/posts?page=${page}&limit=9&locale=${locale}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(pagination.page);
  }, [locale, pagination.page]);

  const getPostContent = (post: BlogPost) => {
    if (locale === 'en') {
      return { title: post.title, excerpt: post.excerpt };
    }
    const translation = post.translations.find(t => t.locale === locale);
    if (translation) {
      return { title: translation.title, excerpt: translation.excerpt };
    }
    return { title: post.title, excerpt: post.excerpt };
  };

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <ArrowPathIcon className="w-10 h-10 text-emerald-600 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <TagIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('noPosts')}</h2>
              <p className="text-gray-600">{t('noPostsDesc')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                  const content = getPostContent(post);
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Featured Image */}
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-blue-500 overflow-hidden">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={content.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-7xl font-bold">
                              {content.title.charAt(0)}
                            </div>
                          )}
                          {post.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">
                                <StarIcon className="w-4 h-4" />
                                {t('featured')}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                            {getCategoryLabel(post.category)}
                          </span>
                          {post.publishedAt && (
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : locale === 'tr' ? 'tr-TR' : locale)}
                            </span>
                          )}
                        </div>

                        <Link href={`/${locale}/blog/${post.slug}`}>
                          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {content.title}
                          </h2>
                        </Link>

                        {content.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">{content.excerpt}</p>
                        )}

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs text-gray-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                        >
                          {t('readMore')}
                          <ArrowRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    {t('previous')}
                  </button>
                  <span className="text-sm text-gray-600">
                    {t('page')} {pagination.page} {t('of')} {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    {t('next')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
