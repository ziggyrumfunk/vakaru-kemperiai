"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAMES: Record<string, string> = { lt: "LT", ru: "RU", lv: "LV", en: "EN" };
const FULL: Record<string, string> = { lt: "Lietuvių", ru: "Русский", lv: "Latviešu", en: "English" };

export default function LanguageSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "inline" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("ui");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (l: string) => {
    setOpen(false);
    if (l !== locale) router.replace(pathname, { locale: l });
  };

  if (variant === "inline") {
    return (
      <div className="flex gap-1" role="group" aria-label={t("language")}>
        {routing.locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`min-w-11 h-11 px-2 text-[0.9375rem] font-medium border rounded-[2px] transition-colors ${
              l === locale ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
            }`}
          >
            {NAMES[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-1.5 px-2 text-[0.9375rem] font-medium"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t("language")}: ${FULL[locale]}`}
      >
        {NAMES[locale]}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 min-w-[10rem] border border-line bg-paper py-1.5 shadow-[0_18px_40px_-20px_rgb(20_20_18/0.35)]">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => choose(l)}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-6 px-4 py-2.5 text-left text-[0.9375rem] transition-colors hover:bg-paper-2 ${
                  l === locale ? "font-medium" : "text-muted"
                }`}
              >
                {FULL[l]}
                <span className="text-[0.8125rem] tracking-[.08em] text-muted">{NAMES[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
