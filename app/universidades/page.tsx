import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  countProgramsForUniversity,
  getAllPrograms,
  getPartnerUniversities,
  normalizeUniversityName,
} from "@/lib/content";
import { UNIVERSITIES, getUniversityByDisplayName } from "@/data/universities";
import { CAMPUS_BY_UNIVERSITY } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Universidades privadas de Madrid con convenio",
  description:
    "Universidad Alfonso X el Sabio (UAX), Nebrija y CEU San Pablo: universidades privadas españolas con convenio directo con Estudia en Madrid para grados y másteres.",
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
            const profile = getUniversityByDisplayName(u);
            const campusPhoto = CAMPUS_BY_UNIVERSITY[u];
            const card = (
              <div className="flex flex-col gap-4.5 p-6 sm:p-8 h-full">
                {campusPhoto ? (
                  <div className="relative h-32 w-full overflow-hidden" style={{ filter: "grayscale(1) contrast(1.06)" }}>
                    <Image
                      src={campusPhoto}
                      alt={`Ambiente de campus universitario — ${u}`}
                      fill
                      unoptimized
                      sizes="260px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <PlaceholderImage label={`Logo ${u}`} grayscale={false} className="h-16 w-full" />
                )}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-display font-extrabold uppercase text-[19px]" style={{ letterSpacing: "-.01em" }}>
                      {u}
                    </div>
                    {profile && <div className="font-mono text-[11px] text-ink-soft">Fundada {profile.founded}</div>}
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
                  {profile && (
                    <span className="inline-flex items-center gap-1.5 mt-3 font-display font-extrabold text-[12px] uppercase tracking-[.04em] text-red-signal">
                      Ver universidad <span>↗</span>
                    </span>
                  )}
                </div>
              </div>
            );
            return (
              <Reveal key={u} className="bg-white">
                {profile ? (
                  <Link href={`/universidades/${profile.slug}`} className="block h-full hover:bg-off-white">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px]">
        <Reveal>
          <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-.03em" }}>
            Cómo funciona el convenio
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
            Un convenio directo significa que Estudia en Madrid negoció con cada universidad una tarifa y un proceso
            de admisión específico para estudiantes latinoamericanos, en vez de que cada estudiante negocie por su
            cuenta. En la práctica esto se traduce en tres cosas: una tarifa de matrícula distinta a la pública, un
            canal de admisión más rápido porque la universidad ya conoce el perfil de estudiante que le enviamos, y
            un criterio compartido sobre qué documentación piden (apostillas, traducciones juradas, equivalencia de
            notas) para no perder tiempo con trámites que la universidad va a rechazar.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
            Esto no significa que cualquier programa te convenga solo porque hay convenio. Seguimos revisando caso
            por caso qué universidad y qué modalidad se ajustan mejor a tu expediente y a tu presupuesto antes de
            recomendarte una en particular.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
            La carta de admisión que emite cada universidad es también el documento que vas a necesitar para tramitar
            el visado de estudiante en el consulado español de tu país, así que coordinamos ambos procesos en paralelo
            en vez de esperar a que termine uno para empezar el otro — así ganás semanas cuando el calendario de
            matrícula está ajustado.
          </p>
        </Reveal>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] border-t border-hair pt-9 sm:pt-12">
        <Reveal>
          <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-.03em" }}>
            Cuatro universidades, un mismo estándar
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
            Las cuatro son universidades privadas españolas, oficialmente reconocidas y acreditadas, fundadas entre
            1993 y 2000 — ninguna es un centro improvisado ni de reciente creación. Cada una tiene su propia
            especialidad dentro de nuestro catálogo, así que la recomendación depende del área y el programa, no de
            cuál &ldquo;suena mejor&rdquo;.
          </p>
        </Reveal>
        <div className="grid gap-px bg-hair border border-hair mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))" }}>
          {UNIVERSITIES.map((u, i) => (
            <Reveal key={u.slug} delay={Math.min(i * 0.05, 0.15)} className="bg-white">
              <Link href={`/universidades/${u.slug}`} className="flex flex-col gap-2 p-5.5 h-full hover:bg-off-white">
                <span className="font-mono text-[11px] tracking-[.14em] text-red-signal">{u.founded}</span>
                <span className="font-display font-extrabold" style={{ fontSize: "16px" }}>
                  {u.shortName}
                </span>
                <span className="text-[12px] text-ink-soft leading-[1.4]">{u.campuses[0].name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
