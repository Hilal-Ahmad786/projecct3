import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin',
                    '/admin/*',
                    '/api/*',
                    '/private',
                    '/private/*',
                    '/*?*', // Disallow query parameters to prevent duplicate content
                ],
            },
            {
                userAgent: 'GPTBot',
                disallow: ['/'], // Block AI crawlers if desired
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
