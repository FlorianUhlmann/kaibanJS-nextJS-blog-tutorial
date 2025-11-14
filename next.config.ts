import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence workspace root inference warning during build
  // by explicitly setting the Turbopack root
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
