import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnalyticsScripts from "@/app/components/AnalyticsScripts";
import { ADSENSE_CLIENT_ID, IS_PRODUCTION_BUILD } from "@/app/lib/analytics";

// 本文の書体。lifecompass-next（資産シミュレーター・一人法人LP）のlayout.tsxと同じ設定。
// 太さはLPと同じ400・500・700の3つだけ読み込む（font-semibold・font-extraboldはLPと同じく700で描かれる）
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
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

// スクロール表示演出（app/components/Reveal.tsx）の初期化スクリプト。lifecompass-nextと同じ内容
const REVEAL_BOOT_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js-reveal');" +
  "setTimeout(function(){if(!window.__rvReady&&document.querySelector('.rv'))d.classList.remove('js-reveal');},4000);})();";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.className} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-slate-50">
        {/* スクロール表示演出の初期化。HTML解析中に<html>へjs-revealを付け、初期表示のちらつきを防ぐ。
            JS無効・ハイドレーション失敗時に内容が非表示のまま残らないよう、非表示はjs-revealがあるときだけ効かせ、
            4秒後に.rvがあるのにRevealが動作開始していなければjs-revealを外す（.rvのないページでは外さない）。
            クラスをスクリプトで足すため<html>にsuppressHydrationWarningを付けている */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
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
