import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freenough-main.vercel.app"),
  title: "FREENOUGH — Design Your Enough.",
  description:
    "あなたにとっての「足りる」を、数字で描く。FREENOUGHは、シミュレーションとデータを通じて、人生のお金の意思決定を支援するブランドです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
