import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArea } from "@/data/areas";
import {
  displayUniversity,
  getAllPrograms,
  getModalityTags,
  getProgram,
  getRelatedPrograms,
} from "@/lib/content";
import { CAMPUS_BY_UNIVERSITY } from "@/lib/photos";
import { UNIVERSITIES } from "@/data/universities";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import CourseSchema from "@/components/schema/CourseSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import MarkdownSections from "@/components/shared/MarkdownSections";
import RelatedGuides from "@/components/shared/RelatedGuides";
import ScrollProgress from "@/components/shared/ScrollProgress";
import TableOfContents from "@/components/shared/TableOfContents";
import { getTocItems } from "@/lib/programSections";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPrograms().map((p) => ({ categoria: p.categorySlug, programa: p.programSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; programa: string }>;
}): Promise<Metadata> {
  const { categoria, programa } = await params;
  const area = getArea(categoria);
  if (!area) return {};
  const program = getProgram(area.slug, programa);
  if (!program) return {};
  return pageMetadata({
    title: program.titleSeo ?? program.title,
    description: program.metaDescription ?? program.title,
    path: `/programas/${area.slug}/${program.programSlug}`,
  });
}

export default async function FichaPage({
  params,
}: {
  params: Promise<{ categoria: string; programa: string }>;
}) {
  const { categoria, programa } = await params;
  const area = getArea(categoria);
  if (!area) notFound();
  const program = getProgram(area.slug, programa);
  if (!program) notFound();

  const universityLabel = displayUniversity(program.university);
  const campusPhoto = CAMPUS_BY_UNIVERSITY[universityLabel];
  const universityProfile = UNIVERSITIES.find((u) => u.displayName === universityLabel);

  const facts: [string, string][] = [
    ["Universidad", universityLabel],
    ["Titulación", program.officialTitle ?? program.title],
    ["Modalidad", program.modality],
  ];
  if (program.ectsTotal) facts.push(["ECTS", String(program.ectsTotal)]);
  if (program.duration) facts.push(["Duración", program.duration]);
  if (program.startDate) facts.push(["Próximo inicio", program.startDate]);

  const statStrip: { value: string; label: string }[] = [{ value: program.level, label: "nivel" }];
  if (program.ectsTotal) statStrip.push({ value: String(program.ectsTotal), label: "créditos ECTS" });
  statStrip.push({ value: getModalityTags(program.modality)[0] ?? program.modality, label: "modalidad" });
  statStrip.push({ value: universityProfile?.shortName ?? "—", label: "universidad" });

  const related = getRelatedPrograms(program);
  const tocItems = getTocItems(program.bodyMarkdown);
  const lastUpdatedLabel = program.lastUpdated
    ? new Date(program.lastUpdated + "T00:00:00").toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <ScrollProgress />
      <CourseSchema program={program} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Programas", path: "/programas" },
          { name: area.name, path: `/programas/${area.slug}` },
          { name: program.title, path: `/programas/${area.slug}/${program.programSlug}` },
        ]}
      />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <Breadcrumb
          items={[
            { name: "Inicio", path: "/" },
            { name: "Programas", path: "/programas" },
            { name: area.name, path: `/programas/${area.slug}` },
            { name: program.title, path: `/programas/${area.slug}/${program.programSlug}` },
          ]}
        />
        <Link
          href={`/programas/${area.slug}`}
          className="inline-flex items-center gap-2.5 mt-3.5 border border-hair px-3.5 py-2.5 font-display font-extrabold text-[12px] tracking-[.08em] uppercase hover:bg-white"
        >
          <span className="text-red-signal">←</span> Ver todos los programas
        </Link>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(32px,6.4vw,96px)", lineHeight: 0.9, letterSpacing: "-.045em" }}
        >
          {program.title}
        </h1>
        {universityProfile ? (
          <Link
            href={`/universidades/${universityProfile.slug}`}
            className="inline-flex font-serif italic mt-4 border-b border-ink-soft/40 hover:border-red-signal hover:text-red-signal"
            style={{ fontSize: "clamp(20px,2.4vw,32px)" }}
          >
            {universityLabel}
          </Link>
        ) : (
          <p className="font-serif italic mt-4" style={{ fontSize: "clamp(20px,2.4vw,32px)" }}>
            {universityLabel}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-5.5">
          {getModalityTags(program.modality).map((t) => (
            <em key={t} className="not-italic font-mono text-[11px] tracking-[.1em] border border-hair px-2.5 py-1.5">
              {t}
            </em>
          ))}
        </div>
        {lastUpdatedLabel && (
          <p className="font-mono text-[11px] tracking-[.08em] text-ink-soft mt-4">
            Última actualización: {lastUpdatedLabel}
          </p>
        )}

        <div className="relative mt-5.5 md:mt-11 overflow-hidden" style={{ height: "clamp(220px,38vh,440px)", filter: "grayscale(1) contrast(1.06)" }}>
          {campusPhoto ? (
            <Image
              src={campusPhoto}
              alt={`Ambiente de campus universitario — ${universityLabel}`}
              fill
              unoptimized
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <PlaceholderImage label={`${universityLabel} — imagen pendiente`} className="w-full h-full" />
          )}
        </div>

        <div
          className="grid gap-px bg-hair border-y border-hair mt-5.5 md:mt-9"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))" }}
        >
          {statStrip.map((s) => (
            <div key={s.label} className="bg-off-white py-4 px-4 first:pl-0 min-w-0">
              <div
                className="font-display font-black text-red-signal uppercase truncate"
                style={{ fontSize: "clamp(17px,2.1vw,28px)", letterSpacing: "-.02em" }}
                title={s.value}
              >
                {s.value}
              </div>
              <div className="text-[13px] text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        <MarkdownSections bodyMarkdown={program.bodyMarkdown} />

        <aside className="flex flex-col gap-3.5 md:sticky md:top-24 self-start">
          {tocItems.length > 1 && (
            <div className="hidden md:block font-mono text-[10px] tracking-[.16em] text-red-signal mb-1">
              EN ESTA PÁGINA
            </div>
          )}
          <TableOfContents items={tocItems} />
          <Reveal delay={0.1}>
            <div className="bg-white border border-hair rounded-md p-5.5">
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">DATOS CLAVE</div>
              <div className="flex flex-col gap-3 mt-4">
                {facts.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 text-[14px]">
                    <span className="text-ink-soft">{label}</span>
                    <strong
                      className="text-right"
                      style={{ color: /pendiente/i.test(value) ? "var(--red-signal)" : undefined }}
                    >
                      {/pendiente de confirmar/i.test(value) ? "[ a confirmar ]" : value}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-hair mt-5 mb-0 -mx-5.5" />
              <a
                href="https://wa.me/34677055769"
                target="_blank"
                rel="noopener"
                className="flex justify-between items-center mt-4.5 bg-red-signal text-white px-4 py-3.5 font-display font-extrabold text-[13px] uppercase tracking-[.04em] hover:bg-red-dark"
              >
                Valorar mi expediente <span>↗</span>
              </a>
            </div>
          </Reveal>
          <p className="text-[13px] text-ink-soft m-0">
            Te respondemos por WhatsApp en horario de Madrid. Sin formularios eternos.
          </p>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] border-t border-hair pt-9 sm:pt-12">
          <h2
            className="font-display font-black uppercase m-0"
            style={{ fontSize: "clamp(20px,2.6vw,32px)", letterSpacing: "-.03em" }}
          >
            Programas relacionados en {area.name}
          </h2>
          <div className="grid gap-px bg-hair border border-hair mt-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}>
            {related.map((p, i) => (
              <Reveal key={p.programSlug} delay={Math.min(i * 0.05, 0.15)} className="bg-white">
                <Link
                  href={`/programas/${p.categorySlug}/${p.programSlug}`}
                  className="flex flex-col gap-2 bg-white p-5 text-ink hover:bg-off-white h-full"
                >
                  <span className="font-mono text-[10px] tracking-[.14em] text-red-signal">{p.level}</span>
                  <span className="font-display font-extrabold" style={{ fontSize: "16px", lineHeight: 1.25 }}>
                    {p.title}
                  </span>
                  <span className="text-[12px] text-ink-soft">{displayUniversity(p.university)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <RelatedGuides />
    </>
  );
}
