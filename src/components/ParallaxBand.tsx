"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ParallaxBand({ image, label }: { image: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[44vh] min-h-[300px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/55" />
      {label && (
        <div className="relative h-full flex items-center justify-center">
          <span className="text-champagne-soft text-xs sm:text-sm font-semibold tracking-[0.34em] uppercase text-center px-6">
            {label}
          </span>
        </div>
      )}
    </section>
  );
}
