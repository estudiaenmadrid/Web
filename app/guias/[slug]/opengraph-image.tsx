import { ImageResponse } from "next/og";
import { getAllGuides, getGuide } from "@/lib/guides";
import { BrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Guía — Estudia en Madrid";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  return new ImageResponse(
    (
      <BrandCard
        eyebrow={`Guía · ${guide?.category ?? "Estudia en Madrid"}`}
        title={guide?.title ?? "Guías — Estudia en Madrid"}
      />
    ),
    { ...size },
  );
}
