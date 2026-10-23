"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Guide } from "@/lib/guides";

export default function GuideFilter({ guides, categories }: { guides: Guide[]; categories: string[] }) {
  const [active, setActive] = useState<string>("TODAS");

  const visible = active === "TODAS" ? guides : guides.filter((g) => g.category === active);
  const tabs = [{ key: "TODAS", label: "Todas", count: guides.length }].concat(
    categories.map((cat) => ({ key: cat, label: cat, count: guides.filter((g) => g.category === cat).length }))
  );

  return (
    <>
      <div className="eem-noscrollbar flex overflow-x-auto md:flex-wrap mt-8 sm:mt-10 md:mt-14 border-y border-hair" role="tablist" aria-label="Filtrar guías por tema">
        {tabs.map((tab) => {
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.key)}
              className={`relative shrink-0 whitespace-nowrap flex items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase hover:bg-white ${
                selected ? "text-ink" : "text-ink-soft"
              }`}
            >
              {selected && <span className="w-1.5 h-1.5 bg-red-signal block" />}
              {tab.label} <span className="font-mono text-[10px] text-red-signal">[{tab.count}]</span>
              {selected && <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-red-signal" />}
            </button>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-9 md:mt-12 border-b border-hair">
        {visible.map((g, i) => (
          <Reveal key={g.slug} delay={Math.min(i * 0.04, 0.2)}>
            <Link
              href={`/guias/${g.slug}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[56px_minmax(0,1.45fr)_minmax(0,1fr)_40px] gap-x-5 md:gap-x-8 gap-y-3 items-baseline py-6 sm:py-8 md:py-9 border-t border-hair text-ink"
            >
              <span className="hidden md:block font-mono text-[11px] tracking-[.12em] text-red-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="md:hidden block font-mono text-[10px] tracking-[.14em] text-red-signal uppercase mb-2">
                  {g.category}
                </span>
                <span
                  className="block font-display font-extrabold transition-colors duration-300 group-hover:text-red-signal"
                  style={{ fontSize: "clamp(22px,2.5vw,38px)", lineHeight: 1.06, letterSpacing: "-.03em" }}
                >
                  {g.title}
                </span>
              </span>
              <span className="col-span-2 md:col-span-1 min-w-0">
                <span className="hidden md:block font-mono text-[10px] tracking-[.14em] text-red-signal uppercase mb-2">
                  {g.category}
                </span>
                {g.summary && <span className="block text-[14px] sm:text-[15px] leading-[1.55] text-ink-soft">{g.summary}</span>}
              </span>
              <span
                aria-hidden="true"
                className="row-start-1 col-start-2 md:row-auto md:col-auto justify-self-end text-red-signal text-[20px] md:text-[26px] leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
