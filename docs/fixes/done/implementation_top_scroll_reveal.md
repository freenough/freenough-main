# 実装指示書：FREENOUGH TOPページへのスクロール表示演出（Reveal）の導入

作成日：2026-10-01
種別：**実装指示**（対象：`freenough-main`リポジトリ、`app/page.tsx`ほか）
前提：`lifecompass-next`（資産シミュレーターLP・一人法人LP）では、`Reveal`による同じ演出が本番反映・確認済み。今回はそれを**同じ見た目・同じ数値で、`freenough-main`に新規に導入する。**

---

## 0. 今回の内容

TOPページの各ブロックが、画面に入ったときに「透明から現れながら、下から少し上がる」演出を追加する。

- 強さ（`lifecompass-next`と同じ確定値）：**24px上から／0.9秒／同時に入った要素は0.12秒ずつ時間差**
- 動かすのは`opacity`と`transform: translateY`だけ。拡大・ぼかし・clipは使わない
- 各要素で**一度だけ**再生する
- 追加する依存ライブラリはなし
- 演出が終わった状態の見た目は、今と1pxも変えない

`freenough-main`は`lifecompass-next`と**別のリポジトリ**で、Next 16・React 19・Tailwind 4（`lifecompass-next`はNext 14・React 18）。そのため、`Reveal`は共有できず、**コピーして導入する**。

## 1. 作業上の絶対ルール

1. 最新の`main`から`feature/top-scroll-reveal`ブランチを作って作業する。
2. **第1段階はローカル確認・報告のみ。commit・pushはKENZOの明示的な指示があってから。**
3. セッション開始時に、`main`に無関係な未コミット変更が残っていたら、ファイル一覧を報告して確認を得るまで手を付けない。
4. `tsconfig.tsbuildinfo`など、ビルドで書き換わる追跡対象のファイルがあれば、元に戻す。
5. **`AGENTS.md`の指示に従う。** このリポジトリのNext.js 16は、従来の知識と異なる点がある。コードを書く前に、`node_modules/next/dist/docs/`の関連するガイド（レイアウト、`next/script`、Client Component、ハイドレーション）を読むこと。`lifecompass-next`（Next 14）で動いている実装と、挙動や書き方が異なる点があれば、完了報告に書く。
6. 推測で値を決めない。迷ったら実物の挙動を確認し、判断理由を完了報告に書く。
7. 気づいた点は、**修正せず報告だけ**にする。

## 2. スコープ

### 変更するファイル（この4つだけ）
- `app/components/Reveal.tsx`（新規。3節のコピー）
- `app/globals.css`（4節のCSSを追記）
- `app/layout.tsx`（5節のスクリプトを追加）
- `app/page.tsx`（6節の適用）

### 対象外（触らない）
- **Hero**（ラベル、見出し、説明文、2つのCTA）。`lifecompass-next`と同じく演出なし（最初に見える部分の表示を遅らせないため）。
- `Header.tsx`、`Footer.tsx`。
- `PILLARS`などのデータ、文言、画像、`PhraseText`、`SectionLabel`の中身。
- `/asset-simulator`、`/hitori-hojin`（`next.config.ts`の`rewrites`で`lifecompass-next`が配信している別アプリ）。
- 既知で対応不要としているTOPの本文フォント（Arial表示）、320px幅の横あふれ。今回は直さない。

---

## 3. `app/components/Reveal.tsx`（新規・内容は変更せずコピー）

`lifecompass-next`の`src/components/motion/Reveal.tsx`（`main`）と同一の内容。

```tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// スクロール表示演出（implementation_lp_scroll_reveal.md）。
// 初期の非表示・トランジションはglobals.cssの`.js-reveal .rv`で定義し、ここでは
// 画面に入った要素に`in`クラスを付けるだけにする（数値はCSS変数--rv-*で一元管理）。
// `js-reveal`クラスはlayout.tsxのインラインスクリプトがHTML解析中に<html>へ付与する。

type RevealTag = 'div' | 'li' | 'h2' | 'p';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}

declare global {
  interface Window {
    // layout.tsxの4秒保険スクリプトが参照する「Revealが動作開始した」目印
    __rvReady?: boolean;
  }
}

const MAX_STAGGER_STEPS = 4;

let sharedObserver: IntersectionObserver | null = null;

function show(el: Element) {
  el.classList.add('in');
}

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      const entered: HTMLElement[] = [];
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          entered.push(el);
        } else if (entry.boundingClientRect.bottom <= 0) {
          // 既に画面より上にある要素（ページ途中でのリロード等）は演出なしで即表示する
          el.style.transition = 'none';
          show(el);
          sharedObserver!.unobserve(el);
          void el.offsetHeight; // transition:noneのまま表示状態を確定させてから戻す
          el.style.transition = '';
        }
      }
      // 同じコールバックで同時に入った要素を、DOM順に並べて時間差を付ける
      entered.sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );
      entered.forEach((el, i) => {
        const step = Math.min(i, MAX_STAGGER_STEPS);
        el.style.transitionDelay = step > 0 ? `calc(var(--rv-stagger) * ${step})` : '';
        show(el);
        sharedObserver!.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  return sharedObserver;
}

export default function Reveal({ children, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    window.__rvReady = true;
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      show(el);
      return;
    }

    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className ? `rv ${className}` : 'rv'}>
      {children}
    </Tag>
  );
}
```

- Reactの型（React 19）やESLint（`eslint-config-next` 16）で、エラーや警告が出た場合は、**止めて報告する前に、`Reveal.tsx`の中だけで最小限の修正をしてよい**（`Reveal`の振る舞いは変えない）。修正した箇所と理由は、完了報告に書く。

## 4. `app/globals.css`（末尾に追記）

```css
/* TOPのスクロール表示演出（app/components/Reveal.tsx、implementation_top_scroll_reveal.md）。
   lifecompass-nextと同じ数値・同じ仕組み。初期の非表示は<html>にjs-revealクラスがあるときだけ
   適用する（layout.tsxのインラインスクリプトが付与。JS無効環境やハイドレーション失敗時は
   最初から表示されたままになる）。 */
:root {
  --rv-dist: 24px;
  --rv-dur: 0.9s;
  --rv-stagger: 0.12s;
}
.js-reveal .rv {
  transition: opacity var(--rv-dur) ease-out, transform var(--rv-dur) ease-out;
}
.js-reveal .rv:not(.in) {
  opacity: 0;
  transform: translateY(var(--rv-dist));
  will-change: opacity, transform;
}
@media (prefers-reduced-motion: reduce) {
  .rv,
  .js-reveal .rv,
  .js-reveal .rv:not(.in) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

既存の`:root`、`@theme inline`、`body`のルールは変更しない。

## 5. `app/layout.tsx`

`lifecompass-next`と同じ仕組みを入れる。

1. ファイル上部（`organizationJsonLd`の近く）に定数を追加：

```ts
const REVEAL_BOOT_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js-reveal');" +
  "setTimeout(function(){if(!window.__rvReady&&document.querySelector('.rv'))d.classList.remove('js-reveal');},4000);})();";
```

2. `<html>`に`suppressHydrationWarning`を追加する（既存の`lang`と`className`はそのまま）。
3. `<body>`の**先頭**（既存のJSON-LDの`<script>`より前）に、次を置く：

```tsx
<script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
```

目的の説明をコメントで残す：HTML解析中に`<html>`へ`js-reveal`を付けて初期表示のちらつきを防ぐ／JS無効・ハイドレーション失敗時は内容が非表示のまま残らない／4秒後に`.rv`があるのに`Reveal`が動作開始していなければ`js-reveal`を外す（`.rv`のないページでは外さない）。

既存のAdSense・GA4の`Script`、JSON-LDは変更しない。

## 6. `app/page.tsx`への適用

`import Reveal from "./components/Reveal";`を追加する（既存の`Header`・`Footer`のimportと同じ相対パス方式）。

| ブロック | 適用 |
|---|---|
| Hero | **なし** |
| MESSAGE | **帯の`<section>`ではなく、その中の本文のdiv**（`<div className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-zinc-700">`）を、**同じクラスの`<Reveal className="…">`に置き換える**。帯の背景（`box-shadow`と`clip-path`で画面幅いっぱいに広げている部分）は動かさない |
| SERVICESのラベル | `<SectionLabel className="mb-10">SERVICES</SectionLabel>`を、`<Reveal className="mb-10"><SectionLabel>SERVICES</SectionLabel></Reveal>`にする（下余白はRevealの側に移す） |
| 2本柱：左のテキスト列 | 各ブロックの左の`<div>`（番号、見出し、説明、CTAを含む列）を、`<Reveal>`に置き換える |
| 2本柱：右の図 | 各ブロックの右の`<div className={`mx-auto w-full max-w-[520px] ${pillar.cardClass}`}>`を、**同じクラスの`<Reveal className={...}>`に置き換える**（`Image`はそのまま中に残す） |

`.rv`の要素数は、ページ全体で**6個**になる想定（MESSAGE 1、SERVICESラベル 1、2本柱の左 2、右 2）。実装後に数え、数が違えば理由を報告する。

### 6-1. レイアウトが崩れやすい箇所（実装時に必ず確認）
1. **MESSAGEの帯**：`box-shadow: 0 0 0 100vmax`と`clip-path`で広げている背景が、変更前と同じ見た目であること。**横スクロールが発生していないこと**（初期の非表示状態、つまり、スクロール前の状態でも）。
2. **2本柱の`grid`**：800px以上の2カラム（`min-[800px]:grid-cols-2`）で、左右の上揃え（`items-start`）が変わらないこと。`Reveal`がグリッドの子になっても、図のカードの`max-w-[520px]`と中央寄せ（`mx-auto`）が変わらないこと。
3. **02の図のカード**：`aspect-[1040/850]`の箱の中で、画像の`object-contain`と上下中央の配置が変わらないこと。`Reveal`は、この箱と**同じ要素**（`className`を渡す）にする。
4. **01と02の間隔**：親の`space-y-10 sm:space-y-12`は、各ブロックの`div`に効いている。ブロック自体は`Reveal`にしないため、間隔は変わらないこと。
5. **sticky Header**：`Header`の`sticky top-0`の挙動に影響がないこと。
6. **最終的なレイアウトは1pxも変えない。**

---

## 7. 検証

375, 390, 768, 799, 800, 1024, 1280, 1366, 1440, 1920の各幅で確認する（799と800は、2本柱の切り替わりの境目）。

### 7-1. 見た目が変わっていないこと
- 「動きを減らす」設定をエミュレートした状態で、変更前（`main`）と変更後のスクリーンショットを比較し、**差分がないこと**（ページの高さも一致）。
- フルページのスクリーンショットは、スクロールしていない位置が非表示のまま写るため、必ずこの設定で撮る。

### 7-2. 演出の動き
- 6個の要素が、画面に入ったときに一度だけ現れる。往復スクロールで再生し直さない。
- 800px以上の2本柱で、左のテキスト列と右の図が、同時に入って時間差（0.12秒）で現れる。800px未満は、縦に並ぶため、別々に現れる。
- 最大の遅れ（遅延と演出時間の合計）が、約1.1秒以内であること。
- Heroは、変更前と同じく何も動かない。

### 7-3. 安全性
- **JS無効**：全6要素が表示されている。
- **「動きを減らす」設定**：DOMContentLoadedの時点から、全6要素が表示されている。
- **ハイドレーション後も`html`に`js-reveal`が残っている**（Next 16・React 19で、`suppressHydrationWarning`と組み合わせたときに、クラスが消えないこと。本番ビルドで確認）。
- 途中までスクロールしてリロードしても、内容が消えたままにならない。
- 全JSチャンクをブロックしてハイドレーションを失敗させ、約3.5秒では非表示、約5.5秒では`js-reveal`が外れて全要素が表示される。
- コンソールに、ハイドレーションの警告やエラーがない（開発モードと本番ビルドの両方）。

### 7-4. 他のルート
- `/robots.txt`、`/sitemap.xml`が、変更前と同じ内容であること。
- `/asset-simulator`、`/hitori-hojin`は、別アプリ（`lifecompass-next`）が配信するため、`freenough-main`のローカルでは確認できない。確認できる範囲だけ確認し、できなければ「できなかった」と書く。

### 7-5. ビルドとlint
- `npm run build`が通る。
- `npm run lint`が通る（新しい警告・エラーが増えていないこと。増えた場合は、内容を報告）。

---

## 8. 完了報告の形式

1. 変更したファイルの一覧（新規と既存を分ける）
2. `Reveal.tsx`を修正した場合は、その箇所と理由。Next 16のドキュメントを読んで分かった、`lifecompass-next`との違い
3. `.rv`の要素数（想定は6個）と、6-1の各項目をどう確認したか
4. 7の各項目の結果（7-1は、変更前後の差分がないことを示す）
5. `npm run build`と`npm run lint`の結果
6. 気づいた点があれば別枠で記載。修正はせず報告のみ

commit・pushは、KENZOの明示的な指示があってから行う。

---

## 9. 補足（KENZO向け・Claude Codeには関係なし）

- 確認は、デプロイ後に`https://www.freenough.com`（TOP）で行う。Previewは、`freenough-main`のVercel Previewを使う。
- 今回、TOPの2本柱の図は、静止画（スクリーンショット）。`lifecompass-next`と違い、図にだけ「左から開くように現れる」演出（clip）を足すこともできる。今回は、LPと同じ演出に揃えるため、入れていない。
- 動きの強さの値は、`freenough-main`の`globals.css`にある。`lifecompass-next`とは別なので、片方だけ変えると、サイト全体で強さが揃わなくなる。
