import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  assetPrefix: 'https://jas-fawn.vercel.app',
}

export default nextConfig
