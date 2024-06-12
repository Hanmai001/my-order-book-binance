/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
