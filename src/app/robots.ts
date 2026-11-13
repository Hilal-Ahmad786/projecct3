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
            //
            // Crawlers below send no visitors (AI-training scrapers, SEO-data
            // resellers) but crawl thousands of URLs; every uncached page they
            // pull is billed (render CPU, ISR writes, origin transfer). Search
            // engines, AI *answer* bots (OAI-SearchBot, ChatGPT-User,
            // PerplexityBot, Claude-SearchBot) and social previews stay allowed.
            {
                userAgent: [
                    'Amazonbot',
                    'Bytespider',
                    'CCBot',
                    'meta-externalagent',
                    'Diffbot',
                    'ImagesiftBot',
                    'Omgilibot',
                    'Timpibot',
                    'cohere-training-data-crawler',
                    'MJ12bot',
                    'DotBot',
                    'BLEXBot',
                    'DataForSeoBot',
                    'serpstatbot',
                ],
                disallow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
