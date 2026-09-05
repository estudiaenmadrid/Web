// Pure string-formatting helpers with zero Node/fs dependency, so client
// components can import them directly without pulling `lib/content.ts`
// (which reads from disk) into the browser bundle.

export function normalizeUniversityName(university: string): string {
  return university.split("—")[0].trim();
}

/**
 * User-facing university label. Some frontmatter `universidad` values carry
 * long internal reasoning after "pendiente de confirmar" (e.g. "probable
 * duplicado de..." — see PROGRAMS-INDEX.md's open questions) that must
 * never reach a rendered page; collapse those to one clean phrase.
 */
export function displayUniversity(university: string): string {
  const normalized = normalizeUniversityName(university);
  return /pendiente/i.test(normalized) ? "Universidad pendiente de confirmar" : normalized;
}

export function getModalityTags(modality: string): string[] {
  const tags: string[] = [];
  if (/presencial/i.test(modality) && !/semipresencial/i.test(modality)) tags.push("PRESENCIAL");
  if (/semipresencial/i.test(modality)) tags.push("SEMIPRESENCIAL");
  if (/online/i.test(modality)) tags.push("ONLINE");
  if (tags.length === 0) tags.push(modality.split("(")[0].trim().toUpperCase() || "PENDIENTE");
  return tags;
}
