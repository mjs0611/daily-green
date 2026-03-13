import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  transpilePackages: ["@toss/tds-mobile"],
};

export default nextConfig;
