/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/SIG-Design4' : '',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.omaninvestgateway.com',
      },
      // Stock imagery used by <ScrollExpandMedia />. Query strings are allowed
      // (`search` omitted) because Unsplash serves sizing params via the URL.
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
