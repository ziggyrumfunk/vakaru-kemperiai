import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Vehicle } from "@/data/vehicles";
import { ArrowRight } from "./Icons";

export default function VehicleCard({
  vehicle,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
}: {
  vehicle: Vehicle;
  sizes?: string;
  className?: string;
}) {
  const t = useTranslations("vehicle");
  const base = vehicle.category === "camper" ? "/kemperiai" : "/mikroautobusai";
  const meta = [
    vehicle.chassis,
    vehicle.seats ? `${vehicle.seats} ${t("seatsShort")}` : null,
    vehicle.berths ? `${vehicle.berths} ${t("berthsShort")}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link href={`${base}/${vehicle.slug}`} className={`group block ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
        {vehicle.heroImage && (
          <Image
            src={vehicle.heroImage}
            alt={vehicle.name}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.045]"
          />
        )}
        {vehicle.vip && (
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[0.75rem] font-medium uppercase tracking-[.08em] text-ink">
            VIP
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[1.25rem] font-medium leading-tight tracking-[-0.015em]">{vehicle.name}</h3>
          {meta && <p className="mt-1.5 text-[0.9375rem] text-muted">{meta}</p>}
        </div>
        <span className="mt-0.5 inline-grid h-10 w-10 shrink-0 place-items-center rounded-[2px] border border-line transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <ArrowRight size={17} />
        </span>
      </div>
    </Link>
  );
}
