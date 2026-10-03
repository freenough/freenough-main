# 指示書：TOPの左右余白を、資産シミュレーターLP・一人法人LPと同じ24pxに揃える

作成日：2026-10-03
対象：freenough-main（`app/page.tsx` のみ）
置き場所：`docs/fixes/active/fix_top_side_margin_24px.md`

## 0. 進め方（先に読む）

- **第1段階（ローカル確認・報告）で止まる。commit・pushはKENZOの明示的な指示があってから。**
- `AGENTS.md` に従い、コードを書く前に `node_modules/next/dist/docs/` の関連箇所を読む（今回はTailwindのクラス変更のみで、Next.jsのAPIには触れない想定）。
- 間違いを認めるときは「間違えました。すみません。」と書く。
- 作業ブランチ名：`feature/top-side-margin-24px`（main の `e50d2f2` から切る）。

## 1. 背景

iPhone SE（375px）でTOPを見ると、本文の左右の空きが資産シミュレーターLP・一人法人LPより狭い。
前回（2026-10-03）、TOPの800px未満の左右余白を16px（ヘッダー・フッターと同じ）にしたが、LP2つの本文は全幅で24px（`Container` の `px-6`）。KENZOの要望は「LPと同じ空き幅にしたい」。

## 2. 変更内容（Claudeが書いた案。実物で確かめてから適用する）

`app/page.tsx` のみ。下記パッチは、Claudeの環境でビルド・表示ができず、**実機で未確認**。

1. 外側コンテナ：`px-4 min-[800px]:px-6` → `px-6`（全幅24px）。800px以上は変わらない。
2. MESSAGE帯：`-mx-4 px-4 min-[800px]:-mx-6 min-[800px]:px-6` → `-mx-6 px-6`。
3. 余白が広がって本文が狭まる分の再調整（320px幅の本文は288px→272px）：
   - 見出しの下限：`max-[359px]:[--h1-min:37px]` → `max-[361px]:[--h1-min:12.5cqi]`
   - セカンダリボタン：`max-[359px]:px-6` → `max-[361px]:px-4`
4. コメントも合わせて書き直す。

注意：Tailwind v4では `max-[Npx]` は「幅がN px**未満**」。`max-[361px]` は360px幅までを対象にし、361pxは対象外（引き継ぎ資料のメモと同じ）。

### パッチ

```diff
diff --git a/app/page.tsx b/app/page.tsx
index 5e9d974..05e4168 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -11,12 +11,13 @@ const HITORI_HOJIN_URL = "/hitori-hojin";
 // セカンダリ（アウトライン）はLP側に同種のボタンがないため、同じhover挙動に枠線を足したもの。
 // 枠線1px×2の分だけpy-[15px]にして、プライマリと同じ高さ56pxにする。
 // min-w-[19rem]（304px）は、文言の長い「一人法人という選択肢を見る →」（内容幅約295px）に合わせて
-// 4つのボタンの幅を揃えるための最小幅。本文がそれより狭い幅（320px幅の本文288px）では本文幅を上限にする。
-// セカンダリは文言と左右余白px-8だけで約294pxあり320px幅の本文288pxより広いため、360px未満だけpx-6にして本文幅に収める。
+// 4つのボタンの幅を揃えるための最小幅。本文がそれより狭い幅（320px幅の本文272px）では本文幅を上限にする。
+// セカンダリは文言と左右余白px-8だけで約294pxあり、320px幅の本文（左右24pxで272px）より広いため、
+// 360px以下だけpx-4（約264px）にして本文幅に収める。min-w（本文幅100%）が効く幅ではボタンの見た目の幅は変わらない。
 const PRIMARY_BUTTON_CLASS =
   "inline-block min-w-[min(19rem,100%)] rounded bg-[#334155] px-8 py-4 text-center text-base font-semibold text-white shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";
 const SECONDARY_BUTTON_CLASS =
-  "inline-block min-w-[min(19rem,100%)] rounded border border-[#334155] bg-transparent px-8 max-[359px]:px-6 py-[15px] text-center text-base font-semibold text-[#334155] shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";
+  "inline-block min-w-[min(19rem,100%)] rounded border border-[#334155] bg-transparent px-8 max-[361px]:px-4 py-[15px] text-center text-base font-semibold text-[#334155] shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";
 
 // 2本柱ブロックの右側の図は、lifecompass-nextのLPに実際に描画されたHeroDemo・HitoriHojinForkDiagramを
 // 2倍解像度でキャプチャした静止画（別リポジトリのためコンポーネントは共有できない）。
@@ -99,8 +100,9 @@ export default function Home() {
 
       <main className="flex flex-col items-center">
         {/* 外側コンテナはlifecompass-nextの--lp-container-width(72rem)に合わせる。
-            左右の余白は800px未満でヘッダー・フッター（px-4）と同じ16px、800px以上は24px */}
-        <div className="mx-auto w-full max-w-[72rem] px-4 min-[800px]:px-6">
+            左右の余白は全幅で24px（px-6）。資産シミュレーターLP・一人法人LPの本文（Containerのpx-6）と同じ。
+            ヘッダー・フッター（px-4）より本文が内側に入る関係もLPと同じ */}
+        <div className="mx-auto w-full max-w-[72rem] px-6">
           <section className="pt-28 pb-16 text-center">
             {/* 見出しの文字サイズをこの要素の幅（cqi）基準にするためのコンテナ。vwはスクロールバーを含む
                 画面幅で決まり、スクロールバーが幅を取る環境で本文幅とずれるため使わない */}
@@ -114,10 +116,12 @@ export default function Home() {
                   中央値6.6cqiは、1行目（文字サイズの約14.6倍の幅）がコンテナ幅の約96.5%に収まり、
                   15px以上の余りを残して2行になるように決めた値。
                   下限2.5rem（40px）は、最も長い塊「あなたにとっての」（文字サイズの約7.7倍＝309px）が
-                  360px幅の本文（328px）に収まる大きさ。360px未満だけ下限を37pxに下げる（320px幅の本文288pxに
-                  286pxで収まる、1px刻みで最大の大きさ）。下限は--h1-minで切り替える */}
+                  361px以上の本文（左右24pxで313px以上）に収まる大きさ。360px以下は本文が312px以下になり
+                  40pxでは余りが3px以下になるため、下限を本文幅の12.5cqiにして、塊が本文幅の約97%
+                  （余りは本文幅の約3.4%＝320px幅で約9px）に収まるようにする。固定値だと320px幅
+                  （本文272px）の余りが取れず、幅ごとに値を刻む必要が出る。下限は--h1-minで切り替える */}
               <h1
-                className="mt-4 text-balance font-bold leading-tight tracking-tight text-black [--h1-min:2.5rem] max-[359px]:[--h1-min:37px]"
+                className="mt-4 text-balance font-bold leading-tight tracking-tight text-black [--h1-min:2.5rem] max-[361px]:[--h1-min:12.5cqi]"
                 style={{ fontSize: "clamp(var(--h1-min), 6.6cqi, 4.5rem)" }}
               >
                 <span className="whitespace-nowrap">あなたにとっての</span><span className="whitespace-nowrap">「足りる」を、</span>
@@ -141,8 +145,8 @@ export default function Home() {
           {/* 帯の背景はbox-shadowで画面幅いっぱいに広げ、clip-pathで上下のはみ出しだけ切る
               （w-screen=100vwはWindowsのスクロールバー幅を含み横スクロールを生むため使わない）。
               SERVICESと同じ左揃え。本文は読みやすい行長（1行42字前後）に収めるためmax-w-2xlのまま。
-              -mx-*とpx-*は外側コンテナの左右余白（800px未満16px・以上24px）と同じ値で相殺して付け直す */}
-          <section className="-mx-4 bg-slate-50 px-4 py-9 min-[800px]:-mx-6 min-[800px]:px-6 shadow-[0_0_0_100vmax_var(--color-slate-50)] [clip-path:inset(0_-100vmax)]">
+              -mx-*とpx-*は外側コンテナの左右余白（全幅24px）と同じ値で相殺して付け直す */}
+          <section className="-mx-6 bg-slate-50 px-6 py-9 shadow-[0_0_0_100vmax_var(--color-slate-50)] [clip-path:inset(0_-100vmax)]">
             <Reveal className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-zinc-700">
               <SectionLabel>MESSAGE</SectionLabel>
               {/* 2本柱の説明文と同じく、文節ごとの<wbr />＋keep-allで文節の区切りでだけ折り返す */}
```

## 3. 検証（実物で確かめる。資料の数値を写さない）

### 3-1. 変更前に測る（mainのまま）
- 資産シミュレーターLP・一人法人LP・TOPで、375pxの本文の左端・右端のx座標を測り、**LPの左右余白が実際に24pxであること**を確認する（`getBoundingClientRect`）。24pxでなければ、その値に合わせる。
- TOPの変更前スクリーンショットを、375 / 390 / 768 / 799 / 800 / 1024 / 1280 / 1366 / 1440 / 1920 で撮る。

### 3-2. 変更後
- 幅：上記10幅に、320 / 360 / 361 を加える。
- 横あふれ：`document.documentElement.scrollWidth > window.innerWidth`。通常と「動きを減らす」の両方。
- 800px以上：変更前とスクリーンショットの差が0であること（広告・計測スクリプトは止める）。
- 800px未満：本文の左右余白が24pxになっていること（375pxで確認）。
- 折り返し位置（変わっていないか確認）：
  - 見出し「あなたにとっての／「足りる」を、／数字で描く。」
  - 2本柱の説明文、MESSAGEの本文
- 見出し（320 / 360 / 361px）：「あなたにとっての」が本文幅に収まり、**余りが2px以上**あること。実測で確かめ、足りなければ `12.5cqi` の係数を調整する（目安：320pxで約34px、余り約9px）。
- ボタン（320 / 360px）：セカンダリ「一人法人という選択肢を見る →」が本文幅に収まり、本文の外にはみ出さないこと。
- 768〜799pxの見出し：約1px小さくなる見込み（前回の約1px大きくなった副作用が戻る）。受け入れてよいか、実測値を報告する。
- `npx tsc --noEmit`、`npx eslint app/page.tsx`。既存のlintエラー2件（`Header.tsx:27`、`Footer.tsx:50`）は別件なので触らない。

## 4. 報告に含めること
- 3-1の実測値（LPの左右余白）
- 各幅の横あふれ結果、見出しの余りの実測値
- 800px以上のスクリーンショット差
- パッチを実物に合わせて直した箇所があれば、その内容と理由
- **ここで止まる。** commit・pushの指示はKENZOから出る。

## 5. 以降の流れ（KENZOの指示が出てから）
作業ブランチ → ブランチだけcommit・push → Previewで確認 → `--no-ff` でmainへマージ → mainをpush → 指示書を `docs/fixes/done/` へ移して**別commit** → 本番確認 → ブランチ削除（`git branch -d` のみ。`-D`・force pushは使わない）。
