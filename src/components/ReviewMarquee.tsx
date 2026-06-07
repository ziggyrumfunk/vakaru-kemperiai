"use client";
import { useLocale } from "next-intl";
import { reviews, type Review } from "@/data/reviews";

function Stars() {
  return (
    <div className="flex gap-0.5 text-champagne" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.2l1-5.8L1.5 7.2l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewMarquee({ duration = 90 }: { duration?: number }) {
  const locale = useLocale() as keyof Review["text"];
  const items = [...reviews, ...reviews];
  return (
    <div className="marquee relative overflow-hidden py-2">
      <div className="marquee-track gap-6 px-3" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {items.map((r, i) => (
          <figure key={i} className="w-[300px] sm:w-[380px] shrink-0 border border-line bg-paper/95 backdrop-blur-sm p-7 shadow-sm">
            <Stars />
            <blockquote className="mt-4 text-sm text-ink/80 leading-relaxed line-clamp-6">{r.text[locale] ?? r.text.en}</blockquote>
            <figcaption className="mt-5 text-xs font-semibold tracking-widest uppercase text-muted">{r.author}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
