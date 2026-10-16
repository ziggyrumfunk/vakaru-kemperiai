"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy } from "./Icons";

/** For visitors whose mail link opens nothing (webmail users): copy the address instead. */
export default function CopyButton({ value }: { value: string }) {
  const t = useTranslations("ui");
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {}
  };

  return (
    <button type="button" onClick={copy} className="btn btn-outline btn-sm" aria-live="polite">
      {done ? <Check size={16} /> : <Copy size={16} />} {done ? t("copied") : t("copy")}
    </button>
  );
}
