"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789#%&/";

/**
 * Decode-style text reveal: call `trigger()` to scramble-in every label
 * registered via `register(index, text)`. Used for the nav submenu items.
 */
export function useScrambleGroup() {
  const [phase, setPhase] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase(1);
      return;
    }
    const dur = 900;
    const t0 = Date.now();
    setPhase(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (doneRef.current) clearTimeout(doneRef.current);
    timerRef.current = setInterval(() => {
      const p = (Date.now() - t0) / dur;
      if (p >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase(1);
        return;
      }
      setPhase(p);
    }, 40);
    doneRef.current = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase(1);
    }, dur + 250);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (doneRef.current) clearTimeout(doneRef.current);
    };
  }, []);

  const label = (name: string, idx: number) => {
    if (phase >= 1) return name;
    const local = phase * 1.45 - idx * 0.06;
    const revealed = Math.ceil(local * name.length);
    if (revealed >= name.length) return name;
    return name
      .split("")
      .map((c, i) =>
        i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )
      .join("");
  };

  return { trigger, label };
}
