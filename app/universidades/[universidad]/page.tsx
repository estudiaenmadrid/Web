import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIVERSITIES, getUniversityBySlug } from "@/data/universities";
import { getAllPrograms, groupPrograms, normalizeUniversityName } from "@/lib/content";
import { CAMPUS_BY_UNIVERSITY } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import RelatedGuides from "@/components/shared/RelatedGuides";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ universidad: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ universidad: string }>;
}): Promise<Metadata> {
  const { universidad } = await params;
  const profile = getUniversityBySlug(universidad);
  if (!profile) return {};
  const count = getAllPrograms().filter((p) => normalizeUniversityName(p.university) === profile.displayName).length;
  return pageMetadata({
    title: `${profile.displayName} — convenio con Estudia en Madrid`,
    description: `${profile.displayName}, fundada en ${profile.founded}. ${count} programas con convenio directo gestionados por Estudia en Madrid: admisión, visado y becas.`,
    path: `/universidades/${profile.slug}`,
  });
}

export default async function UniversityPage({ params }: { params: Promise<{ universidad: string }> }) {
  const { universidad } = await params;
  const profile = getUniversityBySlug(universidad);
  if (!profile) notFound();

  const programs = getAllPrograms().filter((p) => normalizeUniversityName(p.university) === profile.displayName);
  const groups = groupPrograms(programs);
  const campusPhoto = CAMPUS_BY_UNIVERSITY[profile.displayName];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Universidades", path: "/universidades" },
          { name: profile.shortName, path: `/universidades/${profile.slug}` },
        ]}
      />
      <section className="px-5 sm:px-8 md:px-11 pt-7 sm:pt-12 md:pt-16">
        <Breadcrumb
          items={[
            { name: "Inicio", path: "/" },
            { name: "Universidades", path: "/universidades" },
            { name: profile.shortName, path: `/universidades/${profile.slug}` },
          ]}
        />
        <Link
          href="/universidades"
          className="inline-flex items-center gap-2.5 mt-3.5 border border-hair px-3.5 py-2.5 font-display font-extrabold text-[12px] tracking-[.08em] uppercase hover:bg-white"
        >
          <span className="text-red-signal">←</span> Ver todas las universidades
        </Link>
        <h1
          className="font-display font-black uppercase mt-4"
          style={{ fontSize: "clamp(32px,6.4vw,96px)", lineHeight: 0.9, letterSpacing: "-.045em" }}
        >
          {profile.displayName}
        </h1>
        <p className="font-serif italic mt-4" style={{ fontSize: "clamp(20px,2.4vw,32px)" }}>
          Fundada en {profile.founded} · {programs.length} programa{programs.length === 1 ? "" : "s"} con convenio
        </p>
        {campusPhoto && (
          <div
            className="relative mt-5.5 md:mt-11 overflow-hidden"
            style={{ height: "clamp(220px,38vh,440px)", filter: "grayscale(1) contrast(1.06)" }}
          >
            <Image
              src={campusPhoto}
              alt={`Ambiente de campus universitario — ${profile.displayName}`}
              fill
              unoptimized
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-6 sm:gap-9 md:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
        <div className="flex flex-col gap-9 sm:gap-11" style={{ maxWidth: "62ch" }}>
          <Reveal>
            <div>
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">01 — SOBRE LA UNIVERSIDAD</div>
              <div className="eem-prose" style={{ fontSize: "18px" }}>
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">02 — CAMPUS</div>
              <div className="eem-sec-checklist">
                <ul>
                  {profile.campuses.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}</strong> — {c.note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">03 — ACREDITACIÓN</div>
              <p className="eem-prose" style={{ margin: 0 }}>
                {profile.accreditation}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-ink text-off-white rounded-md p-6 sm:p-8">
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">04 — POR QUÉ LA RECOMENDAMOS</div>
              <p className="font-serif italic" style={{ fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.3, margin: 0 }}>
                {profile.whyEEM}
              </p>
            </div>
          </Reveal>

          {groups.length > 0 && (
            <div>
              <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">
                05 — PROGRAMAS CON {profile.shortName.toUpperCase()}
              </div>
              {groups.map((group) => (
                <div key={group.title} className="mt-5 first:mt-0">
                  <div className="flex gap-2.5 items-baseline font-mono text-[11px] tracking-[.16em] text-ink-soft uppercase">
                    <span>{group.title}</span>
                    <span className="text-red-signal">[{group.items.length}]</span>
                  </div>
                  <div className="flex flex-col mt-2">
                    {group.items.map((p) => (
                      <Reveal key={p.programSlug}>
                        <Link
                          href={`/programas/${p.categorySlug}/${p.programSlug}`}
                          className="grid gap-2.5 sm:gap-4 items-center py-3.5 border-b border-hair text-ink hover:bg-white"
                          style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}
                        >
                          <span
                            className="font-display font-extrabold block"
                            style={{ fontSize: "clamp(15px,1.5vw,20px)", lineHeight: 1.2, letterSpacing: "-.015em" }}
                          >
                            {p.title}
                          </span>
                          <span className="text-red-signal text-[15px]">↗</span>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-3.5 md:sticky md:top-24 self-start">
          <Reveal delay={0.1}>
            <div className="bg-white border border-hair rounded-md p-5.5">
              <div className="font-mono text-[10px] tracking-[.16em] text-red-signal">DATOS CLAVE</div>
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink-soft">Fundación</span>
                  <strong className="text-right">{profile.founded}</strong>
                </div>
                <div className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink-soft">Campus</span>
                  <strong className="text-right">{profile.campuses.length}</strong>
                </div>
                <div className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink-soft">Programas con EEM</span>
                  <strong className="text-right">{programs.length}</strong>
                </div>
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
              <a
                href={profile.officialUrl}
                target="_blank"
                rel="noopener"
                className="text-center mt-3 text-[12px] text-ink-soft underline"
              >
                Sitio oficial de {profile.shortName} ↗
              </a>
            </div>
          </Reveal>
          <p className="text-[13px] text-ink-soft m-0">
            Te respondemos por WhatsApp en horario de Madrid. Sin formularios eternos.
          </p>
        </aside>
      </section>

      <RelatedGuides
        slugs={["como-elegir-universidad-privada-madrid", "creditos-ects-sistema-universitario-espanol", "homologacion-vs-convalidacion-titulo"]}
        title="Guías para decidir mejor"
      />
    </>
  );
}
