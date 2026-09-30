"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const HITORI_HOJIN_URL = "/hitori-hojin";

// ブログ・ツール・Noteはフッターに導線があるため、ヘッダーは2本柱のみ（implementation_top_hero_refresh.md 3.2）
const NAV_ITEMS = [
  { label: "資産シミュレーター", href: ASSET_SIMULATOR_URL },
  { label: "一人法人", href: HITORI_HOJIN_URL },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* sticky・半透明背景・境界線はlifecompass-nextのHeader.tsx（L69）と同じクラス */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        {/* 幅・padding・ロゴの太さ／字間／色は、lifecompass-nextのHeader.tsx（max-w-7xl px-4、
            logoClassName）とHeaderLogo.tsx（FREENOUGH部分：text-[1.2em] font-extrabold）と同じ値。
            ロゴの大きさだけは、LPが640px未満で小さくする（text-xs）のは横にセクション名が並ぶためで、
            ロゴ単体のTOPでは全幅でsm以上と同じtext-lg（×1.2em＝21.6px）に固定する */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center whitespace-nowrap text-lg text-slate-800 tracking-tight">
            <span className="text-[1.2em] font-extrabold">
              FRE
              <span className="underline decoration-2 underline-offset-4 decoration-[#3F9C6D]">E</span>
              NOUGH
            </span>
          </a>

          {/* 文字サイズ・色・hover・transitionはlifecompass-nextのHeader.tsx（L75・L86）と同じクラス。
              LP側のmr-2は右隣の検索ボタンとの間隔のため、検索ボタンのないTOPでは付けない */}
          <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ハンバーガーボタン・ドロップダウン・背景オーバーレイは、lifecompass-nextのHeader.tsx
              （L107-114、L119-157、L164-170）と同じクラス・同じ開閉方式。ドロップダウンはヘッダー下に
              absoluteで重ねて表示し、ページ本体は押し下げない */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        <div
          className={`lg:hidden absolute inset-x-0 top-full overflow-hidden border-b border-slate-200 bg-white transition-[max-height] duration-[220ms] ease-[cubic-bezier(.4,0,.2,1)] ${
            menuOpen ? "max-h-72" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-slate-100 py-3 text-sm text-slate-600 last:border-b-0 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* headerはz-50でスタッキングコンテキストを作るため、header配下のドロップダウンは
          常にこのオーバーレイ（z-40）より上に描画される */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
