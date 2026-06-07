"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const LINKS = [
  { href: "/kemperiai", key: "campers" },
  { href: "/mikroautobusai", key: "minibuses" },
  { href: "/patarimai", key: "tips" },
  { href: "/duk", key: "faq" },
  { href: "/kontaktai", key: "contact" },
] as const;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const compute = () => {
      const hero = document.querySelector("[data-hero]") as HTMLElement | null;
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 96 : false);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [pathname]);
  useEffect(() => setOpen(false), [pathname]);

  // over the hero video -> white text on dark glass; everywhere else -> black text on cream
  const onHero = overHero && !open;
  const txt = onHero ? "#ffffff" : "#1a1813";
  const accent = onHero ? "#cdb074" : "#9a7a36";
  const headerBg = onHero ? "rgba(16,15,11,0.62)" : "rgba(245,241,232,0.95)";
  const borderCol = onHero ? "rgba(255,255,255,0.14)" : "#e0d8c8";
  const ts = onHero ? "0 1px 3px rgba(0,0,0,0.85)" : "none";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-colors duration-500"
      style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderCol}` }}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3" style={{ color: txt, textShadow: ts }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Vakarų kemperiai" className="h-9 w-9 object-contain" style={{ filter: onHero ? "invert(1)" : "none" }} />
          <span className="text-sm font-semibold tracking-[0.22em] uppercase leading-none" style={{ color: txt }}>
            Vakarų<br />
            <span style={{ color: accent }}>kemperiai</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.82rem] font-semibold tracking-wider uppercase" style={{ color: txt, textShadow: ts }}>
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6" style={{ color: txt, textShadow: ts }}>
          <LanguageSwitcher />
          <Link href="/kontaktai" className="px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors" style={{ border: `1px solid ${accent}`, color: accent }}>
            {th("callCta")}
          </Link>
        </div>

        <button className="lg:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu" style={{ color: txt }}>
          <span className="block h-[2px] w-6 transition-transform" style={{ backgroundColor: "currentColor", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span className="block h-[2px] w-6" style={{ backgroundColor: "currentColor", opacity: open ? 0 : 1 }} />
          <span className="block h-[2px] w-6 transition-transform" style={{ backgroundColor: "currentColor", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden" style={{ backgroundColor: "rgba(245,241,232,0.98)", borderTop: "1px solid #e0d8c8" }}>
          <nav className="container-luxe flex flex-col py-6 gap-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="py-3 text-sm tracking-wider uppercase font-medium" style={{ color: "#1a1813", borderBottom: "1px solid #e0d8c8" }}>
                {t(l.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-5" style={{ color: "#1a1813" }}>
              <LanguageSwitcher />
              <Link href="/kontaktai" className="text-sm tracking-widest uppercase font-semibold" style={{ color: "#9a7a36" }}>{th("callCta")}</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
