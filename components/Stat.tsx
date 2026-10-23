interface StatProps {
  value?: string;
  label: string;
  confirm?: boolean;
  className?: string;
}

export default function Stat({ value, label, confirm, className }: StatProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <span
          className="font-display font-black text-red-signal"
          style={{ fontSize: "clamp(30px,4vw,54px)", letterSpacing: "-.03em" }}
        >
          {confirm ? "[ · ]" : value}
        </span>
        {confirm && (
          <span className="font-mono text-[10px] tracking-[.14em] text-red-signal border border-dashed border-red-signal px-1.5 py-0.5">
            A CONFIRMAR
          </span>
        )}
      </div>
      <div className="text-[14px] text-ink-soft mt-1.5">{label}</div>
    </div>
  );
}
