import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail — distinct from BreadcrumbSchema (JSON-LD only, invisible). Every crumb but the last is a real link, for both navigation and internal linking. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] tracking-[.1em] text-ink-soft uppercase">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span className="opacity-50">/</span>}
            {isLast ? (
              <span className="text-red-signal">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-ink">
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
