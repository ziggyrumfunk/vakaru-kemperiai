"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Vehicle } from "@/data/vehicles";

export default function VehicleMarquee({ vehicles, duration = 80 }: { vehicles: Vehicle[]; duration?: number }) {
  const t = useTranslations("vehicle");
  const items = [...vehicles, ...vehicles];
  return (
    <div className="marquee relative overflow-hidden py-2">
      <div className="marquee-track gap-6 px-3" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {items.map((v, i) => (
          <Link
            key={i}
            href={`${v.category === "camper" ? "/kemperiai" : "/mikroautobusai"}/${v.slug}`}
            aria-hidden={i >= vehicles.length}
            className="group block w-[260px] sm:w-[320px] shrink-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
              <Image src={v.heroImage} alt={v.name} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              {v.vip && <span className="absolute top-3 left-3 bg-champagne text-charcoal text-[0.55rem] font-bold tracking-widest uppercase px-2 py-0.5">VIP</span>}
            </div>
            <div className="pt-4 flex items-start justify-between gap-3 border-t border-line">
              <div>
                <h3 className="text-base font-medium group-hover:text-champagne transition-colors">{v.name}</h3>
                <p className="text-xs text-muted mt-1">
                  {[v.chassis, v.seats ? `${v.seats} ${t("seatsShort")}` : null].filter(Boolean).join("  ·  ")}
                </p>
              </div>
              <span className="text-champagne text-lg leading-none">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
