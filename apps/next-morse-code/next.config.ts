import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  assetPrefix: '/activity-morse-code',
}

export default nextConfig
