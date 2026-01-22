import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ignore ESLint errors during build (for Vercel deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (for Vercel deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Needed for pixi-live2d-display
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
