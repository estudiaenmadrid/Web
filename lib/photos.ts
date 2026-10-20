import generated from "@/content/fotos/fotos.generated.json";
import type { AreaSlug } from "@/data/areas";

/**
 * Official university photography, processed to black and white by
 * scripts/fotos.mjs (`npm run fotos`) from the entries in
 * content/fotos/fotos.json. Never AI-generated: every entry must come from
 * the university itself (press kit, communications office) or the client.
 */
export interface Photo {
  id: string;
  /** Width/height of the largest processed version — the intrinsic aspect ratio. */
  width: number;
  height: number;
  widths: number[];
  alt: string;
  credit: string;
  /** University slug (data/universities.ts), or null for city/agency photos. */
  university: string | null;
  /** Areas this photo illustrates (a dental clinic -> salud). Empty = a general campus shot that suits any program of its university. */
  areas: AreaSlug[];
  subject: string | null;
  /** Focal point in percent — fed to object-position so tight crops keep the subject. */
  focal: [number, number];
  /** Fixed site slots this photo fills (see SiteSlot). */
  slots: string[];
  blur?: string;
}

// The JSON's shape is validated by scripts/fotos.mjs when it's written;
// TypeScript infers `focal` as number[] rather than the [x, y] tuple.
export const PHOTOS = generated as unknown as Photo[];

export function photoSrc(photo: Photo, width = photo.widths[photo.widths.length - 1]): string {
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
  const own = photosForUniversity(universitySlug);
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
