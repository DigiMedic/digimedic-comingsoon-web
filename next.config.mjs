import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Dočasně ignorujeme ESLint chyby během buildu
  },
  // Odstraňte 'experimental' objekt
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    config.resolve.alias['@'] = path.join(__dirname, './');
    return config;
  },
  images: {
    domains: ['digimedic-blog.ghost.io', 'www.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ghost.io',
      },
    ],
  },
  env: {
    GHOST_API_URL: process.env.GHOST_API_URL,
    GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
  },
}

export default nextConfig;
