/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io',
      'www.digimedic.cz'
    ],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'digimedic.cz' }],
        destination: 'https://www.digimedic.cz',
        permanent: true,
      },
    ]
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Host', value: 'www.digimedic.cz' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami-zgwccgo44s8g04840wscokg8.194.164.72.131.sslip.io; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io;" }
        ],
      },
    ]
  },
  poweredByHeader: false,
};

module.exports = {
  ...nextConfig,
  experimental: {
    serverComponents: true,
    serverActions: true,
    optimizeFonts: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        vm2: false,
      };
    }
    return config;
  },
}
