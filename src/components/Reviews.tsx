import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import ReviewMarquee from "./ReviewMarquee";
import { googleRating, googleUrl } from "@/data/reviews";

function Stars() {
  return (
    <div className="flex gap-0.5 text-champagne" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.2l1-5.8L1.5 7.2l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations("home");
  return (
    <section className="relative overflow-hidden border-y border-line">
      <div className="absolute inset-0">
        <Image src="/images/camper-1.webp" alt="" fill className="object-cover brightness-125 scale-105" sizes="100vw" />
        <div className="absolute inset-0 bg-paper/82" />
      </div>
      <div className="relative py-24 sm:py-28">
        <div className="container-luxe flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Reveal><p className="eyebrow mb-4">{t("reviewsEyebrow")}</p></Reveal>
            <Reveal><h2 className="display text-4xl sm:text-5xl">{t("reviewsTitle")}</h2></Reveal>
          </div>
          <Reveal className="flex items-center gap-4">
            <span className="text-4xl font-light text-champagne">{googleRating}</span>
            <div>
              <Stars />
              <p className="text-xs text-muted mt-1 max-w-[15rem]">{t("reviewsSubtitle")}</p>
            </div>
          </Reveal>
        </div>

        <ReviewMarquee />

        <div className="container-luxe mt-12">
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-champagne hover:gap-5 transition-all">
            {t("reviewsCta")} <span className="text-lg leading-none">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
