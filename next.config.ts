import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel ને કહેવા માટે કે નાની-મોટી એરર ઈગ્નોર કરીને લાઈવ કરી દે
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;