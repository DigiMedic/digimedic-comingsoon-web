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
    domains: [
      'ghost.digimedic.dev',
      'localhost',
      'ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sslip.io',
        pathname: '/content/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
