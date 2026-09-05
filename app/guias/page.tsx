import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guías",
  description: "Guías sobre visados, convalidaciones, universidades y vida en Madrid para estudiantes latinoamericanos.",
};

const CATEGORIES = ["VISADOS", "CONVALIDACIONES", "UNIVERSIDADES", "VIVIR EN MADRID"];

export default function GuiasPage() {
  return (
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

      <div className="flex flex-wrap gap-0 mt-6 sm:mt-9 md:mt-12 border-y border-hair">
        <span className="flex items-center gap-2 px-5 py-4 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase">
          TODAS <span className="font-mono text-[10px] text-red-signal">[0]</span>
        </span>
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            className="flex items-center gap-2 px-5 py-4 border-r border-hair font-display font-extrabold text-[12px] tracking-[.1em] uppercase text-ink-soft"
          >
            {cat} <span className="font-mono text-[10px] text-red-signal">[0]</span>
          </span>
        ))}
      </div>

      <div className="mt-9 sm:mt-12 md:mt-16 border border-dashed border-hair rounded-md p-8 sm:p-12 text-center max-w-[60ch] mx-auto">
        <div className="font-mono text-[10px] tracking-[.14em] text-red-signal border border-dashed border-red-signal inline-block px-2 py-1 mb-4">
          EN PREPARACIÓN
        </div>
        <p className="font-serif italic m-0" style={{ fontSize: "clamp(20px,2.4vw,30px)", lineHeight: 1.25 }}>
          Todavía no publicamos guías escritas — esta sección está lista para recibirlas.
        </p>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
          Mientras tanto, escríbenos directo por WhatsApp y te resolvemos lo mismo que resolvería un artículo:
          visado, convalidaciones, elegir universidad o instalarte en Madrid.
        </p>
        <a
          href="https://wa.me/34677055769"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 mt-5 font-display font-extrabold text-[14px] uppercase tracking-[.04em] border-b-2 border-red-signal pb-[3px]"
        >
          Escribir por WhatsApp <span>↗</span>
        </a>
      </div>
    </main>
  );
}
