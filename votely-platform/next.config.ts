import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: '.', // Set project root explicitly
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foxpgqpclfptrkyfoivo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
