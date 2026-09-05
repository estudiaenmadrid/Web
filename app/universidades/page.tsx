import type { Metadata } from "next";
import { countProgramsForUniversity, getPartnerUniversities } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Universidades",
  description: "Universidades privadas españolas con convenio directo con Estudia en Madrid.",
};

export default function UniversidadesPage() {
  const universities = getPartnerUniversities();

  return (
    <>
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CONVENIOS DIRECTOS</div>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(38px,8vw,132px)", lineHeight: 0.88, letterSpacing: "-.045em" }}
        >
          Universidades
        </h1>
        <p className="font-serif italic mt-4" style={{ maxWidth: "44ch", fontSize: "clamp(20px,2.2vw,30px)" }}>
          Trabajamos directo con admisiones, no con intermediarios.
        </p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px]">
        <div className="grid gap-px bg-hair border border-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          {universities.map((u) => {
            const count = countProgramsForUniversity(u);
            return (
              <Reveal key={u} className="bg-white">
                <div className="flex flex-col gap-4.5 p-6 sm:p-8 h-full">
                  <PlaceholderImage label={`Logo ${u}`} grayscale={false} className="h-16 w-full" />
                  <div>
                    <div className="font-display font-extrabold uppercase text-[19px]" style={{ letterSpacing: "-.01em" }}>
                      {u}
                    </div>
                    <div className="font-mono text-[11px] tracking-[.12em] text-red-signal mt-1.5">
                      {count} PROGRAMA{count === 1 ? "" : "S"} CON CONVENIO
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
