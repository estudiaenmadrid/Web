import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Program } from "@/lib/content";
import { displayUniversity } from "@/lib/programFormat";

function courseMode(modality: string): string[] {
  const modes: string[] = [];
  if (/presencial/i.test(modality) && !/semipresencial/i.test(modality)) modes.push("Onsite");
  if (/semipresencial/i.test(modality)) modes.push("Blended");
  if (/online/i.test(modality)) modes.push("Online");
  return modes;
}

/**
 * Course schema (schema.org type confirmed still active/recommended,
 * unlike the retired CourseInfo type) for each program ficha. The
 * university is the actual educational provider; Estudia en Madrid is
 * named as the sponsor/agency, matching reality instead of overclaiming
 * to be the degree-granting institution.
 */
export default function CourseSchema({ program }: { program: Program }) {
  const university = displayUniversity(program.university);
  const url = `${SITE_URL}/programas/${program.categorySlug}/${program.programSlug}`;
  const isUniversityConfirmed = !/pendiente/i.test(university);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.officialTitle ?? program.title,
    description: program.metaDescription ?? program.title,
    url,
    inLanguage: "es",
    provider: isUniversityConfirmed
      ? { "@type": "CollegeOrUniversity", name: university }
      : { "@type": "Organization", name: SITE_NAME },
    sponsor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  // A pending modality ("Pendiente de confirmar") gets no courseMode at all
  // rather than a guessed "Onsite".
  const modes = courseMode(program.modality);
  if (modes.length > 0) {
    data.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: modes,
      ...(program.city ? { location: { "@type": "Place", name: program.city } } : {}),
    };
  }

  if (program.ectsTotal && !/pendiente/i.test(String(program.ectsTotal))) {
    data.numberOfCredits = String(program.ectsTotal);
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
