import { MetadataRoute } from 'next';
import { locales, Locale } from '@/lib/i18n';

const baseUrl = 'https://paksoft.com.tr';

// Priority levels for different page types
const PRIORITY = {
    home: 1.0,
    mainNav: 0.9,
    services: 0.85,
    serviceDetail: 0.8,
    blog: 0.7,
    other: 0.6,
};

// Main navigation routes
const mainRoutes = [
    { path: '', priority: PRIORITY.home, changeFreq: 'daily' as const },
    { path: '/about', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/contact', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/services', priority: PRIORITY.services, changeFreq: 'weekly' as const },
    { path: '/projects', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/blog', priority: PRIORITY.blog, changeFreq: 'daily' as const },
    { path: '/pricing', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
];

// Service detail pages
const serviceRoutes = [
    '/services/web-development',
    '/services/mobile-development',
    '/services/ui-ux-design',
    '/services/digital-marketing',
    '/services/e-commerce',
    '/services/ai-solutions',
    '/services/api-development',
    '/services/python-automation',
    '/services/devops-cloud',
    '/services/data-analytics',
    '/services/cybersecurity',
    '/services/machine-learning',
    '/services/conversational-ai',
    // AI 2026 Services
    '/services/prompt-engineering',
    '/services/ai-agents',
    '/services/rag-solutions',
    '/services/mlops-deployment',
    '/services/computer-vision',
    '/services/llm-finetuning',
    // Additional AI services to add
    '/services/voice-ai',
    '/services/ai-search',
    '/services/ai-security-review',
    '/services/ai-readiness-audit',
    '/services/ai-mvp-30-days',
    '/services/ai-maintenance',
];

// Generate hreflang alternates for a given path
function generateAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    locales.forEach(locale => {
        alternates[locale] = `${baseUrl}/${locale}${path}`;
    });
    return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    const currentDate = new Date();

    // Add main routes for each locale
    mainRoutes.forEach(({ path, priority, changeFreq }) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: currentDate,
                changeFrequency: changeFreq,
                priority: priority,
                alternates: {
                    languages: generateAlternates(path),
                },
            });
        });
    });

    // Add service routes for each locale
    serviceRoutes.forEach((path) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: PRIORITY.serviceDetail,
                alternates: {
                    languages: generateAlternates(path),
                },
            });
        });
    });

    // Add service sub-pages (FAQ, features, etc.) - dynamically
    const serviceSubPages = ['/faq', '/features', '/tech-stack', '/portfolio', '/pricing', '/process'];
    serviceRoutes.forEach((servicePath) => {
        serviceSubPages.forEach((subPage) => {
            locales.forEach((locale) => {
                const fullPath = `${servicePath}${subPage}`;
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}${fullPath}`,
                    lastModified: currentDate,
                    changeFrequency: 'monthly',
                    priority: PRIORITY.other,
                    alternates: {
                        languages: generateAlternates(fullPath),
                    },
                });
            });
        });
    });

    return sitemapEntries;
}
