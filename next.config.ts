import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: false,
  },
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.151.202"],
  serverExternalPackages: ["fs", "path"],
};

export default nextConfig;