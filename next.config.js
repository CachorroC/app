// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output      : 'standalone',
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
                value: 'dac874230dcfcd71de02b41f5e78083c.access',
              },
              {
                key: 'CF-Access-Client-Secret',
                value:
              'cd9f43a4ea535037f9a1d03fc82e2477020438e462bb076d7926c53ebbadeaf8',
              }, ],
            }, ];
  },
};
module.exports = nextConfig;
