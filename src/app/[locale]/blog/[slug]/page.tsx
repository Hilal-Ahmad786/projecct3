'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  CalendarIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ShareIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';

interface BlogTranslation {
  locale: string;
  title: string;
  excerpt?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  translations: BlogTranslation[];
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
  backToBlog: {
    en: 'Back to Blog',
    tr: 'Bloga Dön',
    de: 'Zurück zum Blog',
    ur: 'بلاگ پر واپس جائیں',
    ar: 'العودة إلى المدونة',
  },
  featured: {
    en: 'Featured',
    tr: 'Öne Çıkan',
    de: 'Empfohlen',
    ur: 'نمایاں',
    ar: 'مميز',
  },
  share: {
    en: 'Share',
    tr: 'Paylaş',
    de: 'Teilen',
    ur: 'شیئر کریں',
    ar: 'مشاركة',
  },
  minRead: {
    en: 'min read',
    tr: 'dk okuma',
    de: 'Min. Lesezeit',
    ur: 'منٹ پڑھنے',
    ar: 'دقائق للقراءة',
  },
  notFound: {
    en: 'Post not found',
    tr: 'Yazı bulunamadı',
    de: 'Beitrag nicht gefunden',
    ur: 'پوسٹ نہیں ملی',
    ar: 'المقال غير موجود',
  },
  notFoundDesc: {
    en: 'The blog post you are looking for does not exist or has been removed.',
    tr: 'Aradığınız blog yazısı mevcut değil veya kaldırılmış.',
    de: 'Der gesuchte Blogbeitrag existiert nicht oder wurde entfernt.',
    ur: 'جس بلاگ پوسٹ کی آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا ہٹا دی گئی ہے۔',
    ar: 'المقال الذي تبحث عنه غير موجود أو تمت إزالته.',
  },
  relatedPosts: {
    en: 'Related Posts',
    tr: 'İlgili Yazılar',
    de: 'Ähnliche Beiträge',
    ur: 'متعلقہ پوسٹس',
    ar: 'مقالات ذات صلة',
  },
};

// Simple function to estimate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar' || locale === 'ur';

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const t = (key: string) => pageTranslations[key]?.[locale] || pageTranslations[key]?.en || key;
  const getCategoryLabel = (category: string) => categoryLabels[category]?.[locale] || categoryLabels[category]?.en || category;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/blog/posts/${slug}?locale=${locale}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, locale]);

  const getPostContent = () => {
    if (!post) return { title: '', content: '', excerpt: '' };

    if (locale === 'en') {
      return { title: post.title, content: post.content, excerpt: post.excerpt };
    }
    const translation = post.translations.find(t => t.locale === locale);
    if (translation) {
      return { title: translation.title, content: translation.content, excerpt: translation.excerpt };
    }
    return { title: post.title, content: post.content, excerpt: post.excerpt };
  };

  const handleShare = async () => {
    const content = getPostContent();
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="pt-32 pb-20 flex items-center justify-center">
          <ArrowPathIcon className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <TagIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('notFound')}</h1>
            <p className="text-gray-600 mb-8">{t('notFoundDesc')}</p>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              {t('backToBlog')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const content = getPostContent();
  const readingTime = calculateReadingTime(content.content);

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="pt-24 pb-0">
        {/* Featured Image */}
        {post.featuredImage ? (
          <div className="relative h-[400px] md:h-[500px] w-full">
            <img
              src={post.featuredImage}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="relative h-[300px] md:h-[400px] w-full bg-gradient-to-br from-emerald-400 to-blue-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-[200px] font-bold">{content.title.charAt(0)}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeftIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('backToBlog')}
            </Link>

            {/* Post Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                  {getCategoryLabel(post.category)}
                </span>
                {post.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    <StarIcon className="w-4 h-4" />
                    {t('featured')}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : locale === 'tr' ? 'tr-TR' : locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4" />
                  {readingTime} {t('minRead')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {content.title}
              </h1>

              {/* Excerpt */}
              {content.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {content.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                  {t('share')}
                </button>
              </div>
            </motion.div>

            {/* Post Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-emerald max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-blockquote:border-l-emerald-500 prose-blockquote:bg-gray-50 prose-blockquote:py-1
                prose-img:rounded-xl prose-img:shadow-lg
                prose-li:text-gray-700"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <ReactMarkdown>{content.content}</ReactMarkdown>
            </motion.article>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <ArrowLeftIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  {t('backToBlog')}
                </Link>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                  {t('share')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
