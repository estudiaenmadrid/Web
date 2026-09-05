"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AREAS } from "@/data/areas";
import { usePixelTrail } from "@/hooks/usePixelTrail";
import { useScrambleGroup } from "@/hooks/useScramble";
import Search from "@/components/Search";
import type { SearchEntry } from "@/lib/content";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/programas", label: "Programas", hint: "[05]" },
  { href: "/universidades", label: "Universidades" },
  { href: "/guias", label: "Guías" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Header({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const [submenu, setSubmenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { onMouseMove } = usePixelTrail();
  const { trigger, label } = useScrambleGroup();
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset transient nav state when the route changes, without an extra
  // effect + render round-trip (React's "adjusting state on prop change"
  // pattern: https://react.dev/learn/you-might-not-need-an-effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (submenu) setSubmenu(false);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    if (submenu) trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submenu]);

  const openSubmenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSubmenu(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setSubmenu(false), 120);
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-hair bg-off-white/92 backdrop-blur-sm">
      <div className="flex items-stretch h-[70px] sm:h-[78px]">
        <Link
          href="/"
          className="relative overflow-hidden flex-none flex items-center px-4 sm:px-[18px] border-r border-hair text-ink"
          onMouseMove={onMouseMove}
        >
          <Image
            src="/assets/eem-horizontal-black.png"
            alt="Estudia en Madrid"
            width={124}
            height={26}
            style={{ width: 110, height: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-stretch flex-1">
          {NAV_LINKS.map((link) => {
            const isPrograms = link.href === "/programas";
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseMove={onMouseMove}
                onMouseEnter={isPrograms ? openSubmenu : undefined}
                onMouseLeave={isPrograms ? scheduleClose : undefined}
                className="relative overflow-hidden flex items-center gap-2 px-[22px] border-r border-hair text-[13px] font-medium tracking-[.06em] uppercase text-ink"
              >
                {link.label}
                {link.hint && <span className="font-mono text-[10px] text-red-signal">{link.hint}</span>}
              </Link>
            );
          })}
        </nav>

        <Search index={searchIndex} />

        <a
          href="https://wa.me/34677055769"
          target="_blank"
          rel="noopener"
          data-no-transition
          className="hidden md:flex items-center gap-3 px-6 bg-red-signal text-white font-display font-extrabold text-[13px] tracking-[.04em] uppercase transition-colors hover:bg-red-dark"
        >
          Habla con un asesor <span className="text-[16px] leading-none">↗</span>
        </a>

        <button
          type="button"
          className="md:hidden ml-auto px-5 flex items-center gap-2 font-display font-extrabold text-[12px] uppercase tracking-[.08em]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Abrir menú"
        >
          {mobileOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      {submenu && (
        <div
          onMouseEnter={openSubmenu}
          onMouseLeave={scheduleClose}
          className="hidden md:block border-t border-hair bg-off-white"
        >
          <Link
            href="/programas"
            onMouseMove={onMouseMove}
            className="relative overflow-hidden flex justify-between items-center gap-3.5 px-[22px] py-3.5 border-b border-hair text-ink font-display font-extrabold text-[12px] tracking-[.1em] uppercase hover:bg-white"
          >
            Ver todos los programas <span className="text-red-signal">↗</span>
          </Link>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(212px, 1fr))" }}>
            {AREAS.map((area, i) => (
              <Link
                key={area.slug}
                href={`/programas/${area.slug}`}
                onMouseMove={onMouseMove}
                className="relative overflow-hidden flex flex-col gap-2 px-[22px] py-[26px] border-r border-hair text-ink hover:bg-white"
              >
                <span className="font-mono text-[11px] tracking-[.16em] text-red-signal">
                  {area.num} — ÁREA
                </span>
                <span
                  className="font-display font-extrabold uppercase"
                  style={{ fontSize: "clamp(15px,1.2vw,19px)", letterSpacing: "-.02em" }}
                >
                  {label(area.name, i)}
                </span>
                <span className="text-[13px] text-ink-soft">Grados, convalidaciones y másteres</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden border-t border-hair bg-off-white">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-4 border-b border-hair text-[14px] font-medium tracking-[.04em] uppercase text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 border-b border-hair">
            <Search index={searchIndex} variant="menu" />
          </div>
          <div className="px-5 py-3 border-b border-hair">
            <div className="text-[11px] font-mono tracking-[.14em] text-red-signal mb-2">ÁREAS</div>
            <div className="flex flex-col gap-1">
              {AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/programas/${area.slug}`}
                  className="py-2 text-[14px] font-display font-bold uppercase"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="https://wa.me/34677055769"
            target="_blank"
            rel="noopener"
            data-no-transition
            className="flex justify-center items-center gap-3 px-6 py-4 bg-red-signal text-white font-display font-extrabold text-[13px] tracking-[.04em] uppercase"
          >
            Habla con un asesor ↗
          </a>
        </div>
      )}
    </header>
  );
}
