import { Fragment } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const HITORI_HOJIN_URL = "/hitori-hojin";

// CTAボタンは資産シミュレーター・一人法人LPのCTA（lifecompass-next src/app/page.tsx L239等）と同じクラス。
// セカンダリ（アウトライン）はLP側に同種のボタンがないため、同じhover挙動に枠線を足したもの。
// 枠線1px×2の分だけpy-[15px]にして、プライマリと同じ高さ56pxにする。
// min-w-[19rem]（304px）は、文言の長い「一人法人という選択肢を見る →」（内容幅約295px）に合わせて
// 4つのボタンの幅を揃えるための最小幅。本文がそれより狭い幅（320px幅の本文288px）では本文幅を上限にする。
// セカンダリは文言と左右余白px-8だけで約294pxあり320px幅の本文288pxより広いため、360px未満だけpx-6にして本文幅に収める。
const PRIMARY_BUTTON_CLASS =
  "inline-block min-w-[min(19rem,100%)] rounded bg-[#334155] px-8 py-4 text-center text-base font-semibold text-white shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";
const SECONDARY_BUTTON_CLASS =
  "inline-block min-w-[min(19rem,100%)] rounded border border-[#334155] bg-transparent px-8 max-[359px]:px-6 py-[15px] text-center text-base font-semibold text-[#334155] shadow transition-all duration-150 ease-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg";

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
      height: 850,
      alt: "資産シミュレーターの画面例。FIRE達成・資産寿命・MC破綻率の3つの指標と、資産推移のチャート",
      // キャプチャ画像自体がHeroDemoのカード（白背景・border-slate-200・px-6 pt-6 pb-1）を含むため、
      // 角丸だけを付ける（影はTOPでは付けない）
      className: "h-auto w-full rounded",
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
      src: "/images/top/hitori-hojin-fork-cropped.png",
      width: 1040,
      // キャプチャ（1040×832）から、図の上の空白（170px）と下の空白の一部を切り落としたもの
      height: 639,
      alt: "会社員と完全リタイアを結ぶ線の途中から分かれた道の先に、一人法人がある図",
      // カードの中に縦横比を保って収め、余った高さは上下に均等に振り分ける（object-positionの既定＝中央）
      className: "h-full w-full object-contain",
    },
    // 白背景のPNGを、資産シミュレーター側の画像に写っているHeroDemoのカードと同じ見た目
    // （lifecompass-next HeroDemo.tsx L156：bg-white rounded border border-slate-200）で包む。
    // カードの縦横比は資産シミュレーター側の画像（1040×850）と同じにして、01と02のカードの大きさを揃える。
    // 余白は中の図を上下中央に置くため上下左右とも同じp-6（24px）にする。
    cardClass: "aspect-[1040/850] rounded border border-slate-200 bg-white p-6",
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
        {/* 外側コンテナはlifecompass-nextの--lp-container-width(72rem)に合わせる。
            左右の余白は800px未満でヘッダー・フッター（px-4）と同じ16px、800px以上は24px */}
        <div className="mx-auto w-full max-w-[72rem] px-4 min-[800px]:px-6">
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
                  15px以上の余りを残して2行になるように決めた値。
                  下限2.5rem（40px）は、最も長い塊「あなたにとっての」（文字サイズの約7.7倍＝309px）が
                  360px幅の本文（328px）に収まる大きさ。360px未満だけ下限を37pxに下げる（320px幅の本文288pxに
                  286pxで収まる、1px刻みで最大の大きさ）。下限は--h1-minで切り替える */}
              <h1
                className="mt-4 text-balance font-bold leading-tight tracking-tight text-black [--h1-min:2.5rem] max-[359px]:[--h1-min:37px]"
                style={{ fontSize: "clamp(var(--h1-min), 6.6cqi, 4.5rem)" }}
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
              SERVICESと同じ左揃え。本文は読みやすい行長（1行42字前後）に収めるためmax-w-2xlのまま。
              -mx-*とpx-*は外側コンテナの左右余白（800px未満16px・以上24px）と同じ値で相殺して付け直す */}
          <section className="-mx-4 bg-slate-50 px-4 py-9 min-[800px]:-mx-6 min-[800px]:px-6 shadow-[0_0_0_100vmax_var(--color-slate-50)] [clip-path:inset(0_-100vmax)]">
            <Reveal className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-zinc-700">
              <SectionLabel>MESSAGE</SectionLabel>
              {/* 2本柱の説明文と同じく、文節ごとの<wbr />＋keep-allで文節の区切りでだけ折り返す */}
              {MESSAGE_PARAGRAPHS.map((phrases, i) => (
                <p key={i} className="[line-break:strict] [word-break:keep-all] [overflow-wrap:anywhere]">
                  <PhraseText phrases={phrases} />
                </p>
              ))}
            </Reveal>
          </section>

          {/* 2本柱：縦に2ブロック積み、各ブロックは左テキスト・右図。800px未満は1列で、DOM順どおり
              テキスト→図の順に並ぶ（読み上げ順とも一致）。800px以上は1：1で、テキストと図はどちらも上揃え。
              800px以上の見出し→説明文・説明文→CTAの間隔は、01・02とも同じ48px（mt-12）の固定値。
              ラベル下の余白はLPのSectionHeading全体の下余白（mb-10）と同じ */}
          <section className="py-16">
            <Reveal className="mb-10">
              <SectionLabel>SERVICES</SectionLabel>
            </Reveal>
            <div className="space-y-10 sm:space-y-12">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.no}
                className="grid items-start gap-8 min-[800px]:grid-cols-2 min-[800px]:gap-12"
              >
                <Reveal>
                  <div>
                    <p
                      className="font-bold leading-none tracking-tight text-black"
                      style={{ fontSize: "clamp(30px, 4vw, 40px)" }}
                    >
                      {pillar.no}
                    </p>
                    {/* 01/02の数字（clamp(30px, 4vw, 40px)）より常に一回り大きくし、数字に埋もれないようにする */}
                    <h2 className="mt-3 text-[2rem] font-bold text-black sm:text-4xl lg:text-5xl">{pillar.title}</h2>
                  </div>
                  {/* 文節ごとに<wbr />を入れ、keep-allでその位置だけで折り返させる（一人法人LPのPhraseBreakと同じ方式。
                      overflow-wrap:anywhereは長すぎる文節の保険） */}
                  <p className="mt-4 min-[800px]:mt-12 text-base leading-relaxed text-zinc-700 [line-break:strict] [word-break:keep-all] [overflow-wrap:anywhere]">
                    <PhraseText phrases={pillar.lead} />
                    <br />
                    <PhraseText phrases={pillar.body} />
                  </p>
                  <a href={pillar.href} className={`mt-6 min-[800px]:mt-12 ${pillar.ctaClass}`}>
                    {pillar.cta}
                  </a>
                </Reveal>
                <Reveal className={`mx-auto w-full max-w-[520px] ${pillar.cardClass}`}>
                  <Image
                    src={pillar.image.src}
                    width={pillar.image.width}
                    height={pillar.image.height}
                    alt={pillar.image.alt}
                    className={pillar.image.className}
                  />
                </Reveal>
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
