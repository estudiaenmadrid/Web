import Link from "next/link";
import type { Metadata } from "next";
import { AREAS } from "@/data/areas";
import { getAllPrograms, getProgramsByCategory } from "@/lib/content";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Programas",
  description:
    "Grados, másteres y convalidaciones en universidades privadas de Madrid, agrupados por área: Derecho, Administración, Ingeniería, Salud y Educación.",
};

export default function ProgramasPage() {
  const total = getAllPrograms().length;

  return (
    <>
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CATÁLOGO</div>
        <h1
          className="font-display font-black uppercase mt-3.5"
          style={{ fontSize: "clamp(44px,10vw,180px)", lineHeight: 0.86, letterSpacing: "-.045em" }}
        >
          Programas
        </h1>
        <p className="font-serif italic mt-4" style={{ maxWidth: "44ch", fontSize: "clamp(20px,2.4vw,34px)", lineHeight: 1.15 }}>
          {total} programas entre grados, másteres y convalidaciones, en cinco áreas.
        </p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] pt-8 sm:pt-11 md:pt-16">
        <div className="grid gap-px bg-hair border border-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
          {AREAS.map((area) => {
            const count = getProgramsByCategory(area.slug).length;
            return (
              <Reveal key={area.slug} className="bg-white">
                <Link
                  href={`/programas/${area.slug}`}
                  className="flex flex-col justify-between gap-6 p-6 sm:p-8 h-full hover:bg-off-white"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">{area.num} — ÁREA</span>
                    <span className="font-mono text-[11px] text-ink-soft">[{count}]</span>
                  </div>
                  <div>
                    <div
                      className="font-display font-black uppercase break-words"
                      style={{ fontSize: "clamp(22px,2.6vw,34px)", letterSpacing: "-.03em" }}
                    >
                      {area.name}
                    </div>
                    <p className="text-[14px] text-ink-soft mt-2">{area.intro}</p>
                  </div>
                  <span className="text-red-signal text-[18px]">↗</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
