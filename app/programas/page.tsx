import Link from "next/link";
import type { Metadata } from "next";
import { AREAS } from "@/data/areas";
import { getUniversityByDisplayName } from "@/data/universities";
import { displayUniversity, getAllPrograms, getPartnerUniversities, getProgramsByCategory } from "@/lib/content";
import Reveal from "@/components/Reveal";
import RelatedGuides from "@/components/shared/RelatedGuides";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Programas en universidades privadas de Madrid",
  description:
    "Grados, másteres y convalidaciones en universidades privadas de Madrid, agrupados por área: Derecho, Administración, Ingeniería, Salud y Educación.",
  path: "/programas",
});

// Each stat sits flush with the page gutter when it starts a grid row (2 columns on mobile, 4 from md).
const STAT_CELL = ["py-5 pr-5 pl-0", "py-5 pr-5 pl-5", "py-5 pr-5 pl-0 md:pl-5", "py-5 pr-5 pl-5"];

export default function ProgramasPage() {
  const programs = getAllPrograms();
  const universities = getPartnerUniversities();
  const stats = [
    { value: programs.filter((p) => p.level === "GRADO" || p.level === "DOBLE GRADO").length, label: "grados y dobles grados" },
    { value: programs.filter((p) => p.level === "MÁSTER" || p.level === "MBA" || p.level === "POSTGRADO").length, label: "másteres y postgrados" },
    { value: programs.filter((p) => /online/i.test(p.modality)).length, label: "se pueden cursar online" },
    { value: universities.length, label: "universidades con convenio" },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Programas", path: "/programas" }]} />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CATÁLOGO</div>
        <h1
          className="font-display font-black uppercase mt-3.5"
          style={{ fontSize: "clamp(44px,10vw,180px)", lineHeight: 0.86, letterSpacing: "-.045em" }}
        >
          Programas
        </h1>
        <div className="grid gap-5 md:gap-16 mt-5 md:mt-9 md:grid-cols-2 items-start">
          <p className="font-serif italic m-0" style={{ maxWidth: "24ch", fontSize: "clamp(24px,3vw,44px)", lineHeight: 1.08 }}>
            {programs.length} programas entre grados, másteres y convalidaciones, en cinco áreas.
          </p>
          <p className="m-0 text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft" style={{ maxWidth: "58ch" }}>
            Todos se cursan con convenio directo en universidades privadas españolas, lo que se traduce en una
            tarifa distinta a la pública y en un asesor que gestiona la admisión por vos. Cada ficha incluye
            universidad, modalidad, duración y créditos ECTS — y si un dato todavía no está confirmado, lo vas a ver
            marcado como &ldquo;a confirmar&rdquo; en vez de un número inventado.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hair border-y border-hair mt-8 md:mt-14">
          {stats.map((s, i) => (
            <div key={s.label} className={`bg-off-white ${STAT_CELL[i]}`}>
              <div className="font-display font-black text-red-signal" style={{ fontSize: "clamp(30px,4vw,54px)", letterSpacing: "-.03em" }}>
                {String(s.value).padStart(2, "0")}
              </div>
              <div className="text-[14px] text-ink-soft mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pt-12 sm:pt-16 md:pt-[110px] pb-14 sm:pb-20 md:pb-[120px]">
        <div className="flex justify-between items-baseline gap-4 pb-3.5">
          <h2 className="font-mono font-normal text-[11px] tracking-[.16em] text-red-signal m-0">LAS {AREAS.length} ÁREAS</h2>
          <span className="font-mono text-[11px] tracking-[.16em] text-ink-soft">ELEGÍ POR DÓNDE EMPEZAR</span>
        </div>
        <div className="border-b border-hair">
          {AREAS.map((area) => {
            const areaPrograms = getProgramsByCategory(area.slug);
            const areaUniversities = Array.from(
              new Set(
                areaPrograms
                  .map((p) => displayUniversity(p.university))
                  .map((name) => getUniversityByDisplayName(name)?.shortName)
                  .filter((n): n is string => Boolean(n))
              )
            );
            return (
              <Reveal key={area.slug}>
                <Link
                  href={`/programas/${area.slug}`}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[72px_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 gap-y-4 items-start py-7 sm:py-9 md:py-11 border-t border-hair"
                >
                  <span className="hidden md:block font-mono text-[12px] tracking-[.16em] text-red-signal pt-3">{area.num}</span>
                  <span className="min-w-0">
                    <span className="md:hidden block font-mono text-[11px] tracking-[.16em] text-red-signal mb-2.5">{area.num}</span>
                    <span
                      className="block font-display font-black uppercase transition-colors duration-300 group-hover:text-red-signal"
                      style={{ fontSize: "clamp(28px,7vw,116px)", lineHeight: 0.86, letterSpacing: "-.05em" }}
                    >
                      {area.name}
                    </span>
                    <span className="grid gap-2 mt-4 md:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10 items-baseline">
                      <span className="font-mono text-[11px] tracking-[.14em] text-ink uppercase">
                        {areaPrograms.length} programas{areaUniversities.length > 0 ? ` · ${areaUniversities.join(" · ")}` : ""}
                      </span>
                      <span className="text-[15px] leading-[1.55] text-ink-soft" style={{ maxWidth: "58ch" }}>
                        {area.intro}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-red-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ fontSize: "clamp(22px,2.6vw,40px)", lineHeight: 1 }}
                  >
                    ↗
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="grid gap-5 md:gap-16 mt-12 sm:mt-16 md:mt-24 md:grid-cols-2">
          <Reveal>
            <h2
              className="font-display font-black uppercase m-0"
              style={{ fontSize: "clamp(26px,3.6vw,56px)", lineHeight: 0.94, letterSpacing: "-.04em" }}
            >
              Antes de elegir
              <br />
              <span className="text-red-signal">un área</span>
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.65] text-ink-soft" style={{ maxWidth: "60ch" }}>
            <Reveal>
              <p className="m-0">
                Si ya cursaste parte de una carrera en tu país, casi siempre conviene revisar primero si podés
                convalidar en vez de empezar un grado desde cero — normalmente significa menos años y menos dinero.
                Escribinos por WhatsApp con tu expediente y título: lo revisamos y te decimos, programa por programa,
                qué créditos podrían reconocerte antes de que te matricules.
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="m-0">
                Dentro de cada área hay grados (para quien empieza desde cero o convalida créditos) y másteres (para
                quien ya tiene un título y busca especializarse), presenciales u online según el programa. Cada ficha
                trae además las preguntas que más nos hacen antes de decidir: si es presencial u online, cuánto dura,
                cuándo empieza la próxima convocatoria y cómo te ayudamos con la matrícula y el visado.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <RelatedGuides />
    </>
  );
}
