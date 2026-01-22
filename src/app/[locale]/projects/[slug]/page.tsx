// src/app/[locale]/projects/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import Button from '@/components/Button';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import {
  CheckCircleIcon,
  ChartBarIcon,
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

// Sample case studies data - in production, this would come from a CMS or database
const caseStudies: Record<string, {
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  techStack: string[];
  duration: string;
  teamSize: string;
  image: string;
}> = {
  'ecommerce-platform-transformation': {
    title: 'E-commerce Platform Transformation',
    client: 'RetailTech Co.',
    industry: 'E-commerce',
    description: 'Complete digital transformation of a legacy e-commerce platform to a modern, scalable solution.',
    challenge: 'The client was struggling with a slow, outdated e-commerce platform that couldn\'t handle peak traffic and provided a poor mobile experience, leading to high cart abandonment rates.',
    solution: 'We rebuilt their entire platform using Next.js and headless commerce architecture, implementing advanced caching, CDN optimization, and a mobile-first design approach.',
    results: [
      { metric: 'Page Load Time', value: '-65%' },
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Mobile Sales', value: '+85%' },
      { metric: 'Uptime', value: '99.99%' },
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    duration: '4 months',
    teamSize: '5 developers',
    image: '/images/projects/ecommerce.jpg',
  },
  'ai-customer-service-chatbot': {
    title: 'AI Customer Service Chatbot',
    client: 'FinServ Inc.',
    industry: 'Financial Services',
    description: 'Intelligent chatbot that handles 80% of customer inquiries automatically.',
    challenge: 'The client\'s customer service team was overwhelmed with routine inquiries, leading to long wait times and customer dissatisfaction.',
    solution: 'We developed an AI-powered chatbot using GPT-4 and RAG technology, integrated with their knowledge base and CRM system for personalized responses.',
    results: [
      { metric: 'Query Resolution', value: '80%' },
      { metric: 'Response Time', value: '-90%' },
      { metric: 'Customer Satisfaction', value: '+35%' },
      { metric: 'Cost Savings', value: '$2M/year' },
    ],
    techStack: ['Python', 'OpenAI GPT-4', 'LangChain', 'Pinecone', 'FastAPI', 'React'],
    duration: '3 months',
    teamSize: '4 developers',
    image: '/images/projects/chatbot.jpg',
  },
};

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const caseStudy = caseStudies[slug];

  if (!caseStudy) {
    return { title: 'Case Study Not Found | PakSoft' };
  }

  const title = `${caseStudy.title} - Case Study | PakSoft`;
  const description = caseStudy.description;
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
      images: [{ url: caseStudy.image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map(slug => ({ slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const caseStudy = caseStudies[slug];

  if (!caseStudy) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${locale}` },
    { name: 'Projects', url: `${baseUrl}/${locale}/projects` },
    { name: caseStudy.title, url: `${baseUrl}/${locale}/projects/${slug}` },
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
              <span>{caseStudy.industry}</span>
              <span>•</span>
              <span>{caseStudy.client}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{caseStudy.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.results.slice(0, 4).map((result, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{result.value}</div>
                  <div className="text-sm text-gray-400">{result.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg">!</span>
                </span>
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
                Our Solution
              </h2>
              <p className="text-gray-600 leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.techStack.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <ClockIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Duration</div>
                  <div className="text-gray-600">{caseStudy.duration}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <UserGroupIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Team Size</div>
                  <div className="text-gray-600">{caseStudy.teamSize}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CpuChipIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Industry</div>
                  <div className="text-gray-600">{caseStudy.industry}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
            Get a Free Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
