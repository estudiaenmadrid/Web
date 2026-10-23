interface TypePlateProps {
  /** Big display word — a university monogram such as "UAX". */
  word: string;
  /** Accessible name for the whole plate (it's announced as one image). */
  label: string;
  topLeft?: string;
  topRight?: string;
  bottom?: string;
  /** Upper bound for the big word, in % of the plate's width. */
  maxSize?: number;
  /** Positioning of the plate. It sizes itself from its box (size containment), so that box must have its own dimensions — the default fills a positioned aspect-ratio parent. */
  className?: string;
}

/**
 * Typographic stand-in for a university photo slot while no official photo
 * exists for it (lib/photos.ts) — real data set as type, never a stock or
 * AI picture pretending to be the campus. Sized with container query units
 * so the monogram fills the plate at any width and aspect ratio.
 */
export default function TypePlate({ word, label, topLeft, topRight, bottom, maxSize = 34, className }: TypePlateProps) {
  // ~0.7em per uppercase Archivo Black glyph at this tracking, +0.5 for
  // the trailing red period; 94cqw leaves room for the side padding, and
  // 44cqh keeps short, wide plates clear of the top and bottom labels.
  const fontSize = `min(${maxSize}cqw, 44cqh, ${(94 / ((word.length + 0.5) * 0.7)).toFixed(2)}cqw)`;

  return (
    <div
      role="img"
      aria-label={label}
      className={`overflow-hidden bg-ink text-off-white ${className ?? "absolute inset-0"}`}
      style={{ containerType: "size" }}
    >
      <div aria-hidden="true" className="eem-plate-grain absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute rounded-full border border-off-white/15"
        style={{ width: "78cqw", height: "78cqw", right: "-24cqw", top: "-34cqw" }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full border border-off-white/10"
        style={{ width: "52cqw", height: "52cqw", right: "-11cqw", top: "-21cqw" }}
      />
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between" style={{ padding: "clamp(14px,4.2cqw,40px)" }}>
        <div
          className="flex justify-between gap-4 font-mono uppercase tracking-[.16em] text-off-white/70"
          style={{ fontSize: "clamp(9px,1.5cqw,12px)" }}
        >
          <span>{topLeft}</span>
          <span className="text-right">{topRight}</span>
        </div>
        <div
          className="font-display font-black uppercase whitespace-nowrap"
          style={{ fontSize, lineHeight: 0.8, letterSpacing: "-.055em", marginLeft: "-.035em" }}
        >
          {word}
          <span className="text-red-signal">.</span>
        </div>
        <div
          className="flex items-center gap-2.5 font-mono uppercase tracking-[.14em] text-off-white/70 min-w-0"
          style={{ fontSize: "clamp(9px,1.4cqw,11px)" }}
        >
          <span className="block w-2 h-2 bg-red-signal flex-none" />
          <span className="truncate">{bottom}</span>
        </div>
      </div>
    </div>
  );
}
