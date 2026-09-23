import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Los comprobantes e íconos se envían como imágenes base64 en las Server
    // Actions; el límite por defecto (1MB) los rechaza. Se sube a 8MB.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
