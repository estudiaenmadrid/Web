interface PlaceholderImageProps {
  label: string;
  className?: string;
  grayscale?: boolean;
}

/**
 * Stand-in for photography/logos not yet approved by the client (see
 * content/_CONTENT-SPEC.md and testimonios.md notes). Flagged clearly
 * rather than filled with generic stock imagery.
 */
export default function PlaceholderImage({ label, className, grayscale = true }: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-hair/60 ${grayscale ? "" : ""} ${className ?? ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(22,19,17,.05) 0px, rgba(22,19,17,.05) 1px, transparent 1px, transparent 10px)",
      }}
    >
      <span className="font-mono text-[10px] tracking-[.14em] uppercase text-ink-soft border border-dashed border-ink-soft/50 px-2 py-1 bg-off-white/80 text-center max-w-[80%]">
        {label}
      </span>
    </div>
  );
}
