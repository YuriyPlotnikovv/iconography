import type { NextConfig } from 'next'

const cockpitHost = process.env.COCKPIT_API_URL
  ? new URL(process.env.COCKPIT_API_URL).hostname
  : ''

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cockpitHost,
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
