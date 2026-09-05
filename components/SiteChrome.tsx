"use client";

import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SearchEntry } from "@/lib/content";

export default function SiteChrome({
  children,
  searchIndex,
}: {
  children: React.ReactNode;
  searchIndex: SearchEntry[];
}) {
  return (
    <div className="relative bg-off-white overflow-x-hidden font-body flex flex-col min-h-screen">
      <div className="eem-grain" aria-hidden="true" />
      <Loader />
      <PageTransition />
      <Header searchIndex={searchIndex} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
