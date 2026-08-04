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
                    // NOTE: do NOT blanket-disallow '/*?*' — it blocked every
                    // UTM-tagged ad landing page ("indexed, blocked" results).
                    // Canonical tags already handle parameter duplicates; only
                    // the genuinely infinite parameter spaces are disallowed.
                    '/*?q=*',
                    '/*?search=*',
                ],
            },
            // GPTBot is deliberately ALLOWED: AI answer engines (ChatGPT etc.)
            // are a growing referral channel, and PakSoft sells GEO/AI-search
            // optimization — blocking them contradicted our own positioning.
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
