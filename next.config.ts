import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
  ],
},
    eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
