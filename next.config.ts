import type { NextConfig } from 'next'

const cockpitUrl = process.env.COCKPIT_API_URL || ''
const cockpitHost = cockpitUrl ? new URL(cockpitUrl).hostname : ''

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [80, 90],
    minimumCacheTTL: 43200,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cockpitHost,
      },
    ],
  },
}

export default nextConfig
