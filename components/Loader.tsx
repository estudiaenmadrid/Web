"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "eem-loader-shown";

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const bandTopRef = useRef<HTMLDivElement>(null);
  const bandBotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      already = false;
    }
    if (already) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with sessionStorage (SSR-unsafe API), not derivable during render.
      setDone(true);
      return;
    }
    setVisible(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 400 : 1700;
    const t0 = Date.now();
    const timer = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      setCount(Math.round(p * 100));
      const dots = dotsRef.current;
      if (dots) {
        Array.from(dots.children).forEach((d, i) => {
          (d as HTMLElement).style.opacity = p * 5 > i ? "1" : ".3";
        });
      }
      if (p >= 1) {
        clearInterval(timer);
        exit(reduced);
      }
    }, 40);

    function exit(reduced: boolean) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      const finish = () => setDone(true);
      if (reduced) {
        finish();
        return;
      }
      import("gsap").then(({ gsap }) => {
        const tl = gsap.timeline({ onComplete: finish });
        tl.to(innerRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" })
          .to(bandTopRef.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 0.1)
          .to(bandBotRef.current, { yPercent: 100, duration: 0.85, ease: "expo.inOut" }, 0.1);
      });
      setTimeout(finish, 1600);
    }

    return () => clearInterval(timer);
  }, []);

  if (!visible || done) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        ref={bandTopRef}
        className="absolute inset-x-0 top-0 bg-red-signal"
        style={{ height: "50.2%" }}
      />
      <div
        ref={bandBotRef}
        className="absolute inset-x-0 bottom-0 bg-red-signal"
        style={{ height: "50.2%" }}
      />
      <div
        ref={innerRef}
        className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-11 text-off-white"
      >
        <div className="flex justify-between items-center gap-4 font-mono text-[12px] tracking-[.18em] uppercase">
          <Image
            src="/assets/eem-horizontal-white.png"
            alt="Estudia en Madrid"
            width={200}
            height={40}
            style={{ width: 200, maxWidth: "56vw", height: "auto" }}
            priority
          />
          <span>Madrid, España — Latam</span>
        </div>
        <div className="flex flex-col">
          <div
            className="font-display font-black uppercase"
            style={{
              fontSize: "clamp(48px,13.2vw,240px)",
              lineHeight: 0.82,
              letterSpacing: "-.045em",
            }}
          >
            Estudia
          </div>
          <div
            className="font-display font-black uppercase flex items-baseline gap-[.18em]"
            style={{
              fontSize: "clamp(48px,13.2vw,240px)",
              lineHeight: 0.82,
              letterSpacing: "-.045em",
            }}
          >
            en Madrid
            <span
              className="font-serif italic normal-case"
              style={{ fontSize: ".22em", letterSpacing: 0, fontWeight: 400 }}
            >
              tu futuro, acompañado
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end gap-6">
          <div
            className="font-mono"
            style={{ fontSize: "clamp(28px,4vw,56px)", lineHeight: 1, letterSpacing: "-.02em" }}
          >
            {String(count).padStart(3, "0").slice(-3)}
          </div>
          <div ref={dotsRef} className="flex gap-[7px] items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className="block rounded-full bg-off-white"
                style={{ width: 7, height: 7, opacity: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
