import { MetadataRoute } from 'next';

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
        sitemap: 'https://www.paksoft.com.tr/sitemap.xml',
        host: 'https://www.paksoft.com.tr',
    };
}
