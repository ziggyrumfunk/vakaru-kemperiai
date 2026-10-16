"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "@/i18n/navigation";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { ArrowRight, Pause, Play } from "./Icons";

/**
 * Headline on paper, video in its own frame below it. No text sits on the footage,
 * so the video can run at full brightness. Scrolling widens the frame to the screen
 * edges while the footage drifts inside it.
 */
export default function HomeHero() {
  const t = useTranslations("home");
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [distance, setDistance] = useState(600);

  // how far the page scrolls before the frame reaches the header
  useEffect(() => {
    const measure = () => {
      const el = frame.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      setDistance(Math.max(240, top - header));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // play unless the visitor asked for reduced motion (then the poster stays, with a play button)
  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    v.play().catch(() => {});
  }, [reduce]);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, distance], [0.94, 1], { clamp: true });
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative">
      <div className="wrap pb-10 pt-[calc(var(--header-h)+2.5rem)] sm:pb-12 lg:pt-[calc(var(--header-h)+3.5rem)]">
        <Reveal gate variant="fade">
          <p className="t-label has-dot">{t("eyebrow")}</p>
        </Reveal>
        <SplitText as="h1" gate className="t-display mt-5 lg:mt-6">
          {t("title")}
        </SplitText>
        <div className="mt-7 grid gap-7 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal gate delay={350} className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="t-lead text-muted">{t("subtitle")}</p>
          </Reveal>
          <Reveal gate delay={450} className="lg:col-span-6 lg:row-start-1">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/kemperiai" className="btn btn-dark">
                {t("ctaPrimary")} <ArrowRight className="nudge" />
              </Link>
              <Link href="/kontaktai" className="btn btn-outline">
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div
        ref={frame}
        style={{ scale: reduce ? 1 : scale, transformOrigin: "50% 0%" }}
        className="relative aspect-[4/5] w-full overflow-hidden bg-paper-3 sm:aspect-[16/10] lg:aspect-auto lg:h-[min(88svh,56.25vw)]"
      >
        <motion.div className="absolute inset-x-0 -top-[10%] bottom-0" style={{ y: reduce ? 0 : drift }}>
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover object-[62%_50%] sm:object-center"
            src="/media/hero2.mp4"
            poster="/media/hero2-poster.jpg"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </motion.div>
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-4 right-4 inline-grid h-11 w-11 place-items-center rounded-[2px] bg-paper/80 text-ink backdrop-blur-md transition-colors hover:bg-paper sm:bottom-6 sm:right-6"
          aria-label={playing ? t("videoPause") : t("videoPlay")}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </motion.div>
    </section>
  );
}
