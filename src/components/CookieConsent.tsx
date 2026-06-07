"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("vk_cookie_consent")) {
        const id = setTimeout(() => setShow(true), 1400);
        return () => clearTimeout(id);
      }
    } catch {
      setShow(true);
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem("vk_cookie_consent", value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container-luxe">
            <div className="border border-line bg-ink/95 backdrop-blur-md p-6 sm:p-7 flex flex-col md:flex-row md:items-center gap-5 shadow-2xl">
              <p className="text-sm text-paper-dim leading-relaxed flex-1">{t("text")}</p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => decide("declined")}
                  className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-muted hover:text-paper transition-colors"
                >
                  {t("decline")}
                </button>
                <button
                  onClick={() => decide("accepted")}
                  className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase bg-champagne text-charcoal hover:bg-champagne-soft transition-colors"
                >
                  {t("accept")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
