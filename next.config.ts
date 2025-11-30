import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Output standalone para Docker
  output: 'standalone',

  // Otimizações de performance
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Habilitar compressão
  compress: true,
};

export default nextConfig;
