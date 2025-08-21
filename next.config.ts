import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zcvltuokjgqfjpqynyrg.storage.supabase.co',
        port: '',
        pathname: '/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'zcvltuokjgqfjpqynyrg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

};

export default nextConfig;
