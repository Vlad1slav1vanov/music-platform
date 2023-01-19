/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:9000',
        port: '',
        pathname: '',
      },
    ],
  },
}

module.exports = nextConfig
