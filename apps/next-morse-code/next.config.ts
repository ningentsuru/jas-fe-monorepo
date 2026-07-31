import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  basePath: '/multi-zones-morse-code',
  assetPrefix: '/multi-zones-morse-code',
}

export default nextConfig
