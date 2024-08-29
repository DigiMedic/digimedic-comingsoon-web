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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            jsx: true,
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    });
    config.resolve.alias['@'] = path.join(__dirname, './');
    return config;
  },
  images: {
    domains: ['www.gravatar.com'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default nextConfig;
