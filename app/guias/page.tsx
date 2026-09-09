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
        <div className="flex flex-wrap justify-between items-end gap-5">
          <h1
            className="font-display font-black uppercase m-0"
            style={{ fontSize: "clamp(38px,8vw,132px)", lineHeight: 0.9, letterSpacing: "-.045em" }}
          >
            Guías
          </h1>
          <p className="m-0 text-[15px] leading-[1.55] text-ink-soft" style={{ maxWidth: "34ch" }}>
            Todo lo que resolvemos a diario, escrito para que puedas leerlo antes de escribirnos.
          </p>
        </div>

        <p className="mt-6 text-[15px] leading-[1.6] text-ink-soft" style={{ maxWidth: "70ch" }}>
          Estas guías cubren los temas que más nos consultan estudiantes latinoamericanos antes de decidirse:
          cómo funciona el visado de estudiante, la diferencia entre homologar y convalidar un título, cómo elegir
          entre nuestras universidades convenidas según la carrera que te interesa, y qué esperar del costo de vida
          y los primeros trámites al instalarte en Madrid. Están escritas con información verificada contra fuentes
          oficiales cuando existen — no reemplazan una consulta puntual sobre tu caso, pero te dan el panorama
          completo antes de escribirnos por WhatsApp.
        </p>

        <GuideFilter guides={guides} categories={categories} />
      </main>
    </>
  );
}
