/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },


  trailingSlash: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },

  async redirects() {
    return [
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

      // Non-English locales using English /services path (should use localized path)
      { source: '/de/services/:slug*', destination: '/de/dienstleistungen/:slug*', permanent: true },
      { source: '/ar/services/:slug*', destination: '/ar/alkhadamat/:slug*', permanent: true },
      { source: '/tr/services/:slug*', destination: '/tr/hizmetler/:slug*', permanent: true },
      { source: '/ur/services/:slug*', destination: '/ur/khidmaat/:slug*', permanent: true },

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
      { source: '/:locale(tr)/hizmetler/:slug/teknoloji', destination: '/:locale/services/:slug/tech-stack' },
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
      { source: '/:locale(de)/dienstleistungen/:slug/technologie', destination: '/:locale/services/:slug/tech-stack' },
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
      { source: '/:locale(ar)/alkhadamat/:slug/altiqniat', destination: '/:locale/services/:slug/tech-stack' },
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
      { source: '/:locale(ur)/khidmaat/:slug/technology', destination: '/:locale/services/:slug/tech-stack' },
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
            key: 'X-Frame-Options',
            value: 'DENY'
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