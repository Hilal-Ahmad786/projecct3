import { MetadataRoute } from 'next';
import { localizeFullPath } from '@/lib/routes';
import { Locale } from '@/lib/i18n';

const baseUrl = 'https://www.paksoft.com.tr';

const allLocales: Locale[] = ['en', 'tr', 'de', 'ar', 'ur'];

const PRIORITY = {
    home: 1.0,
    mainNav: 0.9,
    services: 0.85,
    serviceDetail: 0.8,
    blog: 0.7,
    other: 0.6,
};

const mainRoutes = [
    { path: '', priority: PRIORITY.home, changeFreq: 'daily' as const },
    { path: '/about', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/contact', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/services', priority: PRIORITY.services, changeFreq: 'weekly' as const },
    { path: '/projects', priority: PRIORITY.mainNav, changeFreq: 'weekly' as const },
    { path: '/careers', priority: PRIORITY.other, changeFreq: 'monthly' as const },
    { path: '/blog', priority: PRIORITY.blog, changeFreq: 'daily' as const },
];

// All service slugs (slug stays in English across all locales)
const serviceMainPages = [
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
    '/services/prompt-engineering',
    '/services/ai-agents',
    '/services/rag-solutions',
    '/services/mlops-deployment',
    '/services/computer-vision',
    '/services/llm-finetuning',
    '/services/voice-ai',
    '/services/ai-search',
    '/services/ai-security-review',
    '/services/ai-readiness-audit',
    '/services/ai-maintenance',
];

// Services that have full sub-pages (matching src/data/serviceSubpages.ts)
const servicesWithSubPages = [
    '/services/ai-solutions',
    '/services/api-development',
    '/services/conversational-ai',
    '/services/cybersecurity',
    '/services/data-analytics',
    '/services/devops-cloud',
    '/services/digital-marketing',
    '/services/e-commerce',
    '/services/machine-learning',
    '/services/mobile-development',
    '/services/python-automation',
    '/services/ui-ux-design',
    '/services/web-development',
];

const serviceSubPages = ['/faq', '/features', '/tech-stack', '/portfolio', '/process'];

function generateAlternates(englishPath: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    allLocales.forEach(locale => {
        const localizedPath = localizeFullPath(englishPath, locale);
        alternates[locale] = `${baseUrl}/${locale}${localizedPath}`;
    });
    alternates['x-default'] = `${baseUrl}/en${englishPath}`;
    return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    const currentDate = new Date();

    // Main navigation routes
    mainRoutes.forEach(({ path, priority, changeFreq }) => {
        allLocales.forEach((locale) => {
            const localizedPath = path ? localizeFullPath(path, locale) : '';
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${localizedPath}`,
                lastModified: currentDate,
                changeFrequency: changeFreq,
                priority: priority,
                alternates: {
                    languages: generateAlternates(path),
                },
            });
        });
    });

    // Service main pages
    serviceMainPages.forEach((englishPath) => {
        allLocales.forEach((locale) => {
            const localizedPath = localizeFullPath(englishPath, locale);
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${localizedPath}`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: PRIORITY.serviceDetail,
                alternates: {
                    languages: generateAlternates(englishPath),
                },
            });
        });
    });

    // Service sub-pages
    servicesWithSubPages.forEach((servicePath) => {
        serviceSubPages.forEach((subPage) => {
            const fullEnglishPath = `${servicePath}${subPage}`;
            allLocales.forEach((locale) => {
                const localizedPath = localizeFullPath(fullEnglishPath, locale);
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}${localizedPath}`,
                    lastModified: currentDate,
                    changeFrequency: 'monthly',
                    priority: PRIORITY.other,
                    alternates: {
                        languages: generateAlternates(fullEnglishPath),
                    },
                });
            });
        });
    });

    return sitemapEntries;
}
