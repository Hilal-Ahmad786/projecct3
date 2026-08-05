'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import LocalizedLink from '@/components/LocalizedLink';
import SplitHeading from '@/components/SplitHeading';
import { smoothSpring, snappySpring } from '@/lib/animations';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  coverImage?: string;
  authorName?: string;
  publishedAt?: string;
  readTime?: number;
}

interface PlaceholderPost {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  readTime: number;
  gradient: string;
}

interface Props {
  category: string;               // e.g. "web-development"
  placeholderPosts: PlaceholderPost[];
  viewAllHref: string;
  eyebrow?: string;
  headline?: string;
  viewAllLabel?: string;
  hideViewAll?: boolean;
}

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const GRADIENTS = [
  'from-blue-600 to-violet-600',
  'from-emerald-500 to-cyan-500',
  'from-rose-500 to-orange-500',
  'from-violet-600 to-pink-500',
];

export default function ServiceBlogFeed({ category, placeholderPosts, viewAllHref, eyebrow = 'Blog', headline, viewAllLabel = 'View All Articles', hideViewAll = false }: Props) {
  const { locale, dir } = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = dir === 'rtl';

  useEffect(() => {
    let cancelled = false;
    // Server-side category filter: each service has its own publication.
    fetch(`/api/blog/posts?locale=${locale}&limit=4&category=${encodeURIComponent(category)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return;
        const matched: BlogPost[] = Array.isArray(data?.data) ? data.data : [];
        setPosts(matched.slice(0, 4));
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [locale, category]);

  /* Use live posts if available, otherwise placeholder */
  const displayPosts: (BlogPost | PlaceholderPost)[] = posts.length >= 2 ? posts : placeholderPosts;
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1, 4);

  if (loading) return null; // avoids layout shift — subnav still visible

  const isLive = (p: BlogPost | PlaceholderPost): p is BlogPost => 'publishedAt' in p;

  return (
    <section id="blog" className="py-24 lg:py-32 bg-gray-50" dir={dir}>
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className={`flex items-end justify-between mb-14 flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3"
            >
              {eyebrow}
            </motion.p>
            <SplitHeading
              text={headline ?? 'From the Blog'}
              tag="h2"
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
            />
          </div>
          {!hideViewAll && (
            <LocalizedLink
              href={viewAllHref}
              className="text-sm font-semibold text-gray-900 hover:underline underline-offset-4 flex items-center gap-1.5 group"
            >
              {viewAllLabel}
              <svg className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </LocalizedLink>
          )}
        </div>

        {/* Grid: featured (left) + 3 small (right) */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured post */}
          {featured && (
            <motion.article
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={smoothSpring}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="lg:col-span-3 group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col will-change-transform"
            >
              <LocalizedLink href={isLive(featured) ? `/blog/${featured.slug}` : viewAllHref} className="flex flex-col flex-1">
                {/* Cover */}
                <div className={`relative h-52 md:h-64 overflow-hidden bg-gradient-to-br ${(featured as PlaceholderPost).gradient ?? GRADIENTS[0]}`}>
                  {isLive(featured) && featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </motion.div>
                  )}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {featured.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {(featured as PlaceholderPost).excerpt ?? (featured as BlogPost).excerpt}
                  </p>
                  <div className={`flex items-center gap-3 mt-5 text-xs text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isLive(featured) && featured.publishedAt && <span>{formatDate(featured.publishedAt)}</span>}
                    <span>·</span>
                    <span>{(featured as PlaceholderPost).readTime ?? (featured as BlogPost).readTime ?? 5} min read</span>
                  </div>
                </div>
              </LocalizedLink>
            </motion.article>
          )}

          {/* Three smaller posts */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((post, i) => (
              <motion.article
                key={isLive(post) ? post.id : (post as PlaceholderPost).slug}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...snappySpring, delay: i * 0.08 }}
                whileHover={prefersReducedMotion ? {} : { x: isRTL ? -4 : 4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex gap-4 p-4 will-change-transform"
              >
                <LocalizedLink href={isLive(post) ? `/blog/${post.slug}` : viewAllHref} className="flex gap-4 w-full">
                  {/* Thumbnail */}
                  <div className={`w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden bg-gradient-to-br ${(post as PlaceholderPost).gradient ?? GRADIENTS[(i + 1) % GRADIENTS.length]}`}>
                    {isLive(post) && post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : null}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col justify-between min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">
                      {post.category.replace(/-/g, ' ')}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      {(post as PlaceholderPost).readTime ?? (post as BlogPost).readTime ?? 5} min read
                    </p>
                  </div>
                </LocalizedLink>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
