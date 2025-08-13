/** @type {import('next').NextConfig} */
const nextConfig = {
 // basePath: '/varnave',
 // assetPrefix: '/varnave/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
