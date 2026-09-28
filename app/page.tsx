import Image from "next/image";
import { IconBuilding } from "@tabler/icons-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const HITORI_HOJIN_URL = "/hitori-hojin";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Header />

      <main className="flex flex-col items-center">
        {/* 外側コンテナはlifecompass-nextの--lp-container-width(72rem)に合わせる */}
        <div className="mx-auto w-full max-w-[72rem] px-6">
          <section className="py-16 text-center">
            <div className="mx-auto max-w-5xl">
              <p className="font-mono text-xs tracking-widest text-zinc-500 sm:text-sm">
                FRE<span className="text-[#3F9C6D]">E</span> + <span className="text-[#3F9C6D]">E</span>NOUGH.
              </p>
              {/* 2つのnowrap塊の間でだけ改行させる。幅が足りれば2行、足りなければ
                  「あなたにとっての」／「「足りる」を、」／「数字で描く。」の3行になる */}
              <h1
                className="mt-4 text-balance font-bold leading-tight tracking-tight text-black"
                style={{ fontSize: "clamp(2.25rem, 8vw, 3.75rem)" }}
              >
                <span className="whitespace-nowrap">あなたにとっての</span><span className="whitespace-nowrap">「足りる」を、</span>
                <br />
                数字で描く。
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                <span className="whitespace-nowrap">将来のお金と働き方を、</span><span className="whitespace-nowrap">シミュレーションで確かめる場所。</span>
              </p>
              {/* 両ボタンともpy-[15px]＋枠線1px×2で、2本柱ブロックのボタン（py-4・枠線なし）と同じ高さ56pxにする */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={ASSET_SIMULATOR_URL}
                  className="inline-block rounded-lg border border-[#334155] bg-[#334155] px-8 py-[15px] text-base font-semibold text-white shadow transition-colors whitespace-nowrap hover:bg-[#293548]"
                >
                  資産シミュレーターを見る →
                </a>
                <a
                  href={HITORI_HOJIN_URL}
                  className="inline-block rounded-lg border border-[#334155] bg-transparent px-8 py-[15px] text-base font-semibold text-[#334155] transition-colors whitespace-nowrap hover:bg-[#334155]/5"
                >
                  一人法人という選択肢を見る →
                </a>
              </div>
            </div>
          </section>

          {/* <br>は640px未満で無効化し自然な折り返しに任せる。break-keepで語の途中での改行を防ぐ。
              帯の背景はbox-shadowで画面幅いっぱいに広げ、clip-pathで上下のはみ出しだけ切る
              （w-screen=100vwはWindowsのスクロールバー幅を含み横スクロールを生むため使わない） */}
          <section className="-mx-6 bg-slate-50 px-6 py-9 shadow-[0_0_0_100vmax_var(--color-slate-50)] [clip-path:inset(0_-100vmax)]">
            <div className="mx-auto flex max-w-2xl flex-col gap-4 break-keep text-base leading-relaxed text-zinc-700">
              <p className="text-left sm:text-center">
                人生に必要なお金も、理想の働き方も、<span className="whitespace-nowrap">人それぞれです。</span>
              </p>
              <p className="text-left sm:text-center">
                大切なのは、誰かの正解を追いかけることではなく、
                <br className="max-sm:hidden" />
                自分にとって<span className="whitespace-nowrap">「足りる(Enough)」を知ること。</span>
              </p>
              <p className="text-left sm:text-center">
                Freenoughは、その「足りる」を、
                <br className="max-sm:hidden" />
                体験談ではなく、数字で描く場所です。
              </p>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src="/images/compass_logo.png"
                    alt="資産シミュレーター"
                    width={72}
                    height={72}
                  />
                  <span className="text-2xl font-semibold text-black">
                    資産シミュレーター
                  </span>
                </div>
                <p className="mt-3 text-base text-zinc-600">
                  あなたの「足りる」を、数字で確かめる。
                </p>
                <a
                  href={ASSET_SIMULATOR_URL}
                  className="mt-5 inline-block rounded-lg bg-[#334155] px-8 py-4 text-base font-semibold text-white shadow transition-colors whitespace-nowrap hover:bg-[#293548]"
                >
                  資産シミュレーターを見る →
                </a>
              </div>

              {/* アイコン・コピーは仮置き（instruction_freenough_hierarchy_navigation.md
                  スコープ外、最終デザインは別途詰める） */}
              <div>
                <div className="flex items-center justify-center gap-4">
                  <IconBuilding size={72} className="text-[#334155]" stroke={1.5} />
                  <span className="text-2xl font-semibold text-black">
                    一人法人
                  </span>
                </div>
                <p className="mt-3 text-base text-zinc-600">
                  完全リタイアだけがFIREじゃない。
                </p>
                <a
                  href={HITORI_HOJIN_URL}
                  className="mt-5 inline-block rounded-lg bg-[#334155] px-8 py-4 text-base font-semibold text-white shadow transition-colors whitespace-nowrap hover:bg-[#293548]"
                >
                  一人法人という選択肢を見る →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
