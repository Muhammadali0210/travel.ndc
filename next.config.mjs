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
        pathname: '/upload/images/**',
      },
    ],
  },
  reactStrictMode: false, // qat’iy tekshiruvlarni o‘chiradi
  compiler: {
    reactRemoveProperties: true,
  },
  devIndicators: {
    buildActivity: false,   // ⛔ Dev indicatorni o‘chiradi
  },
}

export default nextConfig
