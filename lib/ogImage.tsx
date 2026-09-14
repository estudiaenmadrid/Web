import { readFileSync } from "node:fs";
import { join } from "node:path";

// Embedded as base64 so satori (next/og's renderer) doesn't need a network
// round-trip.
const wordmarkBuffer = readFileSync(join(process.cwd(), "public/assets/eem-horizontal-white.png"));
const WORDMARK_WHITE_SRC = `data:image/png;base64,${wordmarkBuffer.toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function BrandCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#fd0100",
        padding: "60px 72px 64px",
        gap: 20,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by satori (next/og), not the DOM */}
      <img src={WORDMARK_WHITE_SRC} alt="" width={260} height={130} style={{ width: 260, height: 130 }} />
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 5,
          color: "rgba(255,255,255,.85)",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 56,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.08,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      {subtitle && <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,.85)" }}>{subtitle}</div>}
    </div>
  );
}
