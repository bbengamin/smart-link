import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack (use swc instead) to avoid workspace root issues
  experimental: {},
};

export default nextConfig;
