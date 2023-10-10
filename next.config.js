// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output      : 'standalone',
  experimental: {
    typedRoutes                     : true,
    serverActions                   : true,
    serverComponentsExternalPackages: [
      'mongodb',
      'eslint'
    ],
  },
};
module.exports = nextConfig;
