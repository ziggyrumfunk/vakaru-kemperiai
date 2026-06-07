import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vakarukemperiai.lt"),
  title: "Vakarų kemperiai",
  description: "Kemperių ir mikroautobusų nuoma Klaipėdoje.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={manrope.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
