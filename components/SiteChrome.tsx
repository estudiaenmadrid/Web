"use client";

import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-off-white overflow-x-hidden font-body flex flex-col min-h-screen">
      <div className="eem-grain" aria-hidden="true" />
      <Loader />
      <PageTransition />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
