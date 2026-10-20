import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuide, getGuidesByCategory } from "@/lib/guides";
import MarkdownSections from "@/components/shared/MarkdownSections";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/shared/ScrollProgress";
import TableOfContents from "@/components/shared/TableOfContents";
import { getTocItems } from "@/lib/programSections";
import { UNIVERSITIES } from "@/data/universities";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.titleSeo ?? guide.title,
    description: guide.metaDescription ?? guide.summary,
    path: `/guias/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = getGuidesByCategory(guide.category).filter((g) => g.slug !== guide.slug);
  const tocItems = getTocItems(guide.bodyMarkdown);
  const words = guide.bodyMarkdown.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  const lastUpdatedLabel = guide.lastUpdated
    ? new Date(guide.lastUpdated + "T00:00:00").toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <ScrollProgress />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
          { name: guide.title, path: `/guias/${guide.slug}` },
        ]}
      />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <Breadcrumb
          items={[
            { name: "Inicio", path: "/" },
            { name: "Guías", path: "/guias" },
            { name: guide.title, path: `/guias/${guide.slug}` },
          ]}
        />
        <Link
          href="/guias"
          className="inline-flex items-center gap-2.5 mt-3.5 border border-hair px-3.5 py-2.5 font-display font-extrabold text-[12px] tracking-[.08em] uppercase hover:bg-white"
        >
          <span className="text-red-signal">←</span> Ver todas las guías
        </Link>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(32px,6.4vw,84px)", lineHeight: 0.94, letterSpacing: "-.04em" }}
        >
          {guide.title}
        </h1>
        {guide.summary && (
          <p className="font-serif italic mt-4" style={{ maxWidth: "56ch", fontSize: "clamp(19px,2.2vw,28px)", lineHeight: 1.25 }}>
            {guide.summary}
          </p>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-4 border-t border-hair font-mono text-[11px] tracking-[.1em] uppercase text-ink-soft">
          <span className="text-red-signal">{guide.category}</span>
          <span>{readingMinutes} min de lectura</span>
          {lastUpdatedLabel && <span>Actualizada: {lastUpdatedLabel}</span>}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[100px] grid gap-9 md:gap-[72px] md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_300px]">
        <MarkdownSections bodyMarkdown={guide.bodyMarkdown} variant="article" />
        <aside className="hidden md:flex flex-col gap-4 sticky top-24 self-start">
          {tocItems.length > 1 && (
            <>
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">EN ESTA GUÍA</div>
              <TableOfContents items={tocItems} />
            </>
          )}
          <a
            href="https://wa.me/34677055769"
            target="_blank"
            rel="noopener"
            className="mt-2 flex flex-col gap-3 bg-ink text-off-white rounded-md p-5 hover:opacity-90"
          >
            <span className="font-mono text-[10px] tracking-[.16em] text-red-signal">¿TU CASO ES DISTINTO?</span>
            <span className="font-display font-extrabold text-[17px] leading-[1.25]" style={{ letterSpacing: "-.01em" }}>
              Contanos tu situación y te decimos qué aplica
            </span>
            <span className="font-display font-extrabold text-[12px] uppercase tracking-[.04em] border-b-2 border-red-signal pb-[3px] self-start">
              WhatsApp ↗
            </span>
          </a>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] border-t border-hair pt-9 sm:pt-12">
          <h2
            className="font-display font-black uppercase m-0"
            style={{ fontSize: "clamp(20px,2.6vw,32px)", letterSpacing: "-.03em" }}
          >
            Más guías de {guide.category}
          </h2>
          <div className="grid gap-px bg-hair border border-hair mt-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}>
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="flex flex-col gap-2 bg-white p-5 text-ink hover:bg-off-white"
              >
                <span className="font-mono text-[10px] tracking-[.14em] text-red-signal">{g.category}</span>
                <span className="font-display font-extrabold" style={{ fontSize: "16px", lineHeight: 1.25 }}>
                  {g.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={`px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] ${related.length > 0 ? "" : "border-t border-hair pt-9 sm:pt-12"}`}>
        <div className="grid gap-3.5 sm:gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          <Reveal>
            <Link
              href="/programas"
              className="flex flex-col justify-between gap-4 bg-ink text-off-white rounded-md p-6 h-full hover:opacity-90"
            >
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">CATÁLOGO</div>
              <div>
                <p className="font-display font-extrabold mt-0 mb-1.5 text-[21px]" style={{ letterSpacing: "-.02em" }}>
                  Ver todos los programas
                </p>
                <p className="text-[14px] leading-[1.5]" style={{ color: "rgba(248,244,235,.7)" }}>
                  Grados y másteres con convenio directo en 5 áreas.
                </p>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href="/universidades"
              className="flex flex-col justify-between gap-4 bg-white border border-hair rounded-md p-6 h-full hover:bg-off-white"
            >
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">UNIVERSIDADES</div>
              <div>
                <p className="font-display font-extrabold mt-0 mb-1.5 text-[21px]" style={{ letterSpacing: "-.02em" }}>
                  Conocé con quién trabajamos
                </p>
                <p className="text-[14px] leading-[1.5] text-ink-soft">
                  Las {UNIVERSITIES.length} universidades privadas con convenio directo.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
