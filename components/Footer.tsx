"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const zone = now
        .toLocaleTimeString("en-US", { timeZone: "Europe/Madrid", timeZoneName: "shortOffset" })
        .split(" ")
        .pop();
      setTime(`${t} (${zone})`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-red-signal text-white px-5 sm:px-8 md:px-11 pt-10 sm:pt-16 md:pt-[90px] pb-6">
      <div className="relative z-10 flex flex-wrap justify-between gap-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] tracking-[.16em]">HABLEMOS</span>
          <a
            href="https://wa.me/34677055769"
            target="_blank"
            rel="noopener"
            className="text-white font-display font-black"
            style={{ fontSize: "clamp(22px,3vw,44px)", letterSpacing: "-.03em" }}
          >
            +34 677 055 769
          </a>
          <a
            href="mailto:hola@estudiaenmadrid.com"
            className="text-white text-[15px] border-b border-white/50 self-start"
          >
            hola@estudiaenmadrid.com
          </a>
          <span className="text-[13px] opacity-80">@estudiaenmadrid</span>
        </div>

        <a
          href="https://wa.me/34677055769"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-4 sm:py-6 bg-white text-red-signal self-center"
        >
          <span
            className="font-display font-black uppercase leading-[.9]"
            style={{ fontSize: "clamp(26px,4vw,64px)", letterSpacing: "-.04em" }}
          >
            Hablemos
          </span>
          <span style={{ fontSize: "clamp(22px,3vw,44px)", lineHeight: 1 }}>↗</span>
        </a>

        <div className="flex flex-col gap-2.5 font-mono text-[12px] tracking-[.08em] text-right">
          <span className="opacity-75">HORA EN MADRID</span>
          <span style={{ fontSize: "clamp(18px,2vw,28px)" }}>{time || "—"}</span>
          <Link href="/guias" className="text-white opacity-85">
            GUÍAS
          </Link>
          <Link href="/nosotros" className="text-white opacity-85">
            NOSOTROS
          </Link>
          <a href="https://wa.me/34677055769" target="_blank" rel="noopener" className="text-white opacity-85">
            WHATSAPP
          </a>
        </div>
      </div>

      <div className="overflow-hidden mt-8 sm:mt-14 md:mt-[70px] border-t border-white/30 pt-4">
        <div className="flex w-max" style={{ animation: "eem-marquee 26s linear infinite" }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="flex-none font-display font-black uppercase leading-[.9] whitespace-nowrap pr-[.3em]"
              style={{ fontSize: "clamp(48px,11vw,180px)", letterSpacing: "-.05em", color: "rgba(255,255,255,.22)" }}
            >
              Estudia en Madrid — Estudia en Madrid —{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 font-mono text-[11px] tracking-[.1em] opacity-80 mt-3.5">
        <span>© 2026 ESTUDIA EN MADRID</span>
        <span>MADRID, ESPAÑA · LATAM</span>
      </div>
    </footer>
  );
}
