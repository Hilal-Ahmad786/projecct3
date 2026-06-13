'use client';

// Service blog page — page hero + the service-related article feed.

import React from 'react';
import InternalPageHero from '@/components/services/InternalPageHero';
import ServiceBlogFeed from '@/components/services/ServiceBlogFeed';
import { BlogFeedScene } from '@/components/services/hero-visuals/scenes-internal';
import { useTranslations } from '@/hooks/useTranslations';
import { toHeritageHex } from '@/lib/heritage-accents';

interface Props {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string | null;
  /** blog category to filter by (service category or parent slug) */
  blogCategory: string;
}

export default function BlogPageClient({ serviceName, serviceSlug, serviceColor, blogCategory }: Props) {
  const { t } = useTranslations();
  const accent = toHeritageHex(serviceColor || undefined);
  const tb = (key: string, fallback: string) => {
    const v = t(`services.detail.blogPage.${key}`);
    return typeof v === 'string' && !v.includes('blogPage') ? v : fallback;
  };

  return (
    <>
      <InternalPageHero
        serviceName={serviceName}
        accentWord={tb('titleAccent', 'Insights')}
        subtitle={tb('subtitle', 'Guides, deep-dives, and lessons learned from our team.')}
        accentHex={accent}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: serviceName, href: `/services/${serviceSlug}` },
          { label: tb('titleAccent', 'Insights') },
        ]}
        scene={<BlogFeedScene accent={accent} />}
      />
      <ServiceBlogFeed
        category={blogCategory}
        placeholderPosts={[]}
        viewAllHref="/blog"
        eyebrow={tb('eyebrow', 'Insights')}
        viewAllLabel={tb('viewAll', 'View All Articles')}
      />
    </>
  );
}
