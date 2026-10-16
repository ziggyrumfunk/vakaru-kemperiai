"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "./Icons";

/**
 * Horizontal, natively scrolling row of cards (swipe, trackpad or the arrow buttons).
 * The heading goes in `head`; the row bleeds to the right edge of the screen.
 */
export default function Rail({
  head,
  label,
  children,
  className = "",
}: {
  head: ReactNode;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const t = useTranslations("ui");
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step * Math.max(1, Math.floor(el.clientWidth / step) - 1), behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div className={className}>
      <div className="wrap flex items-end justify-between gap-6">
        <div className="min-w-0">{head}</div>
        <div className="hidden md:flex shrink-0 gap-2">
          <button type="button" className="btn-icon" onClick={() => go(-1)} disabled={atStart} aria-label={t("prev")}>
            <ArrowLeft />
          </button>
          <button type="button" className="btn-icon" onClick={() => go(1)} disabled={atEnd} aria-label={t("next")}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div ref={scroller} className="rail no-scrollbar mt-10 lg:mt-14" role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
