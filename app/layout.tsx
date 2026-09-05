import type { Metadata } from "next";
import { Archivo, DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getSearchIndex } from "@/lib/content";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estudiaenmadrid.com"),
  title: {
    default: "Estudia en Madrid — Tu carrera sigue en Madrid",
    template: "%s | Estudia en Madrid",
  },
  description:
    "Estudia en Madrid — acompañamiento completo para estudiar en universidades privadas de España: elección de programa, convalidaciones, visado y becas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = getSearchIndex();
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <SiteChrome searchIndex={searchIndex}>{children}</SiteChrome>
      </body>
    </html>
  );
}
