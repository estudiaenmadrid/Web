"use client";

import { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  heading: string;
}

/** Sticky in-page nav for long ficha/guide bodies — highlights the section currently in view via IntersectionObserver. */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Índice de la página" className="hidden md:flex flex-col gap-0.5 border-l border-hair pl-4">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="py-1.5 text-[12px] leading-[1.3] transition-colors"
          style={{ color: item.id === activeId ? "var(--red-signal)" : "var(--ink-soft)" }}
        >
          {item.heading}
        </a>
      ))}
    </nav>
  );
}
