// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'standalone',

  experimental: {
    typedRoutes                     : true,
    serverActions                   : true,
    serverComponentsExternalPackages: [
              '@prisma/client',
              'mongodb',
              'eslint'
    ],
  },
};
module.exports = nextConfig;
