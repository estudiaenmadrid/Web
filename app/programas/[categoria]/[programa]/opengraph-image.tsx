import { ImageResponse } from "next/og";
import { getArea } from "@/data/areas";
import { displayUniversity, getAllPrograms, getProgram } from "@/lib/content";
import { BrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Programa — Estudia en Madrid";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPrograms().map((p) => ({ categoria: p.categorySlug, programa: p.programSlug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ categoria: string; programa: string }>;
}) {
  const { categoria, programa } = await params;
  const area = getArea(categoria);
  const program = area ? getProgram(area.slug, programa) : undefined;
  const universityLabel = program ? displayUniversity(program.university) : undefined;
  // Some program titles already spell out the university (e.g. "... (Universidad Nebrija)");
  // skip the subtitle then so it isn't repeated right below.
  const showSubtitle = universityLabel && !program?.title.includes(universityLabel);

  return new ImageResponse(
    (
      <BrandCard
        eyebrow={area?.name ?? "Programa"}
        title={program?.title ?? "Estudia en Madrid"}
        subtitle={showSubtitle ? universityLabel : undefined}
      />
    ),
    { ...size },
  );
}
