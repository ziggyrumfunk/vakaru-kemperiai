"use client";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** One oversized, low-contrast line of text drifting across the page. */
export default function GhostMarquee({ text, duration = 70 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);
  const chunk = `${text} · `;

  return (
    <div ref={ref} className="overflow-hidden py-6 sm:py-10" aria-hidden="true">
      <motion.div style={{ x: reduce ? 0 : x }}>
        <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
          {[0, 1].map((k) => (
            <span key={k} className="ghost-text pr-[0.3em]">
              {chunk.repeat(3)}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
