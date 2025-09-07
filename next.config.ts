/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Remove i18n config for App Router - we handle this manually
  // i18n config is not supported in App Router
  
  // Optimize for static generation
  trailingSlash: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Headers for SEO
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