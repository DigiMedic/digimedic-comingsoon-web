import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  optimizeFonts: true,
  images: {
    domains: ['your-domain.com'] // Přidejte domény, ze kterých načítáte obrázky
  },
  experimental: {
    swcPlugins: [["@onlook/nextjs", {
      root: path.resolve(".")
    }]]
  }
};
export default nextConfig;