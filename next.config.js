/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io'],
    unoptimized: true
  },
  eslint: {
    // Dočasně ignorujeme ESLint chyby během buildu
    ignoreDuringBuilds: true
  },
  typescript: {
    // Dočasně ignorujeme TypeScript chyby během buildu
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
}

module.exports = nextConfig
