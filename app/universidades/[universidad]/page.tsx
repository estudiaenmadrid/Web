import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UNIVERSITIES, getUniversityBySlug } from "@/data/universities";
import { AREAS } from "@/data/areas";
import { getAllPrograms, getModalityTags, normalizeUniversityName } from "@/lib/content";
import { photoForUniversity, photosForUniversity } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import Photo from "@/components/shared/Photo";
import PhotoCredit from "@/components/shared/PhotoCredit";
import TypePlate from "@/components/shared/TypePlate";
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
    description: `${profile.displayName}, fundada en ${profile.founded}. ${count} programa${count === 1 ? "" : "s"} con convenio directo gestionado${count === 1 ? "" : "s"} por Estudia en Madrid: admisión, visado y becas.`,
    path: `/universidades/${profile.slug}`,
  });
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[11px] tracking-[.16em] text-red-signal mb-3">{children}</div>;
}

export default async function UniversityPage({ params }: { params: Promise<{ universidad: string }> }) {
  const { universidad } = await params;
  const profile = getUniversityBySlug(universidad);
  if (!profile) notFound();

  const programs = getAllPrograms().filter((p) => normalizeUniversityName(p.university) === profile.displayName);
  const onlineCount = programs.filter((p) => /online/i.test(p.modality)).length;
  const byArea = AREAS.map((area) => ({ area, items: programs.filter((p) => p.categorySlug === area.slug) })).filter(
    (g) => g.items.length > 0
  );
  const leadPhoto = photoForUniversity(profile.slug);
  const gallery = photosForUniversity(profile.slug).filter((p) => p.id !== leadPhoto?.id);

  const stats = [
    { value: profile.founded, label: "año de fundación" },
    { value: String(profile.campuses.length), label: "campus" },
    { value: String(programs.length), label: programs.length === 1 ? "programa con convenio" : "programas con convenio" },
    onlineCount > 0
      ? { value: String(onlineCount), label: "se pueden cursar online" }
      : { value: "100%", label: "presencial, en Madrid" },
  ];

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
          style={{ fontSize: "clamp(32px,6.4vw,104px)", lineHeight: 0.9, letterSpacing: "-.045em" }}
        >
          {profile.displayName}
        </h1>
        <p className="font-serif italic mt-4 mb-0" style={{ fontSize: "clamp(20px,2.4vw,32px)" }}>
          {profile.campuses.map((c) => c.name).join(" · ")}
        </p>

        <figure className="m-0 mt-6 md:mt-11">
          <div className="relative overflow-hidden bg-ink w-full aspect-[4/3] md:aspect-[21/9]" style={{ maxHeight: "min(72vh,640px)" }}>
            {leadPhoto ? (
              <Photo photo={leadPhoto} priority sizes="(min-width: 768px) calc(100vw - 88px), calc(100vw - 40px)" />
            ) : (
              <TypePlate
                word={profile.monogram}
                label={profile.displayName}
                topLeft={`Est. ${profile.founded}`}
                topRight={`${programs.length} programa${programs.length === 1 ? "" : "s"} con convenio`}
                bottom={profile.campuses.map((c) => c.name).join(" · ")}
              />
            )}
          </div>
          {leadPhoto && (
            <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[10px] tracking-[.12em] uppercase text-ink-soft mt-2.5">
              <span>{leadPhoto.alt}</span>
              <PhotoCredit photo={leadPhoto} />
            </figcaption>
          )}
        </figure>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hair border-y border-hair mt-6 md:mt-9">
          {stats.map((s, i) => (
            // Flush with the page gutter wherever a cell starts a row (2 columns on mobile, 4 from md).
            <div key={s.label} className={`bg-off-white py-4 pr-4 min-w-0 ${i % 2 === 0 ? "pl-0" : "pl-4"} ${i === 2 ? "md:pl-4" : ""}`}>
              <div className="font-display font-black text-red-signal" style={{ fontSize: "clamp(22px,2.6vw,36px)", letterSpacing: "-.03em" }}>
                {s.value}
              </div>
              <div className="text-[13px] text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-11 py-11 sm:py-16 md:py-[110px] grid gap-9 md:gap-[72px] md:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
        <div className="flex flex-col gap-11 sm:gap-14 min-w-0" style={{ maxWidth: "68ch" }}>
          <Reveal>
            <div>
              <Kicker>01 — SOBRE LA UNIVERSIDAD</Kicker>
              <div className="eem-prose" style={{ fontSize: "18px" }}>
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <Kicker>02 — CAMPUS</Kicker>
              <div className="grid gap-px bg-hair border border-hair sm:grid-cols-2">
                {profile.campuses.map((c, i) => (
                  <div key={c.name} className="bg-white p-5 sm:p-6 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-[.14em] text-ink-soft">CAMPUS {String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display font-extrabold text-[19px]" style={{ letterSpacing: "-.015em" }}>
                      {c.name}
                    </span>
                    <span className="text-[14px] leading-[1.55] text-ink-soft first-letter:uppercase block">{c.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <Kicker>03 — ACREDITACIÓN</Kicker>
              <p className="eem-prose m-0">{profile.accreditation}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-ink text-off-white rounded-md p-6 sm:p-9">
              <Kicker>04 — POR QUÉ LA RECOMENDAMOS</Kicker>
              <p className="font-serif italic m-0" style={{ fontSize: "clamp(20px,2.2vw,30px)", lineHeight: 1.28 }}>
                {profile.whyEEM}
              </p>
            </div>
          </Reveal>

          {byArea.length > 0 && (
            <div>
              <Kicker>
                05 — PROGRAMAS CON {profile.shortName.toUpperCase()} [{programs.length}]
              </Kicker>
              <div className="flex flex-col gap-9 sm:gap-11 mt-2">
                {byArea.map(({ area, items }) => (
                  <div key={area.slug}>
                    <Link
                      href={`/programas/${area.slug}`}
                      className="group flex justify-between items-baseline gap-4 border-b-2 border-ink pb-2.5"
                    >
                      <span
                        className="font-display font-black uppercase group-hover:text-red-signal"
                        style={{ fontSize: "clamp(22px,2.6vw,34px)", letterSpacing: "-.03em" }}
                      >
                        {area.name}
                      </span>
                      <span className="font-mono text-[11px] tracking-[.14em] text-red-signal whitespace-nowrap">
                        {items.length} PROGRAMA{items.length === 1 ? "" : "S"} ↗
                      </span>
                    </Link>
                    <div className="flex flex-col">
                      {items.map((p) => (
                        <Link
                          key={p.programSlug}
                          href={`/programas/${p.categorySlug}/${p.programSlug}`}
                          className="group grid gap-x-4 gap-y-1 items-baseline py-3.5 border-b border-hair text-ink hover:bg-white grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
                        >
                          <span className="font-mono text-[10px] tracking-[.14em] text-red-signal col-span-2 sm:col-span-1">{p.level}</span>
                          <span
                            className="font-display font-extrabold block group-hover:translate-x-1 transition-transform"
                            style={{ fontSize: "clamp(15px,1.4vw,19px)", lineHeight: 1.25, letterSpacing: "-.015em" }}
                          >
                            {p.title}
                            <span className="block mt-1 font-body font-normal text-[12px] text-ink-soft" style={{ letterSpacing: 0 }}>
                              {getModalityTags(p.modality).join(" · ") || p.modality}
                            </span>
                          </span>
                          <span className="text-red-signal text-[15px]">↗</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                <div className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink-soft">Áreas</span>
                  <strong className="text-right">{byArea.map((g) => g.area.name).join(", ")}</strong>
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
                className="block text-center mt-3 text-[12px] text-ink-soft underline"
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

      {gallery.length > 0 && (
        <section className="px-5 sm:px-8 md:px-11 pb-14 sm:pb-20 md:pb-[120px]">
          <div className="flex justify-between items-baseline gap-4 border-b border-hair pb-3.5">
            <h2 className="font-display font-black uppercase m-0" style={{ fontSize: "clamp(22px,3vw,44px)", letterSpacing: "-.03em" }}>
              El campus por dentro
            </h2>
            <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">{gallery.length} FOTOS</span>
          </div>
          <div className="grid gap-3.5 sm:gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo) => (
              <Reveal key={photo.id}>
                <figure className="m-0">
                  <div className="relative overflow-hidden bg-ink aspect-[4/3]">
                    <Photo photo={photo} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
                  </div>
                  <figcaption className="font-mono text-[10px] tracking-[.12em] uppercase text-ink-soft mt-2.5 flex flex-col gap-0.5">
                    <span>{photo.alt}</span>
                    <PhotoCredit photo={photo} />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <RelatedGuides
        slugs={["como-elegir-universidad-privada-madrid", "creditos-ects-sistema-universitario-espanol", "homologacion-vs-convalidacion-titulo"]}
        title="Guías para decidir mejor"
      />
    </>
  );
}
