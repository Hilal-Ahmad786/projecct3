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
  // You can add any other Next.js settings here
  // e.g. images.domains, redirects, rewrites, etc.
};

module.exports = nextConfig;
