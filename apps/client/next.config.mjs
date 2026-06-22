/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Static export only in production
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  basePath: isProd ? '/Festival-Event-Management-Company-Website' : '',
  assetPrefix: isProd ? '/Festival-Event-Management-Company-Website/' : '',
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui", "@repo/common"],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
