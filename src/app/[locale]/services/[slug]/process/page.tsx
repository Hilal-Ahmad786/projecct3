import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
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
    title: `${service.name} Process | PakSoft`,
    description: `Learn about our proven process and methodology for ${service.name}.`,
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
    <main className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/${locale}/services/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to {service.name}
          </Link>
        </div>
      </div>

      {/* Process Content */}
      <ProcessPageClient
        serviceName={service.name}
        steps={process}
        processLayout={animation?.processLayout}
      />
    </main>
  );
}
