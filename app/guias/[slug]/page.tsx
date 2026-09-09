import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuide, getGuidesByCategory } from "@/lib/guides";
import MarkdownSections from "@/components/shared/MarkdownSections";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
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
  const lastUpdatedLabel = guide.lastUpdated
    ? new Date(guide.lastUpdated + "T00:00:00").toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
          { name: guide.title, path: `/guias/${guide.slug}` },
        ]}
      />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[.16em] text-ink-soft uppercase">
          <Link href="/guias">Guías</Link> / <span className="text-red-signal">{guide.category}</span>
        </div>
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
        {lastUpdatedLabel && (
          <p className="font-mono text-[11px] tracking-[.08em] text-ink-soft mt-4">
            Última actualización: {lastUpdatedLabel}
          </p>
        )}
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px]">
        <MarkdownSections bodyMarkdown={guide.bodyMarkdown} />
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
    </>
  );
}
