import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SplitHeadline from "@/components/SplitHeadline";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Página no encontrada",
  description: "La página que buscás no existe o cambió de dirección.",
  path: "/404",
  index: false,
});

const LINKS = [
  { href: "/programas", label: "Programas", desc: "Grados y másteres con convenio directo" },
  { href: "/universidades", label: "Universidades", desc: "Las 3 universidades con las que trabajamos" },
  { href: "/guias", label: "Guías", desc: "Visado, convalidaciones, vivir en Madrid" },
  { href: "/nosotros", label: "Nosotros", desc: "Quiénes somos y cómo acompañamos el proceso" },
];

export default function NotFound() {
  return (
    <>
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.16em] text-red-signal">ERROR 404</div>
        <SplitHeadline
          className="mt-3.5 font-display font-black uppercase text-ink"
          fontSize="clamp(40px,8vw,120px)"
          lines={[
            { text: "Esta página" },
            { text: "se perdió en" },
            { text: "el camino", className: "text-red-signal" },
          ]}
        />
        <p
          className="font-serif italic mt-4"
          style={{ maxWidth: "48ch", fontSize: "clamp(18px,2vw,26px)", lineHeight: 1.3 }}
        >
          La dirección cambió o el contenido ya no existe. Pero seguimos acá — empezá de nuevo desde alguno de
          estos puntos.
        </p>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[90px]">
        <div className="grid gap-px bg-hair border border-hair" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))" }}>
          {LINKS.map((link) => (
            <Reveal key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col justify-between gap-6 bg-off-white p-6 h-full min-h-[160px]"
              >
                <span className="font-mono text-[11px] tracking-[.16em] text-ink-soft group-hover:text-red-signal">
                  ↗
                </span>
                <div>
                  <div className="font-display font-extrabold uppercase text-[20px]" style={{ letterSpacing: "-.02em" }}>
                    {link.label}
                  </div>
                  <p className="text-[13px] text-ink-soft mt-1.5 m-0">{link.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-px flex flex-wrap items-center justify-between gap-5 bg-red-signal text-white p-6 sm:p-7">
            <div>
              <div className="font-mono text-[11px] tracking-[.16em]">¿NO ENCONTRÁS LO QUE BUSCABAS?</div>
              <p className="font-display font-extrabold mt-2 mb-0 text-[20px]" style={{ letterSpacing: "-.02em" }}>
                Escribinos por WhatsApp y te orientamos directo
              </p>
            </div>
            <a
              href="https://wa.me/34677055769"
              target="_blank"
              rel="noopener"
              className="text-white font-display font-extrabold text-[14px] uppercase tracking-[.04em] border-b-2 border-white pb-[3px] shrink-0"
            >
              +34 677 055 769 ↗
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
