import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  basePath: '',
  assetPrefix: '/multi-zones-morse-code',
}

export default nextConfig
