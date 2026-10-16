"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { getLenis } from "./SmoothScroll";
import { ArrowRight, Phone } from "./Icons";
import { CONTACT } from "@/lib/contact";

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
  const tu = useTranslations("ui");
  const tf = useTranslations("footer");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      getLenis()?.stop();
      root.style.overflow = "hidden";
    } else {
      getLenis()?.start();
      root.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          solid ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-paper/0"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Vakarų kemperiai">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="h-9 w-9 object-contain" />
            <span className="text-[0.9375rem] font-semibold leading-[1.02] tracking-[-0.01em]">
              Vakarų
              <br />
              kemperiai
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-8" aria-label="Main">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link text-[0.9375rem] font-medium"
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <LanguageSwitcher />
            </div>
            <a href={CONTACT.phoneHref} className="btn-icon hidden sm:inline-grid" aria-label={`${th("callCta")} ${CONTACT.phone}`}>
              <Phone />
            </a>
            <Link href="/kontaktai" className="btn btn-primary btn-sm">
              {th("bookCta")}
            </Link>
            <button
              type="button"
              className="btn-icon xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? tu("close") : tu("menu")}
            >
              <span className="relative block h-3 w-[1.15rem]" aria-hidden="true">
                <span
                  className="absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo"
                  style={{ transform: open ? "translateY(5.25px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo"
                  style={{ transform: open ? "translateY(-5.25px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`site-menu fixed inset-0 z-40 bg-paper xl:hidden ${open ? "is-open" : ""}`} inert={!open}>
        <div className="wrap flex h-full flex-col overflow-y-auto pb-8 pt-[calc(var(--header-h)+1.5rem)]" data-lenis-prevent>
          <nav aria-label="Mobile" className="flex flex-col">
            {[...LINKS, { href: "/nuomos-salygos", key: "terms" } as const].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="menu-item group flex items-center justify-between border-b border-line py-4 text-[clamp(1.75rem,1rem+3.5vw,2.75rem)] font-medium leading-tight tracking-[-0.03em]"
                style={{ "--i": i } as CSSProperties}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.key === "terms" ? tf("termsLink") : t(l.key)}
                <ArrowRight size={22} className="text-muted transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>
          <div className="menu-item mt-auto grid gap-8 pt-10 sm:grid-cols-2" style={{ "--i": 7 } as CSSProperties}>
            <div className="space-y-1.5">
              <a href={CONTACT.phoneHref} className="block text-xl font-medium">{CONTACT.phone}</a>
              <a href={CONTACT.phone2Href} className="block text-muted">{CONTACT.phone2} · Gintautas</a>
              <a href={`mailto:${CONTACT.email}`} className="block text-muted">{CONTACT.email}</a>
            </div>
            <div className="sm:justify-self-end">
              <LanguageSwitcher variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
