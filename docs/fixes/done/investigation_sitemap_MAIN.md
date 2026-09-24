# 調査依頼(MAIN側/freenough-main):AdSense「有用性の低いコンテンツ」原因調査

作成日:2026-08-01
対象リポジトリ:**freenough-main**(Vercelプロジェクト名:`freenough-main`、
`freenough.com`ルートを配信)
種別:**調査専用(実装は一切行わない)**

---

## 1. 背景

AdSense審査で「有用性の低いコンテンツ」により却下されている
(`ads.txt`は承認済み・問題なし。サイト全体のコンテンツ評価のみが問題)。

すでに判明している事実:

- TOPページ(`https://www.freenough.com/`)はランディングページ1枚のみで、
  ヘッダーナビ(シミュレーター/ブログ/ツール/Note)・フッター(About/X/Note)
  から実質的なコンテンツはすべて`/asset-simulator`配下(別リポジトリ
  `lifecompass-next`、別Vercelプロジェクト`freenough-lifecompass`)へ
  リンクしている構成と見られる
- TOP側の`sitemap.xml`(`https://www.freenough.com/sitemap.xml`)は
  トップページ1件のみを返している
- `freenough.com/asset-simulator/*`は、本リポジトリのrewrites設定
  (`next.config.js`または`vercel.json`)経由で
  `freenough-lifecompass.vercel.app`へプロキシされていると推定される
- 前回引き継ぎ事項だった`ads.txt`は、コミット・デプロイ・AdSense上の
  承認まで完了済み(このリポジトリでの直近の対応)。本調査とは別件として
  解消済みなので、追加対応は不要

---

## 2. 調査してほしいこと

### 2-1. sitemap.ts(またはsitemap.xml生成ロジック)の実装確認

- `sitemap.ts`(または相当ファイル)の実装内容を確認し、なぜトップページ
  1件しか出力されていないのか原因を特定すること
  - 動的ページ列挙のロジックがそもそも実装されていないのか
  - 実装はあるが、データ取得(ファイル読み込み等)に失敗して0件になって
    いるのか
- 本リポジトリ(`freenough-main`)自体に、ブログ記事やツールページが
  実在するのか、それとも本当に存在せず「単一ページのサイト」として
  仕様どおりなのかを明確にすること(KENZOへの確認では「ブログは
  `/asset-simulator/blog`に全部ある、TOP側は何もない」との回答を
  得ているが、ツールページ(`/tools/monthly-investment`等)がTOP側に
  実在するかは未確認。過去のプロジェクトメモには「ツール3種が
  `/tools/xxx`というURLでTOP側に公開済み」という記録があるため、
  矛盾がないか確認すること)

### 2-2. 全ページの実在確認(ground truth の作成)

App Router/Pages Routerのディレクトリ構成から、本リポジトリで実際に
ビルド/ルーティングされている全ルートを列挙して報告すること
(sitemapの中身ではなく、実際に存在するルート一覧)。

### 2-3. robots.txtの確認

`public/robots.txt`(またはNext.jsのrobots生成ロジック)の中身を確認し、
`/asset-simulator`や`/tools`をdisallowしていないか確認すること。

### 2-4. rewrites設定の確認(重要)

- `next.config.js`(または`vercel.json`)のrewrites設定の正確な内容を
  報告すること
  - `/asset-simulator/:path*`がどこへプロキシされているか
  - `/asset-simulator/sitemap.xml`や`/asset-simulator/robots.txt`の
    ような非ページパスも含めて透過されているか
  - プロキシ対象パスパターンに漏れがないか(正規表現/パスパターンを
    そのまま報告すること)

### 2-5. sitemapの相互参照設計の確認

TOP側の`sitemap.xml`が、`/asset-simulator`側の`sitemap.xml`を
sitemap index形式で参照する設計になっているか、それとも完全に独立した
2つのsitemapとして扱う設計になっているか、現状のコードから判断できる
範囲で報告すること。

### 2-6. フッター・ナビゲーションのリンク先確認

- フッターの「About」リンクの実際の遷移先URL(`/asset-simulator/about`
  なのか、TOP側の別ページなのか)を確認すること
- フッターに、プライバシーポリシー・免責事項等への直接リンクが存在するか
  確認すること。存在しない場合、それらのページへの到達には何クリック
  必要か(About経由なのか、そもそも到達経路がないのか)を報告すること

---

## 3. 絶対にやってはいけないこと

- **実装・修正は一切行わないこと**。本指示書は調査専用。sitemap.tsの
  修正、robots.txtの修正、rewritesの修正などは、この後の実装フェーズで
  別途指示する
- 独自に再実装したスクリプトで検証しないこと。既存のコード・設定ファイルを
  読んで報告すること

---

## 4. 完了報告のフォーマット

1. sitemap.tsの現状実装と、1件しか出力されない原因
2. 本リポジトリで実在する全ページURL一覧(ground truth)
3. robots.txtの中身(disallow設定の有無)
4. rewrites設定の正確な内容(対象パスパターン含む)
5. sitemap同士の相互参照設計の有無
6. フッター「About」リンクの実際の遷移先、およびプライバシーポリシー等
   への到達経路
7. 上記を踏まえた、次の実装フェーズで対応すべき項目の箇条書き(判断は
   KENZOとこのチャットで行うため、選択肢の提示に留め、独断で優先順位を
   つけないこと)

---

## 5. 補足

同時に`lifecompass-next`側にも同様の調査を別途依頼している
(`investigation_sitemap_LIFECOMPASS.md`)。両方の結果が揃った時点で、
このチャットで統合して次の実装方針を決める。
