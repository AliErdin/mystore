/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['styled-components'],
  },
}

module.exports = nextConfig
