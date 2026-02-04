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
    // Admin panel is now accessible - add authentication in production
    return [];
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