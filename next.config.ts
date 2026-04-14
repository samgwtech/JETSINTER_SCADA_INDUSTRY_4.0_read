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

  // Ottimizzazioni per HMI / hardware lento
  compress: true,                    // gzip risposte server
  productionBrowserSourceMaps: false, // no source maps in produzione → bundle più piccolo
  poweredByHeader: false,            // rimuove header inutile

  // Limita i worker di compilazione per non saturare CPU deboli in dev
  experimental: {
    workerThreads: false,
  },
};

export default nextConfig;