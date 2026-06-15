/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/Festival-Event-Management-Company-Website' : '',
  assetPrefix: isProd ? '/Festival-Event-Management-Company-Website/' : '',
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui", "@repo/common"],
};

export default nextConfig;
