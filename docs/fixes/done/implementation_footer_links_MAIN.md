# 実装依頼(freenough-main):フッターに広告開示・プライバシーポリシー・免責事項リンクを追加

作成日:2026-08-01
対象リポジトリ:**freenough-main**
種別:**実装(対象は`app/page.tsx`のフッター部分のみ)**

---

## 1. 背景

先行の調査(`investigation_sitemap_MAIN.md`)で、TOP側フッターは
「About」「X」「Note」の3リンクのみで、プライバシーポリシー・免責事項・
広告開示への直接リンクが存在しないことが判明している。到達経路は
`/asset-simulator/about`経由のみだった。

AdSenseの信頼性評価上、これらのページへ容易に到達できる状態にしておく
ことが望ましいため、フッターに直接リンクを追加する。

KENZOが確認した実際のURLは以下の3つ:

- 広告開示:`https://www.freenough.com/asset-simulator/disclosure`
- プライバシーポリシー:`https://www.freenough.com/asset-simulator/privacy-policy`
- 免責事項:`https://www.freenough.com/asset-simulator/disclaimer`

---

## 2. やってほしいこと

- `app/page.tsx`(または該当するフッターコンポーネントに切り出されている
  場合はそちら)のフッターに、既存の`ABOUT_URL`定数と同じパターンで、
  以下3つの定数とリンクを追加すること
  - `DISCLOSURE_URL = "/asset-simulator/disclosure"`
  - `PRIVACY_POLICY_URL = "/asset-simulator/privacy-policy"`
  - `DISCLAIMER_URL = "/asset-simulator/disclaimer"`
- 表示順は「About / 広告開示 / プライバシーポリシー / 免責事項 / X / Note」
  を基本案とするが、既存のフッターのデザイン・レイアウト(スクリーンショット
  参照:横並びのテキストリンク、`|`区切りではなく余白区切り)を踏襲し、
  自然に収まる順序・スタイルであれば調整して構わない
- リンクのラベル文言は「広告開示」「プライバシーポリシー」「免責事項」で
  固定(KENZOが指定した表記のまま)
- 既存の`ABOUT_URL`同様、相対パス(`/asset-simulator/...`)で実装すること
  (絶対URLへのハードコードは不要。rewrites経由で解決される)

---

## 3. 確認・検証してほしいこと

- 本番デプロイ後、TOPページ(`https://www.freenough.com/`)のフッターに
  4つ(About含む)のリンクが表示され、それぞれ正しい遷移先に飛ぶことを
  確認すること
- モバイル表示でフッターのリンクが崩れていないか確認すること
  (Playwright/headless Chromiumはスクロールバー幅の差異があるため、
  右端の表示崩れ検知には不向き。可能であれば実ブラウザでの確認が望ましい)
- 「LifeCompass」「FIRE達成」の文言が変更ファイルに混入していないことを
  grepで確認すること

---

## 4. 触らないこと・スコープ外

- `/asset-simulator`側(lifecompass-next)のページ内容には一切触れないこと
- sitemap.ts・robots.ts・rewrites設定には触れないこと(別件で対応済み)
- ヘッダーナビ(シミュレーター/ブログ/ツール/Note)には触れないこと

---

## 5. 完了報告のフォーマット

1. 変更したコンポーネント名
2. 追加したリンクのラベル・遷移先URL一覧
3. 本番での表示・遷移確認結果(PC/モバイル両方)
4. grepチェック結果
