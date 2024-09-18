// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'standalone',
  crossOrigin: 'use-credentials',
  serverExternalPackages: ['mongodb', 'eslint'],
  experimental: {
    typedRoutes: true,
  },
};
module.exports = nextConfig;
