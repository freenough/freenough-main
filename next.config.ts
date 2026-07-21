import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/asset-simulator",
        destination:
          "https://freenough-lifecompass.vercel.app/asset-simulator",
      },
      {
        source: "/asset-simulator/:path*",
        destination:
          "https://freenough-lifecompass.vercel.app/asset-simulator/:path*",
      },
      // 旧パス(/lifecompass)は削除せず維持する。lifecompass-next側の新basePath
      // (/asset-simulator)デプロイ後もnote等に残る旧URLへのアクセスをここで
      // lifecompass-nextまで到達させ、lifecompass-next自身のredirects()による
      // /asset-simulatorへの301へつなげるための転送。
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
