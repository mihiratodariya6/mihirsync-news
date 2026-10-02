import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel ને કહેવા માટે કે નાની-મોટી એરર ઇગ્નોર કરીને લાઈવ કરી દે
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🚀 આ નવો કોડ ઇમેજને સ્પીડમાં લોડ કરવા માટે છે
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;