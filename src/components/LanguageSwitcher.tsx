"use client";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAMES: Record<string, string> = { lt: "LT", ru: "RU", lv: "LV", en: "EN" };

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-semibold tracking-widest uppercase hover:text-champagne transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {NAMES[locale]}
        <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 mt-3 min-w-[6rem] border border-line-dark bg-charcoal py-1 shadow-2xl">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                onClick={() => {
                  router.replace(pathname, { locale: l });
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-xs tracking-widest uppercase transition-colors hover:text-champagne-soft ${
                  l === locale ? "text-champagne-soft" : "text-paper-dim"
                }`}
              >
                {NAMES[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
