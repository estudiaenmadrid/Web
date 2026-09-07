import type { Metadata } from "next";
import {
  countProgramsForUniversity,
  getAllPrograms,
  getPartnerUniversities,
  normalizeUniversityName,
} from "@/lib/content";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Universidades privadas de Madrid con convenio",
  description:
    "Universidad Alfonso X el Sabio (UAX), Nebrija, CEU San Pablo y UCJC: universidades privadas españolas con convenio directo con Estudia en Madrid para grados y másteres.",
  path: "/universidades",
});

export default function UniversidadesPage() {
  const universities = getPartnerUniversities();
  const programs = getAllPrograms();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Universidades", path: "/universidades" }]} />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CONVENIOS DIRECTOS</div>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(38px,8vw,132px)", lineHeight: 0.88, letterSpacing: "-.045em" }}
        >
          Universidades
        </h1>
        <p className="font-serif italic mt-4" style={{ maxWidth: "56ch", fontSize: "clamp(20px,2.2vw,30px)" }}>
          Trabajamos directo con admisiones, no con intermediarios.
        </p>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Estudia en Madrid gestiona convenios directos con {universities.length} universidades privadas
          españolas, lo que permite acceder a la tarifa acordada por convenio en lugar de la tarifa pública, y
          contar con un asesor que conoce el proceso de admisión de cada una por dentro. Cada universidad de la
          lista tiene su propia oferta de grados, másteres y convalidaciones — abajo vas a encontrar cuántos
          programas ofrece cada una y en qué áreas.
        </p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px]">
        <div className="grid gap-px bg-hair border border-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          {universities.map((u) => {
            const count = countProgramsForUniversity(u);
            const uniPrograms = programs.filter((p) => normalizeUniversityName(p.university) === u);
            const categories = Array.from(new Set(uniPrograms.map((p) => p.categoryName)));
            const onlineCount = uniPrograms.filter((p) => /online/i.test(p.modality)).length;
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
                    <p className="text-[13px] text-ink-soft mt-2.5 leading-[1.5]">
                      Áreas: {categories.join(", ")}.{" "}
                      {onlineCount > 0
                        ? `${onlineCount} de sus programas se pueden cursar online.`
                        : "Oferta principalmente presencial."}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px]">
        <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-.03em" }}>
          Cómo funciona el convenio
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Un convenio directo significa que Estudia en Madrid negoció con cada universidad una tarifa y un proceso
          de admisión específico para estudiantes latinoamericanos, en vez de que cada estudiante negocie por su
          cuenta. En la práctica esto se traduce en tres cosas: una tarifa de matrícula distinta a la pública, un
          canal de admisión más rápido porque la universidad ya conoce el perfil de estudiante que le enviamos, y
          un criterio compartido sobre qué documentación piden (apostillas, traducciones juradas, equivalencia de
          notas) para no perder tiempo con trámites que la universidad va a rechazar.
        </p>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Esto no significa que cualquier programa te convenga solo porque hay convenio. Seguimos revisando caso
          por caso qué universidad y qué modalidad se ajustan mejor a tu expediente y a tu presupuesto antes de
          recomendarte una en particular.
        </p>
      </section>
    </>
  );
}
