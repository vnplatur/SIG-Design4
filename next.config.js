/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const isGithubPages = isProd && !isVercel;

const nextConfig = {
  // 1. Enable static export only for GitHub Pages (keeps Vercel and local dev running on node server)
  ...(isGithubPages ? { output: 'export' } : {}),

  // 2. Prepend repository name only on GitHub Pages (keeps Vercel and local dev on '/')
  basePath: isGithubPages ? '/SIG-Design4' : '',

  // 3. Inject basePath into client-side bundle so process.env.NEXT_PUBLIC_BASE_PATH works
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? '/SIG-Design4' : '',
  },

  reactStrictMode: true,

  // 3. Disable image resizing server only on GitHub Pages (required for static hosting)
  images: {
    unoptimized: isGithubPages,
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

  // 4. Enable API headers on development and Vercel (static export on GitHub Pages does not support headers)
  ...(!isGithubPages
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
