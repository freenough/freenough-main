"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

const ASSET_SIMULATOR_URL = "/asset-simulator";
const BLOG_URL = "/asset-simulator/blog";
const TOOLS_URL = "/asset-simulator/tools";
const NOTE_URL = "https://note.com/freenough";

const NAV_ITEMS = [
  { label: "シミュレーター", href: ASSET_SIMULATOR_URL },
  { label: "ブログ", href: BLOG_URL },
  { label: "ツール", href: TOOLS_URL },
  { label: "Note", href: NOTE_URL, external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 w-full border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight text-black">
            FRE
            <span className="underline decoration-2 underline-offset-4 decoration-[#3F9C6D]">
              E
            </span>
            NOUGH
          </span>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-black lg:hidden"
          >
            {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        <nav
          className="overflow-hidden transition-[max-height] duration-[0.22s] ease-[cubic-bezier(.4,0,.2,1)] lg:hidden"
          style={{ maxHeight: menuOpen ? "16rem" : "0" }}
        >
          <div className="flex flex-col gap-1 px-4 pb-3 text-sm font-medium text-zinc-600">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="rounded px-2 py-2 hover:bg-black/5 hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
