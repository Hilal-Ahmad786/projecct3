/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Tree-shake large barrel-file packages so only the icons/animations actually
  // used are bundled (instead of the whole library). Big client-bundle savings
  // for @heroicons/react and react-icons especially.
  experimental: {
    optimizePackageImports: [
      '@heroicons/react',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
      'react-icons',
      'framer-motion',
    ],
  },

  trailingSlash: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    // Cache optimized images for 30 days instead of 60s — these are static
    // marketing assets that rarely change.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },

  async redirects() {
    // Translate English /services subpage paths to localized canonical URLs
    // (e.g. /ar/services/seo/faq → /ar/alkhadamat/seo/asila). Explicit per
    // segment because Next.js wildcards cannot translate a path segment — the
    // old greedy `/ar/services/:slug*` rule kept the English subpage segment
    // and 404'd (no matching localized rewrite).
    const localizedBases: Record<string, string> = {
      tr: 'hizmetler', de: 'dienstleistungen', ar: 'alkhadamat', ur: 'khidmaat',
    };
    const subSegments: Record<string, Record<string, string>> = {
      features: { tr: 'ozellikler', de: 'funktionen', ar: 'almiizat', ur: 'khasusiyat' },
      process: { tr: 'surec', de: 'prozess', ar: 'alamaliat', ur: 'tariqa' },
      technologies: { tr: 'teknoloji', de: 'technologie', ar: 'altiqniat', ur: 'technology' },
      pricing: { tr: 'fiyatlandirma', de: 'preise', ar: 'tasiir', ur: 'qeemat' },
      blog: { tr: 'blog', de: 'blog', ar: 'blog', ur: 'blog' },
      portfolio: { tr: 'portfoy', de: 'portfolio', ar: 'almalaf', ur: 'portfolio' },
      faq: { tr: 'sss', de: 'faq', ar: 'asila', ur: 'sawalat' },
    };
    const localizedServiceRedirects = Object.entries(localizedBases).flatMap(([loc, base]) => [
      // subpages first (most specific), then the service detail + index
      ...Object.entries(subSegments).map(([en, locs]) => ({
        source: `/${loc}/services/:slug/${en}`,
        destination: `/${loc}/${base}/:slug/${locs[loc]}`,
        permanent: true,
      })),
      { source: `/${loc}/services/:slug`, destination: `/${loc}/${base}/:slug`, permanent: true },
      { source: `/${loc}/services`, destination: `/${loc}/${base}`, permanent: true },
    ]);
    return [
      // Old domain → new canonical domain. paksoft.com.tr still resolves and
      // served the full site (duplicate content); permanently redirect every
      // path to https://www.paksofts.com. Must come first so old-domain
      // requests never match the path-only rules below.
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: '(?:www\\.)?paksoft\\.com\\.tr' }],
        destination: 'https://www.paksofts.com/:path*',
        permanent: true,
      },
      ...localizedServiceRedirects,
      // Same for /projects: the rewrites alias both /tr/projects/x and
      // /tr/projeler/x to the same page (duplicate 200s with conflicting
      // signals) — redirect the English path to the localized canonical.
      ...Object.entries({ tr: 'projeler', de: 'projekte', ur: 'mansoobay', ar: 'almasharie' }).flatMap(
        ([loc, base]) => [
          { source: `/${loc}/projects/:slug`, destination: `/${loc}/${base}/:slug`, permanent: true },
          { source: `/${loc}/projects`, destination: `/${loc}/${base}`, permanent: true },
        ]
      ),
      // tech-stack → technologies (canonical sub-nav URL)
      { source: '/:locale/services/:slug/tech-stack', destination: '/:locale/services/:slug/technologies', permanent: true },
      // Turkish blog posts missing locale prefix (old Google-indexed URLs)
      { source: '/blog/nextjs-cok-dilli-e-ticaret', destination: '/tr/blog/nextjs-cok-dilli-e-ticaret', permanent: true },
      { source: '/blog/ui-ux-tasarim-prensipleri', destination: '/tr/blog/ui-ux-tasarim-prensipleri', permanent: true },
      { source: '/blog/react-native-finans-uygulamasi', destination: '/tr/blog/react-native-finans-uygulamasi', permanent: true },
      { source: '/blog/machine-learning-tahmin-sistemleri', destination: '/tr/blog/machine-learning-tahmin-sistemleri', permanent: true },

      // Services/projects without locale prefix
      { source: '/services/python-automation', destination: '/en/services/python-automation', permanent: true },
      { source: '/services/data-analytics', destination: '/en/services/data-analytics', permanent: true },
      { source: '/projects/ecommerce-platform', destination: '/en/projects', permanent: true },
      { source: '/projects/design-system', destination: '/en/projects', permanent: true },

      // (Non-English /services → localized paths handled by
      //  localizedServiceRedirects above — per-segment, not greedy.)

      // Newsletter page redirect (no newsletter system exists)
      { source: '/newsletter', destination: '/en/contact', permanent: true },

      // Junk pricing-period paths crawled by Google (from slash-prefixed locale strings)
      { source: '/month', destination: '/en', permanent: true },
      { source: '/year', destination: '/en', permanent: true },
      { source: '/Monat', destination: '/de', permanent: true },
      { source: '/Jahr', destination: '/de', permanent: true },
      { source: '/ay', destination: '/tr', permanent: true },
      { source: '/aylik', destination: '/tr', permanent: true },
      { source: '/y%C4%B1l', destination: '/tr', permanent: true },
      { source: '/%D9%85%D8%A7%DB%81%D8%A7%D9%86%DB%81', destination: '/ur', permanent: true },
      { source: '/%D8%B3%D8%A7%D9%84%D8%A7%D9%86%DB%81', destination: '/ur', permanent: true },
      { source: '/%D8%B4%D9%87%D8%B1%D9%8A%D9%8B%D8%A7', destination: '/ar', permanent: true },
      { source: '/%24', destination: '/en', permanent: true },
      { source: '/%26', destination: '/en', permanent: true },
    ];
  },

  async rewrites() {
    // Localized URL path rewrites
    // These map localized paths to English paths for file-system routing
    const localeRewrites = [
      // Turkish (tr)
      { source: '/:locale(tr)/hizmetler', destination: '/:locale/services' },
      { source: '/:locale(tr)/hizmetler/:slug', destination: '/:locale/services/:slug' },
      { source: '/:locale(tr)/hizmetler/:slug/ozellikler', destination: '/:locale/services/:slug/features' },
      { source: '/:locale(tr)/hizmetler/:slug/surec', destination: '/:locale/services/:slug/process' },
      { source: '/:locale(tr)/hizmetler/:slug/teknoloji', destination: '/:locale/services/:slug/technologies' },
      { source: '/:locale(tr)/hizmetler/:slug/fiyatlandirma', destination: '/:locale/services/:slug/pricing' },
      { source: '/:locale(tr)/hizmetler/:slug/blog', destination: '/:locale/services/:slug/blog' },
      { source: '/:locale(tr)/hizmetler/:slug/portfoy', destination: '/:locale/services/:slug/portfolio' },
      { source: '/:locale(tr)/hizmetler/:slug/sss', destination: '/:locale/services/:slug/faq' },
      { source: '/:locale(tr)/projeler', destination: '/:locale/projects' },
      { source: '/:locale(tr)/projeler/:slug', destination: '/:locale/projects/:slug' },
      { source: '/:locale(tr)/hakkimizda', destination: '/:locale/about' },
      { source: '/:locale(tr)/iletisim', destination: '/:locale/contact' },

      // German (de)
      { source: '/:locale(de)/dienstleistungen', destination: '/:locale/services' },
      { source: '/:locale(de)/dienstleistungen/:slug', destination: '/:locale/services/:slug' },
      { source: '/:locale(de)/dienstleistungen/:slug/funktionen', destination: '/:locale/services/:slug/features' },
      { source: '/:locale(de)/dienstleistungen/:slug/prozess', destination: '/:locale/services/:slug/process' },
      { source: '/:locale(de)/dienstleistungen/:slug/technologie', destination: '/:locale/services/:slug/technologies' },
      { source: '/:locale(de)/dienstleistungen/:slug/preise', destination: '/:locale/services/:slug/pricing' },
      { source: '/:locale(de)/dienstleistungen/:slug/blog', destination: '/:locale/services/:slug/blog' },
      { source: '/:locale(de)/dienstleistungen/:slug/portfolio', destination: '/:locale/services/:slug/portfolio' },
      { source: '/:locale(de)/dienstleistungen/:slug/faq', destination: '/:locale/services/:slug/faq' },
      { source: '/:locale(de)/projekte', destination: '/:locale/projects' },
      { source: '/:locale(de)/projekte/:slug', destination: '/:locale/projects/:slug' },
      { source: '/:locale(de)/uber-uns', destination: '/:locale/about' },
      { source: '/:locale(de)/kontakt', destination: '/:locale/contact' },

      // Arabic (ar)
      { source: '/:locale(ar)/alkhadamat', destination: '/:locale/services' },
      { source: '/:locale(ar)/alkhadamat/:slug', destination: '/:locale/services/:slug' },
      { source: '/:locale(ar)/alkhadamat/:slug/almiizat', destination: '/:locale/services/:slug/features' },
      { source: '/:locale(ar)/alkhadamat/:slug/alamaliat', destination: '/:locale/services/:slug/process' },
      { source: '/:locale(ar)/alkhadamat/:slug/altiqniat', destination: '/:locale/services/:slug/technologies' },
      { source: '/:locale(ar)/alkhadamat/:slug/tasiir', destination: '/:locale/services/:slug/pricing' },
      { source: '/:locale(ar)/alkhadamat/:slug/blog', destination: '/:locale/services/:slug/blog' },
      { source: '/:locale(ar)/alkhadamat/:slug/almalaf', destination: '/:locale/services/:slug/portfolio' },
      { source: '/:locale(ar)/alkhadamat/:slug/asila', destination: '/:locale/services/:slug/faq' },
      { source: '/:locale(ar)/almasharie', destination: '/:locale/projects' },
      { source: '/:locale(ar)/almasharie/:slug', destination: '/:locale/projects/:slug' },
      { source: '/:locale(ar)/men-nahnu', destination: '/:locale/about' },
      { source: '/:locale(ar)/ittisal', destination: '/:locale/contact' },

      // Urdu (ur)
      { source: '/:locale(ur)/khidmaat', destination: '/:locale/services' },
      { source: '/:locale(ur)/khidmaat/:slug', destination: '/:locale/services/:slug' },
      { source: '/:locale(ur)/khidmaat/:slug/khasusiyat', destination: '/:locale/services/:slug/features' },
      { source: '/:locale(ur)/khidmaat/:slug/tariqa', destination: '/:locale/services/:slug/process' },
      { source: '/:locale(ur)/khidmaat/:slug/technology', destination: '/:locale/services/:slug/technologies' },
      { source: '/:locale(ur)/khidmaat/:slug/qeemat', destination: '/:locale/services/:slug/pricing' },
      { source: '/:locale(ur)/khidmaat/:slug/blog', destination: '/:locale/services/:slug/blog' },
      { source: '/:locale(ur)/khidmaat/:slug/portfolio', destination: '/:locale/services/:slug/portfolio' },
      { source: '/:locale(ur)/khidmaat/:slug/sawalat', destination: '/:locale/services/:slug/faq' },
      { source: '/:locale(ur)/mansoobay', destination: '/:locale/projects' },
      { source: '/:locale(ur)/mansoobay/:slug', destination: '/:locale/projects/:slug' },
      { source: '/:locale(ur)/hamare-bare-mein', destination: '/:locale/about' },
      { source: '/:locale(ur)/raabta', destination: '/:locale/contact' },
    ];

    return localeRewrites;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            // SAMEORIGIN (not DENY) so the admin heatmap can embed our own
            // pages in an iframe overlay; cross-origin framing stays blocked.
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;