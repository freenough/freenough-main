import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/lifecompass",
        destination: "https://freenough-lifecompass.vercel.app/lifecompass",
      },
      {
        source: "/lifecompass/:path*",
        destination:
          "https://freenough-lifecompass.vercel.app/lifecompass/:path*",
      },
    ];
  },
};

export default nextConfig;
