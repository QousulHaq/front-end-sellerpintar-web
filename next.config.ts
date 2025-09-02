import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
        port: '',
        pathname: '/**',
        search: ''
      },
    ],
  },
};

export default nextConfig;
