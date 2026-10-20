import Link from "next/link";
import type { Metadata } from "next";
import { countProgramsForUniversity, getAllPrograms, normalizeUniversityName } from "@/lib/content";
import { UNIVERSITIES } from "@/data/universities";
import { photoForUniversity } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import Photo from "@/components/shared/Photo";
import TypePlate from "@/components/shared/TypePlate";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Universidades privadas de Madrid con convenio",
  description:
    "Universidad Alfonso X el Sabio (UAX), Nebrija y CEU San Pablo: universidades privadas españolas con convenio directo con Estudia en Madrid para grados y másteres.",
  path: "/universidades",
});

const NUMBER_WORDS = ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis"];

const CONVENIO_STEPS = [
  {
    title: "Tarifa de convenio",
    body: "Una tarifa de matrícula distinta a la pública, negociada por nosotros con cada universidad — no la que pagarías llegando por tu cuenta.",
  },
  {
    title: "Admisión directa",
    body: "Un canal de admisión más rápido: la universidad ya conoce el perfil de estudiante que le enviamos y cómo viene armado cada expediente.",
  },
  {
    title: "Papeles sin rechazos",
    body: "Un criterio compartido sobre apostillas, traducciones juradas y equivalencia de notas, para no perder semanas con trámites que la universidad va a devolver.",
  },
];

export default function UniversidadesPage() {
  const programs = getAllPrograms();
  const years = UNIVERSITIES.map((u) => Number(u.founded));
  const countWord = NUMBER_WORDS[UNIVERSITIES.length] ?? String(UNIVERSITIES.length);
  const byFounding = [...UNIVERSITIES].sort((a, b) => Number(a.founded) - Number(b.founded));

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Universidades", path: "/universidades" }]} />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CONVENIOS DIRECTOS</div>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(38px,9.4vw,160px)", lineHeight: 0.86, letterSpacing: "-.05em" }}
        >
          Universidades
        </h1>
        <div className="grid gap-5 md:gap-16 mt-6 md:mt-10 md:grid-cols-2 items-start">
          <p className="font-serif italic m-0" style={{ maxWidth: "22ch", fontSize: "clamp(24px,3vw,44px)", lineHeight: 1.08 }}>
            Trabajamos directo con admisiones, no con intermediarios.
          </p>
          <p className="m-0 text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft" style={{ maxWidth: "58ch" }}>
            Tenemos convenio directo con {countWord} universidades privadas españolas: eso te da acceso a la
            tarifa acordada por convenio en lugar de la pública, y a un asesor que conoce el proceso de admisión de
            cada una por dentro. Cada universidad tiene su propia oferta — abajo ves cuántos programas aporta cada
            una y en qué áreas.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pt-11 sm:pt-16 md:pt-[100px] pb-14 sm:pb-20 md:pb-[120px]">
        <div className="border-b border-hair">
          {UNIVERSITIES.map((u, i) => {
            const count = countProgramsForUniversity(u.displayName);
            const uniPrograms = programs.filter((p) => normalizeUniversityName(p.university) === u.displayName);
            const areas = Array.from(new Set(uniPrograms.map((p) => p.categoryName)));
            const onlineCount = uniPrograms.filter((p) => /online/i.test(p.modality)).length;
            const photo = photoForUniversity(u.slug);
            return (
              <Reveal key={u.slug}>
                <Link
                  href={`/universidades/${u.slug}`}
                  className="group grid gap-6 md:gap-12 py-7 sm:py-9 md:py-12 border-t border-hair md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                >
                  {/* self-start: a stretched grid item with aspect-ratio derives its width from the row height and spills over the text column. */}
                  <div className="relative overflow-hidden bg-ink aspect-[4/3] self-start">
                    {photo ? (
                      <Photo
                        photo={photo}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <TypePlate
                        className="absolute inset-0"
                        word={u.monogram}
                        label={u.displayName}
                        topLeft={`Est. ${u.founded}`}
                        topRight={`${count} programas`}
                        bottom={u.campuses.map((c) => c.name).join(" · ")}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-6 min-w-0">
                    <div>
                      <div className="flex justify-between gap-4 font-mono text-[11px] tracking-[.16em]">
                        <span className="text-red-signal">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-ink-soft">FUNDADA EN {u.founded}</span>
                      </div>
                      <h2
                        className="font-display font-black uppercase mt-4 mb-0 transition-colors group-hover:text-red-signal"
                        style={{ fontSize: "clamp(28px,4.4vw,68px)", lineHeight: 0.92, letterSpacing: "-.04em" }}
                      >
                        {u.displayName}
                      </h2>
                      <p className="mt-4 mb-0 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "52ch" }}>
                        {u.whyEEM}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-px bg-hair border-y border-hair">
                        <div className="bg-off-white py-3.5 pr-4">
                          <div className="font-display font-black text-red-signal" style={{ fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-.03em" }}>
                            {count}
                          </div>
                          <div className="text-[13px] text-ink-soft">programas con convenio</div>
                        </div>
                        <div className="bg-off-white py-3.5 pl-4">
                          <div className="font-display font-black text-red-signal" style={{ fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-.03em" }}>
                            {onlineCount > 0 ? onlineCount : "100%"}
                          </div>
                          <div className="text-[13px] text-ink-soft">{onlineCount > 0 ? "se pueden cursar online" : "presencial, en Madrid"}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {areas.map((a) => (
                          <span key={a} className="font-mono text-[10px] tracking-[.12em] uppercase border border-hair px-2 py-1">
                            {a}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 self-start font-display font-extrabold text-[13px] uppercase tracking-[.04em] border-b-2 border-red-signal pb-[3px]">
                        Ver universidad <span className="text-red-signal transition-transform group-hover:translate-x-1">↗</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-ink text-off-white px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[130px]">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">CÓMO FUNCIONA</div>
        <h2
          className="font-display font-black uppercase mt-4 mb-0"
          style={{ fontSize: "clamp(30px,5.4vw,88px)", lineHeight: 0.9, letterSpacing: "-.045em" }}
        >
          El convenio,
          <br />
          en tres cosas
        </h2>
        <div className="grid gap-px bg-white/15 border border-white/15 mt-9 md:mt-16 md:grid-cols-3">
          {CONVENIO_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={Math.min(i * 0.06, 0.18)} className="bg-ink">
              <div className="p-6 sm:p-8 h-full flex flex-col gap-10 md:gap-16">
                <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display font-extrabold m-0" style={{ fontSize: "clamp(20px,2vw,28px)", letterSpacing: "-.02em" }}>
                    {step.title}
                  </h3>
                  <p className="m-0 mt-2.5 text-[15px] leading-[1.6]" style={{ color: "rgba(248,244,235,.7)" }}>
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:gap-16 mt-9 md:mt-14 md:grid-cols-2 text-[15px] leading-[1.65]" style={{ color: "rgba(248,244,235,.7)" }}>
          <p className="m-0">
            Esto no significa que cualquier programa te convenga solo porque hay convenio. Seguimos revisando caso por
            caso qué universidad y qué modalidad se ajustan mejor a tu expediente y a tu presupuesto antes de
            recomendarte una en particular.
          </p>
          <p className="m-0">
            La carta de admisión de la universidad es también el documento que necesitás para el visado de
            estudiante, así que coordinamos ambos trámites en paralelo en vez de esperar a que termine uno para
            empezar el otro — así ganás semanas cuando el calendario de matrícula está ajustado.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-14 sm:py-20 md:py-[120px]">
        <div className="grid gap-6 md:gap-16 md:grid-cols-2 items-end">
          <Reveal>
            <h2
              className="font-display font-black uppercase m-0"
              style={{ fontSize: "clamp(26px,3.6vw,56px)", lineHeight: 0.94, letterSpacing: "-.04em" }}
            >
              {countWord.charAt(0).toUpperCase() + countWord.slice(1)} universidades,
              <br />
              un mismo estándar
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="m-0 text-[15px] leading-[1.65] text-ink-soft" style={{ maxWidth: "58ch" }}>
              Son universidades privadas españolas, oficialmente reconocidas y acreditadas, fundadas entre{" "}
              {Math.min(...years)} y {Math.max(...years)} — ninguna es un centro improvisado ni de reciente
              creación. Cada una tiene su propia especialidad dentro de nuestro catálogo, así que la recomendación
              depende del área y del programa, no de cuál &ldquo;suena mejor&rdquo;.
            </p>
          </Reveal>
        </div>
        <ol className="list-none p-0 m-0 mt-9 md:mt-14 grid gap-px bg-hair border border-hair md:grid-cols-3">
          {byFounding.map((u, i) => (
            <Reveal key={u.slug} as="li" delay={Math.min(i * 0.05, 0.15)} className="bg-off-white">
              <Link href={`/universidades/${u.slug}`} className="group flex flex-col gap-3 p-5.5 sm:p-7 h-full hover:bg-white">
                <span
                  className="font-display font-black text-red-signal"
                  style={{ fontSize: "clamp(40px,5vw,76px)", lineHeight: 0.9, letterSpacing: "-.04em" }}
                >
                  {u.founded}
                </span>
                <span className="font-display font-extrabold uppercase text-[17px]" style={{ letterSpacing: "-.01em" }}>
                  {u.shortName} <span className="text-red-signal transition-transform inline-block group-hover:translate-x-1">↗</span>
                </span>
                <span className="block text-[13px] text-ink-soft leading-[1.45] first-letter:uppercase">{u.foundedNote}</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
