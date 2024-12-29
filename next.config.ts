import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cachet.dunkirk.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
