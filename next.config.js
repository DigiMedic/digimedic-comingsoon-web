/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io'],
    unoptimized: true // přidejte toto pro lepší kompatibilitu s Vercel
  },
  // odstraňte experimental.appDir - už není potřeba v Next.js 14
}

module.exports = nextConfig
