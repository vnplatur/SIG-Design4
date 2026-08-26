/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // 1. Enable static export only in production (keeps local dev running on node server)
  ...(isProd ? { output: 'export' } : {}),

  // 2. Prepend repository name in production (keeps local dev on '/')
  basePath: isProd ? '/SIG-Design4' : '',

  reactStrictMode: true,

  // 3. Disable image resizing server in production (required for static hosting)
  images: {
    unoptimized: isProd,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.omaninvestgateway.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // 4. Enable API headers only in development (static export does not support headers)
  ...(!isProd
    ? {
        headers: async () => [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
              },
            ],
          },
        ],
      }
    : {}),
};

module.exports = nextConfig;
