import generated from "@/content/fotos/fotos.generated.json";
import commons from "@/content/fotos/commons.json";
import type { AreaSlug } from "@/data/areas";

/**
 * Real photography only — never AI-generated. Two sources:
 *
 * - Official photos from the universities or the client, processed to black
 *   and white by scripts/fotos.mjs (`npm run fotos`) from
 *   content/fotos/fotos.json and served from /assets/fotos.
 * - Freely licensed photos of the universities' buildings on Wikimedia
 *   Commons (content/fotos/commons.json), loaded straight from Commons and
 *   greyed out in CSS. Their licences require crediting author and licence
 *   next to the photo — see PhotoCredit.
 */
export interface Photo {
  id: string;
  source: "local" | "commons";
  /** Intrinsic size of the largest version, when known. */
  width?: number;
  height?: number;
  widths: number[];
  alt: string;
  /** Plain credit line for local photos, e.g. "Foto: Universidad Nebrija". */
  credit?: string;
  /** Commons attribution: author, licence name and links. */
  author?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
  /** University slug (data/universities.ts), or null for city/agency photos. */
  university: string | null;
  /** Areas this photo illustrates (a dental clinic -> salud). Empty = a general campus shot that suits any program of its university. */
  areas: AreaSlug[];
  subject: string | null;
  /** Focal point in percent — fed to object-position so tight crops keep the subject. */
  focal: [number, number];
  /** Fixed site slots this photo fills (see SiteSlot). */
  slots: string[];
  /** Whether program fichas may use it. Building shots only appear on university surfaces: with one or two per university, every ficha of that university would otherwise repeat the same picture. */
  fichas: boolean;
  blur?: string;
  /** Commons file name, for source === "commons". */
  file?: string;
}

interface CommonsEntry {
  id: string;
  archivo: string;
  universidad: string;
  tema?: string;
  alt: string;
  autor: string;
  licencia: string;
  licenciaUrl: string;
  ancho?: number;
  alto?: number;
  foco?: number[];
}

// Standard Wikimedia thumbnail widths (already cached on their CDN). Asking
// for a width at or above the original's returns the original file.
const COMMONS_WIDTHS = [500, 960, 1280, 1920];

function fromCommons(entry: CommonsEntry): Photo {
  const file = entry.archivo.replace(/ /g, "_");
  const widths = entry.ancho ? COMMONS_WIDTHS.filter((w) => w < entry.ancho!) : COMMONS_WIDTHS;
  if (entry.ancho && entry.ancho <= COMMONS_WIDTHS[COMMONS_WIDTHS.length - 1]) widths.push(entry.ancho);
  return {
    id: entry.id,
    source: "commons",
    file,
    width: entry.ancho,
    height: entry.alto,
    widths,
    alt: entry.alt,
    author: entry.autor,
    license: entry.licencia,
    licenseUrl: entry.licenciaUrl,
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
    university: entry.universidad,
    areas: [],
    subject: entry.tema ?? null,
    focal: (entry.foco as [number, number] | undefined) ?? [50, 50],
    slots: [],
    fichas: false,
  };
}

// The local JSON's shape is validated by scripts/fotos.mjs when it's written;
// TypeScript infers `focal` as number[] rather than the [x, y] tuple. Local
// (official) photos come first, so they win over Commons ones as a
// university's lead photo once they exist.
export const PHOTOS: Photo[] = [
  ...(generated as unknown as Omit<Photo, "source" | "fichas">[]).map((p) => ({ ...p, source: "local" as const, fichas: true })),
  ...(commons as CommonsEntry[]).map(fromCommons),
];

export function photoSrc(photo: Photo, width = photo.widths[photo.widths.length - 1]): string {
  if (photo.source === "commons") {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(photo.file!)}?width=${width}`;
  }
  return `/assets/fotos/${photo.id}-${width}.webp`;
}

export function photoSrcSet(photo: Photo): string {
  return photo.widths.map((w) => `${photoSrc(photo, w)} ${w}w`).join(", ");
}

// FNV-1a — a stable, dependency-free string hash, so the same ficha always
// gets the same photo across builds while sibling fichas spread over the pool.
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function photosForUniversity(universitySlug: string): Photo[] {
  return PHOTOS.filter((p) => p.university === universitySlug);
}

/** The university's lead photo: its first general campus shot, else its first photo of any kind. */
export function photoForUniversity(universitySlug: string): Photo | undefined {
  const own = photosForUniversity(universitySlug);
  return own.find((p) => p.areas.length === 0) ?? own[0];
}

/**
 * Photo for a program ficha: a photo of the same university tagged with the
 * program's area first (the dental clinic for Odontología), else one of its
 * general campus shots — never another area's photo, and never another
 * university's. Picked by `seed` (the program slug) so fichas of the same
 * university don't all repeat the same picture.
 */
export function photoForProgram(universitySlug: string | undefined, area: AreaSlug, seed: string): Photo | undefined {
  if (!universitySlug) return undefined;
  const own = photosForUniversity(universitySlug).filter((p) => p.fichas);
  const byArea = own.filter((p) => p.areas.includes(area));
  const pool = byArea.length > 0 ? byArea : own.filter((p) => p.areas.length === 0);
  if (pool.length === 0) return undefined;
  return pool[hash(seed) % pool.length];
}

/** Fixed places on the site that take a photo of their own: the home page's closing section and /nosotros (a real team photo). */
export type SiteSlot = "home-cierre" | "nosotros";

export function photoForSlot(slot: SiteSlot): Photo | undefined {
  return PHOTOS.find((p) => p.slots.includes(slot));
}
