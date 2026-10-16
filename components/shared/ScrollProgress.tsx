"use client";

import { useEffect, useState } from "react";

/** Thin fixed progress bar tracking how far through the page the reader has scrolled. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[110] bg-transparent pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-red-signal"
        style={{ width: `${progress * 100}%`, transition: "width 60ms linear" }}
      />
    </div>
  );
}
