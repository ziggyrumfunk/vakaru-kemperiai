"use client";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { Link } from "@/i18n/navigation";

const IMAGES = [
  { src: "/images/camper-1.webp", cls: "top-[6%] left-[3%] w-36 sm:w-52 rotate-[-7deg]", depth: 34 },
  { src: "/images/camper-2.webp", cls: "top-[10%] right-[5%] w-32 sm:w-48 rotate-[6deg]", depth: 54 },
  { src: "/images/camper-3.webp", cls: "bottom-[8%] left-[7%] w-36 sm:w-56 rotate-[5deg]", depth: 44 },
  { src: "/images/camper-4.webp", cls: "bottom-[12%] right-[8%] w-32 sm:w-48 rotate-[-6deg]", depth: 64 },
  { src: "/images/camper-5.webp", cls: "top-[42%] left-[1%] w-28 sm:w-40 rotate-[9deg] hidden md:block", depth: 74 },
];

function Floater({ sx, sy, src, cls, depth }: { sx: MotionValue<number>; sy: MotionValue<number>; src: string; cls: string; depth: number }) {
  const x = useTransform(sx, (v) => v * -depth);
  const y = useTransform(sy, (v) => v * -depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${cls}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl ring-1 ring-white/10">
        <Image src={src} alt="" fill sizes="220px" className="object-cover" />
      </div>
    </motion.div>
  );
}

export default function FloatingCTA() {
  const t = useTranslations("home");
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative overflow-hidden bg-charcoal text-paper"
    >
      <div className="absolute inset-0">
        {IMAGES.map((im, i) => <Floater key={i} sx={sx} sy={sy} {...im} />)}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-charcoal/45" />
      <div className="relative container-luxe py-28 sm:py-44 text-center">
        <p className="text-champagne-soft text-xs font-semibold tracking-[0.3em] uppercase mb-6">Vakarų kemperiai</p>
        <h2 className="display text-4xl sm:text-7xl max-w-3xl mx-auto text-paper">{t("ctaBandTitle")}</h2>
        <p className="mt-6 max-w-xl mx-auto text-paper-dim leading-relaxed">{t("ctaBandText")}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="tel:+37061448046" className="bg-champagne-soft text-charcoal px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-paper transition-colors">
            {t("ctaCall")} +370 614 48046
          </a>
          <a href="mailto:vakarukemperiai@gmail.com" className="border border-paper/50 text-paper px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-paper hover:text-charcoal transition-colors">
            {t("ctaEmail")}
          </a>
        </div>
      </div>
    </section>
  );
}
