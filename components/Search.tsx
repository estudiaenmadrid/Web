"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { SearchEntry } from "@/lib/content";

interface SearchProps {
  index: SearchEntry[];
  /** Render as a bordered nav cell (desktop) instead of a plain row button (mobile menu). */
  variant?: "nav" | "menu";
}

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Search({ index, variant = "nav" }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount flag needed before using createPortal (document is unavailable during SSR).
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((e) => e.haystack.includes(q)).slice(0, 40);
  }, [query, index]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {variant === "nav" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buscar programas"
          className="relative overflow-hidden hidden md:flex items-center gap-2 px-[18px] border-r border-hair text-ink hover:bg-white"
        >
          <SearchIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 py-2 text-[14px] font-display font-bold uppercase text-ink"
        >
          <SearchIcon size={15} /> Buscar
        </button>
      )}

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[300] flex flex-col"
          style={{ background: "rgba(22,19,17,.7)" }}
          onClick={close}
        >
          <div
            className="mx-auto w-full mt-0 sm:mt-[10vh] flex flex-col bg-off-white sm:rounded-md overflow-hidden"
            style={{ maxWidth: 640, maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-hair px-5 py-4">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Buscar programa, universidad, área…"
                className="flex-1 bg-transparent outline-none font-body text-[16px] placeholder:text-ink-soft"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar búsqueda"
                className="font-mono text-[11px] tracking-[.14em] text-ink-soft border border-hair px-2 py-1 hover:bg-white"
              >
                ESC
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {query.trim() === "" && (
                <p className="px-5 py-8 text-[14px] text-ink-soft text-center">
                  Escribe para buscar entre {index.length} programas por nombre, universidad o área.
                </p>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-[14px] text-ink-soft m-0">
                    No encontramos programas para &ldquo;{query}&rdquo;.
                  </p>
                  <a
                    href="https://wa.me/34677055769"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 mt-4 font-display font-extrabold text-[13px] uppercase tracking-[.04em] text-red-signal border-b-2 border-red-signal pb-[2px]"
                  >
                    Pregúntanos por WhatsApp ↗
                  </a>
                </div>
              )}

              {results.map((r) => (
                <Link
                  key={`${r.categorySlug}/${r.programSlug}`}
                  href={`/programas/${r.categorySlug}/${r.programSlug}`}
                  onClick={close}
                  className="flex items-center gap-3 sm:gap-4 px-5 py-3.5 border-b border-hair text-ink hover:bg-white"
                >
                  <span className="font-mono text-[10px] tracking-[.1em] text-red-signal shrink-0 w-[74px]">
                    {r.level}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display font-bold text-[15px] leading-tight truncate">
                      {r.title}
                    </span>
                    <span className="block text-[12px] text-ink-soft truncate">{r.university}</span>
                  </span>
                  <span className="text-red-signal text-[15px] shrink-0">↗</span>
                </Link>
              ))}
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
