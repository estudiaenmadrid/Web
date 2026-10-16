import { ImageResponse } from "next/og";
import { BrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Estudia en Madrid — Tu carrera sigue en Madrid";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <BrandCard
        eyebrow="Agencia educativa · LATAM → Madrid"
        title="Tu carrera sigue en Madrid"
        subtitle="Universidades privadas en España para estudiantes de Latinoamérica"
      />
    ),
    { ...size },
  );
}
