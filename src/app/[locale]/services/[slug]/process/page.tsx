import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import ProcessPageClient from './ProcessPageClient';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getService(slug: string, locale: string) {
  const { getPublishedServiceBySlug } = await import('@/lib/database/public-queries');
  return getPublishedServiceBySlug(slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = await getService(slug, validLocale);

  if (!service) {
    return { title: 'Service Not Found | PakSoft' };
  }

  return {
    title: `${service.name} Process & Methodology | PakSoft`,
    description: `Learn about our proven process and methodology for ${service.name}. From discovery to deployment, see how we deliver results.`,
  };
}

export const dynamic = 'force-dynamic';

export default async function ServiceProcessPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const process = content.process || [];
  const animation = content.animation;

  return (
    <ProcessPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      steps={process}
      processLayout={animation?.processLayout}
      locale={locale}
    />
  );
}
