import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Letakkan langsung di sini, BUKAN di dalam blok experimental
  allowedDevOrigins: ['192.168.56.1'],
};

export default nextConfig;