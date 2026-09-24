# 指示書：GA4計測タグ（gtag.js）実装（freenough-main / トップページ側）

## 背景

`freenough.com`（ブランドトップページ、Vercelプロジェクト名 `freenough-main` と推定）にも、
`/asset-simulator`側と同様にGA4のgtagタグが実装されていないことを確認済み。
本番HTMLソースを目視確認し、`gtag`・`G-`で始まる文字列が一切存在しない。

**このリポジトリは `/asset-simulator`（旧LifeCompass）とは別のNext.jsプロジェクトです。**
別途、`/asset-simulator`側にも同内容の実装指示を出しているが、そちらとは別リポジトリでの
作業になるため、本指示書はこの `freenough-main` リポジトリ単体に対して実施すること。

**測定ID**：`G-KQNTWNKPJ7`
（`/asset-simulator`側と**同一の測定IDを使う**。サイト全体を横断したユーザー行動を
1つのGA4プロパティで見られるようにするため、プロパティを分けないこと）

---

## 事前調査（実装前に必ず行うこと）

このリポジトリの `layout.tsx`（またはそれに相当するルートレイアウト）の構造が不明なため、
実装前に以下を確認すること：

1. `<head>`関連の実装がどこにあるか（`app/layout.tsx`のmetadata、または直接`<head>`タグか）
2. 既存でGoogle AdSenseタグ（`ca-pub-1493291567641534`）が実装されている箇所・書き方
   （本番ソースで確認済み。おそらく`next/script`または`beforeInteractive`戦略を使用している）
3. AdSenseタグの実装パターンに倣うことで、既存のコーディング規約との一貫性を保つ

## 実装内容

Next.js公式の `next/script` を使用し、ルートの `layout.tsx` に実装する。

```tsx
import Script from 'next/script';

// RootLayoutのreturn内、<body>タグの直前または直後に追加
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-KQNTWNKPJ7"
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KQNTWNKPJ7');
  `}
</Script>
```

**注意点**：
- 必ず**ルートのlayout.tsx**に実装すること（トップページ`page.tsx`だけに実装すると、
  他のページ遷移時にタグが読み込まれない）
- 既存のAdSenseスクリプトの実装方式（`strategy`の指定方法など）と矛盾しないか確認すること

## 完了確認手順

1. `npm run build` が通ること
2. ローカルまたはVercel Previewでページを開き、「ページのソースを表示」で
   `G-KQNTWNKPJ7` が含まれることを確認
3. Vercel本番デプロイ後、`https://www.freenough.com/` を開いた状態で
   GA4管理画面の「リアルタイム」レポートを開き、アクティブユーザー数が1以上になることを確認

## 完了報告フォーマット

- 実装箇所：
- 既存AdSenseタグとの実装方式の整合性：
- ビルド結果：
- ソース確認結果（G-KQNTWNKPJ7の存在）：
- リアルタイムレポート確認結果：
- 残課題（あれば）：
