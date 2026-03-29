import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep it simple to avoid crashes */
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
