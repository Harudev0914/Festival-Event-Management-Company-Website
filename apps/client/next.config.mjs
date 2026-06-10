/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Festival-Event-Management-Company-Website',
  assetPrefix: '/Festival-Event-Management-Company-Website/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui", "@repo/common"],
};

export default nextConfig;
