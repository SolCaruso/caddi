import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
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
