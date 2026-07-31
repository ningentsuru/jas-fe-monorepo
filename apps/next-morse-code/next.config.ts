import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui-react'],
  basePath: '/multi-zones-morse-code',
  assetPrefix: '/multi-zones-morse-code',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/multi-zones-morse-code',
        basePath: false,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
