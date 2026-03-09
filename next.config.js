// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  allowedDevOrigins: [
    'beta.rsasesorjuridico.com'
  ],
  cacheComponents: true,
  output         : 'standalone',
  typedRoutes    : true,
  async headers() {
    return [
      {
        source : '/(.*)',
        headers: [
          {
            key  : 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key  : 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key  : 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'CF-Access-Client-Id',
            value:process.env.CF_ACCESS_CLIENT_ID ?? ''

          }, {
            key: 'CF-Access-Client-Secret',
            value: process.env.CF_ACCESS_CLIENT_SECRET ?? ''
          }
        ],
      },
      {
        source : '/service-worker.js',
        headers: [
          {
            key  : 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key  : 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key  : 'Content-Security-Policy',
            value: 'default-src \'self\'; script-src \'self\'',
          },
          {
            key: 'CF-Access-Client-Id',
            value:process.env.CF_ACCESS_CLIENT_ID ?? ''

          }, {
            key: 'CF-Access-Client-Secret',
            value: process.env.CF_ACCESS_CLIENT_SECRET ?? ''
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
