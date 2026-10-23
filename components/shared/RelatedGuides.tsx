import Link from "next/link";
import { getGuide } from "@/lib/guides";
import Reveal from "@/components/Reveal";

/** Applies to any student regardless of program/university — the default set shown on ficha pages. */
const UNIVERSAL_GUIDE_SLUGS = [
  "visado-estudiante-espana-latinoamericanos",
  "homologacion-vs-convalidacion-titulo",
  "becas-estudiantes-latinoamericanos-espana",
];

/** Programs are the catalog's conversion pages; guides are the informational ones — this is the link back from a ficha into relevant guides, which otherwise have no path in from the catalog. */
export default function RelatedGuides({
  slugs = UNIVERSAL_GUIDE_SLUGS,
  title = "Antes de escribirnos, leé esto",
}: {
  slugs?: string[];
  title?: string;
}) {
  const guides = slugs.map((s) => getGuide(s)).filter((g): g is NonNullable<typeof g> => Boolean(g));
  if (guides.length === 0) return null;

  return (
    <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px] border-t border-hair pt-9 sm:pt-12">
      <h2
        className="font-display font-black uppercase m-0"
        style={{ fontSize: "clamp(20px,2.6vw,32px)", letterSpacing: "-.03em" }}
      >
        {title}
      </h2>
      <div className="grid gap-px bg-hair border border-hair mt-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))" }}>
        {guides.map((g, i) => (
          <Reveal key={g.slug} delay={Math.min(i * 0.05, 0.15)} className="bg-white">
            <Link href={`/guias/${g.slug}`} className="flex flex-col gap-2 bg-white p-5 text-ink hover:bg-off-white h-full">
              <span className="font-mono text-[10px] tracking-[.14em] text-red-signal">{g.category}</span>
              <span className="font-display font-extrabold" style={{ fontSize: "16px", lineHeight: 1.25 }}>
                {g.title}
              </span>
              {g.summary && <span className="text-[12px] text-ink-soft line-clamp-2">{g.summary}</span>}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
