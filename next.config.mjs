import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ghost-dso8k808400okgkc80wss8s0.194.164.72.131.sslip.io']
  },
  experimental: {
    serverActions: true,
  }
};

export default nextConfig;
