"use client";
import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";

// The first page of a visit is server-rendered and should show at once;
// only later client-side navigations fade in.
let hasMounted = false;

export default function PageTransition({ children }: { children: ReactNode }) {
  const animate = hasMounted;
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
