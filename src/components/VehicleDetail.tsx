import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import VehicleGallery from "./VehicleGallery";
import type { Vehicle } from "@/data/vehicles";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-champagne shrink-0 mt-0.5">
      <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const t = useTranslations("vehicle");
  const backHref = vehicle.category === "camper" ? "/kemperiai" : "/mikroautobusai";

  const m = (cm?: number) => (cm ? `${(cm / 100).toFixed(1)} m` : undefined);
  const power = vehicle.powerKw
    ? `${vehicle.powerKw} kW${vehicle.powerHp ? ` · ${vehicle.powerHp} AG` : ""}`
    : undefined;
  const transmission = vehicle.transmission
    ? t(vehicle.transmission === "automatic" ? "transmissionAutomatic" : "transmissionManual")
    : undefined;

  const rows: [string, string | undefined][] = [
    [t("specs.chassis"), vehicle.chassis],
    [t("specs.engine"), vehicle.engine],
    [t("specs.power"), power],
    [t("specs.year"), vehicle.year ? String(vehicle.year) : undefined],
    [t("specs.transmission"), transmission],
    [t("specs.seats"), vehicle.seats ? String(vehicle.seats) : undefined],
    [t("specs.berths"), vehicle.berths ? String(vehicle.berths) : undefined],
    [t("specs.length"), m(vehicle.lengthCm)],
    [t("specs.height"), m(vehicle.heightCm)],
    [t("specs.width"), m(vehicle.widthCm)],
    [t("specs.weight"), vehicle.weightKg ? `${vehicle.weightKg} kg` : undefined],
    [t("specs.water"), vehicle.waterL ? `${vehicle.waterL} l` : undefined],
    [t("specs.fuelTank"), vehicle.fuelTankL ? `${vehicle.fuelTankL} l` : undefined],
    [t("specs.consumption"), vehicle.consumption],
  ];
  const specRows = rows.filter(([, v]) => v);

  return (
    <div className="container-luxe pt-32 sm:pt-40 pb-24">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted hover:text-champagne transition-colors mb-10"
      >
        <span className="text-lg leading-none">←</span> {t("back")}
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <VehicleGallery images={vehicle.images} name={vehicle.name} />
        </div>

        <div className="lg:pt-2">
          {vehicle.vip && (
            <span className="inline-block bg-champagne text-charcoal text-[0.58rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 mb-5">
              VIP
            </span>
          )}
          <h1 className="display text-4xl sm:text-5xl">{vehicle.name}</h1>
          {vehicle.descriptionLt && (
            <p className="mt-6 text-muted leading-relaxed">{vehicle.descriptionLt}</p>
          )}

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-xs tracking-[0.2em] uppercase text-champagne">{t("priceOnRequest")}</p>
            <p className="mt-2 text-sm text-muted">{t("priceNote")}</p>
          </div>

          <div className="mt-8 border border-line p-6">
            <h2 className="text-lg font-medium">{t("inquireTitle")}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">{t("inquireText")}</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:vakarukemperiai@gmail.com?subject=${encodeURIComponent(vehicle.name)}`}
                className="bg-champagne text-charcoal px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-center hover:bg-champagne-soft transition-colors"
              >
                vakarukemperiai@gmail.com
              </a>
              <a
                href="tel:+37061448046"
                className="border border-paper/25 px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-center hover:border-champagne hover:text-champagne transition-colors"
              >
                +370 614 48046
              </a>
            </div>
          </div>
        </div>
      </div>

      {specRows.length > 0 && (
        <div className="mt-20">
          <h2 className="eyebrow mb-7">{t("specsTitle")}</h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
            {specRows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-sm text-ink text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {vehicle.features.length > 0 && (
        <div className="mt-16">
          <h2 className="eyebrow mb-7">{t("featuresTitle")}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3.5">
            {vehicle.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-muted">
                <Check />
                {t(`features.${f}`)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
