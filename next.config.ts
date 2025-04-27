import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["192.168.10.18"], // Add your local IP address
    // OR use remotePatterns for more control:
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.10.18",
        port: "3500",
        pathname: "/**", // Allows all paths
      },
    ],
  },
};

export default nextConfig;
