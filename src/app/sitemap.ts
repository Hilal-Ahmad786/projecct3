import { MetadataRoute } from 'next';

const baseUrl = 'https://paksoft.com.tr';

// Only include locales that are fully working
const workingLocales = ['en', 'tr'];

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
];

// Service detail pages that exist (main page only)
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

// Services that have full sub-pages (faq, features, etc.)
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
];

const serviceSubPages = ['/faq', '/features', '/tech-stack', '/portfolio', '/pricing', '/process'];

// Generate hreflang alternates for a given path (only working locales)
function generateAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};
    workingLocales.forEach(locale => {
        alternates[locale] = `${baseUrl}/${locale}${path}`;
    });
    // Add x-default pointing to English
    alternates['x-default'] = `${baseUrl}/en${path}`;
    return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    const currentDate = new Date();

    // Add main routes for each working locale
    mainRoutes.forEach(({ path, priority, changeFreq }) => {
        workingLocales.forEach((locale) => {
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

    // Add service main pages for each working locale
    serviceMainPages.forEach((path) => {
        workingLocales.forEach((locale) => {
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

    // Add service sub-pages only for services that have them
    servicesWithSubPages.forEach((servicePath) => {
        serviceSubPages.forEach((subPage) => {
            workingLocales.forEach((locale) => {
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
