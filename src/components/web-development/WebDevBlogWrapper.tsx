'use client';

import { useSectionTranslations } from '@/hooks/useTranslations';
import ServiceBlogFeed from '@/components/services/ServiceBlogFeed';

interface Props {
  locale: string;
  /** When true (on the dedicated /blog sub-page), show a page-level heading and more posts */
  expanded?: boolean;
}

export default function WebDevBlogWrapper({ expanded = false }: Props) {
  const t = useSectionTranslations('webDevPage');

  const placeholderPosts = [
    {
      title: t('blog.post1.title') as string || 'Core Web Vitals in 2025: What Every Developer Must Know',
      excerpt: t('blog.post1.excerpt') as string || "Google's ranking signals keep evolving. Here's how to keep your Lighthouse scores above 95 and your users happy.",
      category: 'web-development',
      slug: 'core-web-vitals-2025',
      readTime: 7,
      gradient: 'from-blue-600 to-violet-600',
    },
    {
      title: t('blog.post2.title') as string || 'Next.js 15 vs Remix: Which Framework Should You Choose?',
      excerpt: t('blog.post2.excerpt') as string || 'A practical side-by-side of the two most-discussed React meta-frameworks of 2025.',
      category: 'web-development',
      slug: 'nextjs-vs-remix-2025',
      readTime: 9,
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      title: t('blog.post3.title') as string || 'How We Cut Load Time by 60% for a Turkish E-Commerce Brand',
      excerpt: t('blog.post3.excerpt') as string || 'A behind-the-scenes look at image optimisation, code splitting, and CDN strategy that transformed site performance.',
      category: 'web-development',
      slug: 'ecommerce-performance-case-study',
      readTime: 6,
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      title: t('blog.post4.title') as string || 'Building Multilingual Sites with Next.js and RTL Support',
      excerpt: t('blog.post4.excerpt') as string || 'Lessons from building five-locale apps with Arabic and Urdu RTL layouts in the Next.js App Router.',
      category: 'web-development',
      slug: 'multilingual-nextjs-rtl',
      readTime: 8,
      gradient: 'from-violet-600 to-pink-500',
    },
  ];

  return (
    <div id="blog">
      <ServiceBlogFeed
        category="web-development"
        placeholderPosts={placeholderPosts}
        viewAllHref="/services/web-development/blog"
        eyebrow={t('blog.eyebrow') as string || 'From the Blog'}
        headline={t('blog.headline') as string || 'Web Development Insights'}
        viewAllLabel={expanded ? undefined : (t('blog.viewAll') as string || 'View All Articles')}
        hideViewAll={expanded}
      />
    </div>
  );
}
