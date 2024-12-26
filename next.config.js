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
        protocol: 'http',
        hostname: '194.164.72.131',
        port: '2368',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '194.164.72.131',
        port: '2368',
        pathname: '/**',
      }
    ],
    unoptimized: true,
    domains: ['194.164.72.131'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              img-src 'self' http://194.164.72.131:2368 https://194.164.72.131:2368 data: blob:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://opnform.com;
              style-src 'self' 'unsafe-inline';
              font-src 'self' data:;
              frame-src 'self' https://opnform.com;
              connect-src 'self' http://194.164.72.131:2368 https://194.164.72.131:2368 https://opnform.com;
              form-action 'self' https://opnform.com;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig;
