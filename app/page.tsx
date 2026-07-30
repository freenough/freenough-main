import Image from "next/image";
import Header from "./components/Header";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const ABOUT_URL = "/asset-simulator/about";
const X_URL = "https://x.com/freenough";
const NOTE_URL = "https://note.com/freenough";

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
            <div className="mx-auto max-w-3xl text-center">
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
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-black/5 bg-slate-50 py-8">
        <nav className="flex items-center justify-center gap-6 text-sm text-zinc-600">
          <a href={ABOUT_URL} className="hover:text-black">
            About
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            X
          </a>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            Note
          </a>
        </nav>
        <p className="mt-3 text-center text-xs text-zinc-500">
          © 2026 FREENOUGH — Design Your Enough.
        </p>
      </footer>
    </div>
  );
}
