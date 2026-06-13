import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import BlogPageClient from './BlogPageClient';
import { getServiceData, baseUrl } from '../_shared';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) return { title: 'Service Not Found | PakSoft' };

  const path = `/services/${slug}/blog`;
  const localizedPath = localizeFullPath(path, validLocale);
  return {
    title: `${data.service.name} — Articles & Insights | PakSoft`,
    description: `Practical guides, deep-dives, and lessons learned about ${data.service.name} from the PakSoft team.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

export default async function ServiceBlogPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) notFound();

  // Posts are categorized at the parent-service level; fall back to the
  // service's own slug, then its category.
  const blogCategory = data.parentSlug || slug || data.category || 'general';

  return (
    <main className="min-h-screen bg-white">
      <BlogPageClient
        serviceName={data.service.name}
        serviceSlug={slug}
        serviceColor={data.service.color}
        blogCategory={blogCategory}
      />
    </main>
  );
}
