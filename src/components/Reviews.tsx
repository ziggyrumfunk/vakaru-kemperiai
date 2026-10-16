import { useLocale, useTranslations } from "next-intl";
import Rail from "./Rail";
import SplitText from "./SplitText";
import { ArrowUpRight } from "./Icons";
import { googleUrl, reviews, type Review } from "@/data/reviews";

export default function Reviews() {
  const t = useTranslations("home");
  const locale = useLocale() as keyof Review["text"];

  return (
    <section className="section bg-paper-2">
      <Rail
        label={t("reviewsTitle")}
        head={
          <>
            <p className="t-label has-dot">{t("reviewsEyebrow")}</p>
            <SplitText as="h2" className="t-h2 mt-5">{t("reviewsTitle")}</SplitText>
          </>
        }
      >
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="flex w-[84vw] flex-col justify-between border border-line bg-paper p-7 sm:w-[24rem] sm:p-9 lg:w-[27rem]"
          >
            <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true" className="text-accent">
              <path
                fill="currentColor"
                d="M0 22V12.6C0 5.5 3.9 1.3 10.6 0l1.3 3.2C8 4.4 6.2 6.9 6 10.4h5.6V22H0Zm16.4 0V12.6C16.4 5.5 20.3 1.3 27 0l1 3.2c-3.9 1.2-5.7 3.7-5.9 7.2h5.6V22H16.4Z"
              />
            </svg>
            <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed">
              {r.text[locale] ?? r.text.en}
            </blockquote>
            <figcaption className="mt-8 border-t border-line pt-5 font-medium">{r.author}</figcaption>
          </figure>
        ))}
      </Rail>
      <div className="wrap mt-10">
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="arrow-link">
          {t("reviewsCta")} <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
