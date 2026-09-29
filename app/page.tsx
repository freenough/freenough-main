import { Fragment } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const HITORI_HOJIN_URL = "/hitori-hojin";

// CTAボタンは資産シミュレーター・一人法人LPのCTA（lifecompass-next src/app/page.tsx L239等）と同じクラス。
// セカンダリ（アウトライン）はLP側に同種のボタンがないため、同じhover挙動に枠線を足したもの。
// 枠線1px×2の分だけpy-[15px]にして、プライマリと同じ高さ56pxにする。
const PRIMARY_BUTTON_CLASS =
  "inline-block rounded bg-[#334155] px-8 py-4 text-base font-semibold text-white shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";
const SECONDARY_BUTTON_CLASS =
  "inline-block rounded border border-[#334155] bg-transparent px-8 py-[15px] text-base font-semibold text-[#334155] shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";

// 2本柱ブロックの右側の図は、lifecompass-nextのLPに実際に描画されたHeroDemo・HitoriHojinForkDiagramを
// 2倍解像度でキャプチャした静止画（別リポジトリのためコンポーネントは共有できない）。
// LP側の見た目・数値が変わった場合は撮り直す。
const PILLARS = [
  {
    no: "01",
    title: "資産シミュレーター",
    lead: ["あなたの", "「足りる」を、", "数字で", "確かめる。"],
    body: ["将来の", "資産推移を、", "FIRE達成・", "資産寿命・", "モンテカルロ破綻率まで", "含めて", "シミュレーションできます。"],
    cta: "資産シミュレーターを見る →",
    ctaClass: PRIMARY_BUTTON_CLASS,
    href: ASSET_SIMULATOR_URL,
    image: {
      src: "/images/top/hero-demo.png",
      width: 1040,
      height: 849,
      alt: "資産シミュレーターの画面例。FIRE達成・資産寿命・MC破綻率の3つの指標と、資産推移のチャート",
      // キャプチャ画像自体がHeroDemoのカード（白背景・border-slate-200・px-6 pt-6 pb-1）を含むため、
      // 角丸だけを付ける（影はTOPでは付けない）
      className: "rounded",
    },
    cardClass: "",
  },
  {
    no: "02",
    title: "一人法人",
    lead: ["完全リタイアだけが", "FIREじゃない。"],
    body: ["会社員と", "完全リタイアの", "間にある", "一人法人という", "選択肢を、", "税金や", "社会保険、", "法人と", "個人の", "お金の", "分け方まで", "含めて、", "FIREの", "視点から", "整理します。"],
    cta: "一人法人という選択肢を見る →",
    // Heroの同じボタンと同じセカンダリ（白抜き）
    ctaClass: SECONDARY_BUTTON_CLASS,
    href: HITORI_HOJIN_URL,
    image: {
      src: "/images/top/hitori-hojin-fork.png",
      width: 1040,
      height: 832,
      alt: "会社員と完全リタイアを結ぶ線の途中から分かれた道の先に、一人法人がある図",
      className: "",
    },
    // 透過PNGを、資産シミュレーター側の画像に写っているHeroDemoのカードと同じ値
    // （lifecompass-next HeroDemo.tsx L156：bg-white rounded border border-slate-200 px-6 pt-6 pb-1）で包む
    cardClass: "rounded border border-slate-200 bg-white px-6 pt-6 pb-1",
  },
];

const MESSAGE_PARAGRAPHS = [
  ["人生に", "必要な", "お金も、", "理想の", "働き方も、", "人それぞれです。", "大切なのは、", "誰かの", "正解を", "追いかける", "ことではなく、", "自分にとって", "「足りる(Enough)」を", "知ること。"],
  ["Freenoughは、", "その", "「足りる」を、", "体験談ではなく、", "数字で", "描く", "場所です。"],
];

function PhraseText({ phrases }: { phrases: string[] }) {
  return phrases.map((phrase, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {phrase}
    </Fragment>
  ));
}

// セクションのラベル（線＋テキスト）。書式はlifecompass-nextのSectionHeading.tsx（L39-43）・
// SectionRule.tsx（L8）と同じで、色だけTOP用に線・テキストともロゴ下線と同じ緑にしている（試験的）。
function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-0.5 w-6 bg-[#3F9C6D]" aria-hidden="true" />
      <span className="text-sm font-medium text-[#3F9C6D]">{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Header />

      <main className="flex flex-col items-center">
        {/* 外側コンテナはlifecompass-nextの--lp-container-width(72rem)に合わせる */}
        <div className="mx-auto w-full max-w-[72rem] px-6">
          <section className="pt-28 pb-16 text-center">
            {/* 見出しの文字サイズをこの要素の幅（cqi）基準にするためのコンテナ。vwはスクロールバーを含む
                画面幅で決まり、スクロールバーが幅を取る環境で本文幅とずれるため使わない */}
            <div className="@container">
              <p className="font-mono text-xs tracking-widest text-zinc-500 sm:text-sm">
                FRE<span className="text-[#3F9C6D]">E</span> + <span className="text-[#3F9C6D]">E</span>NOUGH.
              </p>
              {/* 2つのnowrap塊の間でだけ改行させる。幅が足りれば2行、足りなければ
                  「あなたにとっての」／「「足りる」を、」／「数字で描く。」の3行になる。
                  上限4.5rem（72px）は、1440px幅で1行目が本文コンテナ（1152px）の90%以上になる大きさ。
                  中央値6.6cqiは、1行目（文字サイズの約14.6倍の幅）がコンテナ幅の約96.5%に収まり、
                  15px以上の余りを残して2行になるように決めた値 */}
              <h1
                className="mt-4 text-balance font-bold leading-tight tracking-tight text-black"
                style={{ fontSize: "clamp(2.25rem, 6.6cqi, 4.5rem)" }}
              >
                <span className="whitespace-nowrap">あなたにとっての</span><span className="whitespace-nowrap">「足りる」を、</span>
                <br />
                数字で描く。
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                <span className="whitespace-nowrap">将来のお金と働き方を、</span><span className="whitespace-nowrap">シミュレーションで確かめる場所。</span>
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={ASSET_SIMULATOR_URL} className={PRIMARY_BUTTON_CLASS}>
                  資産シミュレーターを見る →
                </a>
                <a href={HITORI_HOJIN_URL} className={SECONDARY_BUTTON_CLASS}>
                  一人法人という選択肢を見る →
                </a>
              </div>
            </div>
          </section>

          {/* 帯の背景はbox-shadowで画面幅いっぱいに広げ、clip-pathで上下のはみ出しだけ切る
              （w-screen=100vwはWindowsのスクロールバー幅を含み横スクロールを生むため使わない）。
              SERVICESと同じ左揃え。本文は読みやすい行長（1行42字前後）に収めるためmax-w-2xlのまま */}
          <section className="-mx-6 bg-slate-50 px-6 py-9 shadow-[0_0_0_100vmax_var(--color-slate-50)] [clip-path:inset(0_-100vmax)]">
            <div className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-zinc-700">
              <SectionLabel>MESSAGE</SectionLabel>
              {/* 2本柱の説明文と同じく、文節ごとの<wbr />＋keep-allで文節の区切りでだけ折り返す */}
              {MESSAGE_PARAGRAPHS.map((phrases, i) => (
                <p key={i} className="[line-break:strict] [word-break:keep-all] [overflow-wrap:anywhere]">
                  <PhraseText phrases={phrases} />
                </p>
              ))}
            </div>
          </section>

          {/* 2本柱：縦に2ブロック積み、各ブロックは左テキスト・右図。800px未満は1列で図をテキストの上に置く。
              ラベル下の余白はLPのSectionHeading全体の下余白（mb-10）と同じ */}
          <section className="py-16">
            <SectionLabel className="mb-10">SERVICES</SectionLabel>
            <div className="space-y-16 sm:space-y-20">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.no}
                className="grid items-center gap-8 min-[800px]:grid-cols-2 min-[800px]:gap-12"
              >
                <div className="order-2 min-[800px]:order-1">
                  <p
                    className="font-bold leading-none tracking-tight text-black"
                    style={{ fontSize: "clamp(30px, 4vw, 40px)" }}
                  >
                    {pillar.no}
                  </p>
                  {/* 01/02の数字（clamp(30px, 4vw, 40px)）より常に一回り大きくし、数字に埋もれないようにする */}
                  <h2 className="mt-3 text-[2rem] font-bold text-black sm:text-4xl lg:text-5xl">{pillar.title}</h2>
                  {/* 文節ごとに<wbr />を入れ、keep-allでその位置だけで折り返させる（一人法人LPのPhraseBreakと同じ方式。
                      overflow-wrap:anywhereは長すぎる文節の保険） */}
                  <p className="mt-4 text-base leading-relaxed text-zinc-700 [line-break:strict] [word-break:keep-all] [overflow-wrap:anywhere]">
                    <PhraseText phrases={pillar.lead} />
                    <br />
                    <PhraseText phrases={pillar.body} />
                  </p>
                  <a href={pillar.href} className={`mt-6 ${pillar.ctaClass}`}>
                    {pillar.cta}
                  </a>
                </div>
                <div className={`order-1 mx-auto w-full max-w-[520px] min-[800px]:order-2 ${pillar.cardClass}`}>
                  <Image
                    src={pillar.image.src}
                    width={pillar.image.width}
                    height={pillar.image.height}
                    alt={pillar.image.alt}
                    className={`h-auto w-full ${pillar.image.className}`}
                  />
                </div>
              </div>
            ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
