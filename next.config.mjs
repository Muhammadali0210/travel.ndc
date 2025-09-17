/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'project1.ndc-agency.uz',
        port: '',
        pathname: '/upload/images/**',
      },
    ],
  },
}

export default nextConfig
