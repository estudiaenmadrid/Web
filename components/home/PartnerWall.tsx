import Link from "next/link";
import { UNIVERSITIES } from "@/data/universities";
import { countProgramsForUniversity } from "@/lib/content";
import { photoForUniversity } from "@/lib/photos";
import Photo from "@/components/shared/Photo";
import TypePlate from "@/components/shared/TypePlate";

/**
 * Home hero visual: the partner universities themselves, one tile each —
 * the university's official photo once one is loaded (lib/photos.ts), its
 * typographic plate until then.
 */
export default function PartnerWall() {
  return (
    <div className="mt-6 md:mt-10">
      <div className="flex justify-between items-baseline gap-4 font-mono text-[11px] tracking-[.16em] mb-3">
        <span className="text-red-signal">CONVENIO DIRECTO CON</span>
        <Link href="/universidades" className="text-ink-soft hover:text-red-signal">
          {String(UNIVERSITIES.length).padStart(2, "0")} UNIVERSIDADES ↗
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hair border border-hair">
        {UNIVERSITIES.map((u) => {
          const photo = photoForUniversity(u.slug);
          const count = countProgramsForUniversity(u.displayName);
          return (
            <Link
              key={u.slug}
              href={`/universidades/${u.slug}`}
              aria-label={`${u.displayName} — ${count} programa${count === 1 ? "" : "s"} con convenio`}
              className="group relative block overflow-hidden bg-ink aspect-[3/4] lg:aspect-[4/5]"
            >
              {photo ? (
                <>
                  <Photo
                    photo={photo}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5 bg-gradient-to-t from-ink/85 to-transparent text-off-white">
                    <span className="font-display font-black uppercase leading-[.9]" style={{ fontSize: "clamp(22px,2.6vw,40px)", letterSpacing: "-.04em" }}>
                      {u.monogram}
                    </span>
                    <span className="font-mono text-[10px] tracking-[.14em]">{count} PROGRAMAS</span>
                  </span>
                </>
              ) : (
                <TypePlate
                  word={u.monogram}
                  label={u.displayName}
                  topLeft={`Est. ${u.founded}`}
                  topRight={`${count} programa${count === 1 ? "" : "s"}`}
                  bottom={u.campuses.map((c) => c.name).join(" · ")}
                />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 border-2 border-red-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
