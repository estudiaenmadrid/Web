interface TicketProps {
  quote: string;
  name: string;
  meta: string;
  placeholder?: boolean;
  dark?: boolean;
  className?: string;
}

export default function Ticket({ quote, name, meta, placeholder, dark, className }: TicketProps) {
  return (
    <div
      className={`relative rounded-md border p-5 ${
        dark ? "bg-ink text-off-white border-ink" : "bg-white border-hair"
      } ${className ?? ""}`}
    >
      {placeholder && (
        <div className="inline-block font-mono text-[10px] tracking-[.14em] text-red-signal border border-dashed border-red-signal px-1.5 py-0.5 mb-3.5">
          TESTIMONIO PLACEHOLDER
        </div>
      )}
      <p className="font-serif italic text-[20px] leading-[1.25] my-3.5">&ldquo;{quote}&rdquo;</p>
      <div className={`border-t border-dashed my-3.5 ${dark ? "border-white/25" : "border-hair"}`} />
      <div className="flex justify-between items-end">
        <div>
          <div className="font-display font-extrabold text-[13px] uppercase">{name}</div>
          <div className={`text-[12px] ${dark ? "opacity-70" : "text-ink-soft"}`}>{meta}</div>
        </div>
        <div className="flex gap-[1.5px] items-end h-[22px]" aria-hidden="true">
          {[100, 70, 100, 60, 100, 80, 100].map((h, i) => (
            <i
              key={i}
              className={`block ${dark ? "bg-off-white" : "bg-ink"}`}
              style={{ width: i % 2 === 0 ? 2 : 1, height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
