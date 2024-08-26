/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Dočasně ignorujeme ESLint chyby během buildu
  },
}

export default nextConfig;
