import type { Metadata } from "next";
import { getAllGuides, getGuideCategories } from "@/lib/guides";
import GuideFilter from "@/components/guias/GuideFilter";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guías para estudiar en Madrid",
  description: "Guías sobre visado de estudiante, homologación de títulos, cómo elegir universidad y vida en Madrid para estudiantes latinoamericanos.",
  path: "/guias",
});

export default function GuiasPage() {
  const guides = getAllGuides();
  const categories = getGuideCategories();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", path: "/" }, { name: "Guías", path: "/guias" }]} />
      <main className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16 pb-14 sm:pb-20 md:pb-[120px]">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">GUÍAS PRÁCTICAS</div>
        <h1
          className="font-display font-black uppercase mt-3.5 mb-0"
          style={{ fontSize: "clamp(44px,10vw,180px)", lineHeight: 0.86, letterSpacing: "-.045em" }}
        >
          Guías
        </h1>
        <div className="grid gap-5 md:gap-16 mt-5 md:mt-9 md:grid-cols-2 items-start">
          <p className="font-serif italic m-0" style={{ maxWidth: "22ch", fontSize: "clamp(24px,3vw,44px)", lineHeight: 1.08 }}>
            Todo lo que resolvemos a diario, escrito para que lo leas antes de escribirnos.
          </p>
          <p className="m-0 text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft" style={{ maxWidth: "58ch" }}>
            Visado de estudiante, la diferencia entre homologar y convalidar, cómo elegir universidad, cuánto cuesta
            vivir en Madrid y los primeros trámites al llegar. Escritas con fuentes oficiales cuando existen — no
            reemplazan una consulta sobre tu caso, pero te dan el panorama completo antes de hablar con nosotros.
          </p>
        </div>

        <GuideFilter guides={guides} categories={categories} />
      </main>
    </>
  );
}
