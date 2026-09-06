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
        <div className="mx-auto w-full max-w-7xl px-6">
          <section className="py-16 text-center">
            <div className="mx-auto max-w-5xl">
              <h1
                className="text-balance font-bold leading-tight tracking-tight text-black"
                style={{ fontSize: "clamp(2.25rem, 8vw, 3.75rem)" }}
              >
                あなたにとっての「足りる」を、
                <br />
                数字で描く。
              </h1>
            </div>
          </section>

          <section className="-mx-6 bg-slate-50 px-6 py-12">
            <div className="mx-auto flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-zinc-700">
              <p className="text-left sm:text-center">
                人生に必要なお金も、理想の働き方も、人それぞれです。
              </p>
              <p className="text-left sm:text-center">
                大切なのは、誰かの正解を追いかけることではなく、
                <br />
                自分にとって「足りる(Enough)」を知ること。
              </p>
              <p className="text-left sm:text-center">
                Freenoughは、その「足りる」を、
                <br />
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
