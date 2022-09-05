/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['flowbite.com'],
  },
};

module.exports = nextConfig;
