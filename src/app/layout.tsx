import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vakarukemperiai.lt"),
  title: "Vakarų kemperiai",
  description: "Kemperių ir mikroautobusų nuoma Klaipėdoje.",
};

export const viewport: Viewport = {
  themeColor: "#f4f2ed",
};

// Runs before first paint: marks that JS is on (so reveal styles may hide content)
// and skips the intro loader for visitors who already saw it this session.
// Safety net: if the page scripts have not started within 3s (slow network, failed
// download), drop data-js so every hidden element simply shows.
const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{if(sessionStorage.getItem('vk_loaded')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-seen','');d.setAttribute('data-loaded','')}}catch(e){d.setAttribute('data-seen','');d.setAttribute('data-loaded','')}setTimeout(function(){if(!d.hasAttribute('data-ready'))d.removeAttribute('data-js')},3000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
