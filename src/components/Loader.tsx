"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("vk_loaded") === "1";
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("vk_loaded", "1");
      } catch {}
    }, 1150);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src="/logo.svg"
            alt=""
            className="h-24 w-24 object-contain"
            initial={{ opacity: 0, scale: 0.9, filter: "invert(1) blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "invert(1) blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="mt-8 h-px w-40 overflow-hidden bg-line"
          >
            <motion.div
              className="h-full bg-champagne"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.05, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
