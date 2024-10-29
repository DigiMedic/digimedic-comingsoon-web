/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io',
      'localhost'
    ],
    unoptimized: true
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react']
  }
};

module.exports = nextConfig;
