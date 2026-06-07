import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Vehicle } from "@/data/vehicles";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const t = useTranslations("vehicle");
  const base = vehicle.category === "camper" ? "/kemperiai" : "/mikroautobusai";
  const meta = [
    vehicle.chassis,
    vehicle.seats ? `${vehicle.seats} ${t("seatsShort")}` : null,
    vehicle.berths ? `${vehicle.berths} ${t("berthsShort")}` : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Link href={`${base}/${vehicle.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={vehicle.heroImage}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        {vehicle.vip && (
          <span className="absolute top-4 left-4 bg-champagne text-charcoal text-[0.58rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1">
            VIP
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="pt-5 flex items-start justify-between gap-4 border-t border-line mt-0">
        <div>
          <h3 className="text-[1.05rem] font-medium tracking-wide group-hover:text-champagne transition-colors">
            {vehicle.name}
          </h3>
          <p className="text-xs text-muted mt-1.5">{meta}</p>
        </div>
        <span className="text-champagne text-xl leading-none mt-0.5 transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </Link>
  );
}
