import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    format: ["logo/png"],
    domains: ["localhost"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
