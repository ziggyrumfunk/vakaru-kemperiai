"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Pin } from "./Icons";
import { CONTACT } from "@/lib/contact";

const SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1123.6351383741962!2d21.152317999999987!3d55.719055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e4d955715d2d07%3A0x58be3544ca55b6c6!2sMB+Vakar%C5%B3+Kemperiai!5e0!3m2!1slt!2slt!4v1440873984818";

/**
 * Google Maps sets cookies the moment it loads, so the map only loads when the
 * visitor asks for it. Until then nothing from Google is fetched.
 */
export default function MapEmbed() {
  const t = useTranslations("contact");
  const [on, setOn] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
      {on ? (
        <iframe title="Vakarų kemperiai" src={SRC} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center",
          }}
        >
          <span className="inline-grid h-14 w-14 place-items-center rounded-[2px] bg-ink text-paper">
            <Pin size={22} />
          </span>
          <div className="bg-paper-2 px-3">
            <p className="text-[1.125rem] font-medium">{CONTACT.address}</p>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-muted">{t("mapNote")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setOn(true)} className="btn btn-dark btn-sm">
              {t("showMap")}
            </button>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm bg-paper-2">
              {t("openMaps")} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
