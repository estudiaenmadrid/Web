import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, getArea, type AreaSlug } from "@/data/areas";
import {
  getFeaturedForArea,
  getModalityTags,
  getProgramsByCategory,
  groupPrograms,
  displayUniversity,
} from "@/lib/content";
import { getUniversityByDisplayName } from "@/data/universities";
import Reveal from "@/components/Reveal";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return AREAS.map((a) => ({ categoria: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const area = getArea(categoria);
  if (!area) return {};
  const count = getProgramsByCategory(area.slug).length;
  return pageMetadata({
    title: `Programas de ${area.name} en Madrid (${count})`,
    description: `${area.intro} Grados, másteres y convalidaciones de ${area.name.toLowerCase()} en universidades privadas de Madrid con convenio directo.`,
    path: `/programas/${area.slug}`,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const area = getArea(categoria);
  if (!area) notFound();

  const categorySlug = area.slug as AreaSlug;
  const programs = getProgramsByCategory(categorySlug);
  const featured = getFeaturedForArea(categorySlug);
  const featuredSlugs = new Set(featured.map((p) => p.programSlug));
  const groups = groupPrograms(programs.filter((p) => !featuredSlugs.has(p.programSlug)));
  const areaUniversities = Array.from(
    new Map(
      programs
        .map((p) => getUniversityByDisplayName(displayUniversity(p.university)))
        .filter((u): u is NonNullable<typeof u> => Boolean(u))
        .map((u) => [u.slug, u])
    ).values()
  );
  const stats = [
    { value: programs.length, label: "programas en el área" },
    { value: programs.filter((p) => p.level === "GRADO" || p.level === "DOBLE GRADO").length, label: "grados y dobles grados" },
    { value: programs.filter((p) => p.level === "MÁSTER" || p.level === "MBA" || p.level === "POSTGRADO").length, label: "másteres y postgrados" },
    { value: programs.filter((p) => /online/i.test(p.modality)).length, label: "se pueden cursar online" },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Programas", path: "/programas" },
          { name: area.name, path: `/programas/${area.slug}` },
        ]}
      />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">
          ÁREA {area.num} / {String(AREAS.length).padStart(2, "0")} — PROGRAMAS
        </div>
        <h1
          className="font-display font-black uppercase mt-3.5 break-words"
          style={{ fontSize: area.headingSize, lineHeight: 0.85, letterSpacing: "-.045em" }}
        >
          {area.name}
        </h1>
        <div className="grid gap-5 md:gap-16 mt-5 md:mt-9 md:grid-cols-2 items-start">
          <p className="font-serif italic m-0" style={{ maxWidth: "28ch", fontSize: "clamp(22px,2.6vw,38px)", lineHeight: 1.12 }}>
            {area.intro}
          </p>
          <div>
            <p className="m-0 text-[15px] leading-[1.65] text-ink-soft" style={{ maxWidth: "62ch" }}>
              {area.extended}
            </p>
            {areaUniversities.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <span className="font-mono text-[10px] tracking-[.14em] text-ink-soft mr-1">CON</span>
                {areaUniversities.map((u) => (
                  <Link
                    key={u.slug}
                    href={`/universidades/${u.slug}`}
                    className="font-display font-extrabold text-[12px] tracking-[.06em] uppercase border border-ink px-2.5 py-1.5 hover:bg-ink hover:text-off-white"
                  >
                    {u.shortName} ↗
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hair border-y border-hair mt-8 md:mt-12">
          {stats.map((s, i) => (
            // Flush with the page gutter wherever a cell starts a row (2 columns on mobile, 4 from md).
            <div key={s.label} className={`bg-off-white py-4 pr-4 ${i % 2 === 0 ? "pl-0" : "pl-4"} ${i === 2 ? "md:pl-4" : ""}`}>
              <div className="font-display font-black text-red-signal" style={{ fontSize: "clamp(26px,3.2vw,44px)", letterSpacing: "-.03em" }}>
                {String(s.value).padStart(2, "0")}
              </div>
              <div className="text-[13px] text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="eem-noscrollbar flex overflow-x-auto md:flex-wrap mt-8 sm:mt-10 md:mt-14 border-y border-hair">
          {AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/programas/${a.slug}`}
              className="relative shrink-0 whitespace-nowrap flex items-center gap-2 px-5 py-3.5 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase hover:bg-white"
            >
              {a.slug === area.slug && <span className="w-1.5 h-1.5 bg-red-signal block" />}
              <span>{a.name}</span>
              {a.slug === area.slug && (
                <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-red-signal" />
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-9 md:pt-16 pb-14 sm:pb-20 md:pb-[120px]">
        {featured.length > 0 && (
          <div className="grid gap-px bg-hair border border-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
            {featured.map((p, i) => (
              <Reveal key={p.programSlug} className="bg-white">
                <Link
                  href={`/programas/${p.categorySlug}/${p.programSlug}`}
                  className="flex flex-col justify-between gap-6 bg-white p-6 sm:p-8 text-ink hover:bg-off-white"
                  style={{ minHeight: "clamp(200px,26vh,280px)" }}
                >
                  <span className="flex flex-wrap gap-2.5 items-center">
                    <span className="font-display font-extrabold text-[10px] tracking-[.12em] bg-red-signal text-white px-1.5 py-1">
                      {i === 0 ? "DESTACADO" : "TAMBIÉN DESTACADO"}
                    </span>
                    <span className="font-mono text-[10px] tracking-[.16em] text-ink-soft">{p.level}</span>
                  </span>
                  <span className="flex flex-col gap-3.5">
                    <span>
                      <span
                        className="font-display font-black uppercase block"
                        style={{ fontSize: "clamp(22px,2.6vw,40px)", lineHeight: 0.98, letterSpacing: "-.035em" }}
                      >
                        {p.title}
                      </span>
                      <span className="font-display font-extrabold text-[12px] tracking-[.06em] uppercase text-ink-soft">
                        {displayUniversity(p.university)}
                      </span>
                    </span>
                    <span className="flex flex-wrap gap-1.5 items-center">
                      {getModalityTags(p.modality).map((t) => (
                        <em key={t} className="not-italic font-mono text-[10px] tracking-[.1em] border border-hair px-2 py-1">
                          {t}
                        </em>
                      ))}
                      <em className="not-italic text-[18px] text-red-signal ml-auto">↗</em>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <div className="flex justify-between items-baseline gap-4 mt-8 sm:mt-12 md:mt-20 border-b border-hair pb-3.5">
          <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(22px,3vw,44px)", letterSpacing: "-.03em" }}>
            Toda el área
          </h2>
          <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">{programs.length} programas</span>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="mt-6.5 sm:mt-8 md:mt-[54px]">
            <div className="flex gap-2.5 items-baseline font-mono text-[11px] tracking-[.16em] text-ink-soft uppercase">
              <span>{group.title}</span>
              <span className="text-red-signal">[{group.items.length}]</span>
            </div>
            <div className="flex flex-col mt-3">
              {group.items.map((p) => (
                <Link
                  key={p.programSlug}
                  href={`/programas/${p.categorySlug}/${p.programSlug}`}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[104px_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 gap-y-1.5 items-center py-4 sm:py-3.5 border-b border-hair text-ink hover:bg-white"
                >
                  <span className="font-mono text-[10px] tracking-[.14em] text-red-signal col-span-2 sm:col-span-1">{p.level}</span>
                  <span className="min-w-0 transition-transform group-hover:translate-x-1">
                    <span
                      className="font-display font-extrabold block"
                      style={{ fontSize: "clamp(15px,1.5vw,21px)", lineHeight: 1.2, letterSpacing: "-.015em" }}
                    >
                      {p.title}
                    </span>
                    <span className="text-[12px] text-ink-soft">{displayUniversity(p.university)}</span>
                  </span>
                  <span className="row-start-3 col-span-2 sm:row-start-auto sm:col-span-1 flex flex-wrap gap-1.5 sm:justify-end items-center mt-1 sm:mt-0">
                    {getModalityTags(p.modality).map((t) => (
                      <em key={t} className="not-italic font-mono text-[9px] tracking-[.1em] border border-hair px-1.5 py-1">
                        {t}
                      </em>
                    ))}
                    <em className="not-italic text-[15px] text-red-signal ml-auto sm:ml-0">↗</em>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="grid gap-3.5 sm:gap-5 md:gap-6.5 mt-8 sm:mt-12 md:mt-20" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          <Reveal>
            <Link
              href="/guias/homologacion-vs-convalidacion-titulo"
              className="block bg-white border border-hair rounded-md p-6 hover:bg-off-white"
            >
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">CÓMO ELEGIR</div>
              <p className="font-display font-extrabold mt-3 mb-0 text-[21px]" style={{ letterSpacing: "-.02em" }}>
                Convalidar o empezar
              </p>
              <p className="text-[14px] leading-[1.5] text-ink-soft mt-2 mb-0">
                Si tienes créditos cursados, casi siempre conviene convalidar: menos años y menos dinero. Leé la
                guía completa ↗
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href="/guias/visado-estudiante-espana-latinoamericanos"
              className="block bg-white border border-hair rounded-md p-6 hover:bg-off-white"
            >
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">MODALIDAD</div>
              <p className="font-display font-extrabold mt-3 mb-0 text-[21px]" style={{ letterSpacing: "-.02em" }}>
                ¿Te mudas o no?
              </p>
              <p className="text-[14px] leading-[1.5] text-ink-soft mt-2 mb-0">
                Online no requiere visado. Presencial sí — mirá cómo se tramita ↗
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-ink text-off-white rounded-md p-6 flex flex-col justify-between gap-4.5">
              <div>
                <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">SIGUIENTE PASO</div>
                <p className="font-display font-extrabold mt-3 mb-0 text-[21px]" style={{ letterSpacing: "-.02em" }}>
                  Te decimos qué te convalidan
                </p>
              </div>
              <a
                href="https://wa.me/34677055769"
                target="_blank"
                rel="noopener"
                className="text-off-white font-display font-extrabold text-[13px] uppercase tracking-[.04em] border-b-2 border-red-signal pb-[3px] self-start"
              >
                Enviar mi expediente ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
