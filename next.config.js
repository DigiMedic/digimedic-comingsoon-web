/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Varování nebudou blokovat build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TS chyby nebudou blokovat build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sslip.io',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '194.164.72.131',
        port: '2368',
        pathname: '/**',
      }
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
