import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnalyticsScripts from "@/app/components/AnalyticsScripts";
import { ADSENSE_CLIENT_ID, IS_PRODUCTION_BUILD } from "@/app/lib/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.freenough.com"),
  title: "FREENOUGH — Design Your Enough.",
  description:
    "あなたにとっての「足りる」を、数字で描く。FREENOUGHは、シミュレーションとデータを通じて、人生のお金の意思決定を支援するブランドです。",
};

// サイト全体のJSON-LD（Organization）。個人著者は立てず、freenoughブランドのOrganizationのみで
// 構造化データを実装する方針（docs/fixes/active/claude_instruction_structured_data_implementation_v2.md）。
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "freenough",
  url: "https://www.freenough.com",
  logo: "https://www.freenough.com/images/compass_logo.png",
  sameAs: ["https://x.com/freenough", "https://note.com/freenough"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {/* AdSenseは本番ビルドのときだけ（ホスト名では絞らない）。サーバーが返すHTMLに含まれる
            beforeInteractiveのまま。GA4は本番ビルドかつ本番ドメインのときだけ（ホスト名はクライアント側で判定）。 */}
        {IS_PRODUCTION_BUILD && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
