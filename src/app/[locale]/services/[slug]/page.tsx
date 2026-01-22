import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceBySlug } from '@/data/services';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ServicePortfolio from '@/components/services/ServicePortfolio';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = getServiceBySlug(slug, validLocale);

  if (!service) {
    return { title: 'Service Not Found | PakSoft' };
  }

  const title = `${service.title} | PakSoft`;
  const description = service.fullDescription.slice(0, 160);
  const path = `/services/${slug}`;

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
      type: 'website',
      images: [{ url: service.heroImage || '/images/og-services.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug, locale } = await params;
    const service = getServiceBySlug(slug, locale);

    // If service not found, return 404
    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    // Generate breadcrumb items for structured data
    const breadcrumbItems = [
        { name: 'Home', url: `${baseUrl}/${locale}` },
        { name: 'Services', url: `${baseUrl}/${locale}/services` },
        { name: service.title, url: `${baseUrl}/${locale}/services/${slug}` },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Structured Data */}
            <ServiceJsonLd
                name={service.title}
                description={service.fullDescription}
                url={`${baseUrl}/${locale}/services/${slug}`}
            />
            <BreadcrumbJsonLd items={breadcrumbItems} />
            {service.faq && service.faq.length > 0 && (
                <FAQJsonLd faqs={service.faq} />
            )}
            {/* 1. Service Hero */}
            <section id="overview" className="relative overflow-hidden py-24 lg:py-32 bg-gray-900">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <ParticleNetwork className="opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
                </div>

                <div className="container mx-auto relative z-10 px-4 pt-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-lg mb-8 border border-white/10">
                            <Icon className="w-8 h-8 text-emerald-400" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            {service.title}
                        </h1>

                        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            {service.fullDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="primary" size="lg">
                                Start Your Project
                            </Button>
                            <Button href="#process" variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900">
                                How We Work
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Key Features Grid */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Deliver</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive solutions tailored to your specific needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features.map((feature, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                                        <CheckCircleIcon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                                        <p className="text-sm text-gray-600">
                                            Built with precision and scalability in mind.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Process Timeline */}
            <section id="process" className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
                        <p className="text-gray-600">From concept to launch, we follow a proven methodology.</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {service.process.map((step, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                    {/* Number */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-gray-100 text-2xl font-bold text-emerald-600">
                                            0{step.step}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow text-center md:text-left bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Tech Stack */}
            <section id="tech" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Technologies We Use</h2>
                        <p className="text-gray-400">Best-in-class tools for world-class results.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {service.technologies.map((tech, index) => (
                            <div key={index} className="px-6 py-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center gap-3 hover:border-emerald-500 transition-colors">
                                <span className="font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Portfolio Showcase (New) */}
            <ServicePortfolio portfolio={service.portfolio} />

            {/* 6. FAQ (New) */}
            <ServiceFAQ faq={service.faq} />

            {/* 7. CTA */}
            <section className="py-24 bg-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to transform your {service.title.toLowerCase()}?
                    </h2>
                    <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
                        Let's build something extraordinary together. Schedule a free consultation today.
                    </p>
                    <Button href="/contact" variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                        Get a Free Quote
                    </Button>
                </div>
            </section>
        </main>
    );
}
