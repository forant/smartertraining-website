/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export — deploys to Cloudflare Pages / any static host.

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export.
  },
}

export default nextConfig
