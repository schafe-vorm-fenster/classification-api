import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // SwaggerUI uses some non-strict React features
  experimental: {
    useCache: true,
    dynamicIO: true,
    cacheLife: {
      gemini: {
        stale: 172800, // 2 days
        revalidate: 86400, // 1 day
        expire: 86400, // 1 day
      },
    },
  },
};

export default nextConfig;
