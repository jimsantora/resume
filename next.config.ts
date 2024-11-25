import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/resume', // Replace 'your-repo-name' with your actual repository name
  assetPrefix: '/resume/', // Add this line, replace with your repository name
}

export default nextConfig;
