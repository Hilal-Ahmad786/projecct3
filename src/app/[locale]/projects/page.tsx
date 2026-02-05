// src/app/[locale]/projects/page.tsx
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { createTranslator } from '@/lib/server-i18n';
import { generateAlternateLinks } from '@/lib/seo';
import ProjectsHero from '@/components/ProjectsHero';
import ProjectsGallerySection from '@/components/ProjectsGallerySection';
import FeaturedCaseStudySection from '@/components/FeaturedCaseStudySection';
import TechApproachSection from '@/components/TechApproachSection';
import SuccessMetricsSection from '@/components/SuccessMetricsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner from '@/components/CtaBanner';
import { getProjects } from '@/lib/admin/database/queries';

const baseUrl = 'https://paksoft.com.tr';

export const revalidate = 3600; // ISR: revalidate every hour

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const t = createTranslator(validLocale);

  const title = t('projects.hero.title') + ' | PakSoft';
  const description = t('projects.hero.description');

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}/projects`,
      languages: generateAlternateLinks('/projects'),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}/projects`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-projects.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch real projects from database
  const { data: projects } = await getProjects(
    { status: 'published' },
    { limit: 50, sortBy: 'createdAt', sortOrder: 'desc' }
  );

  return (
    <>
      <ProjectsHero />
      <ProjectsGallerySection projects={projects} locale={locale} />
      <FeaturedCaseStudySection />
      <TechApproachSection />
      <SuccessMetricsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
