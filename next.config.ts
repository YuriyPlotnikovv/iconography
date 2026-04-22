import type { NextConfig } from 'next'

const cockpitUrl = process.env.COCKPIT_API_URL || ''
const cockpitHost = cockpitUrl ? new URL(cockpitUrl).hostname : ''

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cockpitHost,
      },
    ],
  },
}

export default nextConfig
