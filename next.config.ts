import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'airplays3.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
