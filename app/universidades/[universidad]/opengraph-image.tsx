import { ImageResponse } from "next/og";
import { UNIVERSITIES, getUniversityBySlug } from "@/data/universities";
import { BrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Universidad conveniada — Estudia en Madrid";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ universidad: u.slug }));
}

export default async function Image({ params }: { params: Promise<{ universidad: string }> }) {
  const { universidad } = await params;
  const profile = getUniversityBySlug(universidad);

  return new ImageResponse(
    (
      <BrandCard
        eyebrow="Universidad conveniada"
        title={profile?.displayName ?? "Estudia en Madrid"}
        subtitle={profile ? `Fundada en ${profile.founded} · Convenio directo con Estudia en Madrid` : undefined}
      />
    ),
    { ...size },
  );
}
