import Link from "next/link";
import type { Metadata } from "next";
import { AREAS } from "@/data/areas";
import { getAllPrograms, getPartnerUniversities, getProgramsByCategory } from "@/lib/content";
import Reveal from "@/components/Reveal";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Programas en universidades privadas de Madrid",
  description:
    "Grados, másteres y convalidaciones en universidades privadas de Madrid, agrupados por área: Derecho, Administración, Ingeniería, Salud y Educación.",
  path: "/programas",
});

export default function ProgramasPage() {
  const total = getAllPrograms().length;
  const universities = getPartnerUniversities();

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
        <p className="font-serif italic mt-4" style={{ maxWidth: "44ch", fontSize: "clamp(20px,2.4vw,34px)", lineHeight: 1.15 }}>
          {total} programas entre grados, másteres y convalidaciones, en cinco áreas.
        </p>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Todos los programas del catálogo se cursan con convenio directo en {universities.length} universidades
          privadas españolas ({universities.join(", ")}), lo que se traduce en una tarifa distinta a la pública y en
          un asesor que gestiona la admisión por vos. Cada ficha de programa incluye universidad, modalidad,
          duración y créditos ECTS cuando están confirmados, y si un dato todavía no lo está, lo vas a ver marcado
          como &ldquo;a confirmar&rdquo; en vez de un número inventado.
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
        <p className="mt-9 sm:mt-12 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Si ya cursaste parte de una carrera en tu país, casi siempre conviene revisar primero si te conviene
          convalidar en vez de empezar un grado desde cero — normalmente significa menos años y menos dinero. Si
          todavía no sabés en qué área encaja tu perfil, escribinos por WhatsApp con tu expediente y título: lo
          revisamos y te decimos, programa por programa, qué créditos podrían reconocerte antes de que te
          matricules en cualquiera de las áreas de arriba.
        </p>
        <p className="mt-5 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Dentro de cada área vas a encontrar tanto grados (para quien empieza desde cero o convalida créditos) como
          másteres (para quien ya tiene un título y busca especializarse), en modalidad presencial u online según el
          programa. Cada ficha trae además una sección de preguntas frecuentes con la información puntual que más
          preguntan los estudiantes latinoamericanos antes de decidirse: si es presencial u online, cuánto dura, en
          qué mes empieza la próxima convocatoria y si ayudamos con la matrícula y el visado.
        </p>
      </section>
    </>
  );
}
