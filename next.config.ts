import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // http and https images
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
