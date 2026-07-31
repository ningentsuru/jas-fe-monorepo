import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  basePath: '/activity-morse-code',
  assetPrefix: '/activity-morse-code',
}

export default nextConfig
