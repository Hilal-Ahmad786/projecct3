import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import Button from '@/components/Button';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const baseUrl = 'https://paksoft.com.tr';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getProject(slug: string, locale: string) {
  const { getPublishedProjectBySlug } = await import('@/lib/database/public-queries');
  return getPublishedProjectBySlug(slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const project = await getProject(slug, validLocale);

  if (!project) {
    return { title: 'Case Study Not Found | PakSoft' };
  }

  const title = `${project.name} - Case Study | PakSoft`;
  const description = project.description || '';
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${path}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${path}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'article',
      images: [{ url: project.thumbnail || '/images/og-projects.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = await getProject(slug, locale);

  if (!project) {
    notFound();
  }

  const results = (project.results || []) as { metric: string; value: string }[];

  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${locale}` },
    { name: 'Projects', url: `${baseUrl}/${locale}/projects` },
    { name: project.name, url: `${baseUrl}/${locale}/projects/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              {project.industry && <span>{project.industry}</span>}
              {project.industry && project.client && <span>•</span>}
              {project.client && <span>{project.client}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{project.description}</p>

            {/* Quick Stats */}
            {results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.slice(0, 4).map((result, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              {project.challenge && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-lg">!</span>
                    </span>
                    The Challenge
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
                    Our Solution
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Full Description */}
      {project.fullDescription && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-gray">
              <p className="text-gray-600 leading-relaxed text-lg">{project.fullDescription}</p>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technologies Used</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {project.technologies.map((tech: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      {(project.duration || project.teamSize || project.industry) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {project.duration && (
                  <div className="flex items-start gap-4">
                    <ClockIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Duration</div>
                      <div className="text-gray-600">{project.duration}</div>
                    </div>
                  </div>
                )}
                {project.teamSize && (
                  <div className="flex items-start gap-4">
                    <UserGroupIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Team Size</div>
                      <div className="text-gray-600">{project.teamSize}</div>
                    </div>
                  </div>
                )}
                {project.industry && (
                  <div className="flex items-start gap-4">
                    <CpuChipIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Industry</div>
                      <div className="text-gray-600">{project.industry}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((image: string, index: number) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                    <img src={image} alt={`${project.name} screenshot ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results for your business.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
            Get a Free Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
