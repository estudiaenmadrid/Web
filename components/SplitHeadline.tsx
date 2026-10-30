"use client";

import { useEffect, useRef } from "react";

interface SplitHeadlineProps {
  lines: { text: string; className?: string }[];
  className?: string;
  fontSize?: string;
  lineHeight?: number | string;
  letterSpacing?: string;
}

/** Character-by-character reveal for hero headlines, matching the prototype's data-split. */
export default function SplitHeadline({
  lines,
  className,
  fontSize = "clamp(46px,11.6vw,214px)",
  lineHeight = 0.85,
  letterSpacing = "-.045em",
}: SplitHeadlineProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !root) return;
      const lineEls = Array.from(root.querySelectorAll<HTMLElement>("[data-line]"));
      lineEls.forEach((lineEl) => {
        const text = lineEl.textContent ?? "";
        lineEl.textContent = "";
        lineEl.style.overflow = "hidden";
        const chars = text.split("").map((c) => {
          const span = document.createElement("span");
          span.style.display = "inline-block";
          span.textContent = c === " " ? " " : c;
          lineEl.appendChild(span);
          return span;
        });
        gsap.fromTo(
          chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.022, delay: 0.15 }
        );
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <h1 ref={rootRef} className={className} style={{ fontSize, lineHeight, letterSpacing }}>
      {lines.map((line, i) => (
        <span key={i} data-line className={`block ${line.className ?? ""}`}>
          {line.text}
        </span>
      ))}
    </h1>
  );
}
