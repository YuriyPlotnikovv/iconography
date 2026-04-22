import type { NextConfig } from 'next'

const cockpitHost = process.env.NEXT_PUBLIC_COCKPIT_URL
  ? new URL(process.env.NEXT_PUBLIC_COCKPIT_URL).hostname
  : ''

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cockpitHost || 'icon-artel.ru',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
