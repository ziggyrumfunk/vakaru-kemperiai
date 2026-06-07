"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "@/i18n/navigation";

function HeroCopy() {
  const t = useTranslations("home");
  return (
    <>
      <p className="text-champagne-soft text-xs font-semibold tracking-[0.28em] uppercase mb-5 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)]">
        {t("eyebrow")}
      </p>
      <h1 className="display text-[clamp(2.1rem,5.6vw,5.2rem)] max-w-3xl text-paper [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-xl text-sm sm:text-lg text-paper leading-relaxed [text-shadow:0_1px_16px_rgb(0_0_0/0.5)]">
        {t("subtitle")}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/kemperiai" className="bg-champagne-soft text-charcoal px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-paper transition-colors">
          {t("ctaPrimary")}
        </Link>
        <Link href="/kontaktai" style={{ color: "#ffffff", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.7)" }} className="px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-sm">
          {t("ctaSecondary")}
        </Link>
      </div>
    </>
  );
}

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={ref} data-hero className="relative bg-charcoal">
      <div className="relative w-full overflow-hidden aspect-[16/9] max-h-[92vh]">
        <video
          src="/media/hero2.mp4"
          poster="/media/hero2-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-charcoal/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/10 to-transparent" />

        <motion.div style={{ y: copyY }} className="hidden md:block absolute inset-0 z-10">
          <div className="container-luxe h-full flex flex-col justify-center">
            <HeroCopy />
          </div>
        </motion.div>
      </div>

      <div className="md:hidden container-luxe py-12">
        <HeroCopy />
      </div>
    </section>
  );
}
