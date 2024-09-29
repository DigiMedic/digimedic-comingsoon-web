import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Zde by nemělo být nic, pokud nepoužíváte jiné experimentální funkce
  },
  images: {
    domains: [
      'ghost-dso8k808400okgkc80wss8s0.digimedic.cz',
      'digimedic.cz',
      'www.digimedic.cz',
      'utfs.io'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.digimedic.cz',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  env: {
    GHOST_API_URL: process.env.GHOST_API_URL,
    GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
  },
};

export default nextConfig;
