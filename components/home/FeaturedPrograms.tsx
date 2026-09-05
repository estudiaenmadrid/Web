"use client";

import { useState } from "react";
import Link from "next/link";
import { usePixelTrail } from "@/hooks/usePixelTrail";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { Program } from "@/lib/content";
import { displayUniversity } from "@/lib/programFormat";

interface FeaturedProgramsProps {
  programs: Program[];
}

export default function FeaturedPrograms({ programs }: FeaturedProgramsProps) {
  const [active, setActive] = useState(0);
  const { onMouseMove } = usePixelTrail();

  return (
    <div
      className="grid gap-5 md:gap-16 items-start mt-6 md:mt-11"
      style={{ gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)" }}
    >
      <div>
        {programs.map((p, i) => (
          <Link
            key={p.programSlug}
            href={`/programas/${p.categorySlug}/${p.programSlug}`}
            onMouseEnter={() => setActive(i)}
            onMouseMove={onMouseMove}
            className="relative overflow-hidden grid gap-3 md:gap-7 items-baseline py-5 md:py-8 border-b border-hair text-ink hover:bg-white"
            style={{ gridTemplateColumns: "auto 1fr auto" }}
          >
            <span className="font-mono text-[12px] text-red-signal">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span
                className="font-serif italic block"
                style={{ fontSize: "clamp(22px,3.6vw,56px)", lineHeight: 1.02 }}
              >
                {p.title}
              </span>
              <span className="font-display font-extrabold text-[13px] tracking-[.08em] uppercase text-ink-soft">
                {displayUniversity(p.university)}
              </span>
            </span>
            <span className="flex flex-wrap gap-1.5 justify-end">
              <em className="not-italic font-mono text-[10px] tracking-[.1em] border border-hair px-2 py-1">
                {p.level}
              </em>
            </span>
          </Link>
        ))}
      </div>

      <div className="md:sticky md:top-24">
        <div className="relative aspect-[4/5] bg-hair">
          {programs.map((p, i) => (
            <div
              key={p.programSlug}
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0, filter: "grayscale(1) contrast(1.06)" }}
            >
              <PlaceholderImage label={`Campus ${displayUniversity(p.university)}`} className="w-full h-full" />
            </div>
          ))}
          <div className="absolute -right-3.5 -top-3.5 rounded-full bg-red-signal" style={{ width: "clamp(56px,7vw,104px)", height: "clamp(56px,7vw,104px)" }} />
        </div>
        <p className="text-[13px] text-ink-soft mt-3.5">
          Pasa el cursor por cada programa para ver el campus. Cada ficha incluye plan de estudios, reconocimiento de
          créditos y ruta de visado.
        </p>
        <Link
          href="/programas"
          onMouseMove={onMouseMove}
          className="relative overflow-hidden flex justify-between items-center gap-3.5 mt-4 bg-ink text-off-white px-[18px] py-4 font-display font-extrabold text-[13px] tracking-[.06em] uppercase"
        >
          Ver todos los programas <span className="text-red-signal text-[17px]">↗</span>
        </Link>
      </div>
    </div>
  );
}
