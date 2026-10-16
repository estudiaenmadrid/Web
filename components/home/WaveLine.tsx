"use client";

import { useLayoutEffect, useRef, useState } from "react";

/** The wavy red line under the process cards, drawing itself in once scrolled into view. */
export default function WaveLine() {
  const rootRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);

  // Measure before paint so the path never flashes fully-drawn first.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (path) setLength(path.getTotalLength());
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with matchMedia (SSR-unsafe API), not derivable during render.
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="w-full mt-6 block"
      style={{ height: "clamp(30px,5vw,60px)" }}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M0 40 C 100 8, 200 8, 300 40 S 500 72, 600 40 S 800 8, 900 40 S 1100 72, 1200 40"
        fill="none"
        stroke="#FD0100"
        strokeWidth="2"
        style={
          length !== null
            ? {
                strokeDasharray: length,
                strokeDashoffset: drawn ? 0 : length,
                transition: "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)",
              }
            : undefined
        }
      />
      <path
        d="M0 52 H1200"
        fill="none"
        stroke="rgba(248,244,235,.35)"
        strokeWidth="1"
        strokeDasharray="6 8"
        style={{
          opacity: drawn ? 1 : 0,
          transition: "opacity .6s ease .8s",
        }}
      />
    </svg>
  );
}
