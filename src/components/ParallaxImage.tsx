"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Image that drifts slower than the page inside its frame.
 * The frame (this element) sets the size; amount is the travel in % of the frame.
 */
export default function ParallaxImage({
  src,
  alt = "",
  sizes = "100vw",
  className = "",
  amount = 10,
  priority = false,
  position = "50% 50%",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  amount?: number;
  priority?: boolean;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // the inner layer is (100 + 2 * amount)% tall, so it can travel +-amount% of the frame
  const travel = amount / (1 + (2 * amount) / 100);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-paper-3 ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `-${amount}%`, bottom: `-${amount}%`, y: reduce ? 0 : y }}
      >
        <div className="settle absolute inset-0">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
        </div>
      </motion.div>
    </div>
  );
}
