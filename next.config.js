// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output      : 'standalone',
  crossOrigin : 'use-credentials',
  experimental: {
    typedRoutes                     : true,
    caseSensitiveRoutes             : true,
    serverComponentsExternalPackages: [ 'mongodb', 'prisma' ],
  },
  async headers() {
            return [ {
              source : '/:path*',
              headers: [ {
                key  : 'CF-Access-Client-Id',
                value: process.env.CF_ACCESS_CLIENT_ID ?? 'noId',
              },
              {
                key: 'CF-Access-Client-Secret',
                value:
              process.env.CF_ACCESS_CLIENT_SECRET ?? 'noSecret',
              }, ],
            }, ];
  },
};
module.exports = nextConfig;
