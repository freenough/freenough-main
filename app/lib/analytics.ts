// GA4・AdSenseの設定値を1か所にまとめる。
// lifecompass-next（src/lib/analytics.ts）と同じ値・同じ条件にそろえること（同じGA4プロパティを共有しているため）。

export const GA_MEASUREMENT_ID = "G-KQNTWNKPJ7";

export const ADSENSE_CLIENT_ID = "ca-pub-1493291567641534";

// GA4を読み込む本番ドメイン。freenough.com（apex）は www へ308リダイレクトされページが表示されないため含めない。
// *.vercel.app 等のVercelドメインから直接開いた場合は計測しない。
export const ANALYTICS_ALLOWED_HOSTS: readonly string[] = ["www.freenough.com"];

// Vercelの本番デプロイでビルドしたときだけtrue（ローカル・Previewは除外）。
// NEXT_PUBLIC_ 付きのためビルド時に値が埋め込まれる。
export const IS_PRODUCTION_BUILD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
