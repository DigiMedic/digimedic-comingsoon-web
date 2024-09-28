import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Pokud používáte experimentální funkce, přidejte je zde
  experimental: {
    // Zde by nemělo být nic, pokud nepoužíváte jiné experimentální funkce
  },
  images: {
    domains: [
      'ghost-dso8k808400okgkc80wss8s0.digimedic.cz',
      'digimedic.cz',
      'www.digimedic.cz',
      'utfs.io'  // Přidáme tuto doménu
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.digimedic.cz',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',  // Přidáme vzor pro utfs.io
      },
    ],
  },
};

export default nextConfig;