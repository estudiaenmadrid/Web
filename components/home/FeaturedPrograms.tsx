"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePixelTrail } from "@/hooks/usePixelTrail";

export interface FeaturedItem {
  href: string;
  title: string;
  universityLabel: string;
  level: string;
  /** Server-rendered preview (official photo or TypePlate) shown in the sticky panel on hover. */
  preview: ReactNode;
}

function AllProgramsLink({ onMouseMove, className }: { onMouseMove: (e: React.MouseEvent<HTMLElement>) => void; className?: string }) {
  return (
    <Link
      href="/programas"
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden flex justify-between items-center gap-3.5 bg-ink text-off-white px-[18px] py-4 font-display font-extrabold text-[13px] tracking-[.06em] uppercase ${className ?? ""}`}
    >
      Ver todos los programas <span className="text-red-signal text-[17px]">↗</span>
    </Link>
  );
}

export default function FeaturedPrograms({ items }: { items: FeaturedItem[] }) {
  const [active, setActive] = useState(0);
  const { onMouseMove } = usePixelTrail();

  return (
    <div className="grid gap-5 md:gap-16 items-start mt-6 md:mt-11 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div>
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onMouseMove={onMouseMove}
            className="relative overflow-hidden grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-2 md:gap-x-7 items-baseline py-5 md:py-8 border-b border-hair text-ink hover:bg-white"
          >
            <span className="font-mono text-[12px] text-red-signal">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="font-serif italic block" style={{ fontSize: "clamp(24px,3.6vw,56px)", lineHeight: 1.02 }}>
                {item.title}
              </span>
              <span className="block mt-1.5 font-display font-extrabold text-[12px] sm:text-[13px] tracking-[.08em] uppercase text-ink-soft">
                {item.universityLabel}
              </span>
            </span>
            <span className="col-start-2 sm:col-start-auto flex">
              <em className="not-italic font-mono text-[10px] tracking-[.1em] border border-hair px-2 py-1">{item.level}</em>
            </span>
          </Link>
        ))}
        <AllProgramsLink onMouseMove={onMouseMove} className="mt-5 md:hidden" />
      </div>

      <div className="hidden md:block md:sticky md:top-24">
        <div className="relative aspect-[4/5] bg-ink">
          {items.map((item, i) => (
            <div
              key={item.href}
              aria-hidden={active !== i}
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0 }}
            >
              {item.preview}
            </div>
          ))}
          <div
            className="absolute -right-3.5 -top-3.5 rounded-full bg-red-signal"
            style={{ width: "clamp(56px,7vw,104px)", height: "clamp(56px,7vw,104px)" }}
          />
        </div>
        <p className="text-[13px] text-ink-soft mt-3.5">
          Cada ficha incluye plan de estudios, reconocimiento de créditos y ruta de visado.
        </p>
        <AllProgramsLink onMouseMove={onMouseMove} className="mt-4" />
      </div>
    </div>
  );
}
