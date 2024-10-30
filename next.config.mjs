/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'digimedic.cz',
          },
        ],
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
          {
            key: 'Host',
            value: 'www.digimedic.cz'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
  poweredByHeader: false,
};

export default nextConfig;
