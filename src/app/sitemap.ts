import { MetadataRoute } from 'next';

const baseUrl = 'https://paktechnology.com';
const locales = ['en', 'tr', 'de', 'ur', 'ar'];

// Define your routes here
const routes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/projects',
    '/services',
    // Services
    '/services/web-development',
    '/services/mobile-development',
    '/services/ui-ux-design',
    '/services/digital-marketing',
    '/services/e-commerce',
    '/services/ai-solutions',
    '/services/api-development',
    '/services/pyhton-automation',
    '/services/devops-cloud',
    '/services/data-analytics',
    '/services/cybersecurity',
    '/services/machine-learning',
    '/services/conversational-ai',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
