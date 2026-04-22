import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icon-artel.ru',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
