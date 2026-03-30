import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'icon-artel.stacy1z1.beget.tech',
            },
        ],
    },
};

export default nextConfig;
