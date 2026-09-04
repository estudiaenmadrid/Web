import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArea } from "@/data/areas";
import { getAllPrograms, getModalityTags, getProgram } from "@/lib/content";
import PlaceholderImage from "@/components/PlaceholderImage";

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
  return {
    title: program.titleSeo ?? program.title,
    description: program.metaDescription,
  };
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

  const facts: [string, string][] = [
    ["Universidad", program.university],
    ["Titulación", program.officialTitle ?? program.title],
    ["Modalidad", program.modality],
  ];
  if (program.ectsTotal) facts.push(["ECTS", String(program.ectsTotal)]);
  if (program.duration) facts.push(["Duración", program.duration]);
  if (program.startDate) facts.push(["Próximo inicio", program.startDate]);

  return (
    <>
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[.16em] text-ink-soft uppercase">
          <Link href="/programas">Programas</Link> /{" "}
          <Link href={`/programas/${area.slug}`}>{area.name}</Link>
        </div>
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
        <p className="font-serif italic mt-4" style={{ fontSize: "clamp(20px,2.4vw,32px)" }}>
          {program.university}
        </p>
        <div className="flex flex-wrap gap-2 mt-5.5">
          {getModalityTags(program.modality).map((t) => (
            <em key={t} className="not-italic font-mono text-[11px] tracking-[.1em] border border-hair px-2.5 py-1.5">
              {t}
            </em>
          ))}
        </div>

        <div className="relative mt-5.5 md:mt-11" style={{ height: "clamp(220px,38vh,440px)", filter: "grayscale(1) contrast(1.06)" }}>
          <PlaceholderImage label={`${program.university.split("(")[0].trim()} — imagen pendiente`} className="w-full h-full" />
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        <div className="eem-prose" style={{ maxWidth: "62ch" }} dangerouslySetInnerHTML={{ __html: program.bodyHtml }} />

        <aside className="flex flex-col gap-3.5 md:sticky md:top-24 self-start">
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
          <p className="text-[13px] text-ink-soft m-0">
            Te respondemos por WhatsApp en horario de Madrid. Sin formularios eternos.
          </p>
        </aside>
      </section>
    </>
  );
}
