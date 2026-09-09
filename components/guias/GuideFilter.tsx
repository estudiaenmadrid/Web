"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Guide } from "@/lib/guides";

export default function GuideFilter({ guides, categories }: { guides: Guide[]; categories: string[] }) {
  const [active, setActive] = useState<string>("TODAS");

  const visible = active === "TODAS" ? guides : guides.filter((g) => g.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-0 mt-6 sm:mt-9 md:mt-12 border-y border-hair">
        <button
          type="button"
          onClick={() => setActive("TODAS")}
          className="flex items-center gap-2 px-5 py-4 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase"
          style={{ color: active === "TODAS" ? "var(--red-signal)" : undefined }}
        >
          TODAS <span className="font-mono text-[10px] text-red-signal">[{guides.length}]</span>
        </button>
        {categories.map((cat) => {
          const count = guides.filter((g) => g.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className="flex items-center gap-2 px-5 py-4 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase text-ink-soft"
              style={{ color: active === cat ? "var(--red-signal)" : undefined }}
            >
              {cat.toUpperCase()} <span className="font-mono text-[10px] text-red-signal">[{count}]</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-px bg-hair border border-hair mt-9 sm:mt-12 md:mt-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        {visible.map((g, i) => (
          <Reveal key={g.slug} delay={Math.min(i * 0.05, 0.2)} className="bg-white">
            <Link href={`/guias/${g.slug}`} className="flex flex-col justify-between gap-6 p-6 sm:p-8 h-full text-ink hover:bg-off-white" style={{ minHeight: "260px" }}>
              <span className="font-mono text-[10px] tracking-[.14em] text-red-signal uppercase">{g.category}</span>
              <span>
                <span
                  className="font-display font-black uppercase block"
                  style={{ fontSize: "clamp(20px,2.2vw,30px)", lineHeight: 1.05, letterSpacing: "-.03em" }}
                >
                  {g.title}
                </span>
                {g.summary && <span className="text-[13px] text-ink-soft mt-2.5 block leading-[1.5]">{g.summary}</span>}
              </span>
              <span className="text-red-signal text-[18px]">↗</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
