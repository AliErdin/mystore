import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['styled-components'],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@/messages': require('path').resolve(__dirname, 'messages'),
    };
    return config;
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
